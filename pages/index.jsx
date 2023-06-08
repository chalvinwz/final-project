import React, { useRef, useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import Webcam from 'react-webcam'
import { drawHand } from '@/lib/handpose/draw-hand'
import * as fp from 'fingerpose'
import Handsigns from '@/lib/handpose/handsigns'
import { Signimage, Signpass } from '@/assets/handimage'

import { Heading, Button, Stack, Container, Box } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import ColorModeToggle from '@/components/ColorModeToggle'

export default function Home() {
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const [text, setText] = useState('')
	const [textArray, setTextArray] = useState([])
	const [camState, setCamState] = useState('on')

	async function runHandpose() {
		const net = await handpose.load()
		console.log('Model Loaded')

		setInterval(() => {
			detect(net)
		}, 200)
	}

	useEffect(() => {
		runHandpose()
	}, [])

	if (textArray.length === 10) {
		function getFrequentText(arr) {
			return arr
				.sort(
					(a, b) =>
						arr.filter((v) => v === a).length -
						arr.filter((v) => v === b).length
				)
				.pop()
		}

		const frequentText = getFrequentText(textArray)

		setTextArray([])
		setText((text) => text + frequentText)
	}

	async function detect(net) {
		// Check data is available
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get Video Properties
			const video = webcamRef.current.video
			const videoWidth = webcamRef.current.video.videoWidth
			const videoHeight = webcamRef.current.video.videoHeight

			// Set video width
			webcamRef.current.video.width = videoWidth
			webcamRef.current.video.height = videoHeight

			// Set canvas height and width
			canvasRef.current.width = videoWidth
			canvasRef.current.height = videoHeight

			// Make Detections
			const hand = await net.estimateHands(video)

			if (hand.length > 0) {
				//loading the fingerpose model
				const GE = new fp.GestureEstimator([
					Handsigns.aSign,
					Handsigns.bSign,
					Handsigns.cSign,
					Handsigns.dSign,
					Handsigns.eSign,
					Handsigns.fSign,
					Handsigns.gSign,
					Handsigns.hSign,
					Handsigns.iSign,
					Handsigns.jSign,
					Handsigns.kSign,
					Handsigns.lSign,
					Handsigns.mSign,
					Handsigns.nSign,
					Handsigns.oSign,
					Handsigns.pSign,
					Handsigns.qSign,
					Handsigns.rSign,
					Handsigns.sSign,
					Handsigns.tSign,
					Handsigns.uSign,
					Handsigns.vSign,
					Handsigns.wSign,
					Handsigns.xSign,
					Handsigns.ySign,
					Handsigns.zSign,
				])

				const estimatedGestures = await GE.estimate(
					hand[0].landmarks,
					8.666666666666668
				)

				if (
					estimatedGestures.gestures !== null &&
					estimatedGestures.gestures.length > 0
				) {
					const confidence = estimatedGestures.gestures.map((p) => p.score)

					const maxConfidence = confidence.indexOf(Math.max(...confidence))

					setTextArray((prevTextArray) => [
						...prevTextArray,
						estimatedGestures.gestures[maxConfidence].name,
					])
				}
			}

			// Draw Mesh
			const ctx = canvasRef.current.getContext('2d')
			drawHand(hand, ctx)
		}
	}

	function handleWebcam() {
		if (camState === 'on') {
			setCamState('off')
		} else {
			setCamState('on')
		}
	}

	return (
		<Box bgColor='#000'>
			<Container centerContent maxW='xl' height='100vh' pt='0' pb='0'>
				{camState === 'on' ? (
					<>
						<Webcam className='webcam' ref={webcamRef} />
					</>
				) : (
					<Box></Box>
				)}

				{textArray.length !== 0 ? (
					<>
						<Heading as='h1' size='4xl' zIndex={9} color='white'>
							{textArray.length}
						</Heading>
						<Heading as='h1' size='4xl' zIndex={9} color='white'>
							{text}
						</Heading>
					</>
				) : (
					<Heading as='h1' size='4xl' zIndex={9} color='white'>
						Do shit
					</Heading>
				)}

				<canvas className='canvas' ref={canvasRef} />

				<Stack
					className='camera-button'
					spacing={4}
					direction='row'
					align='center'
				>
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

					<ColorModeToggle />
				</Stack>
			</Container>
		</Box>
	)
}
