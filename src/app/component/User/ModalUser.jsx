import React from 'react'
import { Modal,Button } from '@heroui/react'
import { RadioUser } from './RadioUser'
import { useState } from 'react'
export default function ModalUser({modal}) {

    const {handleInput,isOpen,setIsOpen,user,Edit} = modal

  const handleFormSubmit = (e)=>{
    e.preventDefault()
    console.log(Edit)
  }

  return (
     <Modal  isOpen={isOpen} onOpenChange={setIsOpen}>
                  <Modal.Backdrop>
                    <Modal.Container>
                      <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                          <Modal.Heading>แก้ไขผู้ใช้</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body >
                          <form onSubmit={(e)=>handleFormSubmit(e)} >
                            <h1>Username</h1>
                           <input value={Edit.username } className="p-2 border-2 border-gray-200 mt-2" name="username" onChange={(e)=>handleInput(e)}></input>
                            <h1>Password</h1>
                            <input value={Edit.password} name="password" className="p-2 border-2 border-gray-200 mt-2" onChange={(e)=>handleInput(e)}></input>
                      
                         <div className='mb-2 mt-2'>
                         <RadioUser handleInput={handleInput} Edit={Edit}/>
                          </div>
                          <Button className="w-full"  variant='primary' type="submit">
                            ยืนยัน
                          </Button>
                          </form>
                        </Modal.Body>
                        <Modal.Footer>
                           
                          <Button className="w-full" slot="close" variant='danger' >
                            ปิด
                          </Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>
  )
}
