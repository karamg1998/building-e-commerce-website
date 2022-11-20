window.addEventListener('DOMContentLoaded',(event)=>{
    axios.get('http://localhost:3000/getAllproducts').
    then(products=>{
      for(var i=0;i<products.data.length;i++)
      {
        showItems(products.data[i]);
      }
    }).catch(err=>{
        console.log(err);
        document.body.innerHTML+=`<div>Something went wrong with dom-content loaded</div>`
    })
});

function showItems(data)
{
    let section1=document.querySelector('.section-1');
    let article=document.createElement('section');
    article.className="card product-item";
    let header=document.createElement('header');
    header.className="card__header";
    let h1=document.createElement('h1');
    h1.className="product__title";
    h1.textContent=data.name;
    header.appendChild(h1);
    article.appendChild(header);
    let img=document.createElement('img');
    let source=`${data.image}`;
    img.src=source;
    article.appendChild(img);
    let div=document.createElement('div');
    div.className="card__content";
    let h2=document.createElement('h2');
    h2.className="product__price";
    h2.textContent=`₹${data.price}`;
    div.appendChild(h2);
    article.appendChild(div);
    let div2=document.createElement('div');
    div2.className="card__actions";
    let button=document.createElement('button');
    button.className="btn";
    button.textContent="Add To Cart";
    div2.appendChild(button);
    article.appendChild(div2);
    section1.appendChild(article);
}