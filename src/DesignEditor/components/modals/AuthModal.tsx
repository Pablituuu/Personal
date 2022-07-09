import React from "react"
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react"
import Signin from "~/components/Auth/Signin"
import Signup from "~/components/Auth/Signup"
import { AuthType } from "~/interfaces/user"

function SigninModal({ isOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void }) {
  const [authType, setAuthType] = React.useState<AuthType>("signin")
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {authType === "signin" ? (
            <Signin onClose={onClose} setAuthtype={setAuthType} />
          ) : (
            <Signup onClose={onClose} setAuthtype={setAuthType} />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SigninModal
