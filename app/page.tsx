import { SiteReadyProvider } from '@/components/motion'
import Preloader from '@/components/preloader'
import Cursor from '@/components/cursor'
import Navigation from '@/components/navigation'
import Intro from '@/components/intro'
import Hero from '@/components/hero'
import MediaStrip from '@/components/media-strip'
import WeCreate from '@/components/we-create'
import ServicesList from '@/components/services-list'
import GraphicDesign from '@/components/graphic-design'
import Process from '@/components/process'
import About from '@/components/about'
import Work from '@/components/work'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <SiteReadyProvider>
      <Preloader />
      <Cursor />
      <Navigation />
      {/* white sheet with rounded bottom corners lifting off the fixed footer */}
      <main
        id="page-warp"
        className="relative z-10 rounded-b-[3rem] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
        style={{ overflowX: 'clip' }}
      >
        <Intro />
        <Hero />
        <MediaStrip />
        <WeCreate />
        <ServicesList />
        <GraphicDesign />
        <Process />
        <About />
        <Work />
      </main>
      <Footer />
    </SiteReadyProvider>
  )
}
