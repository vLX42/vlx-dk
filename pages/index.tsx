import Layout from "../components/layout";
import Content from "../components/content";
import { getAllCvs } from '../lib/api'
import cv from '../types/cv'

type Props = {
  allCvs: cv[]
}

const Index = ({ allCvs }: Props)  => {
  return (
    <Layout>
      <Content data={allCvs} />
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
    'content',
  ])

  return {
    props: { allCvs },
  }
}