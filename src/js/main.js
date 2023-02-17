const val = document.getElementById('blocks')
const height =val.offsetHeight;

const root = document.querySelector(':root')
root.style.setProperty('--block-height', height/3)