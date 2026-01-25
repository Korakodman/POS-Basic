"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const axios = require('axios').default;
export function FormRegis() {
   const [msError,setmsError] = useState({})

   let Route = useRouter()
   function login(params) {
    Route.push("/login")
   }
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
  
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    if(data.repeatPassword != data.password){
        console.log("รหัสไม่ตรงกัน")
        return 
    }
   function RegisterUser(params) {
     axios.post("http://localhost:3000/api/Register",data)
    .then(function (res) {
      console.log(res.data.message)
    })
    .catch(function(error){

       setmsError(error.response.data.message)
    })
   }
   RegisterUser()
  };

  return (
    <Form className="flex w-96 flex-col gap-4 bg-gray-300 p-4 border-2 border-gray-500" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="username"
        type="text"
        validate={(value)=>{
         if(!value){
          return "username must have"
         }
        }}
      >
        <Label>username</Label>
        <Input placeholder="Your Username" />
        <FieldError  />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        name="password"
        type="text"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

       <TextField
        isRequired
        minLength={8}
        name="repeatPassword"
        type="text"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
        
          return null;
        }}
      >
        <Label>Repeat Password</Label>
        <Input placeholder="Repeat Password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button  variant="secondary" onClick={login}>
          Login
        </Button>
      </div>
    </Form>
  );
}