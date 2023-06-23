import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'

const config = {
	colors: colors,
	fonts: {},
}

export const theme = extendTheme(config)
