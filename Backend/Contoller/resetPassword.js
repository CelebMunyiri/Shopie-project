const express=require('express')
const bodyParser=require('body-parser')
const nodemailer=require('nodemailer')
const crypto=require('crypto') 
const dotenv=require('dotenv')
dotenv.config()

const app=express()
app.use(bodyParser.urlencoded({extended:true}))

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PWD
    }
})

const resetCodes=new Map();

function generateCode(){
    return Math.floor(100000+Math.random()*900000)
}

const resetProcess=async(req,res)=>{
    const userEmail=req.body 
    const code=generateCode()
    resetCodes.set(userEmail,{code,expiration:Date.now()+3600000})

    const mailOptions={
        from:process.env.EMAIL,
        to:userEmail,
        subject:'Resetting Your Password',
        text:`Here is your 6-digit password reset code: ${code}. Use it to reset your password within one hour`
    };

    try{
        await transporter.sendMail(mailOptions);
    }catch (error) {
        console.error(error);
        res.status(500).send('Error sending email.');
      }
}

app.listen(4700,()=>{
    console.log('Mail service is on')
})

module.exports={
    resetProcess
}