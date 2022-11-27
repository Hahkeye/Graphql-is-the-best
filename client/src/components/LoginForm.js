// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
// import { loginUser } from '../utils/API';
// import Auth from '../utils/auth';
const { LOGIN_USER } = require('../utils/mutations');

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  
  return (
    <>
      <Form noValidate validated={validated} onSubmit={async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // console.log(e);
        // console.log("password: ",e.currentTarget[1].value);
        // console.log("Email: ",e.currentTarget[0].value);
        if(!data){await loginUser({variables:{email: e.currentTarget[0].value, password: e.currentTarget[1].value}}) }
        console.log(data);
        if(data.login.token){
          localStorage.setItem("id_token",data.login.token);
        }else{
          localStorage.setItem("id_token",null);
        }
        window.location.assign("/");
        
        

      }}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
