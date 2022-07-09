import React, { useState } from "react"
import { Box, Button, FormControl, Input, InputGroup, InputRightElement, FormLabel, Flex } from "@chakra-ui/react"
// import { signup } from "../../store/user/actions"
// import { useAppDispatch } from "../../store/store"
import { AuthType, SignupDto } from "../../interfaces/user"

interface Props {
  setAuthtype: React.Dispatch<React.SetStateAction<AuthType>>
  onClose: () => void
}

function Signup({ setAuthtype, onClose }: Props) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [error, setError] = React.useState<string>("")
  const [options, setOptions] = React.useState<SignupDto>({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  })

  // const dispatch = useAppDispatch()
  const handleSignup = async () => {
    // const response = await dispatch(signup(options))
    // if (response.payload) {
    //   onClose()
    // } else {
    //   setError("Something went wrong")
    // }
  }

  let [password, setPassword] = useState("")
  password = options.password
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false
  })

  const handleOnChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleOnKeyUp = (e: any) => {
    const { value } = e.target
    const capsLetterCheck = /[A-Z]/.test(value)
    const numberCheck = /[0-9]/.test(value)
    const pwdLengthCheck = value.length >= 8
    const specialCharCheck = /[!@#$%^&*]/.test(value)
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck
    })
  }

  return (
    <Box padding={"20px"}>
      Draw your story like a pro!
      <FormControl paddingTop={"10px"} isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="First Name"
          value={options.first_name}
          onChange={(e) => setOptions({ ...options, first_name: e.target.value })}
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Last Name"
          value={options.last_name}
          onChange={(e) => setOptions({ ...options, last_name: e.target.value })}
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          placeholder="example@example.us"
          value={options.email}
          onChange={(e) => setOptions({ ...options, email: e.target.value })}
        />
      </FormControl>
      <FormControl paddingBottom={"10px"} mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={(e) => {
              handleOnChange
              setOptions({ ...options, password: e.target.value })
            }}
            value={options.password}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onKeyUp={handleOnKeyUp}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Flex alignItems={"center"} flexDirection={"column"}>
        <Button background={"orange"} color="white" onClick={handleSignup}>
          Join Drawify
        </Button>
        <Box paddingTop={"10px"}>
          Already a memer?
          <Button paddingLeft="5px" color="orange" variant={"link"} onClick={() => setAuthtype("signin")}>
            Signin
          </Button>
          {error && <Box>{error}</Box>}
        </Box>
      </Flex>
    </Box>
  )
}

export default Signup
