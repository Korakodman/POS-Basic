'use client'
import {Table} from "@heroui/react";
import useFetchData from "../hooks/useFetchData";
import { useEffect, useState } from "react";
export function TableUser() {

const {data,loading,error} = useFetchData("http://localhost:3000/api/GetUser")




  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header className="text-2xl">
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Password</Table.Column>
            <Table.Column>role</Table.Column>
          </Table.Header>
          <Table.Body>
           {data?.user?.map((user,index)=>[
             <Table.Row key={user._id}>
          <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.password}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
            </Table.Row>
           ])}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}