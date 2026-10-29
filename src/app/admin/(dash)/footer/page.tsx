import PageHeader from '@/components/admin/PageHeader';
import ContentEditor, { ContentField } from '@/components/admin/ContentEditor';
import { getSiteContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

const fields: ContentField[] = [
  { key: 'footer.about', label: "Texte 'À propos' (1ère colonne)", type: 'textarea' },
  { key: 'footer.copyright', label: 'Mention de copyright', type: 'text' },
];

export default async function FooterAdminPage() {
  const content = await getSiteContent();
  return (
    <div>
      <PageHeader eyebrow="Édition" title="Pied de page" />
      <ContentEditor fields={fields} initial={content} />
    </div>
  );
}
