const express=require('express')
const router = express.Router()
const {getGoals,
    setGoals,
    updateGoals,
    deleteGoals, createFakeGoals, createMassiveGoals
}= require('../controllers/goalController')

const {protect}=require('../middlware/authMiddlware')

router.route('/').get(protect,getGoals).post(protect,setGoals)

router.route('/:id').put(protect,updateGoals).delete(protect,deleteGoals)

router.route('/fake').post(protect,createFakeGoals)

router.route('/massive').post(protect,createMassiveGoals)
module.exports= router
