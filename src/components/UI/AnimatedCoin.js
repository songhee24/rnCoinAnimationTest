import React, { forwardRef } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'
import assets from '../../../assets/coin.json'
import { getWindowHeight, getWindowWidth } from '../../utils/helpers/general'

const styles = StyleSheet.create({
  container: {
    width: getWindowWidth(),
    height: getWindowHeight(),
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
})

const AnimatedCoin = forwardRef(({ isLoading, style, isLoop }, ref) => {
  if (!isLoading) {
    return null
  }

  return (
    <View style={[styles.container, style]}>
      <LottieView
        resizeMode='contain'
        ref={ref}
        source={assets}
        loop={isLoop}
      />
    </View>
  )
})

export default AnimatedCoin
