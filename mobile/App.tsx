import React from 'react'
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native'
// Import fonts from google fonts
// $ expo install expo-font @expo-google-fonts/font_name
import { Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'

import Routes from './src/routes'

// React native can't return 2 components at the same time
// so we need to do one of 2 things:
// 1. return +1components inside a view for exemple
// 2. use fragment: it's a empty tag
// Note that using fragment is a better option if we don't want to create a view
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes />
    </>
  )
}