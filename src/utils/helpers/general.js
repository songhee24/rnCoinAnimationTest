import { Dimensions } from 'react-native'

export const getWindowWidth = () => Dimensions.get('window').width
export const getWindowHeight = () => Dimensions.get('window').height

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
