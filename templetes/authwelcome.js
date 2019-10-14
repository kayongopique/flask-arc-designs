const cartBtn = document.querySelector('.bag-btn');
// const bagBtn = document.querySelector('.bag-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItem = document.querySelector('.cart-item');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const cartItems = document.querySelector('.cart-items');





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
              return response.json();
             }
             
          })
          .then((response) => {
           
            let products = response.items;

            products = products.map(item => {
                const {id, title, price } = item;
                const image = item.images[0];
                return {title, price, id, image};
            });

            return products;
            }
            
          );
          return result; 
        } catch (error) {
            throw new Error(error + 'Oops something went wrong try again' )
        
        }
        
    }

}

class UI {

    displayProucts(products) {
        let result = '';

        products.forEach(product => {

            result += `
            <!--------------- single design-------------------->

            <article class="product">
                <div class="img-container">
                    <img src=${product.image} alt=${product.title} class="product-img">
                    <button class="cart-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
                <h3 class="product-title">
                    ${product.title}
                </h3>
                <h4 class="price">${product.price}</h4>
            </article>
            `
            
        });

        productsDOM.innerHTML = result;

    }
  

    getButtons() {
        const btns = [...document.querySelectorAll('.cart-btn')];
        buttonsDOM = btns;
        
        btns.forEach(btn => {
            const id = JSON.parse(btn.dataset.id);
            let inCart = cart.find(item => item.id === id);

            if(inCart) {
                btn.innerText = 'in cart';
                btn.disable = true;
            }
            btn.addEventListener('click', (event) => {
              event.target.innerText = 'in cart';
              event.target.disable = true;
              // get product from product
              let cartItem = {...Storage.getProduct(id), amount:1};
              //add the product to cart
              cart = [...cart, cartItem]
              //save cart to local storage
              Storage.saveCart(cart);
              //set cart values
              this.setCartValues(cart);
              // display cart items
              this.addCartItem(cartItem);
              // display cart
              this.showCart();
              
            });
          });
        }
        setCartValues(cart) {
                  let tempTotal = 0;
                  let itemsTotal = 0;
          
                  cart.map(item => {
                      tempTotal += item.price ;
                      itemsTotal += item.amount;
                  });
                  cartTotal.innerText = tempTotal;
                  cartItems.innerText = itemsTotal;
          
              }

        addCartItem(item){
          const div = document.createElement('div');
          div.classList.add('cart-item');
          div.innerHTML = `
          <img src=${item.image} alt=${item.title}>
          <div>
              <h4>${item.title}</h4>
              <h5>${item.price}</h5>
              <span class="remove-item" data-id=${item.id} >remove</span>
          </div>
          `
          cartContent.appendChild(div);
        }

        showCart() {
          cartOverlay.classList.add('transparent-background');
          cartDOM.classList.add('show-cart');
      }
      
    setupApp() {
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        cartBtn.addEventListener('click', this.showCart());
        closeCartBtn.addEventListener('click', this.hideCart());
    }


    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));

    }

    hideCart() {
        cartOverlay.classList.remove('transparent-background');
        cartDOM.classList.remove('show-cart');

    }


    cartLogic() {
        clearCartBtn.addEventListener('click', () => this.clearCart());

        // cart functionality

        cartContent.addEventListener('click', event => {
            if(event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id)
            }
        });
    }

    clearCart() {
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
    }

    removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        this.setCartValues(cart);
        Storage.saveCart(cart);

        let btn =this.getSingleBtn(id);
        btn.disable = false;
        btn.innerHTML = `<i class='fas fa-shopping-cart'></i>add to cart`
    }

    getSingleBtn(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
   

}
 

class Storage {
    // save products to local storage

    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }

    // get a single product from storage
    static getProduct(id) {
      let products = JSON.parse(localStorage.getItem('products'));
      return products.find(item => item.id === id);
        
    }
  

    // save to cart

    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));

    }
  
    static getCart() {
        cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        return cart;
    }

}

// add listner at content load

window.addEventListener("load", 
    () => {
    const products = new Products();
    const ui = new UI();

    // setup app
    ui.setupApp();
    
    //call func to return products

    products.getProducts().then(products => {
        ui.displayProucts(products);
        Storage.saveProducts(products);

    }).then(() => {
        ui.getButtons();
        // ui.cartLogic();
    });

    

});

