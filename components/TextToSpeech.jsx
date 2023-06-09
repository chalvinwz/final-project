import { Button, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const TextToSpeech = ({ text }) => {
	const [utterance, setUtterance] = useState(null)
	const [voice, setVoice] = useState(null)

	useEffect(() => {
		const u = new SpeechSynthesisUtterance(text)

		setUtterance(u)
	}, [text])

	useEffect(() => {
		const synth = window.speechSynthesis
		const voice = synth.getVoices()

		setVoice(voice[0])

		return () => {
			synth.cancel()
		}
	}, [])

	function handleTextToSpeech() {
		const synth = window.speechSynthesis
		utterance.voice = voice

		synth.speak(utterance)
	}

	function handleVoiceChange(event) {
		const voices = window.speechSynthesis.getVoices()
		setVoice(voices.find((v) => v.name === event.target.value))
	}

	return (
		<>
			<Select
				placeholder='Select option'
				value={voice?.name}
				onChange={handleVoiceChange}
				w='xs'
				variant='filled'
			>
				{window.speechSynthesis.getVoices().map((voice) => (
					<option key={voice.name} value={voice.name}>
						{voice.name}
					</option>
				))}
			</Select>

			<Button colorScheme='blue' onClick={handleTextToSpeech}>
				Text to Speech
			</Button>
		</>
	)
}

export default TextToSpeech
