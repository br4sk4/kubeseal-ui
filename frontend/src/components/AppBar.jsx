import {
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    Spacer,
    Text,
    useColorMode,
} from "@hope-ui/solid"
import secretImage from "../assets/secret.png"
import FormButton from "../widgets/FormButton"
import { FiMoon, FiSun } from "solid-icons/fi"
import { createMemo } from "solid-js"

function AppBar() {
    const { colorMode, toggleColorMode } = useColorMode()

    const colorModeIcon = createMemo(() =>
        colorMode() === "dark" ? <FiMoon /> : <FiSun />
    )

    return (
        <Box height="60px" width="100vw" minWidth="1394px">
            <Flex
                bg="$primary"
                css={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                }}>
                <Box p="$1" color="white" paddingTop="6px">
                    <Heading size="xl" fontWeight="$bold">
                        <HStack spacing="15px">
                            <Image
                                boxSize="40px"
                                src={secretImage}
                                alt="secret"
                                objectFit="cover"
                            />
                            <Text css={{ height: "30px", lineHeight: "30px" }}>
                                KubeSeal UI
                            </Text>
                        </HStack>
                    </Heading>
                </Box>
                <Spacer />
                <Box p="$1" color="white" paddingTop="6px">
                    <FormButton
                        width="40px"
                        height="40px"
                        icon={colorModeIcon}
                        onClick={toggleColorMode}
                    />
                </Box>
            </Flex>
        </Box>
    )
}

export default AppBar
