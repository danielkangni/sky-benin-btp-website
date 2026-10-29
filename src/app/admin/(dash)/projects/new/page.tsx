import PageHeader from '@/components/admin/PageHeader';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Nouveau"
        title="Créer un projet"
        description="Renseignez les informations du projet à publier sur le site."
      />
      <ProjectForm />
    </div>
  );
}
