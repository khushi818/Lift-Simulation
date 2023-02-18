const val = document.getElementById('blocks')
const root = document.querySelector(':root')
const up = document.querySelector('.above')
const down = document.querySelector('.below')


const height =val.children[0].offsetHeight;
console.log(height)

up.addEventListener('click', ()=>{
    let block_style = getComputedStyle(root,null);
    let block = block_style.getPropertyValue('--block-height');
    block = block.replace('px','')
    console.log(parseInt(block) + (height/3))
    root.style.setProperty('--block-height', `${parseInt(block) + height}px`) 
})

down.addEventListener('click', ()=>{
    let block_style = getComputedStyle(root,null);
    let block = block_style.getPropertyValue('--block-height');
    block = block.replace('px','')
    console.log(parseInt(block) + (height/3))
    root.style.setProperty('--block-height', `${parseInt(block) - height}px`) 
})



