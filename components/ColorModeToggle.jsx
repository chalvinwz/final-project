import { Button, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function ColorModeToggle(props) {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Button
			colorScheme='purple'
			aria-label='Toggle Color Mode'
			onClick={toggleColorMode}
			_focus={{ boxShadow: 'none' }}
			w='fit-content'
			{...props}
		>
			{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
