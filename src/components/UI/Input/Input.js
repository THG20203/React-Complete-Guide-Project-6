import React, { useRef } from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
  return (
    <div
      className={`${classes.control} ${
        /* instead of emailIsValid, we have emailState is valid */
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        /* below, where I pass the value back into the input, we can have emailState.value */
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
