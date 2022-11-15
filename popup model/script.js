const btn=document.getElementById('open');
const container=document.getElementById('container');
const close=document.getElementById('close');

btn.addEventListener('click',()=>{
  container.classList.toggle('active');
});

close.addEventListener('click',()=>{
  container.classList.remove('active');
});