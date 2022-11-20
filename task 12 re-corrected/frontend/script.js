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
        document.body.innerHTML+=`<div>Something went wrong with dom-content loaded</div>`
    }
});

function showItems(data)
{
    let section1=document.querySelector('.section-1');
    section1.innerHTML+= `<article class="card product-item">
                            <header class="card__header">
                                <h1 class="product__title">${data.name}</h1>
                            </header>
                            <img class="p-image" src="${data.image}" alt="nexon-ev" height="200" width="350">
                            <div class="card__content">
                                <h2 class="product__price">₹${data.price}</h2>
                            </div>
                            <div class="card__actions">
                                <button class="btn">Add To Cart</button>
                            </div>
                        </article>`;


    var popup_n=document.querySelector('.popup');
    var addToCart=document.getElementsByClassName('btn');
    for(var i=0;i<addToCart.length;i++)
    {
       let Add=addToCart[i];

      Add.addEventListener('click',async (e)=>{
        let p_element=Add.parentElement.parentElement;
        let item_name=p_element.children[0].innerText;
        let item_price=p_element.children[2].innerText;
        let item_p=parseFloat(item_price.replace('₹',''));
        let item_image=p_element.children[1].src;
        

        let obj={item_name,item_image,item_p};
        try{
            
            let post=await axios.post('http://localhost:3000/addProductToCart',obj);
            console.log(post.data);
            let name=post.data.name;
            let image=post.data.image;
            let price=post.data.price;
            display_cart(name,image,price);
        }
        catch(err)
        {
            document.body.innerHTML=document.body.innerHTML+"<h4>something went wrong with post</h4>";
            console.error(err);
        }
        })
    }

    function display_cart(name,image,price)
    {
    let item=document.getElementsByClassName('itm-name');
    for(var i=0;i<item.length;i++)
    {
       let I=item[i];
       if(I.innerText===name)
       {
        alert('product already present in the cart');
        return;
       }
    }
    let cart_element=document.querySelector('.cart-item-container');
    cart_element.innerHTML+=`<div class="cart-item1" id="${name}">
                                <div class="itm-image">
                                    <img class="item-cart-image" src="${image}" alt="item-image" width="200" height="100">
                                </div>
                                <div class="itm-name">
                                    ${name}
                                </div>
                                <span class="itm-price">₹${price}</span>
                                <div class="input">
                                    <input type="number" id="qty" class="qty">
                                </div>
                                <button id="remove" class="remove" type="submit">Remove</button>
                            </div>`;
                            popup(name);
                            total();
    };

    function popup(name){
    const new_element=document.createElement('div');
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
   }
};

let Cart=document.getElementById('cart');
let cartContainer=document.querySelector('.cart-container');
let x=document.getElementById('close');
let seeCart=document.querySelector('.cart_button');

seeCart.addEventListener('click',cartSideways);
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

function remove_item(e)
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
        remove.removeChild(p);
    }
};

const purchase=document.querySelector('.purchase');
purchase.addEventListener('click',buy);

function buy()
{
    let get=document.querySelector('.cart-item-container');
    let totalPrice=document.querySelector('.total-price');
    totalPrice.textContent='₹0';
    get.innerHTML='';
    alert('Thankyou for purchase');
};



