//cart

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')


//open cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}

//close cart
closeCart.onclick = () => {
    cart.classList.remove('active')
}


//cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

//making function

var removeCartButtons = document.getElementsByClassName('cart-remove')
var quantityInputs = document.getElementsByClassName('cart-quantity')
var addCart = document.getElementsByClassName('add-cart')

function ready() {
    //Remove items from cart

    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //Quantity changes
    for (var i = 0; i < quantityInputs.length; i++) {
        var inputs = quantityInputs[i]
        inputs.addEventListener('change', quantityChanged)
    }
    // Add to cart

    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener ('click', addCartClicked)
    }
    //buy button work
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked)
}
//buy button
function buyButtonClicked() {
    alert('Your Order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

//remove items from cart

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
}
//Quantity changes
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
   updateTotal()
}
///Add to cart clicked
function addCartClicked(event) {
    var buttonClicked = event.target;
    var shopProducts = buttonClicked.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src

    addProductToCart(title, price, productImg)
    updateTotal()
}

function addProductToCart(title, price, productImg) {
    cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("This items has already been added to cart")
        
            return
        }
    }
    var cartBoxContent = `

                     <div class="product-box">
                       <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class='bx bxs-trash-alt cart-remove'></i>
                </div>`


    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem)
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged)

}




//update Total

function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBoxes = cartBoxes[i]
        var priceElemnt = cartBoxes.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBoxes.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElemnt.innerText.replace('$', ""))
        var quantityElement = quantityElement.value
        total = total + price * quantityElement
    }
        //if price contains some cents value
        total = Math.round(total * 100) / 100

 document.getElementsByClassName('total-price')[0].innerHTML = '$' + total
    
}