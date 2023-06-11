import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react'

const Loading = () => {
	return (
		<Box w='100vw' h='100vh'>
			<AbsoluteCenter>
				<Spinner
					size='xl'
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
				/>
			</AbsoluteCenter>
		</Box>
	)
}

export default Loading
