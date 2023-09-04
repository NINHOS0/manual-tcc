import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default theme