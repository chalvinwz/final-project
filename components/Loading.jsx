import { AbsoluteCenter, Box, Heading, Spinner, VStack } from '@chakra-ui/react'

const Loading = () => {
	return (
		<Box w='100vw' h='100vh'>
			<AbsoluteCenter>
				<VStack>
					<Heading>Model Loading</Heading>
					<Spinner
						size='xl'
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
					/>
				</VStack>
			</AbsoluteCenter>
		</Box>
	)
}

export default Loading
