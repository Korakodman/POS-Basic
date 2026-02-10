
import React from 'react'


export default function ItemList({item,index,onSelect}) {

  return (
   <div  className="p-2 flex justify-between hover:opacity-50"   onClick={() => onSelect(item)}>
                <h1>{index+1}. {item.name}</h1>
                <div className="flex w-60 p-2 justify-between">
                  <h1>{item.price}</h1>
                  <h1>{item.quality}</h1>
                </div>
              </div>
              
  )
}
