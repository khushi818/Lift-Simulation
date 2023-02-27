const val = document.getElementById('blocks')
const root = document.querySelector(':root')
const generate = document.getElementById("btn")
const header = document.getElementById("input_fields")
const refresh = document.getElementById("refresh")
const message = document.getElementById('message')


let array_of_block_lift =[] // stores floors distance   
let lift_busy = false
/* refresh the page */
refresh.addEventListener('click',()=>{
    window.location.reload()
}) 

/* generate lifts and floor*/
generate.addEventListener('click',()=>
{
   message.style.visibility = "visible"
   const floors = document.getElementById("no_of_floor").value
   const lifts = document.getElementById("no_of_lift").value
   
   header.style.display = "none" 
   refresh.style.display = "block"

   /* generate floors */
   for(let idx = 0 ; idx < floors ; idx++)
   {
      const parent = document.querySelector(".floors");
      const div = document.createElement('div')
      div.classList.add('block');
      div.dataset.column = (floors-1) - idx;
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
   for(let i = 0 ; i < lifts ; i++)
   {
      console.log(lifts)
      const parent = document.getElementById("lift-section");
      parent.innerHTML += `<div class="lift" id=${i} data-value="${i}" data-current = "0" data-status="free"><input id = "checkbox" class=${i} type="checkbox" checked><div class="lift-left"></div><div class="lift-right"></div></div>`
      
   }
    
   /* dom for buttons and lift*/
   const up = document.querySelectorAll('.above')
   const down = document.querySelectorAll('.below')
   const lift_class = document.querySelectorAll('.lift')
   const input = document.getElementsByTagName('input')
   
   console.log(lift_class)
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

   for (let i=0; i< lifts; i++) {
            array_of_block_lift[i] = 0;
   }
   

console.log(up.forEach(floors => console.log(floors.parentNode)))
console.log(down.forEach(floors => console.log(floors.parentNode)))
setInterval(()=>{ 
  check_busy(lift_class)
   if(check_pending() && !lift_busy) { 
      const pending_Interval = setInterval(()=>{
      if(pending_request.length === 0)
      {
         clearInterval(pending_Interval)
      }     
      else{
         setTimeout(()=>{
         let floor = pending_request[0].parentElement.dataset.column
         console.log("lift is on the way")
         lift_call(height,lift_class,checkboxes,floor,pending_request[0])
         pending_request.shift();
         },1000)
      }
         },1000)
   } 
},1000)

   /* to move lifts */
   up.forEach(item => {
        
        item.addEventListener('click', (e)=>{
              console.log(`parentElement = ${item.parentElement}`)
              let floor = item.parentElement.dataset.column
              setTimeout(()=>{
              lift_call(height,lift_class,checkboxes,floor,item)
              },1000)
      });
   })     

   
   down.forEach(item => {
         check_busy(lift_class)
        
       item.addEventListener('click', (e)=>{
           console.log(`parentElement = ${item.parentElement}`)
           let floor = item.parentElement.dataset.column
           setTimeout(()=>{           
           lift_call(height,lift_class,checkboxes,floor,item)
           },1000)
      })
      
})

})
let pending_request = []


const check_pending = () =>{   
   if(pending_request.length > 0)
   {
       return true
   }
   return false   
}

const check_busy = (lift_class) =>{
    const lift = Object.values(lift_class).filter((lift_block)=>{
         return lift_block.dataset.status === "free"
   })[0]

   if(lift === undefined)
   {
    lift_busy = true  
   }
   else{
      lift_busy = false
   }
}

/* to check the status*/
const check_status = (lift_class) =>{
   const lift = Object.values(lift_class).filter((lift_block)=>{
         return lift_block.dataset.status === "free"
   })[0] 

   if(lift === undefined)
   {
    lift_busy = true  
    console.log(`lift_busy = ${lift_busy}`)
   }
   else{
       lift_busy = false
   }

   if(!lift) return lift_class[0]
   else return lift
}

/* determine the position of lift*/
const check_height_and_lift_number = (lift_class) =>{
    let lift =  check_status(lift_class)  
    console.log(lift)
    lift_id = lift.dataset.value ;
    return [lift,lift_id]
}

/* evenlistener function to go up*/
const lift_call = (height,lift_class,checkboxes,floor,item,floor_number) => {
       
   let [lift,lift_id] = check_height_and_lift_number(lift_class)
   
   console.log(`floor = ${floor}`)
   console.log(`the position = ${height * floor}`)
   
   console.log(`difference in floor(${Math.abs(lift.dataset.current - floor)})`)
   let floor_distance = height * floor
   array_of_block_lift[lift_id] = floor_distance
   let floor_difference = Math.abs(lift.dataset.current - floor)
   
    if(lift_busy)
   {     
      pending_request.push(item)
      // pending_request = new Set(pending_request)
      // pending_request = [...pending_request]
      console.log(item)
      message.textContent = 'Please wait......'
      lift_busy = true
   }     
   else{  
       message.textContent = 'lifts are free for you'
       lift_busy = false      
       setTimeout(()=>{  
        lift.dataset.status = "busy"
        document.getElementById(`${lift_id}`).style.transform = `translateY(-${array_of_block_lift[lift_id]}px)`
        document.getElementById(`${lift_id}`).style.transitionDuration = `${2 * floor_difference}s`
        lift.dataset.current = floor
        
        setTimeout(()=>{
            if(lift.dataset.current === floor)
            {
            checkboxes[lift.dataset.value].checked = false
            checkboxes[lift.dataset.value].style.transitionDuration = `2.5s`
            }
            setTimeout(()=>{
               
               checkboxes[lift.dataset.value].checked = true
               lift.dataset.status = "free"
               
            },2500)
         },`${2 * floor_difference*1000}`);
   },0)
}
}



