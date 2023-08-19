const express=require('express')
const { userRoute } = require('./Routes/userRoute')

const app=express()
app.use(express.json())

app.use('/user',userRoute)

app.listen(4700,()=>{
    console.log('Server active on port 4700')
})