import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import style from "./common.module.css";
import Button from "@material-ui/core/Button";
import { Modal, Nav, Tabs } from "react-bootstrap";
import { Tab } from "bootstrap";
import Login from "../component/login";
import SignUp from "../component/signUp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("login");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();
  function validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  const login = (value) => {
    if (!value.email) {
      toast.error("Email can't be empty");
      return;
    }
    if (!validateEmail(value.email)) {
      toast.error("Email invalid");
      return;
    }
    if (!value.password) {
      toast.error("Password can't be empty");
      return;
    }
  
    axios
      .post(`http://localhost:4000/auth/login`, value)
      .then((res) => {
        if (res.data.status) {
          localStorage.token = res.data.token;
          localStorage.user = res.data.userName;
          localStorage.color = res.data.color;

          history.push("/list");
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  };
  const signUp = (value) => {
    if (!value.firstName) {
      toast.error("First Name can't be empty");
      return;
    }
    if (!value.lastName) {
      toast.error("Last Name can't be empty");
      return;
    }
    if (!value.userName) {
      toast.error("User Name can't be empty");
      return;
    }
 
    if (!value.email) {
      toast.error("Email can't be empty");
      return;
    }
    if (!validateEmail(value.email)) {
      toast.error("Email invalid");
      return;
    }
    if (!value.password) {
      toast.error("Password can't be empty");
      return;
    }
    axios
      .post(`http://localhost:4000/auth/signUp`, value)
      .then((res) => {
        toast.success(res.data.message);
        setActive("login");
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  };
  return (
    <div className={style.container}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={style.box}>
        <p className={style.welcome}>Welcome</p>
        <p>Login to use sketch</p>
        <button onClick={handleShow} className={style.btn}>
          Login
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sketch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.tab_box}>
            <Tabs
              activeKey={active}
              id="uncontrolled-tab-example"
              className="mb-3"
              onSelect={(key) => setActive(key)}
            >
              <Tab eventKey="login" title="login">
                <Login login={login} />
              </Tab>
              <Tab eventKey="signup" title="SignUp">
                <SignUp signUp={signUp} />
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
       
      </Modal>
    </div>
  );
};

export default Home;
