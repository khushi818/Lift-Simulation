const val = document.getElementById('blocks')
const root = document.querySelector(':root')
const generate = document.getElementById("btn")
const header = document.getElementById("input_fields")
const refresh = document.getElementById("refresh")

console.log(Date.now())
let array_of_block_lift =[]   

refresh.addEventListener('click',()=>{
    window.location.reload()
}) 

generate.addEventListener('click',()=>
{
   const floors = document.getElementById("no_of_floor").value
   const lift = document.getElementById("no_of_lift").value
   
   header.style.display = "none" 
   refresh.style.display = "block"  
   /* generate floors */
   for(let idx = 0 ; idx < floors ; idx++)
   {
      const parent = document.querySelector(".floors");
      const div = document.createElement('div')
      div.classList.add('block');
      div.dataset.column = idx;
      if(idx === floors-1)
      {
         div.innerHTML += '<button class="above">Up</button>'
      }
      else if(idx === 0)
      {
         div.innerHTML += '<button class="below">down</button>'
      }
      else{
      div.innerHTML += '<button class="above">Up</button><button class="below">down</button>'
      }
      parent.appendChild(div);
   }

   /* generate lift */
   for(let i = 0 ; i < lift ; i++)
   {
      console.log(lift)
      const parent = document.getElementById("lift-section");
      parent.innerHTML += `<div class="lift" id=${i} data-value="${i}" data-status="free"><input id = "checkbox" type="checkbox" checked><div class="lift-left"></div><div class="lift-right"></div></div>`
      
   }
    
   /* dom for buttons and lift*/
   const up = document.querySelectorAll('.above')
   const down = document.querySelectorAll('.below')
   const lift_class = document.querySelectorAll('.lift')
   const open_lift = document.getElementById("checkbox")
   
   /* height*/
   let height = val.offsetHeight/floors;
   console.log(height/floors)
   let max_limit = height * (floors-1);   
   for (let i=0; i< lift; i++) {
            array_of_block_lift[i] = 0;
   }

   /*move the lift up */ 
   up.forEach(item => {
              item.addEventListener('click', (e)=>{
              up_above(height,lift_class,max_limit,open_lift)
   });
    
   })
   

   /* move down lift*/
   down.forEach(item => {
    item.addEventListener('click', (e)=>{
    down_below(height,lift_class)
    });
    
   })
})



/* to check the status*/
const check_status = (lift_class) =>{ 
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

/* determine the position of lift*/
const block_of_lift = (height,lift_class) =>{
    let div_lift = check_status(lift_class)
    console.log(div_lift)
    let block = div_lift.dataset.value; 
    console.log(array_of_block_lift[block] + (height))
    return [div_lift,block]
}

/* evenlistener function to go up*/
const up_above = (height,lift_class,max_limit,open_lift) => {
   let [div_lift,block] = block_of_lift(height,lift_class)
    
   if(array_of_block_lift[block] < max_limit){
      console.log(array_of_block_lift[block])
      array_of_block_lift[block] += height;
      document.getElementById(`${block}`).style.transform = `translateY(-${array_of_block_lift[block]}px)`
      setTimeout(()=>{
      open_lift.checked = false
      },1000)
      div_lift.dataset.status = "busy"
      console.log(open_lift.checked)
      setTimeout(()=>{ 
         setTimeout(()=>{
         open_lift.checked = true
      },1000)
         
         div_lift.dataset.status = "free"
         
      },2000)
   }
   else{
      console.log("Sorry lift can't fly in sky")
   }
   }

/* eventlistener function to go down*/   
const down_below =(height,lift_class) =>{
   let [div_lift,block] = block_of_lift(height,lift_class)
   console.log(block)
   console.log(array_of_block_lift)

   if(array_of_block_lift[block] >= 0)
   {
    array_of_block_lift[block] -= height;  
    document.getElementById(`${block}`).style.transform = `translateY(-${array_of_block_lift[block]}px)`
    
    div_lift.dataset.status = "busy"
    setTimeout(()=>{ 
        div_lift.dataset.status = "free"
    },2000)
   }
   else {
    console.log("the ground is solid sorry it needs power to break it");  
   }     
}


