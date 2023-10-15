import React, { memo } from 'react'
import Image from 'next/image'
import cv from '../types/cv'
import ReactPlayer from 'react-player'
import StyledMarkdown from './cv.styled'

type cvProps = {
  cv: cv
  glassEffect: boolean
}
const Cv = ({ cv, glassEffect }: cvProps) => (
  <>
    <div className={`thumbnail ${glassEffect ? 'glass' : ''} background text-gray-700 body-font`}>
      <div className="flex flex-wrap text-base items-center px-6 py-6 lg:px-8 lg:py-8">
        <div className="w-2/6 portrait:w-full portrait:px-32  p-5">
          {cv.coverImage && (
            <Image
              src={cv.coverImage}
              className="object-cover object-center rounded"
              width="720"
              height="576"
              alt=""
            ></Image>
          )}

          {cv.video && <ReactPlayer className="object-cover portrait:scale-75 object-center rounded" width="100%" controls url={cv.video} light={cv.videoThumb} />}

        </div>
        <div className="w-4/6 portrait:w-full">
          <StyledMarkdown>{cv.content}</StyledMarkdown>
        </div>
        <div className="fixed bottom-8 left-8 text-center text-sm text-gray-800 p-3">
          Tech: <i>{cv.technology}</i>{' '}
        </div>

      </div>
    </div>
  </>
)

export default memo(Cv)
