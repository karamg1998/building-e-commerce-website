window.addEventListener('DOMContentLoaded',async (e)=>{
    var page=1;
 try{
     await axios.get(`http://localhost:3000/getAllproducts/?page=${page}`)
    .then(products=>{
     console.log(products.data);
     var p=products.data;
     let page=document.getElementsByClassName('next');
     let LastPage= parseFloat(p.lastPage);
      for(var i=page.length;i<=(LastPage-1);i++)
     {
         newButton(i+1);
     }
     
     for(var i=0;i<p.products.length;i++)
     {
         showItems(p.products[i]);
         
     }
    });
 }

 catch(err){
     console.log(err);
 }

 try{
     await axios.get(`http://localhost:3000/getCartItems/?page=${page}`)
    .then(products=>{
     console.log(products.data);
     var p=products.data;
     let page=document.getElementsByClassName('cart-next');
     let LastPage= parseFloat(p.lastPage);
    
       for(var i=page.length;i<=(LastPage-1);i++)
     {
         newCartButton(i+1);
     }
     
     for(var i=0;i<p.products.length;i++)
     {
         showCart(p.products[i]);
         
     }
    });
 }

 catch(err){
     console.log(err);
 }
});

function newButton(data)
{
 var page=document.querySelector('.pagination');
 page.innerHTML+=`<button class="next">${data}</button>`
  
 var pagination=document.getElementsByClassName('next');
 for(var i=0;i<pagination.length;i++)
 {
     var Page=pagination[i];
     Page.addEventListener('click',(e)=>{
         e.preventDefault();
       axios.get(`http://localhost:3000/getAllproducts/?page=${e.target.innerText}`)
         .then(products=>{
             var p=products.data;
             var section1=document.querySelector('.section-1');
             section1.innerHTML='';
             for(var i=0;i<p.products.length;i++)
             {
                  showItems(p.products[i]);
         
             }
         }).catch(err=>console.log(err));
     })
 }
};

function newCartButton(data)
{
 var Cpage=document.querySelector('.cart-pagination');
 Cpage.innerHTML+=`<button class="cart-next">${data}</button>`

 var cartPagination=document.getElementsByClassName('cart-next');
 for(var i=0;i<cartPagination.length;i++)
 {
     var CartPage=cartPagination[i];
     CartPage.addEventListener('click',(e)=>{
         e.preventDefault();
      
         axios.get(`http://localhost:3000/getCartItems/?page=${e.target.innerText}`)
         .then(products=>{
             var p=products.data;
             var cartSection=document.querySelector('.cart-item-container');
             cartSection.innerHTML='';
             for(var i=0;i<p.products.length;i++)
             {
                  showCart(p.products[i]);
         
             }
         }).catch(err=>console.log(err));
     })
 }
};

let Cart=document.getElementById('cart');
let cartContainer=document.querySelector('.cart-container');
let x=document.getElementById('close');

Cart.addEventListener('click',cartSideways)
function cartSideways()
{
 cartContainer.classList.toggle('active');
 axios.get('http://localhost:3000/getCartItems/?page=1')
 .then(items=>{
     CartPage=document.getElementsByClassName('cart-next');
     console.log(CartPage.length);
     ClastPage=items.data.lastPage;
     console.log(ClastPage);
     for(var i=CartPage.length;i<=(ClastPage-1);i++)
     {
         newCartButton(i+1);
     }
 })
}

x.addEventListener('click',closeCart)
function closeCart()
{
 cartContainer.classList.remove('active');
}

const remove=document.querySelector('.cart-item-container');
remove.addEventListener('click',remove_item);

async function showItems(data)
{
 var section1=document.querySelector('.section-1');
 section1.innerHTML+= `<article class="card-product-item">
                         <header class="card__header">
                             <h1 class="product__title">${data.name}</h1>
                         </header>
                         <img class="p-image" src="${data.image}" alt="nexon-ev" height="200" width="350"><br>
                         <input type="number" class="quantity" id="quantity" value="1">
                         <div class="card__content">
                             <h2 class="product__price">???${data.price}</h2>
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
        var prodPrice=parseFloat(children[4].innerText.replace('???',''));

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
 <span class="itm-price">???${(Item.price)*(Item.quantity)}</span>
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
     let prc=parseFloat(p.replace('???',''));
     total=total+prc;  
 }

 let ttl=document.querySelector('.total-price');
 ttl.innerText=`???${total}`;
};

async function remove_item(e)
{
 let totalPrice=document.querySelector('.total-price');
 let t=parseFloat(totalPrice.innerText.replace('???',''));
 let parent=e.target.parentElement;
 let child=parent.children[2].innerText;
 let pricee=parseFloat(child.replace('???',''));

 totalPrice.innerText=`???${(t-pricee)}`;

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
 ttl.innerText='???0';
 clear.innerHTML='';
});






