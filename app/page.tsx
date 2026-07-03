import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Work from '@/components/work'
import CtaBand from '@/components/cta-band'
import Philosophy from '@/components/philosophy'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="bg-background" style={{ overflowX: 'clip' }}>
        <Hero />
        <Services />
        <Work />
        <CtaBand />
        {/* <Philosophy /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
