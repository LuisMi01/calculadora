import { useState } from 'react';
import { create, all } from 'mathjs';

function App() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');

    const ops = ['/', '*', '+', '-', '.'];
    const math = create(all);

    const updateCalc = (value) => {
        if (
            ops.includes(value) &&
            (calc === '' || ops.includes(calc.slice(-1)))
        ) {
            return;
        }

        if (!ops.includes(value)) {
            try {
                setResult(math.evaluate(calc + value).toString());
            } catch (error) {
                // si hay un error, simplemente no hacemos nada
            }
        }
        setCalc(calc + value);
    };

    const calculate = () => {
        try {
            setCalc(math.evaluate(calc).toString());
        } catch (error) {
            // si hay un error, simplemente no hacemos nada
        }
    };

    const deleteLast = () => {
        if (calc === '') {
            return;
        }
        const value = calc.slice(0, -1);
        setCalc(value);
    };

    const crearDigitos = () => {
        const digitos = [];
        for (let i = 1; i < 10; i++) {
            digitos.push(
                <button onClick={() => updateCalc(i.toString())} key={i}>
                    {i}
                </button>
            );
        }
        return digitos;
    };

    return (
        <div className="App">
            <div className="calculadora">
                <div className="display">
                    <span className="result">{result && `(${result})`}</span> &nbsp;
                    <span className="operation">{calc || '0'}</span>
                </div>


                <div className="operadores">
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={() => updateCalc('-')}>-</button>
                    <button onClick={() => updateCalc('*')}>*</button>
                    <button onClick={() => updateCalc('/')}>/</button>

                    <button onClick={deleteLast}>CE</button>
                </div>

                <div className="numeros">
                    {crearDigitos()}
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>.</button>
                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
