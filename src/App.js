import {useState} from 'react';
function App() {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");;

    const ops = ["/", "*", "+", "-", "."];

    const updateCalc = value => {
        if(
            ops.includes(value) && calc === "" ||
            ops.includes(value) && ops.includes(calc.slice(-1))
        ){
            return;
        }

        if(!ops.includes(value)){
            setResult(eval(calc + value ).toString())
        }
    }

    const calculate = () => {
        setCalc(eval(calc).toString())
    }

    const deleteLast = () => {
        if(calc == ""){
            return;
        }
        const value = calc.slice(0, -1)
        setCalc(value)
    }
    const crearDigitos = ()=> {
        const digitos = [];
        for (let i = 1; i < 10; i++) {
            digitos.push(
                <button onClick={()=> updateCalc(i.toString())} key={i}>{i}</button>
            )
        }
        return digitos;
    }
  return (
    <div className="App">
      <div className="calculadora">
        <div className="display">
            {result ? <span>{result}</span> : ''} &nbsp; {calc || "0"} <span>{result}</span>
        </div>

          <div className="operadores">
              <button onClick={()=> updateCalc('+')}>+</button>
              <button onClick={()=> updateCalc('-')}>-</button>
              <button onClick={()=> updateCalc('*')}>*</button>
              <button onClick={()=> updateCalc('/')}>/</button>

              <button onClick={deleteLast}>CE</button>
          </div>

          <div className="numeros">
              {crearDigitos()}
              <button onClick={()=> updateCalc('0')}>0</button>
              <button onClick={()=> updateCalc('.')}>.</button>
              <button onClick={calculate}>=</button>

          </div>
      </div>
    </div>
  );
}

export default App;
