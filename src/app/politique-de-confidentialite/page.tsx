import { getSiteContent } from '@/lib/content';
import LegalPageShell from '@/components/LegalPageShell';

export const metadata = { title: 'Politique de Confidentialité — Sky Benin BTP' };

export default async function PolitiqueConfidentialitePage() {
  const content = await getSiteContent();

  return (
    <LegalPageShell
      title="Politique de Confidentialité"
      footerAbout={content['footer.about'] ?? ''}
      footerCopyright={content['footer.copyright'] ?? ''}
    >
      <h2>Données collectées</h2>
      <p>
        Via le formulaire de contact de ce site, nous collectons : votre nom, votre adresse email
        et le message que vous rédigez. Ces informations sont strictement nécessaires pour
        répondre à votre demande.
      </p>

      <h2>Utilisation des données</h2>
      <p>
        Les données transmises via le formulaire sont utilisées uniquement pour vous recontacter
        au sujet de votre demande de devis ou d&apos;information. Elles ne sont ni vendues, ni
        transmises à des tiers à des fins commerciales.
      </p>

      <h2>Conservation des données</h2>
      <p>
        [À définir avec Sky Benin : durée de conservation des messages reçus, ex. 24 mois après le
        dernier contact.]
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Ce site n&apos;utilise actuellement aucun cookie de suivi ni outil d&apos;analyse
        d&apos;audience (Google Analytics, pixels publicitaires, etc.). Si l&apos;un de ces outils
        est ajouté ultérieurement, cette politique sera mise à jour et un bandeau de consentement
        sera ajouté.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en
        nous contactant à l&apos;adresse : {content['contact.email'] ?? '[email]'}.
      </p>

      <h2>Responsable du traitement</h2>
      <p>Sky Benin BTP — [adresse complète et numéro d&apos;enregistrement à compléter].</p>
    </LegalPageShell>
  );
}
