'use client'
import {Button, Table} from "@heroui/react";
import useFetchData from "../../hooks/useFetchData";
import ModalUser from "./ModalUser";
import { User } from "lucide-react";
export function TableUser({TableOption}) {

const {data} = useFetchData("http://localhost:3000/api/admin/GetUser")
const dataUser = data?.user || []
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
            <Table.Column isRowHeader className="flex"><User size={16}/>ชื่อ</Table.Column>
            <Table.Column>สิทธิ</Table.Column>
            <Table.Column>แก้ไข</Table.Column>
          </Table.Header>
          <Table.Body>
           {dataUser.map((user)=> (
             <Table.Row key={user._id}>
          <Table.Cell > {user.username}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell><Button onClick={()=>HandleEdit(user)}>แก้ไข</Button></Table.Cell>
            </Table.Row>
           ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
       <ModalUser modal={Modal}/>
    </Table>
    
  );
}