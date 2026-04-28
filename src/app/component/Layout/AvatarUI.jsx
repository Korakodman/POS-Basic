import {Avatar, Card} from "@heroui/react";

export function AvatarUI() {
  return (
    <div className="flex flex-wrap "> 
      <Card className="w-[200px] ">
        <Card.Header>  
           
          <Card.Title className="flex">
             <Avatar aria-label="Martha's profile picture" className="size-1">
            <Avatar.Image
              alt="Martha's avatar"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
            />
            <Avatar.Fallback className="text-xs">IH</Avatar.Fallback>
          </Avatar>Indie Hackers</Card.Title>
          <Card.Description>148 members</Card.Description>
        </Card.Header>
      </Card>
    </div>
  );
}