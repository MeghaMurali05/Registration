const express=require('express')
const router=express.Router()
const{registerUser,loginUser}=require('../controllers/loginController')


router.post('/registerusers',registerUser)
router.post('/loginuser',loginUser)














module.exports=router