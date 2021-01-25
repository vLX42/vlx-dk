import { useState, useEffect } from 'react'
import FPSCore from './fpsCore'

type FPSDetectProps = {
  minimumFps?:  number
  fpsSampleRate?: number
  fpsHistory?: number
}

const FPSDetect = ({
  minimumFps = 20,
  fpsSampleRate = 1000,
  fpsHistory = 2,
}: FPSDetectProps) => {
  const { fps } = FPSCore({ fpsHistory, fpsSampleRate })
  const [ lowFrameRate, setLowFrameRate ] = useState(false)

  useEffect(() => {
    const average = (array:number[]) => array.reduce((a, b) => a + b, 0) / array.length;
    average(fps)<=minimumFps && setLowFrameRate(true)
  },[fps])

  return lowFrameRate
}

export default FPSDetect
