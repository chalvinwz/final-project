import { useState } from 'react'
import useDetect from '@/hooks/useDetect'
import Head from 'next/head'
import Webcam from 'react-webcam'

import {
	Heading,
	Button,
	Stack,
	Container,
	Flex,
	Spacer,
	Center,
	Text,
	Box,
	VStack,
	LightMode,
} from '@chakra-ui/react'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import TextToSpeech from '@/components/TextToSpeech'
import Loading from '@/components/Loading'
import HandShapeDictionary from '@/components/HandShapeDictionary'

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

	function handleDelete() {
		setTextArray([])
		setText('')
	}

	function handleDeleteLastLetter() {
		setTextArray([])
		setText((prevText) => prevText.slice(0, -1))
	}

	if (!modelIsLoaded) {
		return <Loading />
	}

	return (
		<>
			<Head>
				<title>American Sign Language Alphabet Translation Application</title>
			</Head>

			<Container centerContent h='100vh' w='100vw'>
				{camIsOn && (
					<>
						<Webcam className='webcam' ref={webcamRef} />

						<canvas className='canvas' ref={canvasRef} />
					</>
				)}

				<Flex w='100vw' pos='fixed' top={4} zIndex={11}>
					<Button
						ml={4}
						leftIcon={
							camIsOn ? <ViewIcon size={20} /> : <ViewOffIcon size={20} />
						}
						onClick={handleWebcam}
						colorScheme='pink'
					>
						Webcam
					</Button>

					<Spacer />

					<HandShapeDictionary />
				</Flex>

				<Flex
					flexDir='column'
					zIndex={10}
					w='100vw'
					h='100vh'
					justify='center'
					align='center'
				>
					<VStack pos='fixed' top={4}>
						<Heading as='h1' size='xl'>
							Keep hand steady in screen up to the count of 9
						</Heading>

						{textArray.length !== 0 ? (
							<>
								<Heading as='h1' size='2xl'>
									{textArray.length}
								</Heading>
							</>
						) : (
							<Heading as='h1' size='2xl'>
								0
							</Heading>
						)}
					</VStack>

					<Center pos='fixed' bottom={20} w='70vw'>
						<Text as='b' fontSize='4xl'>
							{text}
						</Text>
					</Center>
				</Flex>

				<LightMode>
					<Stack
						zIndex={10}
						pos='fixed'
						bottom={8}
						spacing={4}
						direction='row'
						align='center'
					>
						<Button colorScheme='red' onClick={handleDeleteLastLetter}>
							Delete Last Letter
						</Button>
						<Button colorScheme='red' onClick={handleDelete}>
							Delete
						</Button>

						<TextToSpeech text={text} />
					</Stack>
				</LightMode>
			</Container>
		</>
	)
}
