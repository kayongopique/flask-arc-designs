const cartBtn = document.querySelector('.bag-btn');
const bagBtn = document.querySelector('.bag-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cartDOM');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItem = document.querySelector('.cart-item');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');





// cart array

let cart = [];

// get all buttons

let buttonsDOM = [];

// class for getting all products

class Products {

    getProducts(){
        try {
         let result = fetch(`http://127.0.0.1:8080/products.json`, 
          {mode: 'no-cors', headers:{'content-type': 'application/json'}}
          ).then((response) => {
             if(!response.ok){
               throw new Error('http error' +" " + response.status)
             }
             else {
              return response;
             }
             
          }); 
        } catch (error) {
            throw new Error(error + 'Oops something went wrong try again' )
          

        }
        return result;
    }

}

// class UI {

//     displayProucts(products) {
//         let result = '';

//         products.forEach(product => {

//             result += ` <!-- single product -->`
            
//         });

//         productsDOM.innerHTML = result;

//     }

//     getButtons() {
//         const btns = [...document.querySelector('.cart-btns')];
//         buttonsDOM = btns;

//         btns.forEach(btn => {
//             let id = btn.dataset.id;
//             let inCart = cart.find(item => item.id === id);

//             if(inCart) {
//                 btn.innerText = 'in cart';
//                 btn.disable = true;
//             }
//             btn.addEventListener('click', (event) => {
//                 event.tagert.innerText = 'in cart';
//                 event.target.disable = true;

//                 // get product from product
//                 let cartItem = {...Storage.getProduct(id), amount: 1};
//                 //add the product to cart
//                 cart = [...cart, cartItem]
//                 //save cart to local storage
//                 Storage.saveCart(cart);
//                 //set cart values
//                 this.setCartValues(cart);
//                 // display cart items
//                 this.addCartItem(cartItem);
//                 // display cart
//                 this.showCart();


//             });
            
//         });
//     }

//     setCartValues(cart) {
//         let temptotal = 0;
//         let itemstotal = 0;

//         cart.map(item => {
//             temptotal += item.price * amount;
//             itemstotal += item.amount;
//         });
//         cartTotal.innerText = parseFloat(temptotal.toFixed(2));
//         cartItems.innerText = itemstotal;

//     }

//     addCartItem(item) {
//         const div = document.createElement('div');
//         div.classList.add('cart-item');
//         div.innerHTML = `<!--- single item --> `

//         cartContent.appendChild(div);
//     }

//     showCart() {
//         cartOverlay.classList.add('transpent-overlay');
//         cartDOM.classList.add('show-cart');
//     }

//     setupApp() {
//         cart = Storage.getCart();
//         this.setCartValues(cart);
//         this.populateCart(cart);
//         cartBtn.addEventListener('click', this.showCart());
//         closeCartBtn.addEventListener('click', this.hideCart());
//     }

//     populateCart(cart) {
//         cart.forEach(item => this.addCartItem(item));

//     }

//     hideCart() {
//         cartOverlay.classList.remove('transpent-overlay');
//         cartDOM.classList.remove('show-cart');

//     }

//     cartLogic() {
//         clearCartBtn.addEventListener('click', () => this.clearCart());

//         // cart functionality

//         cartContent.addEventListener('click', event => {
//             if(event.target.classList.contains('remove-item')) {
//                 let removeItem = event.target;
//                 let id = removeItem.dataset.id;
//                 cartContent.removeChild(removeItem.parentElement.parentElement);
//                 this.removeItem(id)
//             }else if(event.target.classList.contains('fa-chevron-up')){
//                 let addamount = event.target;
//                 let id = addamount.dataset.id;
//                 let tempitem = cart.find(item => item.id === id);
//                 tempitem.amount = tempitem.amount +1;
//                 Storage.saveCart(cart);
//                 this.setCartValues(cart);
//                 addamount.nextElementSiblings.innerText = tempitem.amount;
//             }else if(event.target.classList.contains('fa-chevron-down')){
//             let loweramount = event.target;
//             let id = loweramount.dataset.id;
//             let tempitem = cart.find(item => item.id === id);
//             tempitem.amount = tempitem.amount - 1;

//             if(tempitem.amount > 0){
//                 Storage.saveCart(cart);
//                 this.setCartValues(cart);
//                 addamount.previous.ElementSiblings.innerText = tempitem.amount;

//             }else{
//                 cartContent.removeChild(loweramount.parentElement.parentElement);
//                 this.removeItem(id);
//             }
//             }
//         });
//     }

//     clearCart() {
//         let cartItems = cart.map(item => item.id);
//         cartItems.forEach(id => this.removeItem(id));
//     }

//     removeItem(id) {
//         cart = cart.filter(item => item.id !== id);
//         this.setCartValues(cart);
//         Storage.saveCart(cart);

//         let btn =this.getSingleBtn(id);
//     }

//     getSingleBtn(id) {
//         return buttonsDOM.find(button => button.dataset.id === id);
//     }
   

// }
 

// class Storage {
//     // save products to local storage

//     static saveProducts(products){
//         localStorage.setItem('products', JSON.stringify(products));
//     }

//     // get a single product from storage
//     static getProduct(id) {
//         let products = JSON.parse('products', JSON.stringify(localStorage.getItem(products)));
//         let product = products.find(item => item.id === id);
//         return product;
//     }

//     // save to cart

//     static saveCart(cart) {
//         localStorage.setItem('cart', JSON.stringify(cart));

//     }

//     static getItem() {
//         cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
//         return cart;
//     }

// }

// add listner at content load

window.addEventListener("load", 
    () => {
    const products = new Products();
    // const ui = new UI();
    products.getProducts().then(result => console.log(result));
    // call func to return products

    // products.getProducts().then(products => {
    //     ui.displayProucts(products);
    //     Storage.saveProducts(products);

    // }).then(() => {
    //     ui.getButtons();
    //     ui.cartLogic();
    // });

    // // setup app

    // ui.setupApp();

});

