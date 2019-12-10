//@ts-check

let textArea = document.getElementById('text-area');
textArea.innerText = 'Hello World!';

let okButton = document.getElementById('ok-button');
okButton.addEventListener('click', n => { 
  textArea.innerText = 'button clicked';
});