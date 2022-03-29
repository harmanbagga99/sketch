import React, { useState, useEffect } from "react";
import Header from "../component/header";
import axios from "axios";
import style from "./common.module.css";
import { Button, Col, Container, Row, ToastContainer } from "react-bootstrap";
import CanvasDraw from "react-canvas-draw";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListSketch = (props) => {
  const [sketchList, setSketchList] = useState([]);
  useEffect(() => {
    listSketch();
  }, []);
  const listSketch = () => {
    axios
      .get(`http://localhost:4000/sketch/getList`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setSketchList(res.data.data.reverse());
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.message);

      });
  };
  return (
    <div>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={style.listContainer}>
        <Container>
          <Link to="/new">
            <Button className={style.add} variant="outline-info">
              Add New Sketch
            </Button>{" "}
          </Link>
          <Row>
            {sketchList &&
              sketchList.length > 0 &&
              sketchList.map((q) => {
                return (
                  <Col xs={12} sm={6} md={4}>
                    <div className={style.listItem}>
                      <div className={style.listHead}>
                        <p className={style.listText}>{q.createdBy} </p>
                        <Link to={`/edit/${q._id}`}>
                          <Button
                            className={style.listBtn}
                            size="sm"
                            variant="primary"
                          >
                            Edit
                          </Button>
                        </Link>
                      </div>

                      <CanvasDraw
                        disabled
                        canvasWidth={200}
                        canvasHeight={200}
                        saveData={JSON.stringify(q.sketchData)}
                      />
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ListSketch;
