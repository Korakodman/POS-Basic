'use client'
import {Button, Table} from "@heroui/react";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import {Modal} from "@heroui/react";
import ModalUser from "./ModalUser";
export function TableUser({TableOption}) {

const {data,loading,error} = useFetchData("http://localhost:3000/api/GetUser")
const [dataUser,SetdataUser] = useState([])
useEffect(()=>{
  if(data){
  SetdataUser(data.user)
}
},[data])
const {HandleEdit,handleInput,setuser,user,isOpen,setIsOpen,Edit} = TableOption
const Modal = {HandleEdit,handleInput,setuser,user,isOpen,setIsOpen,Edit}
// const handleSubmitForm = ()=>{
//  console.log(user)
// }
  return (
    <Table>
      <Table.ScrollContainer >
        <Table.Content aria-label="Team members" className="min-w-[600px] ">
          <Table.Header className="">
            <Table.Column isRowHeader>ชื่อ</Table.Column>
            <Table.Column>สิทธิ</Table.Column>
            <Table.Column>แก้ไข</Table.Column>
          </Table.Header>
          <Table.Body>
           {dataUser.map((user,index)=>[
             <Table.Row key={user._id}>
          <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell><Button onClick={()=>HandleEdit(user)}>แก้ไข</Button></Table.Cell>
            </Table.Row>
           ])}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
       <ModalUser modal={Modal}/>
    </Table>
    
  );
}