import React from 'react'
import LottieCoin from '../UI/LottieCoin'
import { sleep } from '../../utils/helpers/general'

const LottieControlledAnimation = ({ play, onGetAnimationFinished }) => {
  const animationRef = React.useRef(null)
  React.useEffect(() => {
    if (play) {
      asyncLottiePlayer()
    } else {
      animationRef.current?.pause()
    }
  }, [play])

  const asyncLottiePlayer = async () => {
    try {
      animationRef.current?.play()
      await sleep(2400)
      onGetAnimationFinished(true)
      animationRef.current?.pause()
    } catch (e) {
      console.log(e)
    }
  }

  return <LottieCoin isLoop ref={animationRef} isLoading />
}

export default LottieControlledAnimation
