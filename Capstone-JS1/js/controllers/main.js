function getEle(id){
    return document.getElementById(id);
 }
var productList = [];
var productCart = [];

window.onload = () => {
  getProduct();
}

function getProduct () {
   axios ({
    url: "https://63452150dcae733e8fea3450.mockapi.io/phone",
    method: 'get',
   
   }).then((res) => {
    productList = res.data;
    renderHTML(res.data);
    renderAll (res.data)
   }).catch((err) => {
    console.log(err);
   })
  
} 

// set data localstorage
function setData (data) {
  localStorage.setItem('phoneList', JSON.stringify(data));
}

// get data from localstorage
function getData(comd) {
  JSON.parse(localStorage.getItem(comd));
}

function renderAll (phone){
  if(!phone) phone = productList;
  let html = '';
  productList.map((item) => {
     html += renderHTML(item.tenSP, item.img, item.price, item.id)
  })

  getEle('23conmuc').innerHTML = html;

}


// render type
function renderType(type, tagId) {
  console.log(productList)
  let html = '';
  let phoneType = productList.filter(item => item.type === type)
  phoneType.map((item) => {
    html += renderHTML(item.tenSP, item.img, item.price, item.id);
})
  
  if (!tagId) tagId = '23conmuc';
  getEle(tagId).innerHTML = html;
}


function renderHTML(name, image, price, id) {
  let HTML = '';
    return HTML = `<div class="item col-lg-3 mb-3">
      <div class="item__detail">
         <div class="item__top">
         <div class="item__img">
             <img src="${image}" alt="phone"
                 class="img-fluid">
             <img src="./img/06-210x210.jpg" alt="phone"
                 class="img-fluid">
         </div>
         <div class="item__saleOff">
             <span>sale</span>
         </div>
         <div class="item__shop">
             <button onclick="addToCart('${id}')"><i class="fa fa-shopping-cart"></i></button>
             <button><i class="fa fa-heart"></i></button>
             <button><i class="fa fa-exchange"></i></button>
         </div>
     </div>
     <div class="item__bottom">
         <p>${name}</p>
         <div class="item__rank">
             <span><i class="fa fa-star"></i></span>
             <span><i class="fa fa-star"></i></span>
             <span><i class="fa fa-star"></i></span>
             <span><i class="fa fa-star"></i></span>
             <span><i class="fa fa-star"></i></span>
         </div>
         <div class="item__price">
             <span><b>${price}</b><b>$</b></span>
             <span><b>1200</b><b>$</b></span>
         </div>
     </div>
 </div>
</div>`

}


// add to cart

function addToCart (id) {
  console.log(productList)
 let cloneCart = [...productCart];
 let findItem = cloneCart.find(item => id === item.product.id);
 let findItemInProductList = productList.find(item => id === item.id)
 let cartItem = {product: findItemInProductList, quantity: 1}
console.log(cloneCart);
 if (findItem) {
  findItem.quantity ++;
 }else {
  cloneCart.push(cartItem);
 }

 productCart = cloneCart;

 countItem ()

 sumTotal ('totalPrice')
 
 sumQuantiy ('totalQuantity')

}

function countItem () {
  let count = productCart.reduce ((total, item) => {
    return total + item.quantity
  }, 0)
  getEle('numCart').innerHTML = count
}

// render cart

function renderCart() {
  let html = '';
  productCart.map((item) => {
    html += `


                              <tr>
                              <td data-th="Product">
                                  <div class="row">
                                      <div class="col-md-3 text-left">
                                          <img src="${item.product.img}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                                      </div>
                                      <div class="col-md-9 text-left mt-sm-2">
                                          <h4>${item.product.tenSP}</h4>
                                          <p class="font-weight-light">${item.product.type}</p>
                                      </div>
                                  </div>
                              </td>
                              <td data-th="Price" style="width="150px">$${(item.product.price * item.quantity).toLocaleString()}</td>
                              <td data-th="Quantity">
                                  <input type="number" onchange="setQuanti('${item.product.id}')" class="form-control form-control-lg text-center" value="${item.quantity}">
                              </td>
                              <td class="actions" data-th="">
                                  <div class="text-right" onclick="deletedCart('${item.product.id}')" >
                                      <button class="btn btn-white border-secondary bg-white btn-md mb-2" id="resetQuanti">
                                          <i class="fas fa-sync"></i>
                                      </button>
                                      <button onclick="deletedCart('${item.product.id}')" class="btn btn-white border-secondary bg-white btn-md mb-2">
                                          <i class="fas fa-trash"></i>
                                      </button>
                                  </div>
                              </td>
                           </tr> 
    `
  })
  
  console.log(productCart)
  getEle('cartHTML').innerHTML = html;
  getEle('cart').style.display = 'block'
  
}


function sumQuantiy (id) {
  let sum = productCart.reduce((total, item) => {
    return total += item.quantity;
  }, 0);

  getEle(id).innerHTML = sum.toLocaleString();

}

function sumTotal (id) {
  let sum = productCart.reduce((total, item) => {
    return total += item.product.price * item.quantity;
  }, 0);

  getEle(id).innerHTML = '$' + sum.toLocaleString();

}

// close cart 
function closeCart () {
  getEle('23conmuc').style.display = none;
}

function deletedCart(id) {

    for (let i = 0; i < productCart.length; i++) {
      if (productCart[i].product.id === id) {
        productCart.splice(i, 1);
      }
  }
  renderCart()
  sumTotal ('totalPrice')
 sumQuantiy ('totalQuantity')
 countItem ()
}


