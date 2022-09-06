/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
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

  const offset = useSharedValue(0)
  const scale = useSharedValue(1)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value * 255 },
        // { translateY: 0 },
        { scale: scale.value },
      ],
    }
  })

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  useEffect(() => {
    setAsyncCoinAnimationEnd()
  }, [])

  const setAsyncCoinAnimationEnd = async () => {
    await sleep(2010)
    animationRef.current?.pause()
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
        <View style={styles.coinInfo}>
          <CoinIcon />
          <Text style={styles.coinText}>120р.</Text>
        </View>
      </View>
      <Animated.View style={[styles.animatedContainerStyles, animatedStyles]}>
        <AnimatedCoin isLoop ref={animationRef} isLoading />
      </Animated.View>
      <Button
        onPress={() => {
          offset.value = withSpring(Math.random())
        }}
        title='Move'
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

  animatedContainerStyles: {
    position: 'absolute',
  },
})

export default App
