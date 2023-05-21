import React from "react";
import Page1 from "./page1";
export default function Header(props){


let [menuHover,setMenuHover] = React.useState(false)
let menu = () =>{


setMenuHover(prevMenuHover => !menuHover)


}   
let [list,SetLIst] = React.useState([])
let listButton = () =>{


SetLIst( prevList => 


    
 [
 ...prevList,
`This is ${prevList.length+1} `

 ]


)
}

return(
    <div>
        <div className="header-row">
<div  className="img-skull"><img src="https://rb.gy/6pxyp"></img></div>
<div onClick={menu} className="flex-column">

<div  className = "flex-column-items" ></div>
<div className="flex-column-items"></div>
<div className="flex-column-items"></div>
</div>
<div style={ menuHover?{ display:"flex"} :{display:"none"}} className="user-info-container" >
<div onClick={menu} className="flex-column">
<div  className = "flex-column-items" ></div>
<div className="flex-column-items"></div>
<div className="flex-column-items"></div>
</div>
 <img id="user-img" src="https://rb.gy/spmnw" alt="userIMg" ></img>
<h1>User Name</h1>
<button onClick={listButton} id="add-list">Add list</button>

</div>

 </div>
  <div className="list-grid" >
{list}
</div>
</div>
)
}