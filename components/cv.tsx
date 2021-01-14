import Image from 'next/image'
import cv from '../types/cv'
import ReactPlayer from 'react-player'
import StyledMarkdown from './cv.styled'

type cvProps = {
  cv: cv
}
const Cv = ({ cv }: cvProps) => (
  <>
    <div className="thumbnail glass text-gray-700 body-font">
      <div className="flex flex-col items-center px-3 py-3 md:px-8 md:py-8 lg:px-10 lg:py-10 md:flex-row">
        <div className="w-5/6 mb-5 md:mb-10 lg:max-w-lg lg:w-full md:w-1/2 md:mb-0">
          {cv.coverImage && (
            <Image
              src={cv.coverImage}
              className="object-cover object-center rounded"
              width="720"
              height="576"
            ></Image>
          )}

          {cv.video && <ReactPlayer className="object-cover object-center rounded video" controls url={cv.video} light={cv.videoThumb} />}

        </div>
        <div className="flex flex-col items-center text-left lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 md:items-start ">
          <StyledMarkdown>{cv.content}</StyledMarkdown>
        </div>
        <div className="fixed bottom-0 left-0 text-center text-sm text-gray-800 p-3">
          Tech: <i>{cv.technology}</i>{' '}
        </div>

      </div>
    </div>
  </>
)

export default Cv
