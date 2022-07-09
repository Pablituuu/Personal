import React from "react"
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { AuthType, SigninDto } from "~/interfaces/user"
import { useAppDispatch } from "~/hooks/useRedux"
import { signin } from "~/store/user/action"

interface Props {
  setAuthtype: React.Dispatch<React.SetStateAction<AuthType>>
  onClose: () => void
}
function Signin({ setAuthtype, onClose }: Props) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const dispath = useAppDispatch()
  const [error, setError] = React.useState<string>("")
  const [options, setOptions] = React.useState<SigninDto>({
    email: "",
    password: ""
  })
  const handleSignin = async () => {
    const response = await dispath(signin(options))
    if (response.payload) {
      onClose()
    } else {
      setError("Invalid username or password")
    }
  }
  return (
    <Box padding={"20px"} display="flex" flexDirection="column">
      Sign me into Drawify!
      <FormControl paddingTop="10px" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Username"
          value={options.email}
          onChange={(e) => setOptions({ ...options, email: e.target.value })}
        />
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={(e) => setOptions({ ...options, password: e.target.value })}
            value={options.password}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Box alignItems={"center"} paddingTop="15px" display="flex" flexDirection="column">
        <Button background={"orange"} color="white" w="80px" onClick={handleSignin}>
          Signin
        </Button>
        <Box paddingTop="15px">
          Not a member?
          <Button paddingLeft="5px" color="orange" variant={"link"} onClick={() => setAuthtype("signup")}>
            Sign Up Now!
          </Button>
          {error && <Box>{error}</Box>}
        </Box>
      </Box>
    </Box>
  )
}

export default Signin
