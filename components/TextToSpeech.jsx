import { Button } from '@chakra-ui/react'
import React from 'react'

const TextToSpeech = ({ text }) => {
	function handleClick() {
		const value = new SpeechSynthesisUtterance(text)
		window.speechSynthesis.speak(value)
	}

	return (
		<Button colorScheme='blue' onClick={handleClick}>
			Text 2 Speech
		</Button>
	)
}

export default TextToSpeech
