    
    import React from "react";
   import "../page1.css"
  import dog from "/home/david/repos/project/Website/src/dog.png"

    export default function Login(){



let [checkbox,setCheckbox] = React.useState(false)
let [input,setInput] = React.useState({userName:"",password:""})



let sunmit =()=>{
    if(input.userName ==="david" && input.password ==="1234" ){

    window.open("http://localhost:3000/page1")
}}
let form = (event) =>{


    event.preventDefault();

}
let handlerChange = (event) =>{

    setInput(prevInput =>{

return{

    ...prevInput,
    [event.target.name]: event.target.value
}


    })
}

let show = (event) =>{

setCheckbox(prevCheckbox => !prevCheckbox)

}

return(
<div >
<div className="flex-center">
<form onSubmit={form} className="form-flex">

    <img className="img" src={ checkbox ? "https://media.tenor.com/xsHGvPE_tyYAAAAM/eye-roll-dog.gif" : dog} alt="icon" />
    <div className="info">
<div className="user-info">
    <label>User Name</label>
  
<input onChange={handlerChange} name="userName" 
    placeholder="UserName"
required

/> 
<div className="password-info">
   
<label>Password</label>


</div>
<input id= "checkbox" type={checkbox ? "text": "password"} onChange={handlerChange} name="password" 
    placeholder="Password"

required

/>

<div className="checkbox" htmlFor="checkbox"> <input onClick={show} type="checkbox" value={"Show"}/>Show Password</div>
<button onClick={sunmit} className="button">Login</button>
</div>
</div>
</form>
</div>

</div>

)


    }
