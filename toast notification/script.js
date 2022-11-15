const btn = document.getElementById("btn");
const container = document.getElementById("container");

btn.addEventListener("click", () => {
  const new_element=document.createElement('div');
  new_element.className='toast';
new_element.innerText='hello work hard until you done!!';
  container.appendChild(new_element);

  setTimeout(()=> {
   new_element.remove();
  },3000);
});
