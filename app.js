const express = require("express");
const app = express();
const port = 2020;

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

require('./Models')
const userCtrl = require('./controllers/usersCtrl')

var passport = require("passport")
// var upload = require('./middleware/upload')


app.use(passport.initialize())
require('./auth/passports')(passport)

app.get('/',(req,res)=>{
    res.send('Wellcome to Home Page')
})

app.post('/users',userCtrl.addUser)
app.get('/users/login',userCtrl.login)
app.post('/users/addPost',passport.authenticate('jwt',{session:false}),userCtrl.addPost)
app.get('/users/getPost',passport.authenticate('jwt',{session:false}),userCtrl.getPost)
app.get('/users/getPost/:id',passport.authenticate('jwt',{session:false}),userCtrl.getPostId)
app.put('/users/updatePost/:id',passport.authenticate('jwt',{session:false}),userCtrl.updatePostId)
app.delete('/users/deletePost/:id',passport.authenticate('jwt',{session:false}),userCtrl.deletPostId)


app.listen(port, () => {
    console.log(`port listening from ${port}`);
})
