const asyncHandler= require('express-async-handler')


// @desc get goals
// @route GET /api/goals
// @access Private
const getGoals=asyncHandler( (req,res)=>{
    res.status(200).json({message:'Get goals'})
})

// @desc create goals
// @route POST /api/goals
// @access Private
const setGoals=asyncHandler( (req,res)=>{
    if (!req.body.text){
       res.status(400)
        throw new Error('please add some fields')
    }
    res.status(200).json({message:'Set goals'})
})

// @desc update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals=asyncHandler( (req,res)=>{
    res.status(200).json({message:`update goals ${req.params.id}`})
})

// @desc DELETE goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals=asyncHandler( (req,res)=>{
    res.status(200).json({message:`delete goals ${req.params.id}`})
})






module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals

}
