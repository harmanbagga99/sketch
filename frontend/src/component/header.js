import { Button } from "react-bootstrap";
import React, { Fragment, useEffect, useState } from "react";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import style from "./component.module.css";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const [name, setName] = useState("");
  let history = useHistory();

  useEffect(() => {
    setName(localStorage.user);
  }, []);
  const logout=()=>{
    localStorage.clear()
    history.push('/')
  }
  return (
    <Navbar style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <Navbar.Brand>Sketch</Navbar.Brand>
        <Navbar.Toggle />
        {props.userList && props.userList.length > 0 && (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              User
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {props.userList.map((el) => (
                <Dropdown.Item style={{color:el.color}} >{el.userName}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Logged in as: <a>{name}</a>   <Button size="sm" onClick={logout} variant="outline-info">Logout</Button>{' '}

          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
