
import { useEffect, useState } from 'react'
import { FPSStats, useFPSDetect } from 'fps-react'
import Layout from "../components/layout";
import Content from "../components/content";
import { getAllCvs } from '../lib/api'
import cv from '../types/cv'

type Props = {
  allCvs: cv[]
}

const Index = ({ allCvs }: Props)  => {
  const detected = useFPSDetect({ minimumFps: 20 })
  // Dev/debug override: ?glass=on forces the glass effect on, ?glass=off forces
  // the blur-off fallback. Lets us screenshot both modes regardless of FPS.
  const [override, setOverride] = useState<boolean | null>(null)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('glass')
    if (q === 'on') setOverride(false)
    else if (q === 'off') setOverride(true)
  }, [])
  const lowFrameRate = override ?? detected
  return (
    <Layout lowFrameRate={lowFrameRate}>
      <FPSStats />
      <Content data={allCvs} lowFrameRate={lowFrameRate}/>

    </Layout>
  );
}


export default Index

export const getStaticProps = async () => {
  const allCvs = getAllCvs([
    'title',
    'year',
    'slug',
    'coverImage',
    'video',
    'videoThumb',
    'content',
    'technology',
  ])

  return {
    props: { allCvs },
  }
}