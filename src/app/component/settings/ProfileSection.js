import axios from "axios";
import SectionCard from "./SectionCard";
import { Button } from "@heroui/react";
import { ModalChangePassword } from "./ModalChangePassword";
export default function ProfileSection({ user }) {
  function handdleChangePassword(){
    
  }

  return (
    <SectionCard title="Profile">
      <p>Username: <b>{user?.username}</b></p>
      <p>Role: <b>{user?.role}</b></p>
    <ModalChangePassword/>
    </SectionCard>
  );
}