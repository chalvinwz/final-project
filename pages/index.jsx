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
	Flex,
	ButtonGroup,
	Spacer,
	Center,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import TextToSpeech from '@/components/TextToSpeech'
import Loading from '@/components/Loading'

export default function Home() {
	const [camIsOn, setCamIsOn] = useState(true)

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
		if (camIsOn) {
			setCamIsOn(false)
		} else {
			setCamIsOn(true)
		}
	}

	function handleRemoveWord() {
		setTextArray([])
		setText('')
	}

	if (!modelIsLoaded) {
		return <Loading />
	}

	return (
		<>
			<Head>
				<title>Hand Sign Translation App</title>
			</Head>

			<Container centerContent h='100vh' w='100vw'>
				<Flex w='100vw' pos='fixed' top={4} zIndex={10}>
					<Button
						ml={4}
						leftIcon={
							camIsOn ? <ViewIcon size={20} /> : <ViewOffIcon size={20} />
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

				{camIsOn && (
					<>
						<Webcam className='webcam' ref={webcamRef} />

						<canvas className='canvas' ref={canvasRef} />
					</>
				)}

				{modelIsLoaded && (
					<Center zIndex={9} w='100vw'>
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
