import { useRef, useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import * as fp from 'fingerpose'
import { drawHand } from '@/lib/handpose/draw-hand'
import HandShape from '@/lib/handpose/hand-shape'

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
			detectHand(net)
		}, 500)
	}

	useEffect(() => {
		runHandpose()
	}, [])

	if (textArray.length === 9) {
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

		if (text === '') {
			setText((prevText) => prevText + frequentText.toUpperCase())
		} else if (text.slice(-2) === '. ') {
			setText((prevText) => prevText + frequentText.toUpperCase())
		} else {
			setText((prevText) => prevText + frequentText)
		}
	}

	async function detectHand(net) {
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			const video = webcamRef.current.video
			const videoWidth = webcamRef.current.video.videoWidth
			const videoHeight = webcamRef.current.video.videoHeight

			webcamRef.current.video.width = videoWidth
			webcamRef.current.video.height = videoHeight

			canvasRef.current.width = videoWidth
			canvasRef.current.height = videoHeight

			const hand = await net.estimateHands(video)

			if (hand.length > 0) {
				const GE = new fp.GestureEstimator([
					HandShape.aSign,
					HandShape.bSign,
					HandShape.cSign,
					HandShape.dSign,
					HandShape.eSign,
					HandShape.fSign,
					HandShape.gSign,
					HandShape.hSign,
					HandShape.iSign,
					HandShape.kSign,
					HandShape.lSign,
					HandShape.mSign,
					HandShape.nSign,
					HandShape.oSign,
					HandShape.pSign,
					HandShape.qSign,
					HandShape.rSign,
					HandShape.sSign,
					HandShape.tSign,
					HandShape.uSign,
					HandShape.vSign,
					HandShape.wSign,
					HandShape.xSign,
					HandShape.ySign,
					HandShape.commaSign,
					HandShape.dotSign,
					HandShape.spaceSign,
				])

				const estimatedGestures = await GE.estimate(hand[0].landmarks, 5)

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
