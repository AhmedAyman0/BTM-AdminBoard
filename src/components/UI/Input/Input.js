import React from "react";

const Input = props => {
  let inputEl = null;
  let inputStyle=['form-control'];
  if(props.submitted && props.inValid){
      inputStyle.push('is-invalid')
  }
  if(props.submitted && !props.inValid){
    if(inputStyle.length>1)
    inputStyle.pop()
}
  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          {...props.elementConfig}
          className={inputStyle.join(' ')}
          value={props.value}
          onChange={props.changed}
        ></input>
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          {...props}
          className={inputStyle.join(' ')}
          value={props.value}
        
          onChange={props.changed}
        ></textarea>
      );
      break;
    case "select":
      inputEl = (
        <select 
        onChange={props.changed}
        >
        {props.elementConfig.options.map(option=>(
            <option value={option.value}>{option.displayValue}</option>
        ))}
        </select>
      );
      break;
    default:
      break;
  }
  const displayError=(message,inValid)=>{
      let error = null;
      if(inValid){
       error = (
          <div className='invalid-feedback'>
              {message}
          </div>
      )
      }
      return error;
  }
  return (
    <div className="form-group">
      <label htmlFor={props.id} className="">
        {props.label}
      </label>
      {inputEl}
      {displayError(props.error,props.inValid)}
    </div>
  );
};

export default Input;
