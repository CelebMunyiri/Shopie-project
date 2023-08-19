const mssql=require('mssql')
const {v4}=require('uuid')
const bcrypt=require('bcrypt')
const { createTableUser } = require('../Database/Tables/userTable')
const { sqlConfig } = require('../Config/config')
const jwt=require('jsonwebtoken') 

const registerUser=async(req,res)=>{
    try {
        const userId=v4()
const {userPhone,userName,userEmail,userPassword}=req.body
const hashedPwd=await bcrypt.hash(userPassword,5)

const pool=await mssql.connect(sqlConfig)
const registerResult=(await pool.request()
.input('userId',userId)
.input('userPhone',userPhone)
.input('userName',userName)
.input('userEmail',userEmail)
.input('userPassword',hashedPwd)
.execute('registerUserProc'))
if(registerResult.rowsAffected[0] == 1){
    return res.status(200).json({message:'Registered succesfully'})
} else{
    return res.status(400).json({message:'Registration Failed'})
}
} catch (error) {
       // createTableUser()
        return res.json({Error:error.message})
    }
}

module.exports={
    registerUser
}