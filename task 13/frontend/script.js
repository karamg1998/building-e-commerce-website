window.addEventListener('DOMContentLoaded',async (event)=>{

    try{
       let res= await  axios.get('http://localhost:3000/getAllproducts').
       then(products=>{
        console.log(products.data);
        for(var i=0;i<products.data.length;i++)
        {
         showItems(products.data[i]);
        }
        })
    }
    catch(err){
       console.log(err);
        document.body.innerHTML+=`<h2>Something went wrong with dom-content loaded during retrieving
                                 products from backend</h2>`
    }


    try{
        let res= await  axios.get('http://localhost:3000/getCartItems').
        then(items=>{
         console.log(items.data);
         for(var i=0;i<items.data.length;i++)
         {
          showCart(items.data[i]);
         }
         })
     }
     catch(err){
        console.log(err);
         document.body.innerHTML+=`<h2>Something went wrong with dom-content loaded during retrieving
                                    items from Cart</h2>`
     }
});

let Cart=document.getElementById('cart');
let cartContainer=document.querySelector('.cart-container');
let x=document.getElementById('close');

Cart.addEventListener('click',cartSideways)
function cartSideways()
{
    cartContainer.classList.toggle('active');
}

x.addEventListener('click',closeCart)
function closeCart()
{
    cartContainer.classList.remove('active');
}

const remove=document.querySelector('.cart-item-container');
remove.addEventListener('click',remove_item);

function showItems(data)
{
    var section1=document.querySelector('.section-1');
    section1.innerHTML+= `<article class="card-product-item">
                            <header class="card__header">
                                <h1 class="product__title">${data.name}</h1>
                            </header>
                            <img class="p-image" src="${data.image}" alt="nexon-ev" height="200" width="350"><br>
                            <input type="number" class="quantity" id="quantity" value="1">
                            <div class="card__content">
                                <h2 class="product__price">₹${data.price}</h2>
                            </div>
                            <div class="card__actions">
                                <button class="btn">Add To Cart</button>
                            </div>
                        </article>`;

    var addToCart=document.getElementsByClassName('btn');
    for(var i=0;i<addToCart.length;i++)
    {
        addToCart[i].addEventListener('click',async (e)=>{
     
           var Prod=e.target.parentElement.parentElement;
           var children=Prod.children;
           var prodName=children[0].innerText;
           var prodImage=children[1].src;
           var prodQty=children[3].value;
           var prodPrice=parseFloat(children[4].innerText.replace('₹',''));

           let item=document.getElementsByClassName('itm-name');
           for(var i=0;i<item.length;i++)
           {
              let I=item[i];
              if(I.innerText===prodName)
              {
               alert('product already present in the cart');
               return;
              }
           }
           
           var obj={
            prodQty,
            prodName,
            prodImage,
            prodPrice
           }
           
          try{
              var Atc=await axios.post('http://localhost:3000/addProductToCart',obj);
              showCart(Atc.data);
          }
          catch(err){
            console.log(err);
            document.body.innerHTML+=`<h2>Something went wrong while adding item to cart</h2>`
          } 
        }); 
    }
};

function showCart(Item){

    var Cart=document.querySelector('.cart-item-container');
    Cart.innerHTML+=`<div class="cart-item1" id="${Item.id}">
    <div class="itm-image">
        <img class="item-cart-image" src="${Item.image}" alt="item-image" width="200" height="100">
    </div>
    <div class="itm-name">
        ${Item.name}
    </div>
    <span class="itm-price">₹${(Item.price)*(Item.quantity)}</span>
    <div class="input">
        <input type="number" id="qty" class="qty" value=${Item.quantity}>
    </div>
    <button id="remove" class="remove" type="submit">Remove</button>
</div>`;

popup(Item.name);
total();
};

function popup(name){
    var popup_n=document.querySelector('.popup');
    var new_element=document.createElement('div');
    new_element.className='toast';
    new_element.innerText=`${name} added to cart`;
    popup_n.appendChild(new_element);

    setTimeout(()=> {
    new_element.remove();
    },2000);  
};

function total(){
    let total=0;
    let price=document.getElementsByClassName('itm-price')


    for(var i=0;i<price.length;i++)
    {
        let p=price[i].innerText;
        let prc=parseFloat(p.replace('₹',''));
        total=total+prc;  
    }

    let ttl=document.querySelector('.total-price');
    ttl.innerText=`₹${total}`;
};

async function remove_item(e)
{
    let totalPrice=document.querySelector('.total-price');
    let t=parseFloat(totalPrice.innerText.replace('₹',''));
    let parent=e.target.parentElement;
    let child=parent.children[2].innerText;
    let pricee=parseFloat(child.replace('₹',''));

    totalPrice.innerText=`₹${(t-pricee)}`;

    if(e.target.classList.contains('remove'))
    {
        let p=e.target.parentElement;
        let id=p.id;
        remove.removeChild(p);

        try{

          let DelItems=await axios.delete(`http://localhost:3000/getCartItems/${id}`);
          console.log(DelItems.data);
          console.log('deleted from cart');
        }

        catch(err){
            console.log(err);
            document.body.innerHTML+=`<h2>Something went wrong while deleting item from cart</h2>`
        }
    }
};

let purchase=document.querySelector('.purchase');
purchase.addEventListener('click',(e)=>{
    alert('thankyou for the purchase');

    let clear=document.querySelector('.cart-item-container');
    let ttl=document.querySelector('.total-price');
    ttl.innerText='₹0';
    clear.innerHTML='';
});






