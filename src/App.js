/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import CoinIcon from './components/icons/icons'
import AnimatedCoin from './components/coinAnimations/AnimatedCoin'

const App = () => {
  const [coinViewLayout, setCoinViewLayout] = React.useState(null)
  const [showSecond, setShowSecond] = React.useState(false)
  const [showThird, setShowThird] = React.useState(false)

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  }

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSecond(true), 1400)
    return () => clearTimeout(timer)
  })

  React.useEffect(() => {
    const timer = setTimeout(() => setShowThird(true), 1400)
    return () => clearTimeout(timer)
  })

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Главная</Text>
        <View
          style={styles.coinInfo}
          onLayout={event => {
            const { layout } = event.nativeEvent
            setCoinViewLayout({
              height: layout.height,
              width: layout.width,
              x: layout.x,
              y: layout.y,
            })
          }}
        >
          <CoinIcon />
          <Text style={styles.coinText}>120р.</Text>
        </View>
      </View>
      <AnimatedCoin coinViewLayout={coinViewLayout} />
      {showSecond && (
        <AnimatedCoin
          coinViewLayout={coinViewLayout}
          isAnimationLottieEnd
          controlledStartAnimation
        />
      )}
      {showThird && (
        <AnimatedCoin
          coinViewLayout={coinViewLayout}
          isAnimationLottieEnd
          controlledStartAnimation
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },

  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coinText: {
    fontSize: 16,
    fontWeight: '500',
  },
})

export default App
