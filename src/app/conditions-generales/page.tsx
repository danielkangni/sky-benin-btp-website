import { getSiteContent } from '@/lib/content';
import LegalPageShell from '@/components/LegalPageShell';

export const metadata = { title: 'Conditions Générales — Sky Benin BTP' };

export default async function ConditionsGeneralesPage() {
  const content = await getSiteContent();

  return (
    <LegalPageShell
      title="Conditions Générales"
      footerAbout={content['footer.about'] ?? ''}
      footerCopyright={content['footer.copyright'] ?? ''}
    >
      <h2>Objet</h2>
      <p>
        Les présentes conditions encadrent l&apos;utilisation du site vitrine de Sky Benin BTP et
        les échanges initiés via le formulaire de contact. Elles ne constituent pas, en l&apos;état,
        un contrat de prestation : tout devis ou chantier fait l&apos;objet d&apos;un contrat
        distinct signé entre Sky Benin BTP et le client.
      </p>

      <h2>Devis et prestations</h2>
      <p>
        [À compléter : modalités d&apos;établissement des devis, délai de validité, conditions de
        paiement, pénalités de retard, garanties applicables aux travaux — ces éléments
        dépendent du droit béninois de la construction et doivent être rédigés avec un juriste.]
      </p>

      <h2>Annulation / rétractation</h2>
      <p>
        [À compléter : conditions d&apos;annulation d&apos;une commande de travaux, éventuel droit
        de rétractation selon la nature du contrat.]
      </p>

      <h2>Responsabilité</h2>
      <p>
        [À compléter : assurances professionnelles de Sky Benin BTP — décennale, responsabilité
        civile — et limites de responsabilité contractuelle.]
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative à ces conditions : {content['contact.email'] ?? '[email]'}.
      </p>
    </LegalPageShell>
  );
}
