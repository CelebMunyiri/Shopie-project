const Router=require('express')
const {  addToCart, viewCart, removeAllFromCart, removeOneFromCart } = require('../Contoller/cartController')

const cartRoute=Router()

cartRoute.post('/add',addToCart)
cartRoute.get('/viewCart/:userId',viewCart)
cartRoute.delete('/deleteAll/:userId',removeAllFromCart)
cartRoute.delete('/removeOne/:productId',removeOneFromCart)

module.exports={
    cartRoute
}