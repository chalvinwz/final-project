import { useRef, useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import * as fp from 'fingerpose'
import { drawHand } from '@/lib/handpose/draw-hand'
import Handsigns from '@/lib/handpose/handsigns'

const useDetect = () => {
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const [modelIsLoaded, setModelIsLoaded] = useState(false)
	const [text, setText] = useState('')
	const [textArray, setTextArray] = useState([])

	async function runHandpose() {
		const net = await handpose.load()
		setModelIsLoaded(true)

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
					Handsigns.spaceSign,
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

	return [
		text,
		setText,
		textArray,
		setTextArray,
		modelIsLoaded,
		webcamRef,
		canvasRef,
	]
}

export default useDetect
