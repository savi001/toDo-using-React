import React, { useState } from "react";

const List = (props) => {
  const [submit, setSubmit] = useState(false);
  function Handleclick() {
    setSubmit((prevvalue) => {
      if (prevvalue === true) {
        return false;
      } else {
        return true;
      }
    });
    setTimeout(function () {
      props.onChecked(props.id);
      setSubmit(false);
    }, 1300);
  }
  function HandleKey(event) {
    const key = event.KeyCode;
    console.log(key);
  }
  return (
    <li
      style={submit ? { textDecoration: "line-through" } : null}
      onClick={Handleclick}
    >
      {props.text}
    </li>
  );
};
export default List;
