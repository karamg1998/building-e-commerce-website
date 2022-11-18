var addToCart=document.getElementsByClassName('btn');
var popup_n=document.querySelector('.popup');

for(var i=0;i<addToCart.length;i++)
{
    let add=addToCart[i];

    add.addEventListener('click',cart);

    function cart()
    {
        let p_element=add.parentElement.parentElement;
        let item_name=p_element.children[0].innerText;
        let item_price=p_element.children[2].innerText;
        let item_p=parseFloat(item_price.replace('₹',''));
        let item_image=p_element.children[1].src;
        display_cart(item_name,item_image,item_p);
    }
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

function popup(name)
{
    const new_element=document.createElement('div');
    new_element.className='toast';
    new_element.innerText=`${name} added to cart`;
    popup_n.appendChild(new_element);
                              
    setTimeout(()=> {
    new_element.remove();
    },2000);  
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
    alert('Thankyou for purchase');
    get.innerHTML='';
};