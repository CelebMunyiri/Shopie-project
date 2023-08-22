const Router=require('express')
const { addProduct, updateProduct, viewOneProduct, viewAllproducts, viewProductsCategory, deleteProduct } = require('../Contoller/productController')

const productRoute=Router()

productRoute.post('/add',addProduct)
productRoute.put('/update/:productId',updateProduct)
productRoute.get('/viewOneProduct/:productId',viewOneProduct)
productRoute.get('/allProducts',viewAllproducts)
productRoute.get('/allProducts/:productCategory',viewProductsCategory)
productRoute.delete('/delete/:productId',deleteProduct)

module.exports={
    productRoute
}