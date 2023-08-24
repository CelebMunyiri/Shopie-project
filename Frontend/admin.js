'use strict'

const addProduct=document.querySelector('.addProduct')
const productName=document.querySelector('.productName')
const productCategory=document.querySelector('.select')
const productImg=document.querySelector('.productImg')
const productCost=document.querySelector('.productCost')
const earlyCost=document.querySelector('.earlyCost')
const productClassification=document.querySelector('.productClassification')
const productDescription=document.querySelector('.productDescription')


  let productImageUrl = ''
    const regError = document.querySelector('.regError')

    productImg.addEventListener('change', (event)=>{
        
        const target = event.target
        const files = target.files
        if(files){
            const formData = new FormData()
            formData.append("file", files[0])
            formData.append("upload_preset", "Notebook")
            formData.append("cloud_name", "dkgtf3hhj")

            fetch('https://api.cloudinary.com/v1_1/dkgtf3hhj/image/upload', {
                method: "POST",
                body: formData
            }).then((res) => res.json()).then(res => productImageUrl = res.url)
        }
    })

    //Here i added event listener to the add products form 
    const resMessage=document.querySelector('.resMessage')
addProduct.addEventListener('submit',(e)=>{
e.preventDefault()

axios
.post(
  "http://localhost:4700/product/add",

  {
    productName: productName.value,
    productCost: productCost.value,
    earlyCost: earlyCost.value,
    productClassification: productClassification.value,
    productCategory:productCategory.value,
    productDescription:productDescription.value,
    productImg:productImageUrl
  },

  {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  }
)
.then((response) => {
  console.log(response.data);
  setTimeout(()=>{
    resMessage.textContent=response.data.message
    resMessage.style.opacity='1'
  },0)
  setTimeout(()=>{
    resMessage.style.opacity='0'
  },2000)

  location.reload()
  
})
.catch((e) => {
  console.log(e);
});

})


///Fetching products

axios
.get(
  "http://localhost:4700/product/allProducts",

)
.then((response) => {
    const view=document.querySelector('.view')
  console.log(response.data);
  const products=response.data
  //console.log(products)
  const singleProject= document.createElement('div')
  let html = '' 
 
products.forEach((product) => {
     
      html+=`
      <div class="pDiv">
<img class='adminP' src=${product.productImg} alt=${product.productName}/>
     <p>${product.productName} </p> 
<p>${product.productDescription}</p>
 <p>Now Ksh ${product.productCost}</p>
 <p>Was Ksh ${product.earlyCost}</p>
<div>
    <button class="edit">Edit</button>
    <button class="deleteP">delete</button>
    </div>
    </div>              
   `

   singleProject.innerHTML=html
   view.appendChild(singleProject)
  
  const deleteP=document.querySelector('.deleteP')
  deleteP.addEventListener('click',async(e)=>{
    e.preventDefault()
    const id=product.productId
   const res= await deleteProduct(id)
   

  })

  
 })
  })
 

 

.catch((e) => {
  console.log(e);
});

const edit=document.querySelector('.edit') 

 edit.addEventListener('click',(productId)=>{

 })

 ///func
 
async function deleteProduct(id){
    try {
        await axios
        .delete(
          `http://localhost:4700/product/delete/${id}`,
        
        )
        .then((response)=>{
        console.log(response.data.message)
        setTimeout(()=>{
            resMessage.textContent=response.data.message
            resMessage.style.opacity='1'
          },1000)
          setTimeout(()=>{
            resMessage.style.opacity='0'
          },4000)
          location.reload()
        })
    } catch (error) {
       console.error('Error deleting product') 
    }
  
  }

