import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function main() {
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.admin.upsert({
    where: { email: ADMIN_EMAIL },
    update: { password: hashed },
    create: { email: ADMIN_EMAIL, password: hashed, name: 'Administrateur' },
  });

  const services = [
    {
      key: 'service-1',
      title: 'Construction de Bâtiments',
      description:
        "Réalisation d'immeubles résidentiels, commerciaux et industriels de haute facture avec une précision millimétrée et des finitions d'exception.",
      icon: 'architecture',
      order: 1,
    },
    {
      key: 'service-2',
      title: 'Travaux Publics',
      description:
        "Expertise dans le développement routier, les ouvrages d'art et les systèmes d'assainissement complexes pour le développement national.",
      icon: 'engineering',
      order: 2,
    },
    {
      key: 'service-3',
      title: 'Rénovation & Design',
      description:
        'Modernisation structurelle et réhabilitation haut de gamme pour redonner vie et valeur ajoutée à vos actifs immobiliers existants.',
      icon: 'home_repair_service',
      order: 3,
    },
  ];

  for (const s of services) {
    const existing = await prisma.service.findFirst({ where: { title: s.title } });
    if (!existing) {
      await prisma.service.create({
        data: { title: s.title, description: s.description, icon: s.icon, order: s.order },
      });
    }
  }

  const projects = [
    {
      title: 'Immeuble Résidentiel R+3',
      description: 'Construction complète de la structure au second œuvre : gros œuvre en béton armé, façades et finitions intérieures.',
      location: 'Cotonou, Bénin',
      status: 'En Cours',
      imageUrl: '/images/project-immeuble.jpg',
      gallery: JSON.stringify([
        '/images/gallery/immeuble-1.jpg',
        '/images/gallery/immeuble-2.jpg',
        '/images/gallery/immeuble-3.jpg',
        '/images/gallery/immeuble-4.jpg',
      ]),
      featured: true,
      order: 1,
    },
    {
      title: 'Réseau de Collecteurs Pluviaux',
      description: "Construction d'un collecteur d'eaux pluviales en béton armé préfabriqué, de la fouille à la pose des dalles de couverture.",
      location: 'Bénin',
      status: 'En Cours',
      imageUrl: '/images/project-canal-1.jpg',
      gallery: JSON.stringify([
        '/images/gallery/canal1-1.jpg',
        '/images/gallery/canal1-2.jpg',
        '/images/gallery/canal1-3.jpg',
        '/images/gallery/canal1-4.jpg',
      ]),
      featured: true,
      order: 2,
    },
    {
      title: 'Assainissement Urbain',
      description: "Travaux de drainage en milieu urbain dense : ferraillage, coffrage et bétonnage d'un caniveau de voirie.",
      location: 'Bénin',
      status: 'En Cours',
      imageUrl: '/images/project-canal-2.jpg',
      gallery: JSON.stringify([
        '/images/gallery/canal2-1.jpg',
        '/images/gallery/canal2-2.jpg',
        '/images/gallery/canal2-3.jpg',
        '/images/gallery/canal2-4.jpg',
      ]),
      featured: true,
      order: 3,
    },
  ];

  for (const p of projects) {
    const existing = await prisma.project.findFirst({ where: { title: p.title } });
    if (!existing) {
      await prisma.project.create({ data: p });
    }
  }

  const siteContent = [
    { key: 'hero.badge', value: 'Leader de la construction au Bénin' },
    { key: 'hero.title', value: "Bâtir l'Avenir du Bénin avec Excellence" },
    {
      key: 'hero.subtitle',
      value:
        "Expertise, Solidité et Innovation dans le BTP depuis plus de 10 ans. Nous transformons les visions architecturales en réalités durables.",
    },
    { key: 'hero.cta1', value: 'Voir nos projets' },
    { key: 'hero.cta2', value: 'Nos Services' },
    {
      key: 'hero.image',
      value: '/images/hero-construction.jpg',
    },
    { key: 'whyus.title', value: 'La Rigueur au Service de vos Ambitions' },
    {
      key: 'whyus.subtitle',
      value:
        "Nous ne construisons pas seulement des structures ; nous bâtissons la confiance à travers une exécution technique irréprochable et un engagement envers la durabilité.",
    },
    { key: 'whyus.years', value: '10+' },
    {
      key: 'whyus.image',
      value: '/images/whyus-team.jpg',
    },
    { key: 'contact.address', value: 'Zone Résidentielle, Lot 452\nCotonou, République du Bénin' },
    { key: 'contact.phone', value: '+229 21 00 00 00' },
    { key: 'contact.email', value: 'contact@skybenin.bj' },
    {
      key: 'contact.image',
      value: '/images/contact-site.jpg',
    },
    {
      key: 'footer.about',
      value: "Leader de la construction au Bénin, nous façonnons l'avenir urbain avec audace, précision et intégrité.",
    },
    { key: 'footer.copyright', value: '© 2024 Sky Benin Construction. Excellence through Precision.' },
  ];

  for (const c of siteContent) {
    await prisma.siteContent.upsert({
      where: { key: c.key },
      update: {},
      create: c,
    });
  }

  console.log('✓ Database seeded successfully');
  console.log(`✓ Admin: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
