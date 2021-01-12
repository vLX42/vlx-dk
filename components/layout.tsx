import Head from 'next/head'
import AnimatedBackground from './animatedBackground'
import { useState, useEffect } from 'react'

type Props = {
  children: React.ReactNode
}

const colors = [
  {
    name: 'Living Coral and Pacific Coast',
    color1: '#FC766AFF',
    color2: '#5B84B1FF',
  },
  {
    name: 'Ultra Violet and Blooming Dahlia',
    color1: '#5F4B8BFF',
    color2: '#E69A8DFF',
  },
  { name: 'Turquoise and Warm Sand', color1: '#42EADDFF', color2: '#CDB599FF' },
  { name: 'Black and White', color1: '#000000FF', color2: '#FFFFFFFF' },
  { name: 'Blue and Orange', color1: '#00A4CCFF', color2: '#F95700FF' },
  { name: 'Sailor Blue and Mint', color1: '#00203FFF', color2: '#ADEFD1FF' },
  { name: 'Gray  and Lime Punch', color1: '#606060FF', color2: '#D6ED17FF' },
  {
    name: 'Cherry Tomato and Rapture Rose',
    color1: '#ED2B33FF',
    color2: '#D85A7FFF',
  },
  {
    name: 'Forest Green and Moss Green',
    color1: '#2C5F2D',
    color2: '#97BC62FF)',
  },
  { name: 'Royal Blue and Peach', color1: '#00539CFF', color2: '#EEA47FFF' },
  {
    name: 'Electric Blue Lemonade and Aquamarine',
    color1: '#0063B2FF',
    color2: '#9CC3D5FF',
  },
  {
    name: 'Light Rosa and Cream Gold',
    color1: '#D198C5FF',
    color2: '#E0C568F',
  },
  {
    name: 'Black and Blazing Yellow',
    color1: '#101820FF',
    color2: '#FEE715FF',
  },
  {
    name: 'Pale Green and Bubblegum Pink',
    color1: '#CBCE91FF',
    color2: '#EA738DFF',
  },
  {
    name: 'Copper Coin and Aged Copper',
    color1: '(#B1624EFF',
    color2: '#5CC8D7FF',
  },
  { name: 'Sky Blue and White', color1: '#89ABE3FF', color2: '#FCF6F5FF' },
  {
    name: 'Dusky Citron and Cool Gray',
    color1: '#E3CD81FF',
    color2: '#B1B3B3FF',
  },
  { name: 'Black and Orange', color1: '#101820FF', color2: '#F2AA4CFF' },
  { name: 'Brown Sugar and Beige', color1: '#A07855FF', color2: '#D4B996FF' },
  { name: 'Turkish Sea and Silver', color1: '#195190FF', color2: '#A2A2A1FF' },
  {
    name: 'Royal Purple and Ice Flow',
    color1: '#603F83FF',
    color2: '#C7D3D4FF',
  },
  { name: 'Island Green and White', color1: '#2BAE66FF', color2: 'FCF6F5FF' },
  {
    name: 'Pink Salt and Charcoal Gray',
    color1: '#FAD0C9FF',
    color2: '#6E6E6DFF',
  },
  { name: 'Black and Cherry Tomato', color1: '#2D2926FF', color2: '#E94B3CFF' },
  {
    name: 'Mango Mojito and Terrarium Moss',
    color1: '#DAA03DFF',
    color2: '#616247FF',
  },
  { name: 'Space Cherry and White', color1: '#990011FF', color2: '#FCF6F5FF' },
  {
    name: 'Hunter Green and Raspberry',
    color1: '#435E55FF',
    color2: '#D64161FF',
  },
  {
    name: 'Pale Green  and Purple Sapphire',
    color1: '#CBCE91FF',
    color2: '#76528BFF',
  },
  { name: 'Pink and Navy Blue', color1: '#FAEBEFFF', color2: '#333D79FF' },
]

const Layout = ({ children }: Props) => {
  const [color, setColor] = useState({
    name: 'Default',
    color1: '#ffffff',
    color2: '#ffffff',
  })

  const randomColor = () => {
    const { name, color1, color2 } = colors[
      Math.floor(Math.random() * colors.length)
    ]
    setColor({ name, color1, color2 })
  }
  useEffect(() => {
    randomColor()
  }, [])

  return (
    <>
      <AnimatedBackground
        color1={color.color1}
        color2={color.color2}
        className="fixed h-full w-full object-cover"
      />
      <div className="overscroll-none bg-fixed">
        <Head>
          <title>Peter Biro - Frontend / FullStack Developer</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
        <div className="fixed bottom-0 right-0 text-center text-xs text-gray-400 p-2">
         Color theme: <i>{color.name}</i>{' '}
         <button onClick={() => randomColor()} className="focus:outline-none outline-none">🔄</button>
        </div>
      </div>
    </>
  )
}

export default Layout
