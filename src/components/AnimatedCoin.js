import React from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { sleep } from '../utils/helpers/general'
import LottieCoin from './UI/LottieCoin'

const AnimatedCoin = ({ coinViewLayout }) => {
  const animationRef = React.useRef(null)

  const offsetY = useSharedValue(0)
  const offsetX = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const [animationStart, setAnimationStart] = React.useState(false)

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

  React.useEffect(() => {
    animationRef.current?.play()
  }, [])

  React.useEffect(() => {
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
        duration: 2000,
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Animated.View
      style={[
        animatedContainerStyles(animationStart).animatedContainerStyles,
        animatedStyles,
        opacityAnimation,
      ]}
    >
      <LottieCoin isLoop ref={animationRef} isLoading />
    </Animated.View>
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

export default AnimatedCoin
