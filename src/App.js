import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [changedValue, setChangedValue] = useState();
  const [flag, setFlag] = useState(true);
  const [values, setValues] = useState({ input: '', inputType: 'meter', result: '', resultType: 'centimeter' });

  /**
   * 
   * @param {*} name the input fields
   * sets the states values
   */
  const getHandler = (name) => {
    return (event) => {
      if (name === 'input' || name === 'result') {
        if (isNaN(event.target.value)) return false;
      }
      setChangedValue(name);
      setFlag(!flag);
      setValues({ ...values, [name]: event.target.value });
    };
  };

  /**
   * 
   * @param {*} value 
   * @param {*} type meter / kilometer / centimeter
   * @returns Millimeter value
   */
  const convertToMillimeter = (value, type) => {
    let milli;
    if (type === 'meter') {
      milli = value * 1000;
    } else if (type === 'kilometer') {
      milli = value * 1000000;
    } else if (type === 'centimeter') {
      milli = value * 10;
    }
    return milli;
  };

  /**
   * 
   * @param {*} milli 
   * @param {*} type meter / kilometer / centimeter
   * @returns converted type value
   */
  const convertFromMillimeter = (milli, type) => {
    let value;
    if (type === 'meter') {
      value = milli / 1000;
    } else if (type === 'kilometer') {
      value = milli / 1000000;
    } else if (type === 'centimeter') {
      value = milli / 10;
    }
    return value;
  };

  useEffect(() => {
    if (changedValue === 'input' || changedValue === 'inputType') {
      // convert input into millimeter
      let input_Milli = convertToMillimeter(values.input, values.inputType);
      // convert into result type
      let _result = convertFromMillimeter(input_Milli, values.resultType);
      setValues({ ...values, result: _result });
    } else if (changedValue === 'result' || changedValue === 'resultType') {
      // convert input into millimeter
      let result_Milli = convertToMillimeter(values.result, values.resultType);
      let _input = convertFromMillimeter(result_Milli, values.inputType);
      setValues({ ...values, input: _input });
    }
  }, [flag])

  return (
    <div>
      <div className='container'>
        <h2>Unit Converter</h2>
        <input type='text' value={values.input} onChange={getHandler('input')} />
        <span>=</span>
        <input type='text' value={values.result} onChange={getHandler('result')} /><br />
        <div className='typescontainer'>
          <select value={values.inputType} onChange={getHandler('inputType')} >
            <option value="meter" >Meter</option>
            <option value="kilometer" >Kilometer</option>
            <option value="centimeter" >Centimeter</option>
          </select>
          <select value={values.resultType} className='resultType' onChange={getHandler('resultType')} >
            <option value="centimeter" >Centimeter</option>
            <option value="meter" >Meter</option>
            <option value="kilometer" >Kilometer</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
