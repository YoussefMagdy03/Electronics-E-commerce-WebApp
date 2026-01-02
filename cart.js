

var productsAddedToCart = JSON.parse(localStorage.getItem("cart")) || [];

var cartDiv = document.getElementsByClassName('products')[0];


function initCart() {
    if (!cartDiv) return;

    cartDiv.innerHTML = '';

    if (productsAddedToCart.length === 0) {
        cartDiv.innerHTML = `
            <div style="text-align:center; padding: 50px; grid-column: 1/-1;">
                <i class="fa-solid fa-cart-shopping" style="font-size: 3rem; color: #cbd5e1;"></i>
                <p style="margin-top: 15px; color: #64748b;">Your cart is empty.</p>
                <a href="products.html" style="color: var(--primary); font-weight: bold; text-decoration: underline;">Start Shopping</a>
            </div>`;
    } else {
        for (var i = 0; i < productsAddedToCart.length; i++) {
            drawCartItem(productsAddedToCart[i]);
        }
    }
    totalPrice();
}


function drawCartItem(data) {
    var product = document.createElement('div');
    product.classList.add("product");

    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    var img = document.createElement('img');
    img.src = data.thumbnail;
    imageDiv.appendChild(img);


    var priceDiv = document.createElement('div');
    priceDiv.classList.add('namePrice');
    var h3 = document.createElement('h3');
    h3.innerText = data.brand || "Electronics";
    var priceSpan = document.createElement('span');
    priceSpan.innerText = `${data.price} EGP`;
    priceDiv.append(priceSpan, h3);

    var titleP = document.createElement('p');
    titleP.innerText = data.title;

    var qtyP = document.createElement('p');
    qtyP.innerHTML = `Qty: <strong>${data.quantity}</strong>`;

    var bayDiv = document.createElement('div');
    bayDiv.classList.add('bay');
    var removeBtn = document.createElement('button');
    removeBtn.innerText = "-";
    removeBtn.onclick = function () {
        RemoveFromCart(data);
    };
    var addBtn = document.createElement('button');
    addBtn.innerText = "+";
    addBtn.onclick = function () {
        AddQuantity(data)

    };
    bayDiv.append(removeBtn, qtyP, addBtn);
    product.append(imageDiv, priceDiv, titleP, bayDiv);
    cartDiv.appendChild(product);
}

function RemoveFromCart(product) {
    const productIndex = productsAddedToCart.findIndex(p => p.id === product.id);

    if (productIndex !== -1) {
        productsAddedToCart[productIndex].quantity--;

        if (productsAddedToCart[productIndex].quantity <= 0) {
            productsAddedToCart.splice(productIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(productsAddedToCart));

    initCart();
}
function AddQuantity(product) {
    const productIndex = productsAddedToCart.findIndex(p => p.id === product.id);

    if (productIndex !== -1) {
        productsAddedToCart[productIndex].quantity++;

        
    }

    localStorage.setItem('cart', JSON.stringify(productsAddedToCart));

    initCart();
}

function totalPrice() {
    var total = 0;

    for (let i = 0; i < productsAddedToCart.length; i++) {
        total += (productsAddedToCart[i].quantity * productsAddedToCart[i].price);
    }

    var checkoutText = document.getElementById("checkout");
    if (checkoutText) {
        checkoutText.innerText = `${Math.floor(total)} EGP`;
    }

    var finalTotal = document.getElementById("total-summary");
    if (finalTotal) {
        finalTotal.innerText = `${Math.floor(total)} EGP`;
    }

}

initCart();