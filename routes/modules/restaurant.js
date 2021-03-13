const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

const multer = require('multer')
let myStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "public/img/uploads");
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({
    storage: myStorage,
    fileFilter: (req, file, cb)=> {
        if (file.mimetype != 'image/png' | 'image/jpg' | 'image/gif') {
            return cb(new Error('Wrong file type'));
        }
        cb(null, true)
    }
});

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/new', upload.single('image'), async(req, res) => {
    // 取得總數以新增id
    const count = await Restaurant.countDocuments({}).exec()
    const id = count + 1
    // 修掉路徑裡的 public 存正確的路徑到資料庫
    const image = req.file.path.replace('public', "")
    const { name, name_en, category, location, phone, google_map, rating, description } = req.body
    return Restaurant.create({ id, name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

})

router.get('/delete/:restaurant_id', (req, res) => {
    res.render('delete')
})
router.delete('/delete/:restaurant_id', (req, res) => {

})

//路線edit
router.get('/:restaurant_id', (req, res) => {
    res.render('edit')
})

router.put('/:restaurant_id', (req, res) => {

})

module.exports = router