const db = require('../Models')
const Users = db.users
const AddPost = db.posts
const { genSaltSync, hashSync, compare } = require("bcrypt")
const{sign}= require("jsonwebtoken")
const passport = require('passport')
const multer = require('multer')

function validEmail (email){
    return String(email)
    .toLowerCase()
    .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}
function validPassword (password){
    return password.length > 6
}

const addUser = async (req, res) => {
    try {
        let { userName, password, email } = req.body
        const oldUser = await Users.findOne({ where: { email } })
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login")
        }
        if(validEmail(email) && validPassword (password)){
            const salt = genSaltSync(10)
            password = hashSync(password, salt)
            let data = await Users.create({
                userName: userName,
                email,
                password: password
            })
            const token = sign({email:email},'dola123',{
                expiresIn: "2h"
            })
            res.status(200).json({
                msg:"Signup",
                data,
                token:token
            })
        }else{
            res.status(422).json({msg:"Please Enter Correct Email or Password must be longer than 6 charecters"})
        }
    
    } catch (err) {
        console.log(err)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let data = await Users.findOne({ where: { email } })
        const ismatch = await compare(password, data.password)

        if (ismatch) {

            const token = sign({email:email},'dola123',{
                expiresIn: "2h"
            })
            Users.token = token
            console.log("token:",token)

            res.status(200).json({
                msg:"login",
                data,
                token:token
            })
        } else {
            res.status(403).json({ msg: "invalid login" })
        }
    } catch (error) {
        res.status(403).json({ msg: "invalid login Details" })
    }
}

const addPost = async (req, res) => {
    const{title,content,author_id} = req.body
        let data = await AddPost.create({title,content,author_id})
    res.status(200).json(data)
}

const getPost = async (req, res) => {

    let data = await AddPost.findAll()

    res.status(200).json(data)
}
const getPostId = async (req, res) => {

    let data = await AddPost.findOne({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(data)
}

const updatePostId = async (req, res) => {
    const {title,content,author_id } = req.body
    let data = await AddPost.update({title,content,author_id }, {
        where: {
            id: req.params.id
        },
    })
    res.status(200).json(data)
}

const deletPostId = async (req, res) => {

    let data = await AddPost.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json(data)
}

module.exports = {
    addUser,
    login,
    addPost,
    getPost,
    getPostId,
    updatePostId,
    deletPostId,
}