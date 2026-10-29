import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Projects from '@/components/home/Projects';
import WhyUs from '@/components/home/WhyUs';
import Contact from '@/components/home/Contact';
import Footer from '@/components/home/Footer';
import { getSiteContent, getServices, getProjects } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [content, services, projects] = await Promise.all([
    getSiteContent(),
    getServices(),
    getProjects(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          badge={content['hero.badge'] ?? 'Leader BTP'}
          title={content['hero.title'] ?? 'Bâtir l\'Avenir'}
          subtitle={content['hero.subtitle'] ?? ''}
          cta1={content['hero.cta1'] ?? 'Voir nos projets'}
          cta2={content['hero.cta2'] ?? 'Nos Services'}
          imageUrl={content['hero.image'] ?? ''}
        />
        <Services services={services} />
        <Projects projects={projects} />
        <WhyUs
          title={content['whyus.title'] ?? ''}
          subtitle={content['whyus.subtitle'] ?? ''}
          years={content['whyus.years'] ?? '10+'}
          imageUrl={content['whyus.image'] ?? ''}
        />
        <Contact
          address={content['contact.address'] ?? ''}
          phone={content['contact.phone'] ?? ''}
          email={content['contact.email'] ?? ''}
          imageUrl={content['contact.image'] ?? ''}
        />
      </main>
      <Footer
        about={content['footer.about'] ?? ''}
        copyright={content['footer.copyright'] ?? ''}
      />
    </>
  );
}
