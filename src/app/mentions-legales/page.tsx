import { getSiteContent } from '@/lib/content';
import LegalPageShell from '@/components/LegalPageShell';

export const metadata = { title: 'Mentions Légales — Sky Benin BTP' };

export default async function MentionsLegalesPage() {
  const content = await getSiteContent();

  return (
    <LegalPageShell
      title="Mentions Légales"
      footerAbout={content['footer.about'] ?? ''}
      footerCopyright={content['footer.copyright'] ?? ''}
    >
      <h2>Éditeur du site</h2>
      <p>
        Raison sociale : [Sky Benin — nom juridique complet]
        <br />
        Forme juridique : [ex. SARL, SA...]
        <br />
        Numéro RCCM : [à compléter]
        <br />
        Numéro IFU : [à compléter]
        <br />
        Siège social : {content['contact.address']?.split('\n')[0] ?? '[adresse]'}
        <br />
        Téléphone : {content['contact.phone'] ?? '[téléphone]'}
        <br />
        Email : {content['contact.email'] ?? '[email]'}
      </p>

      <h2>Directeur de la publication</h2>
      <p>[Nom et fonction du responsable de la publication]</p>

      <h2>Hébergement</h2>
      <p>
        Nom de l&apos;hébergeur : [à compléter]
        <br />
        Adresse de l&apos;hébergeur : [à compléter]
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, photographies de chantiers, logo) est la
        propriété de Sky Benin BTP, sauf mention contraire. Toute reproduction sans autorisation
        est interdite.
      </p>

      <h2>Droit applicable</h2>
      <p>
        [À confirmer avec un juriste : droit béninois applicable, tribunal compétent en cas de
        litige.]
      </p>
    </LegalPageShell>
  );
}
