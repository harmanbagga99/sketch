import React, { Fragment, useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import Canvas from "../component/canvas";
import Header from "../component/header";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddSketch = () => {
  let history = useHistory();
  const saveSketch = (value) => {
    let payload = {
      createdBy: localStorage.user,
      sketchData: JSON.parse(value),
      color:localStorage.color
    };
   
    axios
      .post(`http://localhost:4000/sketch/add`,payload,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.token
      },
      })
      .then((res) => {
        if (res.data.status) {
          history.push("/list");
        }
      })
      .catch(({ response }) => {
        console.log("er", response);
      });
  };
  
  return (
    <div>
      <Header />
      <Canvas saveSketch={saveSketch} />
    </div>
  );
};

export default AddSketch;
