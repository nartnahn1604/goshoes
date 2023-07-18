var cart = localStorage.getItem('cart')
var total = localStorage.getItem('total')
var cartItemList = document.getElementById('cart-list')
var itemsList = document.getElementById('items-list')
var cartTop = document.getElementById('cart-top')
var totalPrice = document.getElementById('total')


fetch("https://goshoes.onrender.com/")
.then((response) => {
    return response.json();
  })
  .then((data) => {
    let items = data;

    items.map(function(item) {
        var newItem = 
            "<div id='s" + item.ID +"' class='item-body'>" +
            "    <div class='item-thumb-container' style='background-color:" + item.Color + ";'>" +
            "        <img src='" + item.Image + "' class='item-thumb' alt='img'>" +
            "    </div>" +
            "    <div class='card-body'>" +
            "        <h5 class='card-title'>" + item.Name + "</h5>" +
            "        <p class='card-text'>" + item.Description + "</p>" +
            "        <div class='d-flex align-items-center position-relative mt-5'>" +
            "            <div class='price'>" + item.Price + "$</div>" +
            "            <button class='add-btn' id='btn" + item.ID + "' onclick='addToCart(" + item.ID + ")'>ADD TO CART</button>" +
            "            <img src='./assets/check.png' id='checked" + item.ID +"' class='checked' alt=''>" +
            "        </div>" +
            "    </div>" +
            "</div>   "
        itemsList.innerHTML += newItem
    });

    if(cart === null || cart === undefined){
        localStorage.setItem('cart', JSON.stringify([]))
        localStorage.setItem('total', 0)
        cart = []
        total = 0
        totalPrice.innerText = '0.00$'
    }
    else{
        cart = JSON.parse(cart)
        if(cart.length === 0){
            localStorage.setItem('total', 0)
            total = 0
            totalPrice.innerText = '0.00$'
        }
        else{
            totalPrice.innerText = total + "$"
            for(var i = 0; i < cart.length; i++){
                var currentBtn = document.querySelector("#btn" + cart[i]["id"])
                var checked = document.querySelector("#checked" + cart[i]["id"])
    
                currentBtn.style.display = "none"
                checked.style.display = "block"
    
                var item = generateCartItem(cart[i])
                cartItemList.innerHTML += item
            }
        }
    }
    
    
})

function addToCart(id){
    var currentItem = document.querySelector("#s" + id)
    var currentBtn = document.querySelector("#btn" + id)
    var checked = document.querySelector("#checked" + id)

    currentBtn.style.display = "none"
    checked.style.display = "block"

    var price = currentItem.childNodes[3].childNodes[5].childNodes[1].innerText
    price = price.replace("$",'')

    var addItem = {
        id: id,
        name: currentItem.childNodes[3].childNodes[1].innerText,
        image: currentItem.childNodes[1].childNodes[1].src,
        price: parseFloat(price),
        color: currentItem.childNodes[1].style.backgroundColor,
        quantity: 1
    }
    var item = generateCartItem(addItem)

    cartItemList.innerHTML += item
    try{
        cart[cart.length] = addItem
    }
    catch(e){
        cart[0] = addItem
    }
    updateLocalStorage()
}

function calTotal(cart){
    var sum = 0;
    for(var i = 0; i < cart.length; i++)
        sum += (cart[i]["price"] * cart[i]["quantity"])
    totalPrice.innerHTML = sum + "$"
    return sum
}

function generateCartItem(item){
    return "<div class='cart-item'>" + 
                "<div class='cart-item-left'>"+
                    "<div class='cart-item-image-bg' style='background-color:" + item["color"] + "'>"+
                        "<img class='cart-item-image' src='" + item["image"] + "'>"+
                    "</div>"+
                "</div>"+
                "<div class='cart-item-right'>"+
                    "<div class='cart-item-name'>" + item["name"] + item["id"] + "</div>"+
                    "<div class='cart-item-price'>" + item["price"] + "$</div>"+
                    "<div class='cart-item-action'>"+
                        "<div class='cart-item-count'>"+
                            "<div class='cart-item-count-btn' onclick='desQuan(" + item["id"] + ")'>-</div>"+
                            "<div id='number" + item["id"] + "' class='cart-item-count-number'>" + item["quantity"] + "</div>"+
                            "<div class='cart-item-count-btn' onclick='incQuan(" + item["id"] + ")'>+</div>"+
                        "</div>"+
                        "<div class='cart-item-remove' onclick='removeItem(" + item["id"] + ")'>"+
                            "<img src='./assets/trash.png'>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"
            }
            
function removeItem(id){
    for(var i = 0; i < cart.length; i++){
        if(cart[i]["id"] == id){
            var currentBtn = document.querySelector("#btn" + id)
            var checked = document.querySelector("#checked" + id)
        
            currentBtn.style.display = ""
            checked.style.display = "none"
            total = Number(total) - Number(cart[i]["price"] * cart[i]["quantity"])
            cart.splice(i, 1)
            break
        }
    }
    updateLocalStorage()
    updateCart()
}

function updateLocalStorage(){
    localStorage.setItem("cart", JSON.stringify(cart))
    localStorage.setItem("total", Math.round(calTotal(cart) * Math.pow(10, 2)) / Math.pow(10, 2))
    totalPrice.innerHTML = localStorage.getItem("total") + "$"  
}

function updateCart(){
    cartItemList.innerHTML = ""
    for(var i = 0; i < cart.length; i++){
        var item = generateCartItem(cart[i])
        cartItemList.innerHTML += item
    }
}

function incQuan(id){
    var quantity = document.querySelector("#number" + id)
    var item = cart.findIndex(i => i.id == id)
    cart[item]["quantity"] = Number(cart[item]["quantity"]) + 1
    quantity.innerHTML = cart[item]["quantity"]
    updateLocalStorage()
}

function desQuan(id){
    var quantity = document.querySelector("#number" + id)
    var item = cart.findIndex(i => i.id == id)
    cart[item]["quantity"] = Number(cart[item]["quantity"]) - 1
    if(cart[item]["quantity"] == 0)
        removeItem(id)
    else{
        quantity.innerHTML = cart[item]["quantity"]
        updateLocalStorage()
    }
}


