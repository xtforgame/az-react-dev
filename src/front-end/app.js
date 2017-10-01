import imageSrcInCode from './iconx.png';

console.log([1, 2, 3].map(v => v).join(', '));

let div1 = document.createElement('div');
let text1 = document.createTextNode('Image From Public :');
div1.appendChild(text1);

let imgFromPublic = document.createElement('img');
imgFromPublic.src = './images/icon.png';



let div2 = document.createElement('div');
let text2 = document.createTextNode('Image From Src :');
div2.appendChild(text2);

let imgFromSrc = document.createElement('img');
imgFromSrc.src = imageSrcInCode;

let element = document.getElementById('page_main');
element.appendChild(div1);
element.appendChild(imgFromPublic);
element.appendChild(div2);
element.appendChild(imgFromSrc);
