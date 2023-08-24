let productsadm = []

// let products = [];

const productContaineradm = document.querySelector("#productContaineradm");
const searchInputadm = document.getElementById("search");
const searchButtonadm = document.getElementById("search-button");
const info = document.querySelector('.info')


 
function generateProductCards(productsToDisplay) {
    productContaineradm.innerHTML = "";
    console.log(productsToDisplay);
    // if 
    productsToDisplay.forEach(product => {
        

        const card = document.createElement("div");
        card.classList.add("product-cardadm");

        const productImage = document.createElement("img");
        productImage.src = product.productImage;

        const productName = document.createElement("h3");
        productName.textContent = product.productName;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: ${product.price}`;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.productDescription;

        const updateDelete = document.createElement('div');
        updateDelete.className = 'updatedeleteadm';


        const update = document.createElement('div')
        update.className = 'edit'
        const deleteitem = document.createElement('div')
        deleteitem.className = 'delete'
        
        update.innerHTML = 'update'
        deleteitem.innerHTML = 'delete'


        // const quantityInput = document.createElement('input');
        // quantityInput.type = 'number';
        // quantityInput.min = '1';
        // quantityInput.value = '1';

        // const addButton = document.createElement('button');
        // addButton.className = "add-button"
        // addButton.textContent = 'Add to Cart';

        // addButton.style.backgroundColor = "#007BFF"
        // addButton.style.padding = "12px"
        // addButton.style.borderRadius = "8px"
        // addButton.style.color = "white"
        updateDelete.appendChild(update);
        updateDelete.appendChild(deleteitem);
        // addToCartSection.appendChild(addButton);

        // addButton.addEventListener('click', () => {
        //     const quantity = parseInt(quantityInput.value);
        //     cartItemCount += quantity; // Increment cart item count
        //     cartCountSpan.textContent = cartItemCount; // Update cart count display
        // });
        const productStock = document.createElement("p");
        productStock.style.marginTop = "15px"
        productStock.style.fontStyle = "italic";


        productStock.textContent = `Items left in stock: ${product.stock}`;

        card.appendChild(productImage);
        card.appendChild(productName);
        card.appendChild(productPrice);
        card.appendChild(productDescription);
        card.appendChild(productStock);
        card.appendChild(updateDelete);


        updateDelete.style.width = "100%"
        // productContaineradm.appendChild(info)
        productContaineradm.appendChild(card);

        const deletebtn = deleteitem
        deletebtn.addEventListener('click', async (e)=>{
        e.preventDefault()
        // console.log(product);
        const id = product.productId
        await console.log(product.productId);
        const res= await deleteproduct(id)
        if(res=="product deleted successfully"){
            productContaineradm.removeChild(card)

            info.innerHTML=res
            setTimeout(info.innerHTML='',7000)
            
            // alert(res)
            
        }
        else{
            
            info.innerHTML=res
            info.style.color = 'red'
            setTimeout(info.innerHTML='',7000)
            info.style.color = 'green'
        }
        })
    });

    
}
// const addButton = document.querySelector('.add-button');
// const cartCountSpan = document.querySelector('.cart-count');


async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:4503/product/all");
        const data = await response.json();
        if(data.message){
            return 'no product'
        }
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function updateProductCards() {
    products = await fetchProducts(); // Update the global 'products' array with fetched data
    
    generateProductCards(products);
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => product.productName.toLowerCase().includes(searchTerm));

    generateProductCards(filteredProducts);

    if (filteredProducts.length < 1) {
        errorElement.innerHTML = "No product(s) found";
    } else {
        errorElement.innerHTML = "";
    }
});

async function deleteproduct(productId){
    try {
       const response = await fetch(`http://localhost:4503/product/${productId}`, {
        method: "DELETE",
        headers: {
            "Content-type": 'application/json'
        }}) 

        if(response.ok){
            return "product deleted successfully"
        }
        else{
            return "product not deleted"
        }
        
    } catch (error) {
        return error
    }
}



  
updateProductCards();