"use client"
import SettingsLayout from "../component/settings/SettingsLayout";
import ProfileSection from "@/app/component/settings/ProfileSection";
import ShopSection from "../component/settings/ShopSection";
import SecuritySection from "../component/settings/SecuritySection";
import axios from "axios";
import { useEffect, useState } from "react";
import SectionCard from "../component/settings/SectionCard";
export default function Page() {
  const [user,Setuser] = useState(null)
 useEffect(()=>{
  axios.get("http://localhost:3000/api/me")
  .then(respone=>{
    Setuser(respone.data.user)
  }).catch(error=>{
    console.log(error)
  })
 },[])
 console.log(user)
  return (
    <SettingsLayout>
      <ProfileSection user={user} />
      <ShopSection />
      <SectionCard title={"test"}>
        test
      </SectionCard>
      <SecuritySection />
    </SettingsLayout>
  );
}