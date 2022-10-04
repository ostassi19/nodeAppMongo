const asyncHandler= require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc get goals
// @route GET /api/goals
// @access Private
const getGoals=asyncHandler( async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
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
        text: req.body.text
    })

    res.status(200).json(goal)
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

    const deletedGoal = await Goal.remove()

    res.status(200).json({id : req.params.id})
})






module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals

}
