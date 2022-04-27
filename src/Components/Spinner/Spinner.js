import React from "react";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // width:"20em",
        // heigh:"20em"
      }}
    >
      <img src={require('../../img/loader.gif')}  alt="cargador" style={{
       
        width:"40em",
        heigh:"40em"
      }}/>
      <div
      style={{
    
        width:"20em",
        heigh:"20em",
        fontSize:"2em"
      }}>
      No detecto ninguna cara, <br/>¿puedes acercarte o iluminar mejor la sala?
      </div>
      {/* <FontAwesomeIcon icon="spinner" spin size="lg" /> */}
    </div>
  );
};

export default Spinner;
