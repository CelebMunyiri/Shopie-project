const Router=require('express')
const { registerUser } = require('../Contoller/userController')

const userRoute=Router()

userRoute.post('/register',registerUser)


module.exports={
    userRoute
}