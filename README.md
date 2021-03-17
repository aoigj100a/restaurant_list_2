# 我的餐廳清單 v.2
使用者可以透過搜尋餐廳名稱、類別、地址，來找到特定的餐廳，並且閱讀詳細資訊。
也能新增餐廳、修改餐廳資訊、刪除已有餐廳。使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。使用者也可以透過 Facebook Login 直接登入。

## 畫面

## 環境建置與需求
1. Node.js v12.19.0
2. Express v4.17.1
3. Express-handlebars v5.2.1
4. Nodemon v2.0.6
5. multer v1.4.2
6. mongoose v5.11.19
7. method-override v3.0.0
8. body-parser v1.19.0
9. connect-flash v0.1.1
10. passport v0.4.1
11. passport-facebook v3.0.0
12. passport-local v1.0.0
13. express-session v1.17.1

## 安裝與執行步驟 (Installation and Execution)
1. 將專案複製到本機 (兩種方法)
> (1) 打開終端機輸入 
`git clone https://github.com/aoigj100a/restaurant_list_2`</br>
> (2) 點選 download ZIP 下載

2. 進入專案資料夾安裝工具包
> 打開終端機輸入
`npm install`

3. 與mongoDB連線
> 範例：在終端機輸入 `mongod --dbpath 程式所在路徑/4.4.3/mongodb-data`

4. 注入種子資料
> 打開終端機輸入
`npm run seed`

5. 使用瀏覽器瀏覽
> 打開瀏覽器在網址列輸入 localhost:3000 即可瀏覽

6. 使用預設使用者登入 或者 註冊新帳號登入
>  預設使用者如下
**user1：**
帳號：user1@example.com
密碼：12345678

**user2：**
帳號：user2@example.com
密碼：12345678

7. 登入成功便可開始使用功能

## 功能描述 (Features)
1. 查詢餐廳詳細資訊
2. 關鍵字搜尋餐廳
3. 使用者可以新增餐廳、修改餐廳資訊、刪除已有餐廳
4. 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。
5. 如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
6. 使用者也可以透過 Facebook Login 直接登入
7. 使用者的密碼要使用 bcrypt 來處理
8. 使用者必須登入才能使用餐廳清單，如果沒登入，會被導向登入頁面
9. 登入後，使用者可以建立並管理專屬他的一個餐廳清單
使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息

## 專案開發人員

> [AOI](https://github.com/aoigj100a)
