import React, { forwardRef } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'
import assets from '../../../assets/coin.json'
import { getWindowHeight, getWindowWidth } from '../../utils/helpers/general'

const styles = StyleSheet.create({
  container: {
    width: getWindowWidth(),
    height: getWindowHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const LottieCoin = forwardRef(({ isLoading, style, isLoop }, ref) => {
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

export default LottieCoin
