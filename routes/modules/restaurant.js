const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

const multer = require('multer')
let myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({
    storage: myStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype != 'image/png' | 'image/jpg' | 'image/gif') {
            return cb(new Error('Wrong file type'));
        }
        cb(null, true)
    }
});

router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/new', upload.single('image'), async (req, res) => {
    const userId = req.user._id
    // 取得總數以新增id
    const count = await Restaurant.countDocuments({}).exec()
    const id = count + 1
    // 修掉路徑裡的 public 存正確的路徑到資料庫
    const image = req.file.path.replace('public', "")
    const { name, name_en, category, location, phone, google_map, rating, description } = req.body
    return Restaurant.create({ userId, id, name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

})

router.get('/delete/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    Restaurant.findOne({ id: id }).lean()
        .then(restaurant => res.render('delete', { restaurant }))
        .catch(err => console.log(err))
})
router.delete('/delete/:restaurant_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.restaurant_id
    Restaurant.findOne({ userId, _id })
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

})

//路線edit
router.get('/:restaurant_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.restaurant_id
    Restaurant.findOne({ userId, _id }).lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(err => console.log(err))
})

router.put('/:restaurant_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.restaurant_id
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return Restaurant.findOne({ _id, userId })
        .then(restaurant => {
            restaurant.name = name
            restaurant.name_en = name_en
            restaurant.category = category
            restaurant.image = image
            restaurant.location = location
            restaurant.phone = phone
            restaurant.google_map = google_map
            restaurant.rating = rating
            restaurant.description = description
            return restaurant.save()
        })
        .then(() => res.redirect(`/show/${id}`))
        .catch(error => console.log(error))
})

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router