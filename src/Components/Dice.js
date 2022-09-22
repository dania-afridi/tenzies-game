import React from "react";

export default function Dice(props){
    return(
        <div className="dice-face" style={{backgroundColor: props.isHeld ? '#59E391' : 'white'}} onClick={props.holdDice}>
            <h2 className="dice-number">{props.value}</h2>
        </div>
    )
}