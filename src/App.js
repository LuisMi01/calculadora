import { useState } from 'react';
import { create, all } from 'mathjs';
import iPhoneFrame from './;


function App() {
    const [calc, setCalc] = useState('');

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


    const deleteAll = () => {
        setCalc('');
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

    const calculatePercentage = () => {
        try {
            const parsedCalc = math.evaluate(calc);
            const percentage = parsedCalc / 100;
            setCalc(percentage.toString());
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="App">
            <div className="calculadora">
                <img src={iPhoneFrame} alt="iPhone Frame" /> {/* <img src={iPhoneFrame} alt="iPhone Frame" /> */}
                <div className="display">
                    <span className="operation">{calc || '0'}</span>
                </div>
                <div className="operadores-especiales">
                    <button id={'CE'} onClick={deleteAll}>AC</button>
                    <button>+/-</button>
                    <button onClick={() => calculatePercentage()}>%</button>

                    <button id="division" onClick={() => updateCalc('/')}>/</button>

                </div>
                <div className="display-principal">
                <div className="numeros">
                    {crearDigitos()}
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>,</button>
                </div>
                <div className="operadores">
                    <button onClick={() => updateCalc('*')}>x</button>
                    <button onClick={() => updateCalc('-')}>-</button>
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={calculate}>=</button>
                </div>
                </div>


            </div>
        </div>
    );
}

export default App;
