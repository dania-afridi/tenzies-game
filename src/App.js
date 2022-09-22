/* eslint-disable no-unused-vars */
import React from "react";
import Dice from "./Components/Dice";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(()=>{
    // console.log("Dice state changed")
    let count =0;
        let firstValue = dice[0].value;
        for (let i = 0; i < 10; i++) {
            if(dice[i].isHeld && dice[i].value === firstValue){
                count++;
            }
        }
        if(count === 10){
            // console.log("all dice are held and have same values")
            setTenzies(true)
            console.log("You won!")
        } 
        /*
        GIVEN SOLUTION:
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
        */
  }, [dice])

  function generateDie(){
    return {
      value: Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
  }

  function allNewDice() {
    // new array to hold my numbers
    // loop 10 times
        // push a random number from 1-6 to my array
    // return array
    let myNums =[]
    for(let i=0; i<10; i++){
        // let num = Math.floor(Math.random()*6)+1;
        myNums.push(generateDie())
    }
    return myNums;
    
  }

  function rollDice(){
    // Give solution for new game if(!tenzies){the code below} else {two line code in newGame function}
    setDice(oldDice => oldDice.map(die => {
      return !(die.isHeld) ?
      generateDie() :
      die
    }))
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  function newGame(){
    setDice(allNewDice)
    setTenzies(false)
  }


  const diceElements = dice.map(die => <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id )}/>)
// console.log(allNewDice())

  return (
    <main className="App">
    {/* Render Confetti component if `tenzies` is true */ tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
        {/* <Dice value="1"/>
        <Dice value="2"/>
        <Dice value="1"/>
        <Dice value="3"/>
        <Dice value="1"/>
        <Dice value="4"/>
        <Dice value="1"/>
        <Dice value="5"/>
        <Dice value="1"/>
        <Dice value="6"/> */}
      </div>
      <button className="roll-dice" onClick={tenzies? newGame : rollDice}>
          {tenzies? "New Game":"Roll"}
      </button>
    </main>
  )
}

export default App;
