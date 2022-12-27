import React from "react";
import "./style.css";
import Card from "./Card";

const Quote = ({Api}) => {
  

  return (
    <>
    <Card users={Api}/>
    </>
  );
};

export default Quote;