import './App.css';
import React from "react";
import ItemList from './Components/ItemList';



function App() {

  
  return (
    <div className="app">
      <div style={{
        border: "solid 1px",
        padding: "10px",
        margin: "20px",
        background: "linear-gradient(180deg, #e516167d, #74410140)",
        textAlign: "center",
        fontSize: "25px"
      }}>
        Local brewery
      </div>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>      
      <ItemList/>
      </div>
    </div>
  );
}

export default App;
