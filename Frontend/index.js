'use strict'
const shirts=document.getElementById('shirts')
const jewellery=document.getElementById('jewellery')
const jackets=document.getElementById('jackets')
const shoes=document.getElementById('shoes')
const watches=document.getElementById('watches')


//fetch items
let fetchProducts='Shoes'


shoes.addEventListener('click',()=>{
    fetchProducts='Shoes'
})
watches.addEventListener('click',()=>{
    fetchProducts='Watches'
})
jackets.addEventListener('click',()=>{
    fetchProducts='Jackets'
})
jewellery.addEventListener('click',()=>{
    fetchProducts='Jewellery'
})
shirts.addEventListener('click',()=>{
    fetchProducts='Shirts'
    console.log(fetchProducts)
    
})
shirts.addEventListener('click',()=>{
    fetchProducts='Shirts'
    console.log(fetchProducts)
    
})

const productContainer=document.querySelector('.bottom')
    // Fetch products from the API
    axios.get(`http://localhost:4700/product/allProducts/${fetchProducts}`)
      .then(response => {
        const products = response.data.products
        console.log(response.data.products)
        // Render products using forEach loop
        products.forEach(product => {
          const productDiv = document.createElement('div');
          
          productDiv.classList.add('product');
          productDiv.className="productDiv"

          const productImg=document.createElement('img')
          productImg.src = product.productImg;
          productImg.className="productImg"

          const productName = document.createElement('h6');
          productName.textContent = product.productName;

          const productDescription = document.createElement('p');
          productDescription.textContent = product.productDescription;

          const productCost = document.createElement('p');
          productCost.textContent = `Cost: $${product.productCost}`;

          const addToCartButton = document.createElement('button');
          addToCartButton.textContent = 'Add to Cart';
          addToCartButton.onclick = () => addToCart(product);

          productDiv.appendChild(productImg)
          productDiv.appendChild(productName);
          productDiv.appendChild(productDescription);
          productDiv.appendChild(productCost);
          productDiv.appendChild(addToCartButton);
          

          productContainer.appendChild(productDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Function to add a product to the cart
    function addToCart(product) {
      const cartItem = {
        productName: product.productName,
        productDescription: product.productDescription,
        productCost: product.productCost,
        productImg:product.productImg,
        boughtBy:`${localStorage.getItem('id')}`
      };

      // Send a POST request to add the item to cartTable
      axios.post("http://localhost:4700/cart/add", cartItem)
        .then(response => {
          console.log(`Added ${product.name} to the cart.`, response.data);
        })
        .catch(error => {
          console.error(`Error adding ${product.name} to the cart:`, error);
        });
    }
///////////

///////////
    const cart=document.querySelector('.cart')
    cart.addEventListener('click',()=>{
        window.location='./cart.html'
    })

    const logout=document.querySelector('.logout')
    logout.addEventListener('click',()=>{
        window.location.href='./login.html'
    })