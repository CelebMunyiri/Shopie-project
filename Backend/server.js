const express=require('express')
const { userRoute } = require('./Routes/userRoute')
const { productRoute } = require('./Routes/productRoute')
const { cartRoute } = require('./Routes/cartRoute')

const app=express()
app.use(express.json())

app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)

app.listen(4700,()=>{
    console.log('Server active on port 4700')
})