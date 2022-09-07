import React from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import LottieControlledAnimation from './LottieControlledAnimation'

const AnimatedCoin = ({ coinViewLayout, delay = 1 }) => {
  const offsetY = useSharedValue(0)
  const offsetX = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)

  const [animationStart, setAnimationStart] = React.useState(false)
  const [animationEnd, setAnimationEnd] = React.useState(false)

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
    if (coinViewLayout && animationEnd) {
      setAsyncCoinAnimationEnd()
    }
  }, [coinViewLayout, animationEnd])

  const setAsyncCoinAnimationEnd = () => {
    startCoinStoringAnimation()
  }

  const lottieAnimationEndHandler = isAnimationEnd => {
    setAnimationEnd(isAnimationEnd)
  }

  const startCoinStoringAnimation = async () => {
    setAnimationStart(true)
    offsetY.value = withSpring(-coinViewLayout.x)
    offsetX.value = withSpring(coinViewLayout.width)
    scale.value = withSpring(0.1)
    opacity.value = withTiming(0, {
      duration: 2000,
    })
  }

  if (animationEnd) {
    return (
      <Animated.View
        style={[
          animatedContainerStyles(animationStart).animatedContainerStyles,
          animatedStyles,
          opacityAnimation,
        ]}
      >
        <LottieControlledAnimation />
      </Animated.View>
    )
  }

  return (
    <View
      style={animatedContainerStyles(animationStart).animatedContainerStyles}
    >
      <LottieControlledAnimation
        play
        onGetAnimationFinished={lottieAnimationEndHandler}
      />
    </View>
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
