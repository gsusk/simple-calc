import { useState } from "react";
import Display from "./Display"
import Buttons from "./Buttons";
import './App.css'

function startsWithOperator(input) {
    return /^[+\x/]/.test(input);
}

let flip = true;
 
export default function App() {
    const [calculation, setCalculation] = useState('');
    const [expression, setExpression] = useState('');
 
    const handleClick = (e) => {

        const ops = "+-x/"

        if (e === 'AC'){
            handleClear();
            return

        } else if (e === '=') {
            handleEqual();
            return

        } else if (startsWithOperator(e) && calculation === ''){
            return 

        } else if (e === '.' && flip === false){
            return
        } else if (e ==='.') {
            flip = false
        } else if (e === '.' && calculation[calculation.length - 1] === '.') {
            return;
        } else if(calculation === 'NaN') {
            if (/[0-9.]/.test(e)) {
                setCalculation(e)
                setExpression(e)
            } 
            return

        } else if(ops.includes(e)) {
            flip = true;
        }
        
        if (ops.includes(e) && ops.includes(calculation[calculation.length-1])){
            flip = true;
            if (ops.includes(calculation[calculation.length-2])) {
                if(e !== calculation[calculation.length-1]) {
                    setExpression((prev) => prev.slice(0, -2) + e)
                    setCalculation((prev) => prev.slice(0, -2) + e)
                    return
                }
                setExpression((prev) => prev.slice(0, -1) + e)
                setCalculation((prev) => prev.slice(0, -1) + e)
                return
            } else if(calculation[calculation.length-1] !== '-' && e === '-') {
                setExpression((prev) => prev + e)
                setCalculation((prev) => prev + e)
                return
            } else {
                setExpression((prev) => prev.slice(0, -1) + e)
                setCalculation((prev) => prev.slice(0, -1) + e)
                return
            }

        } else if (calculation.includes('=')) {
            if (/[0-9.]/.test(e)) {
                setCalculation(e)
                setExpression(e)
            } else {
                setCalculation(expression + e)
                setExpression(e)
            }
            return

        } 
        
        if (expression.startsWith('0')) {
            if (e === '0'){
                return
            }
            setCalculation(e)
            setExpression(e)
            return
        }

        setExpression((prev) => prev + e)
        setCalculation((prev) => prev + e)
    }


    const handleEqual = () => {
        flip = true;
        if (calculation === '' || calculation === 'NaN') {
            return
        }
        try{
            const newCalc = calculation.slice().replace('x', '*')
            let result;
            if ('.'.includes(calculation)) {
                 result = parseFloat(eval(newCalc))
            } else {
                 result = eval(newCalc)         
            }
            setCalculation((prev) => prev + '=' + result)
            setExpression(result)
        } catch(err) {
            console.log(err);
            setCalculation(String(NaN))
        }   
    }

    const handleClear = () => {
        flip= true;
        setCalculation('');
        setExpression('0');
    }

    return (
        <div className="container">
            <Display calculation={calculation} expression={expression}/>
            <Buttons handleClick={handleClick}/>
        </div>
    )
}                                                             

