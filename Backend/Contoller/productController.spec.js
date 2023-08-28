import mssql from 'mssql'
import { addProduct } from './productController'

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}
describe("Tests for products controllers",()=>{
    describe("creating a product",()=>{
        it("Should Create a product",async()=>{
            const req={
                body:{
                    productName:"Black mamba",
                    productImg:"https://this.shoe.jpg",
                    productDescription:"better shoe for any weather",
                    productCost:"5600",
                    earlyCost:"6700", 
                    productCategory:"Shoes", 
                    productClassification:"men"
                }
            }

            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:[1],
                }),
            })
            await addProduct(req,res)

            expect(res.json).toHaveBeenCalledWith({
                message: "Product added Succesfully"})
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it("Should not Create a product in database",async()=>{
            const req={
                body:{}
            }

            jest.spyOn(mssql,"connect").mockResolvedValueOnce({
                request:jest.fn().mockReturnThis(),
                input:jest.fn().mockReturnThis(),
                execute:jest.fn().mockResolvedValueOnce({
                    rowsAffected:[0],
                }),
            })
            await addProduct(req,res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                message: "Product adding failed"
            })
        })   
    })
    ///Test for Updating a product details
    describe("Updating a products details",()=>{
        it("Should update a products details",async()=>{
            
        })
    })
})