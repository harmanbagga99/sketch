import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import CanvasDraw from "react-canvas-draw";
import { Link,useHistory } from "react-router-dom";
import style from "./component.module.css";
import axios from "axios";

const Canvas = (props) => {
  const [value, setValue] = useState();
  const history=useHistory()
  const canvasRef = useRef();
  const getData = () => {
    props.saveSketch(canvasRef.current.getSaveData());
  };
  useEffect(() => {
    if (props.sketchId) {
      canvasRef.current.loadSaveData(
        JSON.stringify(props.sketchData)
      );
    }
  }, [props.sketchData]);
  const getSketch = (id) => {
    axios
      .get(`http://localhost:4000/sketch/getById/${id}`)
      .then((res) => {
        if (res.data.status) {
          canvasRef.current.loadSaveData(
            JSON.stringify(res.data.data.sketchData)
          );
        }
      })
      .catch(({ response }) => {
        console.log("er", response);
      });
  };
  return (
    <div className={style.canvasContainer}>
      <div>
        <Button onClick={getData} variant="primary">
          Save
        </Button>{" "}
        <Link>
          <Button variant="primary" onClick={()=>history.goBack()}>Go back</Button>{" "}
        </Link>
      </div>

      <div>
        <CanvasDraw
          className={style.canvasBox}
          ref={canvasRef}
          brushColor={localStorage.color}
          brushRadius={10}
          lazyRadius={12}
          canvasWidth={400}
          canvasHeight={400}
          hideGrid={true}
        />
      </div>
    </div>
  );
};

export default Canvas;
