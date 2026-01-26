"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const axios = require('axios').default;
export function FormLogin() {
  let [msError,setmsError] = useState("")

  let Route = useRouter()
   function Register(params) {
    Route.push("/register")
   }
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
     function LoginUser(params) {
      axios.post("http://localhost:3000/api/Login",data)
      .then(function(res){
        console.log(res.data.message)
        Route.push("/")
        setmsError("")
      })
      .catch(function(error){
        if(error){
          setmsError(error.response.data.message)
        }
      })
     }
LoginUser()

  };

  return (
    <Form className="flex w-96 flex-col gap-4 bg-gray-300 p-4 border-2 border-gray-500" onSubmit={onSubmit}    validationBehavior="aria">
      <TextField
        isRequired
        name="username"
        type="text"
        validate={()=>{
           if(msError){
          return msError
        }
        return null
        }}
       >
        <Label>Username</Label>
        <Input placeholder="Your username" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        isInvalid={msError}
        name="password"
        type="password"
        validate={() => {
         
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError  />
      
      </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button  variant="secondary" onClick={Register}>
          Register
        </Button>
      </div>
    </Form>
  );
}