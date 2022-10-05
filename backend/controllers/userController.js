const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler( async (req,res)=>{

    const {name,email,password}= req.body

    if (!name || ! email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exist
    const userExists= await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)

    //Create User
    const user = await User.create({
        name,
        email,
        password:hashedPassword,

    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message: 'Register User'})
})


// @desc Login
// @route POST /api/users/login
// @access Public
const loginUser =asyncHandler( async  (req,res)=>{

    const {email, password}=req.body

    //Check for user Email
    const user = await User.findOne({email})

    //check password
    if (user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid credential')
    }
    res.json({message: 'login User'})
})

// @desc get user data
// @route GET /api/users/me
// @access Private
const getMe =asyncHandler( async  (req,res)=>{
    const {_id,name,email}= await User.findById(req.user.id)
    res.status(200).json({
        id : _id,
        name,
        email
    })
})

//Generate JWT
const generateToken=(id)=>{
    return jwt.sign({id},'abc123')
}

// @desc get All users
// @route GET /api/users
// @access Public
const getUsers=asyncHandler(async (req,res)=>{
    const users = await User.find()
    res.status(200).json(users)
})

module.exports = {
    registerUser,
    getMe,
    loginUser,
    getUsers
}
