/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
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
import AnimatedCoin from './components/AnimatedCoin'
import { sleep } from './utils/helpers/general'

const App = () => {
  const AnimatedCoinRef = React.useRef()
  const { getCoinMovingAnimation } = AnimatedCoinRef.current || {}
  const [coinViewLayout, setCoinViewLayout] = React.useState(null)
  const [animationEnd, setAnimationEnd] = React.useState(false)

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  }

  useEffect(() => {
    if (animationEnd) {
      repeatAnimation()
    }
  }, [animationEnd])

  const repeatAnimation = async () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(1000)
      console.log('calls')
      getCoinMovingAnimation()
    }
  }

  const initialAnimationFinishHandler = animationEndValue => {
    setAnimationEnd(animationEndValue)
  }

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
      <AnimatedCoin
        onInitialAnimationFinish={initialAnimationFinishHandler}
        ref={AnimatedCoinRef}
        coinViewLayout={coinViewLayout}
      />
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
