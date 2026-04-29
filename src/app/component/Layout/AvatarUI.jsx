import {Avatar, Card,Label,Description} from "@heroui/react";

export function AvatarUI({user}) {
  return (
    <div className="flex justify-center px-1 py-1 mb-4 "> 
        <div className="flex flex-col ">
          <Label className="font-bold uppercase">{user.username}</Label>
          <Description className="">{user.role}</Description>
        </div>
      
    </div>
  );
}