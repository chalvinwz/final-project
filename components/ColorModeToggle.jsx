import { Button, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function ColorModeToggle(props) {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Button
			aria-label='Toggle Color Mode'
			colorScheme='purple'
			pos='fixed'
			right='20px'
			mt='20px'
			zIndex={9}
			onClick={toggleColorMode}
			_focus={{ boxShadow: 'none' }}
			w='fit-content'
			{...props}
		>
			{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
		</Button>
	)
}
