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
    Cpage.innerHTML+=`<button class="cart-next">${data}</button>`;

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
        ClastPage=items.data.lastPage;
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
              popup(Atc.data.name);
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
    <button id="remove" class="remove">Remove</button>
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
purchase.addEventListener('click',async (e)=>{
    
    
    let clear=document.querySelector('.cart-item-container');
    let ttl=document.querySelector('.total-price');
    if(clear.children.length===0)
    {
        alert('your cart is empty');
        return;
    }
    alert('thankyou for the purchase');
    ttl.innerText='₹0';
    clear.innerHTML='';

    try{
      await  axios.get('http://localhost:3000/getCartOrder')
        .then(items=>{
        for(var i=0;i<items.data.length;i++)
        {
            sendOrder(items.data[i]);
        }
    });
   }
   catch(err){
    console.log(err);
    document.body.innerHTML+=`<h2>Something went wrong while purchasing item</h2>`
   }

});

async function sendOrder(item)
{
    let name=item.name;
    let quantity=item.quantity;
    let image=item.image;
    let price=item.price;
    let userId=item.userId;

    let order={
        name,quantity,image,price,userId
    };
  
    try{
     await   axios.post('http://localhost:3000/PostOrder',order)
        .then(res=>{
        console.log(res,'posted');
        });

    await axios.delete(`http://localhost:3000/getCartItems/${item.id}`)
    .then(res=>{
        console.log(res,'deleted')
    })
    }
    catch(err)
    {
        console.log(err);
        document.body.innerHTML+=`<h2>Something went wrong while adding item to order page</h2>`
    }
};
let orders=document.getElementById('orders');
orders.addEventListener('click',async (e)=>{
    let productContainer=document.querySelector('.product-container');
    productContainer.innerHTML='';

    let orderContainer=document.querySelector('.order-container');
    orderContainer.innerHTML=` <div class="order-containr">
                                <h3 class="order-heading">Order's</h3>
                                <div class="order-parameters">
                                    <span class="item-name">ITEM</span>
                                    <span class="item-price">PRICE</span>
                                    <span class="item-quantity">QUANTITY</span>
                                    <span class="item-price">ORDER-ID</span>
                                </div>
                                <hr>
                                <div class="order-item-container">
                                </div>
                                <div class="order-pagination">
                                </div>
                                </div>`;
    
     
    try{
    await axios.get(`http://localhost:3000/getOrders?page=1`)
    .then(orders=>{
      for(var i=0;i<=(orders.data.lastPage-1);i++)
      {
        orderPagination(i+1);
      }
      for(var i=0;i<orders.data.products.length;i++)
      {
        showOrders(orders.data.products[i]);
      }
      })
    }
    catch(err){
        console.log(err);
    }
         
    
    function orderPagination(data)
    {
       let oPage=document.querySelector('.order-pagination');
        oPage.innerHTML+=`<button class="order-next">${data}</button>`;

        let page=document.getElementsByClassName('order-next');
        for(var i=0;i<page.length;i++)
        {
            page[i].addEventListener('click',async (e)=>{
                let o=document.querySelector('.order-item-container');
                o.innerHTML='';
                try{
                   await axios.get(`http://localhost:3000/getOrders?page=${e.target.innerText}`)
                .then(order=>{
                    for(var i=0;i<order.data.products.length;i++)
                    {
                        showOrders(order.data.products[i]);
                    }
                })
                }
                catch(err)
                {
                    console.log(err);
                }
            })
        }
    }

    function showOrders(order)
    {
        let orderItemContainer=document.querySelector('.order-item-container');
        orderItemContainer.innerHTML+=`<div class="order-item1" id="${order.orderId}">
        <div class="order-image">
            <img class="order-cart-image" src="${order.image}" alt="item-image" width="200" height="100">
        </div>
        <div class="order-name">
            ${order.name}
        </div>
        <span class="order-price">₹${(order.price)*(order.quantity)}</span>
        <span class="order-quantity">${order.quantity}</span>
        <span class="orderId">orderId:${order.orderId}</span>
    </div>`;
    }
});




