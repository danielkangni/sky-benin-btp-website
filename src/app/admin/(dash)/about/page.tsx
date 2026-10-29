import PageHeader from '@/components/admin/PageHeader';
import ContentEditor, { ContentField } from '@/components/admin/ContentEditor';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

const fields: ContentField[] = [
  { key: 'whyus.title', label: 'Titre', type: 'text' },
  { key: 'whyus.subtitle', label: 'Description', type: 'textarea' },
  { key: 'whyus.years', label: "Badge (ex: 10+)", type: 'text' },
  { key: 'whyus.image', label: 'Image', type: 'image' },
];

export default async function AboutAdminPage() {
  const content = await getSiteContent();
  return (
    <div>
      <PageHeader
        eyebrow="Édition"
        title="Section À Propos / Pourquoi Nous"
      />
      <ContentEditor fields={fields} initial={content} />
    </div>
  );
}
