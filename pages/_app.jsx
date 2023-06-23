import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import '../styles/globals.css'
import { theme } from '@/lib/theme'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<DarkMode>
				<Component {...pageProps} />
			</DarkMode>
		</ChakraProvider>
	)
}

export default MyApp
