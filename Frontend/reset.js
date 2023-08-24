'use strict' 
const reset=document.querySelector('.reset')
const userEmail=document.querySelector('.userEmail')
const reseting=document.querySelector('.reseting')
reset.addEventListener('submit',(e)=>{
    e.preventDefault()

    axios
    .post(
        "http://localhost:4700/reset/reset-password",

        { 
          userEmail: userEmail.value,
        },

        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        const resMessage=document.querySelector('.resMessage')
        console.log(response)
        resMessage.textContent=response.data
    resMessage.style.color="green"
     
         setTimeout(()=>{
           console.log(response.data);
         
           resMessage.textContent=""
           
reset.style.opacity='0'

         },3500)
        console.log(response)
        reset.style.opacity='0'
        reseting.style.opacity='1'
      })
      .catch((e) => {
        console.log(e);
      })
    })
    const codeReceive=document.querySelector('.codeReceive')

  
    const newPassword=document.querySelector('.newPassword')
    let code=document.querySelector('.code')

   const resetCode=code.value
   const passwordValue=newPassword.value
    reseting.addEventListener('submit',(e)=>{
e.preventDefault()
        axios
    .post(
        `http://localhost:4700/reset/reset-password/${resetCode}`,

        { 
          newPassword: passwordValue
        },

        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        const resMessage=document.querySelector('.resMessage')
        console.log(response)
        resMessage.textContent=response.data
    resMessage.style.color="green"
     alert('here')
         setTimeout(()=>{
           console.log(response.data);
         
           resMessage.textContent=""
           
         },3500)
         window.location.href='./index.html'
       
      })
      .catch((e) => {
        console.log(e);
      })
    })