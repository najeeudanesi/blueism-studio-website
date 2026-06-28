import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'
import CaseStudy from '@/components/case-study'
import { Metadata } from 'next'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  const title = `${project.title} - ${project.discipline}`
  const description = `${project.title} case study by Blueism Studio. Specializing in ${project.discipline} in ${project.location}.`

  return {
    title,
    description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://blueismstudio.com/work/${project.slug}`,
      type: 'article',
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: RouteParams) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <CaseStudy project={project} />
}
