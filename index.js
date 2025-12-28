function searching() {
    var x = document.getElementsByClassName("search-container")[0]
    x.style.border = "2px solid blue"

}


function notFocsed(x) {
    var x = document.getElementsByClassName("search-container")[0]

    x.style.border = ""

}

function search() {
    var input = document.getElementById("search-input").value
    var req = new XMLHttpRequest();
    req.open("GET", 'https://dummyjson.com/products/search?q=' + input);
    req.send();
    req.onreadystatechange = function () {
        document.getElementsByClassName('products')[0].textContent = ''



        if (req.readyState == 4) {
            var res = JSON.parse(req.responseText);
            // console.log(typeof res);
            console.log(res.products);
            var arr = res.products;
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i]
                drawShopProduct(data);
            }

        }
    }

}

function getAllProducts() {
    document.getElementsByClassName('products')[0].textContent = ''

    var req = new XMLHttpRequest()
    req.open("GET", "https://dummyjson.com/products/search?q=phone")
    req.send()
    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            var res = JSON.parse(req.responseText)
            var products = res.products;
            for (var index = 0; index < products.length; index++) {
                element = products[index];

                drawShopProduct(element)
            }
        }
    }
}

getAllProducts()

// Get the container of your radio buttons
const brandList = document.getElementById('brand-checkbox-list');

brandList.addEventListener('change', function (e) {
    if (e.target.name === 'brand') {
        const category = e.target.value;

        // If "All" is selected, we use our previous global function
        if (category === "phone") {
            getAllProducts();
        } else {
            // Otherwise, use your filter function
            filterProducts(category);
        }
    }
});
function filterProducts(x) {
    var input = x;

    var req = new XMLHttpRequest();
    req.open("GET", 'https://dummyjson.com/products/category/' + input);
    req.send();
    req.onreadystatechange = function () {
        document.getElementsByClassName('products')[0].textContent = ''



        if (req.readyState == 4) {
            var res = JSON.parse(req.responseText);
            // console.log(typeof res);
            console.log(res.products);
            var arr = res.products;
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i]
                drawShopProduct(data);
            }

        }
    }


}

var productItem = document.getElementsByClassName("products")[0]
/**
 * Renders products for the main shop page
 * Includes Add to Cart functionality
 */
function drawShopProduct(data) {
    var productContainer = document.getElementsByClassName("products")[0];
    if (!productContainer) return;

    var product = document.createElement('div');
    product.classList.add("product");

    // Product Image with Heart Icon
    var productImage = document.createElement("div");
    productImage.classList.add("product-img");
    productImage.style.backgroundImage = `URL(${data.thumbnail})`;
    
    var heart = document.createElement("i");
    heart.classList.add("fa-solid", "fa-heart", "heart");
    productImage.appendChild(heart);

    // Info Section (Title and Category)
    var productTopInfo = document.createElement("div");
    productTopInfo.classList.add("product-top-info");
    
    var productTitle = document.createElement("h3");
    productTitle.classList.add("product-Title");
    productTitle.textContent = data.title;

    var productCategory = document.createElement("p");
    productCategory.classList.add("product-category");
    productCategory.textContent = data.shippingInformation;
    productTopInfo.append(productTitle, productCategory);

    // Bottom Section (Rating and Price)
    var productBottomInfo = document.createElement("div");
    productBottomInfo.classList.add("product-bottom-info");

    var productReview = document.createElement("div");
    productReview.classList.add("product-review");
    productReview.innerHTML = `<i class="fa-solid fa-star"></i> ${data.rating} (${data.reviews.length})`;

    var priceDiv = document.createElement("div");
    priceDiv.classList.add("price-div");
    priceDiv.innerHTML = `<p class="price">$${data.price}</p>`;

    productBottomInfo.append(productReview, priceDiv);

    // Add to Cart Button
    var addToCartBtn = document.createElement("button");
    addToCartBtn.id = "add-to-cart-btn"; 
    addToCartBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Add to Cart`;
 addToCartBtn.onclick = function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(p => p.id === data.id);
    
    if (index !== -1) {
        cart[index].quantity++;
    } else {
        // MUST add quantity: 1 here
        cart.push({...data, quantity: 1}); 
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added!");
};

    product.append(productImage, productTopInfo, productBottomInfo, addToCartBtn);
    productContainer.appendChild(product);
}
var filterButtons = document.getElementsByClassName("filter-btn");

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {

        for (var j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        if (this.textContent == "All") {
            getAllProducts()
        }
        else {
            filterProducts(this.textContent);

        }
    });
}



