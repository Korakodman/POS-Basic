"use client";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import { FormChangePassword } from "./FormChangePassword";

export function ModalChangePassword() {
  return (
    <Modal>
      <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Change Password</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[450px]">
            <Modal.CloseTrigger />
            <Modal.Header>
             
              <Modal.Heading>Reset Password</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <FormChangePassword/>
            </Modal.Body>
            <Modal.Footer>
            
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}