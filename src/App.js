/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, useState } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import CoinIcon from './components/icons/icons'
import AnimatedCoin from './components/UI/AnimatedCoin'
import { sleep } from './utils/helpers/general'

const App = () => {
  const animationRef = useRef(null)

  const offsetY = useSharedValue(0)
  const offsetX = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const [coinViewLayout, setCoinViewLayout] = useState(null)
  const [animationStart, setAnimationStart] = useState(false)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
        { scale: scale.value },
      ],
    }
  })

  const opacityAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  useEffect(() => {
    if (coinViewLayout) {
      setAsyncCoinAnimationEnd()
    }
  }, [coinViewLayout])

  const setAsyncCoinAnimationEnd = async () => {
    try {
      await sleep(2010)
      animationRef.current?.pause()
      setAnimationStart(true)
      offsetY.value = withSpring(-coinViewLayout.x)
      offsetX.value = withSpring(coinViewLayout.width)
      scale.value = withSpring(0.1)
      opacity.value = withTiming(0, {
        duration: 1300,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
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
      <Animated.View
        style={[
          animatedContainerStyles(animationStart).animatedContainerStyles,
          animatedStyles,
          opacityAnimation,
        ]}
      >
        <AnimatedCoin isLoop ref={animationRef} isLoading />
      </Animated.View>
      <Button onPress={() => {}} title='Move' />
    </SafeAreaView>
  )
}

const animatedContainerStyles = isAnimationStart =>
  StyleSheet.create({
    animatedContainerStyles: {
      position: 'absolute',
      top: isAnimationStart ? -30 : 0,
      left: isAnimationStart ? 52 : 0,
    },
  })

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
