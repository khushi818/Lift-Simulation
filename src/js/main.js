const val = document.getElementById('blocks')
const root = document.querySelector(':root')
const up = document.querySelectorAll('.above')
const down = document.querySelectorAll('.below')
const lift_class = document.querySelectorAll('.lift')
const generate = document.getElementById("btn")




generate.addEventListener('click',()=>
{
   const floors = document.getElementById("no_oF_floor").value
   const lift = document.getElementById("no_of_lift").value
   for(let i = 0 ; i < floors ; i++)
   {
      const parent = document.querySelector(".floors");
      const div = document.createElement('div')
      div.classList.add('block');
      div.dataset.column = i;
      div.innerHTML += '<button class="above">Up</button><button class="below">down</button>'
      parent.appendChild(div);
   }

   for(let i = 0 ; i < lift ; i++)
   {
      console.log(lift)
      const parent = document.getElementById("lift-section");
      parent.innerHTML += `<div class="lift" id=${i} data-value="${i}" data-status="free"></div>`
      
   }
})

/*height of the seperate block*/
let height = val.children[0].offsetHeight;
console.log(height)


// let array_of_block_lift = new Array(3);
// for (let i=0; i<3; ++i) {
//             array_of_block_lift[i] = 0;
// }
 let array_of_block_lift =[0,0,0]  


/* to check the status*/
const check_status = () =>{ 
    let val = lift_class[0];
    console.log(val)
    for(let lift of lift_class){
        if(lift.dataset.status === "free")
        {
           val = lift
           break;
        }
      }
    
    return val
}

console.log(check_status().dataset.value)

/* determine the position of lift*/
const block_of_lift = () =>{
    let div_lift = check_status()
    console.log(div_lift)
    let block = div_lift.dataset.value; 
    console.log(block)
    console.log(array_of_block_lift[block] + (height))
    return [div_lift,block]
}


let previous_block = 0;

up.forEach(item => {
  /* different floors */
  item.addEventListener('click', (e)=>{
    let [div_lift,block] = block_of_lift()
    console.log(block)
    array_of_block_lift[block] += height;  
    document.getElementById(`${block}`).style.transform = `translateY(-${array_of_block_lift[block]}px)`
    
    div_lift.dataset.status = "busy"
       setTimeout(()=>{ 
        div_lift.dataset.status = "free"
     },2000)
         // e.defaultPrevent();    
    //  let total = 2-item.parentElement.dataset.column
    //  let block_style = getComputedStyle(root,null);
    //  let block = block_style.getPropertyValue('--block-height');// value of lift position
 // block = parseInt(block.replace('px',''))
       //  if((total * height) !== previous_block)
    //  {
    //   console.log(`total:${total} & block:${block} = ${total * height}`)
    //   root.style.setProperty('--block-height', `${(total * height)}px`)
    //   previous_block = block   
    //  } 
    //  else
    //  { 
    // //  root.style.setProperty('--block-height', `${block + height}px`)
    //  div_lift.dataset.value.style.bottom = `${block + height}px`
   
    //  } 
 })
});


down.forEach(item => {
 item.addEventListener('click', ()=>{
    let [div_lift,block] = block_of_lift()
    array_of_block_lift[block] -= height;  
    document.getElementById(`${block}`).style.transform = `translateY(-${array_of_block_lift[block]}px)`
  
    div_lift.dataset.status = "busy"
       setTimeout(()=>{ 
        div_lift.dataset.status = "free"
     },2000)
  
})
});


