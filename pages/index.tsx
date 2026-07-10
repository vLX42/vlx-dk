
import { useEffect, useState } from 'react'
import { useFPSDetect } from 'fps-react'
import Layout from "../components/layout";
import Content from "../components/content";
import { getAllCvs, getAllArticles } from '../lib/api'
import cv from '../types/cv'
import article from '../types/article'

type Props = {
  allCvs: cv[]
  newestArticle: article | null
}

const Index = ({ allCvs, newestArticle }: Props)  => {
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
      <Content data={allCvs} article={newestArticle} lowFrameRate={lowFrameRate} />
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

  const articles = getAllArticles([
    'title',
    'date',
    'slug',
    'coverImage',
    'video',
    'videoThumb',
    'content',
    'technology',
  ])

  return {
    props: { allCvs, newestArticle: articles[0] ?? null },
  }
}