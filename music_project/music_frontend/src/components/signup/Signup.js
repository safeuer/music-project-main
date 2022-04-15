import React, { Component } from "react";
import { Link } from 'react-router-dom' ;
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      username: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    } ;
  };

  render() {
    return (
      <Container>
        <h1>Sign Up For BoomTree!</h1>

        <Row>
          <Col md='4'>
            <Form>
              <Form.Group controlId='usernameId'>
                <Form.Control
                  type = 'text'
                  name = 'username'
                  placeholder = 'enter username'
                  value = {this.state.username}
                  onChange={this.onChange}
                />
              </Form.Group>

              <Form.Group controlId='passwordId'>
                <Form.Control
                type = 'password'
                name = 'password'
                placeholder = 'enter password'
                value = {this.password}
                onChange = {this.onChange}
              />
              </Form.Group>
            </Form>
            <Button
              color='blue'
              onClick={this.onSignupClick}
              >Sign up</Button>
              <p>
                Already have an account? Log in <Link to='/login'>here</Link>
              </p>
          </Col>
        </Row>

      </Container>
    );
  }
}
export default Signup ;
