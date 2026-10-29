import PageHeader from '@/components/admin/PageHeader';
import ContentEditor, { ContentField } from '@/components/admin/ContentEditor';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

const fields: ContentField[] = [
  { key: 'hero.badge', label: 'Badge (au-dessus du titre)', type: 'text' },
  { key: 'hero.title', label: 'Titre principal', type: 'text' },
  { key: 'hero.subtitle', label: 'Sous-titre', type: 'textarea' },
  { key: 'hero.cta1', label: 'Texte bouton principal', type: 'text' },
  { key: 'hero.cta2', label: 'Texte bouton secondaire', type: 'text' },
  { key: 'hero.image', label: 'Image de fond', type: 'image' },
];

export default async function HeroAdminPage() {
  const content = await getSiteContent();
  return (
    <div>
      <PageHeader
        eyebrow="Édition"
        title="Section Hero"
        description="La première section visible sur la page d'accueil."
      />
      <ContentEditor fields={fields} initial={content} />
    </div>
  );
}
