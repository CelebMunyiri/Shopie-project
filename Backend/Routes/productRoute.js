const Router=require('express')
const { addProduct, updateProduct, viewOneProduct, viewAllproducts } = require('../Contoller/productController')

const productRoute=Router()

productRoute.post('/add',addProduct)
productRoute.put('/update/:productId',updateProduct)
productRoute.get('/viewOneProduct/:productId',viewOneProduct)
productRoute.get('/allProducts',viewAllproducts)

module.exports={
    productRoute
}