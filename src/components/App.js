import { useState } from "react";
import * as math from "mathjs";

import Input from "./Input";
import Button from "./Button";
import '../styles/App.css';
import '../styles/Button.css';
import '../styles/Input.css';

const App = () => {

  const [text, setText] = useState("0");
  const [result, setResult] = useState("");

  const addToText = (val) => {
 
    if(text === "0"){
      setText(val);
    } else {
    setText((text) => [...text, val]);
    }
  };

  const resetInput = () => {
    setText("0");
    setResult("");
  };

  const calculatorResult = () => {

    const input = text.join("");
    const isThereALetter = input.match(/[A-F]/g);

    // check if there two operators in a row
    const isThereTwoOperators = input.match(/[+*/]{2,}/g);
    // print an error message if there are two operators in a row
    if(isThereTwoOperators){
      setResult("Error");
      return;
    }
    const isThereAMinus = input.match(/-/g);
    const isThereANumberAfterMinus = input.match(/-\d/g);
    const isThereAnOperatorBeforeMinus = input.match(/[\+\*\/]-/g);

  
    // if there is a minus sign, check before and after the minus sign
    if(isThereAMinus && !isThereALetter & isThereANumberAfterMinus && isThereAnOperatorBeforeMinus){
      if(isThereANumberAfterMinus && isThereAnOperatorBeforeMinus){
        const result = math.evaluate(input);
        setResult(result);
      } 
    }
    else if(isThereAMinus && isThereALetter){
      // convert the letter into a number
      const convertToNumber = input.replace(/[A-F]/g, (letter) => {
        if(letter === "A"){
          return 10;
        }else if(letter === "B"){
          return 11;
        }else if(letter === "C"){
          return 12;
        }else if(letter === "D"){
          return 13;
        }else if(letter === "E"){
          return 14;
        }else if(letter === "F"){
          return 15;
        }
      });
      const result = math.evaluate(convertToNumber);
      // check if the result is 10, 11, 12, 13, 14, 15
      // if it is, convert it to A, B, C, D, E, F
      if(result === 10){
        setResult("A");
      }else if(result === 11){
        setResult("B");
      }else if(result === 12){
        setResult("C");
      }else if(result === 13){
        setResult("D");
      }else if(result === 14){
        setResult("E");
      }else if(result === 15){
        setResult("F");
      }else{
      setResult(result);
      }
    }
    // if there multiple operators in a row, print an error message
    else if(isThereTwoOperators){
      setResult("Error");
      return;
    }
    // if it is divided by 0, print out an error
    else if(input.includes("/0")){
      setText("NAN");
      setResult("");
    }

    else if(result > Number.MAX_SAFE_INTEGER){
      setResult("Overflow");
      return;
    }
    // if the result is less than the min value, print out an error message
    else if(result < Number.MIN_SAFE_INTEGER){
      setResult("Underflow");
      return;
    }
    else if(input.length > 21){
      setText("Overflow");
      setResult("");
    }
    else if(isThereALetter){
      // convert A to 10, B to 11, C to 12, D to 13, E to 14, F to 15
      const convertToNumber = input.replace(/[A-F]/g, (letter) => {
        if(letter === "A"){
          return 10;
        }else if(letter === "B"){
          return 11;
        }else if(letter === "C"){
          return 12;
        }else if(letter === "D"){
          return 13;
        }else if(letter === "E"){
          return 14;
        }else if(letter === "F"){
          return 15;
        }
      });
      const result = math.evaluate(convertToNumber);
      // check if the result is 10, 11, 12, 13, 14, 15
      // if it is, convert it to A, B, C, D, E, F
      if(result === 10){
        setResult("A");
      }else if(result === 11){
        setResult("B");
      }else if(result === 12){
        setResult("C");
      }else if(result === 13){
        setResult("D");
      }else if(result === 14){
        setResult("E");
      }else if(result === 15){
        setResult("F");
      }else{
      setResult(result);
      }
    }
    else{
      const finalResult = math.evaluate(input);
      if(finalResult === 10){
        setResult("A");
      }else if(finalResult === 11){
        setResult("B");
      }else if(finalResult === 12){
        setResult("C");
      }else if(finalResult === 13){
        setResult("D");
      }else if(finalResult === 14){
        setResult("E");
      }else if(finalResult === 15){
        setResult("F");
      }else{
      setResult(finalResult);
      }
    }
    
  };

  const buttomColor = "#f2a33c";

  return (
    <div className="App">
      <div className="calculator-wrapper">
        <Input text = {text} result = {result}/>
        <div className="row"> 
        <Button symbol = "0" handleClick={addToText}/>
        <Button symbol = "1" handleClick={addToText}/>
        <Button symbol = "2" handleClick={addToText}/>
        <Button symbol = "+" color= {buttomColor} handleClick={addToText} />
       </div>
       <div className="row"> 
        <Button symbol = "3" handleClick={addToText}/>
        <Button symbol = "4" handleClick={addToText}/>
        <Button symbol = "5" handleClick={addToText}/>
        <Button symbol = "-" color= {buttomColor} handleClick={addToText}/>
       </div>
       <div className="row"> 
       <Button symbol = "6" handleClick={addToText}/>
       <Button symbol = "7" handleClick={addToText}/>
       <Button symbol = "8" handleClick={addToText}/>
       <Button symbol = "*" color= {buttomColor} handleClick={addToText}/>
       </div>
       <div className="row"> 
       <Button symbol = "9" handleClick={addToText}/>
       <Button symbol = "A" handleClick={addToText}/>
       <Button symbol = "B" handleClick={addToText}/>
       <Button symbol = "/" color= {buttomColor} handleClick={addToText}/>
       </div>
       <div className="row"> 
       <Button symbol = "C" handleClick={addToText}/>
       <Button symbol = "D" handleClick={addToText}/>
       <Button symbol = "E" handleClick={addToText}/>
       <Button symbol = "F" handleClick={addToText} />
       </div>
       <div className="row"> 
        <Button symbol = "=" color= {buttomColor} handleClick={calculatorResult} />
        <Button symbol = "Clear" color = "red" handleClick={resetInput}/>
       </div>
      </div>
    </div>
  );
};

export default App;
