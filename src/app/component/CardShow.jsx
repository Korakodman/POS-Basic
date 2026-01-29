import React from 'react'
import {Card} from "@heroui/react";

export default function CardShow({Title,Sale,style}) {
  return (
     <Card className={`w-[400px] ml-2  mr-2 text-center ${style} h-[100px] `}  variant="default">
           <Card.Header>
             <Card.Title className='text-3xl font-bold'>{Title}</Card.Title>
           </Card.Header>
           <Card.Content >
             <p className='text-2xl'>{Sale}</p>
           </Card.Content>
         </Card>
  )
}
