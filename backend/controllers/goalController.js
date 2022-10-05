const asyncHandler= require('express-async-handler')
const faker = require('@faker-js/faker')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc get goals
// @route GET /api/goals
// @access Private
const getGoals=asyncHandler( async (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const startIndex= (page-1)*limit
    endIndex= page*limit
    const goals = await Goal.find({user:req.user.id})
    paginatedGoals= goals.slice(startIndex,endIndex)
    res.status(200).json(paginatedGoals)
})

// @desc create goals
// @route POST /api/goals
// @access Private
const setGoals=asyncHandler( async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add some fields')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})


// @desc create fake golas
// @route POST /api/goals/fake
// @access Private
const createFakeGoals=asyncHandler( async (req, res) => {
    for (var i=0;i<10;i++){
        var fakeGoals= new Goal({
            text: faker.Lorem.paragraph(),
            user: req.user.id
        })
        fakeGoals.save((err,data)=>{
            if (err){
                console.log(err)
            }
        })
    }
    res.status(200).json(fakeGoals)
})


// @desc create massive golas
// @route POST /api/goals/massive
// @access Private
const createMassiveGoals=asyncHandler( async (req, res) => {
    for (var i=0;i<500;i++){
        var massiveGoals= new Goal({
            text: 'I love you Aloulou',
            user: req.user.id
        })
        massiveGoals.save((err,data)=>{
            if (err){
                console.log(err)
            }
        })
    }
    res.status(200).json(massiveGoals)
})



// @desc update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals=asyncHandler( async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user= await User.findById(req.user.id)

    //check for user
    if (!user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged user matches the goal user
    if (goal.user.toString()!= user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updaedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updaedGoal)
})

// @desc DELETE goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals=asyncHandler( async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user= await User.findById(req.user.id)
    //check for user
    if (!user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged user matches the goal user
    if (goal.user.toString()!= user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const deletedGoal = await goal.remove()

    res.status(200).json({id : req.params.id})
})


module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
    createFakeGoals,
    createMassiveGoals

}
