import {useEffect, useState} from 'react';
import { create, all } from 'mathjs';
import iPhoneFrame from '/Users/luismiguelurbez/Documents/GitHub/calculadora/src/Iphone_frame.png';

alert("Bienvenido al trabajo de Luis Miguel Urbez, para usar la calculadora, simplemente pulse los botones y disfrute de la experiencia.");

function App() {
    const [calc, setCalc] = useState('');
    const [displayValue, setDisplayValue] = useState('');
    const [displayClass, setDisplayClass] = useState('operation');

    const ops = ['/', '*', '+', '-', '.'];
    const math = create(all);

    useEffect(() => {
        if (calc.length > 8) {
            setDisplayClass('operation small');
            setDisplayValue(convertToExponential(calc));
        } else {
            setDisplayClass('operation');
            setDisplayValue(calc);
        }
    }, [calc]);


    const convertToExponential = (value) => {
        const num = parseFloat(value);
        return num.toExponential(0);
    };


    const updateCalc = (value) => {
        if (ops.includes(value) && (calc === '' || ops.includes(calc.slice(-1)))) {
            return;
        }

        if (!ops.includes(value)) {
            try {

            } catch (error) {
                console.log(error);
            }
        }
        setCalc(calc + value);
    };


    const calculate = () => {
        try {
            setCalc(math.evaluate(calc).toString());
        } catch (error) {
           console.log(error)
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

    const cambiarSigno = () => {
        setCalc(prevCalc => {
            if (prevCalc === '') {
                return '';
            }
            const firstChar = prevCalc.charAt(0);
            if (firstChar === '-') {
                return prevCalc.slice(1);
            } else {
                return '-' + prevCalc;
            }
        });
    };



    return (
        <div className="App">
            <img src={iPhoneFrame} alt="iPhone Frame" /> { <img src={iPhoneFrame} alt="iPhone Frame" />}
            <div className="calculadora">
                <div className="display">
                    <span className={displayClass}>{displayValue || '0'}</span>
                </div>
                <div className="operadores-especiales">
                    <button id={'CE'} onClick={deleteAll}>AC</button>
                    <button onClick={() => cambiarSigno()}>+/-</button>
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
