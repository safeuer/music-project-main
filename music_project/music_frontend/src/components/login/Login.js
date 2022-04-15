import React, { Component } from "react";
import { Link } from 'react-router-dom' ;
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onLoginClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
          <h1>Login</h1>
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
          <Button color = 'green' onClick={this.onLoginClick}>Login</Button>
          <p>
            Need an account? <Link to = '/signup'>Sign up here</Link>
          </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
