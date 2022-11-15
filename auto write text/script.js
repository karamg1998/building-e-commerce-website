const text='currently learning building e-commerce website and gonna complete it as soon as possible$$$';

let index=0;

function writeText()
{
  document.body.innerText=text.slice(0,index);
  
  index++;

  if(index>text.length-1)
  {
    index=0;
  }
};

setInterval(writeText,100);