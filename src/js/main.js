const val = document.getElementById('blocks')
const root = document.querySelector(':root')
const up = document.querySelectorAll('.above')
const down = document.querySelectorAll('.below')

/*height of the seperate block*/
const height =val.children[0].offsetHeight;
console.log(height)

let previous_block = 0;

up.forEach(item => {
  item.addEventListener('click', ()=>{
     let total = 2-item.parentElement.dataset.column
     let block_style = getComputedStyle(root,null);
     let block = block_style.getPropertyValue('--block-height');// value of lift position
     block = parseInt(block.replace('px',''))
     console.log(parseInt(block) + (height))
     
     if((total * height) !== previous_block)
     {
      console.log(`total:${total} & block:${block} = ${total * height}`)
      root.style.setProperty('--block-height', `${(total * height)}px`)
      previous_block = block   
     } 
     else
     {
     root.style.setProperty('--block-height', `${block + height}px`)
     } 
 })
});


down.forEach(item => {
 item.addEventListener('click', ()=>{
    let block_style = getComputedStyle(root,null);
    let block = block_style.getPropertyValue('--block-height');
    block = block.replace('px','')
    console.log(parseInt(block) + (height/3))
    root.style.setProperty('--block-height', `${parseInt(block) - height}px`) 
})
});



