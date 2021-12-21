
import { FPSStats, useFPSDetect } from 'fps-react'
import Layout from "../components/layout";
import Content from "../components/content";
import { getAllCvs } from '../lib/api'
import cv from '../types/cv'

type Props = {
  allCvs: cv[]
}

const Index = ({ allCvs }: Props)  => {
  const lowFrameRate = useFPSDetect({ minimumFps: 20 })
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