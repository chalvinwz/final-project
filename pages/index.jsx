import { useState } from 'react'
import useDetect from '@/hooks/useDetect'
import Head from 'next/head'
import Webcam from 'react-webcam'

import ColorModeToggle from '@/components/ColorModeToggle'
import HandSignImage from '@/components/HandSignImage'

import { Heading, Button, Stack, Container, Box } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function Home() {
	const [camState, setCamState] = useState('on')

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
		if (camState === 'on') {
			setCamState('off')
		} else {
			setCamState('on')
		}
	}

	function handleRemoveWord() {
		setTextArray([])
		setText('')
	}

	return (
		<>
			<Head>
				<title>Hand Sign Translation App</title>
			</Head>
			<Box>
				<Container centerContent maxW='xl' height='100vh' pt='0' pb='0'>
					{camState === 'on' ? (
						<Webcam className='webcam' ref={webcamRef} />
					) : (
						<Box></Box>
					)}

					{modelIsLoaded ? (
						<Heading as='h1' size='xl' zIndex={10} color='white'>
							Stay until 10
						</Heading>
					) : (
						''
					)}

					{textArray.length !== 0 ? (
						<>
							<Heading as='h1' size='2xl' zIndex={10} color='white'>
								{textArray.length}
							</Heading>
							<Heading as='h1' size='2xl' zIndex={10} color='white'>
								{text}
							</Heading>
						</>
					) : (
						''
					)}

					<canvas className='canvas' ref={canvasRef} />

					<Stack
						zIndex={10}
						pos='fixed'
						bottom='30px'
						spacing={4}
						direction='row'
						align='center'
					>
						<Button colorScheme='red' onClick={handleRemoveWord}>
							Remove Word
						</Button>

						<Button
							leftIcon={
								camState === 'on' ? (
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

						<HandSignImage />
					</Stack>
				</Container>
			</Box>
		</>
	)
}
