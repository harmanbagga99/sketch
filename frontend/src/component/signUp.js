import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";

const SignUp = (props) => {
  const [signUpDetail, setSignUpDetail] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
  });

  const changeValue = (text, value) => {
    setSignUpDetail((prev) => {
      return { ...prev, [text]: value };
    });
  };
  const onSubmit = () => {
    props.signUp(signUpDetail);
  };
  return (
    <Fragment>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={signUpDetail.firstName}
            onChange={(event) => changeValue("firstName", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={signUpDetail.lastName}
            onChange={(event) => changeValue("lastName", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Name"
            value={signUpDetail.userName}
            onChange={(event) => changeValue("userName", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={signUpDetail.email}
            onChange={(event) => changeValue("email", event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={signUpDetail.password}
            onChange={(event) => changeValue("password", event.target.value)}
          />{" "}
        </Form.Group>
      </Form>
      <Button className="w-100" variant="primary" onClick={onSubmit}>
        SignUp
      </Button>
    </Fragment>
  );
};

export default SignUp;
