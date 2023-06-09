import { useState } from 'react'
import useDetect from '@/hooks/useDetect'
import Head from 'next/head'
import Webcam from 'react-webcam'

import ColorModeToggle from '@/components/ColorModeToggle'
import HandSignDictionary from '@/components/HandSignDictionary'

import {
	Heading,
	Button,
	Stack,
	Container,
	Box,
	Spinner,
	AbsoluteCenter,
	Flex,
	ButtonGroup,
	Spacer,
	Center,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import TextToSpeech from '@/components/TextToSpeech'

export default function Home() {
	const [camIsOn, setCamIsOn] = useState('on')

	const [
		text,
		setText,
		textArray,
		setTextArray,
		modelIsLoaded,
		webcamRef,
		canvasRef,
	] = useDetect()

	function handleWebcam() {
		if (camIsOn === 'on') {
			setCamIsOn('off')
		} else {
			setCamIsOn('on')
		}
	}

	function handleRemoveWord() {
		setTextArray([])
		setText('')
	}

	if (!modelIsLoaded) {
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

	return (
		<>
			<Head>
				<title>Hand Sign Translation App</title>
			</Head>

			<Container centerContent h='100vh' w='100vw'>
				{camIsOn === 'on' && (
					<>
						<Webcam className='webcam' ref={webcamRef} />

						<canvas className='canvas' ref={canvasRef} />
					</>
				)}

				{modelIsLoaded && (
					<Center zIndex={10} w='100vw'>
						<Heading as='h1' size='xl'>
							Keep your hand in screen until 10
						</Heading>
					</Center>
				)}

				{textArray.length !== 0 ? (
					<>
						<Heading as='h1' size='2xl' zIndex={10}>
							{textArray.length}
						</Heading>
						<Heading as='h1' size='2xl' zIndex={10}>
							{text}
						</Heading>
					</>
				) : (
					<Heading as='h1' size='2xl' zIndex={10}>
						0
					</Heading>
				)}

				<Flex w='100vw' pos='fixed' top={4} zIndex={10}>
					<Button
						ml={4}
						leftIcon={
							camIsOn === 'on' ? (
								<ViewIcon size={20} />
							) : (
								<ViewOffIcon size={20} />
							)
						}
						onClick={handleWebcam}
						colorScheme='pink'
					>
						Camera
					</Button>

					<Spacer />

					<ButtonGroup mr={4} spacing={4}>
						<ColorModeToggle />

						<HandSignDictionary />
					</ButtonGroup>
				</Flex>

				<Stack
					zIndex={10}
					pos='fixed'
					bottom={8}
					spacing={4}
					direction='row'
					align='center'
				>
					<Button colorScheme='red' onClick={handleRemoveWord}>
						Remove Word
					</Button>

					<TextToSpeech text={text} />
				</Stack>
			</Container>
		</>
	)
}
