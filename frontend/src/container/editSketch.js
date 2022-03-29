import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Canvas from "../component/canvas";
import Header from "../component/header";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";

const EditSketch = () => {
  let { id } = useParams();
  let history = useHistory();

  const [sketchId, setSketchId] = useState();
  const [userList, setUserList] = useState([]);
  const [sketchData, setSketchData] = useState();

  useEffect(() => {
    if (id) {
      setSketchId(id);
      getSketch(id);
    }
  }, [id]);
  const saveSketch = (value) => {
    let payload = {
      sketchData: JSON.parse(value),
      color: localStorage.color,
      user: localStorage.user,
    };

    axios
      .post(`http://localhost:4000/sketch/update/${sketchId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        if (res.data.status) {
          history.push("/list");
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.message);

      });
  };
  const getSketch = (id) => {
    axios
      .get(`http://localhost:4000/sketch/getById/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.token,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setSketchData(res.data.data.sketchData);
          // setSk(res.data.sketchData)
          setUserList(res.data.data.userList);
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  };
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Header userList={userList} />
      <Canvas
        sketchData={sketchData}
        sketchId={sketchId}
        saveSketch={saveSketch}
      />
    </div>
  );
};

export default EditSketch;
