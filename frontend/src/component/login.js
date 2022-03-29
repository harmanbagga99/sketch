import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = (props) => {
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const changeValue = (text, value) => {
    setLoginDetail((prev) => {
      return { ...prev, [text]: value };
    });
  };
  const onSubmit = () => {
    props.login(loginDetail)
  };
  return (
    <Fragment>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={loginDetail.email}
            onChange={(event) => changeValue("email", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={loginDetail.password}
            onChange={(event) => changeValue("password", event.target.value)}
          />{" "}
        </Form.Group>
      </Form>
      <Button className="w-100" variant="primary" onClick={onSubmit}>
        Login
      </Button>
    </Fragment>
  );
};

export default Login;
