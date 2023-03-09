import {Box, Flex, Heading, HStack, Image, Text} from "@hope-ui/solid"
import secretImage from '../assets/secret2.png'

function AppBar() {
    return (
        <Box height="60px" width="100vw" minWidth="1394px">
            <Flex bg="$primary" css={{ paddingTop: "5px", paddingBottom: "5px", paddingLeft: "10px", paddingRight: "10px" }}>
                <Box p="$1" color="white" paddingTop="6px">
                    <Heading size="xl" fontWeight="$bold">
                        <HStack spacing="15px">
                            <Image boxSize="40px" src={secretImage} alt="secret" objectFit="cover" />
                            <Text css={{height: "30px", lineHeight: "30px"}}>WebSeal</Text>
                        </HStack>
                    </Heading>
                </Box>
            </Flex>
        </Box>
    )
}

export default AppBar