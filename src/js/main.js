const val = document.getElementById('blocks')
const root = document.querySelector(':root')
const generate = document.getElementById("btn")
const header = document.getElementById("input_fields")
const refresh = document.getElementById("refresh")

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
      parent.innerHTML += `<div class="lift" id=${i} data-value="${i}" data-status="free"><input id = "checkbox" class=${i} type="checkbox" checked><div class="lift-left"></div><div class="lift-right"></div></div>`
      
   }
    
   /* dom for buttons and lift*/
   const up = document.querySelectorAll('.above')
   const down = document.querySelectorAll('.below')
   const lift_class = document.querySelectorAll('.lift')
   const input = document.getElementsByTagName('input')
   
   let checkboxes =[]
   for(let i = 0 ; i < input.length ; i++)
   {
      if(input[i].type === 'checkbox')
      {
        checkboxes.push(input[i])
      }
   }
   
   console.log(checkboxes)
   /* height*/
   let height = (val.offsetHeight)/floors;
   console.log(height*floors)
   let max_limit = height * (floors-1);   
   for (let i=0; i< lift; i++) {
            array_of_block_lift[i] = 0;
   }

   // /*move the lift up */ 
   up.forEach(item => {
            item.addEventListener('click', (e)=>{ 
              let total = (floors-1) - item.parentElement.dataset.column
              up_above(height,lift_class,max_limit,checkboxes,total)
   });
    
   })
   

   // /* move down lift*/
   // down.forEach(item => {
   //  item.addEventListener('click', (e)=>{
   //  down_below(height,lift_class)
   //  });
    
   // })
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

    return val;
}

/* determine the position of lift*/
const block_of_lift = (height,lift_class) =>{
    let div_lift = check_status(lift_class)
    console.log(div_lift)
    let block = div_lift.dataset.value; 
    console.log(array_of_block_lift[block] + (height))
    return [div_lift,block]
}

let lift_info =[]
/* evenlistener function to go up*/
const up_above = (height,lift_class,max_limit,checkboxes,total) => {
   let [div_lift,block] = block_of_lift(height,lift_class)
   let open_lift = checkboxes[div_lift.dataset.value]
   console.log(open_lift)
   console.log(total)
   if(array_of_block_lift[block] < max_limit){
      console.log("array block" + array_of_block_lift[block])
      console.log("multiply " + (height*total) )     
      
      array_of_block_lift[block] = (height*total);

      div_lift.dataset.status = "busy"
      lift_info.push(div_lift)
      setTimeout(()=>{
         document.getElementById(`${block}`).style.transform = `translateY(-${array_of_block_lift[block]}px)`
            setTimeout(()=>{
               open_lift.checked = false 
                  setTimeout(()=>{ 
                     open_lift.checked = true
                     lift_info[0].dataset.status = "free"
                     lift_info.shift()
              },2500)
         },2500)    
      },0)
      // setTimeout(()=>{ 
      //   div_lift.dataset.status = "busy"   
      // },2000)   
      // document.getElementById(`${block}`).style.transform = `translateY(-${array_of_block_lift[block]}px)`  
      // div_lift.dataset.status = "busy"

//timeFrame_lift(start,block,div_lift)
      
      
      
      // console.log(open_lift.checked)

      // setTimeout(()=>{ 
      //    setTimeout(()=>{
      //    open_lift.checked = true
      // },1000)
         
      // div_lift.dataset.status = "free"
         
      // },2000)
   }
   else{
      console.log("Sorry lift can't fly in sky")
   }
}

/* eventlistener function to go down*/   
const down_below =(height,lift_class,open_lift) =>{
   let [div_lift,block] = block_of_lift(height,lift_class)
       
   if(array_of_block_lift[block] >= 0){
      console.log(array_of_block_lift[block])
      array_of_block_lift[block] -= height;
     
      
      lift_info.push(div_lift) 
      // let start = Date.now();
      // let timepassed = Date.now() - start;
      setTimeout(()=>{ 
         lift_info[0].dataset.status = "free"
         lift_info.shift()
         return;
      },2000)
   
      
      console.log(lift_info)
      document.getElementById(`${block}`).style.transform = `translateY(-${array_of_block_lift[block]}px)`  
      div_lift.dataset.status = "busy"
   
}
}


