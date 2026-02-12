"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

export function MoDalUI({isOpen,setIsOpen,selectedItem,DeleteOption}) {
  return (
   <Modal  isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>ลบรายการหรือไม่?</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <h1>
                 {selectedItem?.name}
                </h1>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close" variant='danger' onClick={()=>DeleteOption(selectedItem?.productId)}>
                  ลบ
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
  
  );
}