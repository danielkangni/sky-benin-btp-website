import PageHeader from '@/components/admin/PageHeader';
import ContentEditor, { ContentField } from '@/components/admin/ContentEditor';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

const fields: ContentField[] = [
  { key: 'contact.address', label: 'Adresse postale', type: 'textarea', hint: 'Sauts de ligne autorisés' },
  { key: 'contact.phone', label: 'Téléphone', type: 'text' },
  { key: 'contact.email', label: 'Email', type: 'text' },
  { key: 'contact.image', label: 'Image (siège / carte)', type: 'image' },
];

export default async function ContactAdminPage() {
  const content = await getSiteContent();
  return (
    <div>
      <PageHeader eyebrow="Édition" title="Coordonnées de contact" />
      <ContentEditor fields={fields} initial={content} />
    </div>
  );
}
