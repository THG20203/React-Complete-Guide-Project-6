import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        /* instead of emailIsValid, we have emailState is valid */
        emailState.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor="email">E-Mail</label>
      <input
        type="email"
        id="email"
        /* below, where I pass the value back into the input, we can have emailState.value */
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
      />
    </div>
  );
};

export default Input;
