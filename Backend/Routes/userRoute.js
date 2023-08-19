const Router=require('express')
const { registerUser, loginUser, updateUser } = require('../Contoller/userController')

const userRoute=Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.put('/update/:userId',updateUser)


module.exports={
    userRoute
}