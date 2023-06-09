import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'

const overrides = {
	colors: colors,
	fonts: {},
}

export const theme = extendTheme(overrides)
