import { useState } from "react";
import Display from "./Display"
import Buttons from "./Buttons";
import './App.css'

function startsWithOperator(input) {
    return /^[+\x/]/.test(input);
}

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

        } else if (startsWithOperator(e) && calculation === '' || (calculation.length === 1  && e === '0')){
            return 

        } else if(e === '.' && calculation[calculation.length - 1] === '.'){
            return

        } else if(calculation === 'NaN') {
            if (/[0-9.]/.test(e)) {
                setCalculation(e)
                setExpression(e)
            } 
            return

        } else if (ops.includes(e) && ops.includes(calculation[calculation.length-1])){

            if (ops.includes(calculation[calculation.length-2])) {
                if (calculation[calculation.length-1] === '-' && e !== '+') {
                    return  
                }
                setExpression((prev) => prev.slice(0, -1) + e)
                setCalculation((prev) => prev.slice(0, -1) + e)
                return
            } else if (calculation[calculation.length-1] !== '-' && e === '-'){
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

        } else if (calculation.startsWith('0') && e !== '0') {
            setCalculation(e)
            setExpression(e)
            return

        }

        setExpression((prev) => prev + e)
        setCalculation((prev) => prev + e)
    }


    const handleEqual = () => {
        if (calculation === '' || calculation === 'NaN') {
            return
        }
        try{
            const newCalc = calculation.slice().replace('x', '*')
            console.log(newCalc);
            const result = eval(newCalc)
            setCalculation((prev) => prev + '=' + result)
            setExpression(result)
        } catch(err) {
            console.log(err);
            setCalculation(String(NaN))
        }   
    }

    const handleClear = () => {
        setCalculation('');
        setExpression('');
    }

    return (
        <div className="container">
            <Display calculation={calculation} expression={expression}/>
            <Buttons handleClick={handleClick}/>
        </div>
    )
}                                                             

