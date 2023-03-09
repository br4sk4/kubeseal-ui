import { Box, Center, Flex, Spacer } from "@hope-ui/solid"
import SealingForm from "./SealingForm";

function ViewContainer() {
    return (
        <Flex>
            <Spacer />
            <Center>
                <Box width="80%" minWidth="1344px" marginLeft="25px" marginRight="25px" height="calc(100vh - 60px)" paddingTop="25px" paddingBottom="25px">
                    <SealingForm />
                </Box>
            </Center>
            <Spacer />
        </Flex>
    )
}

export default ViewContainer