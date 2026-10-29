import PageHeader from '@/components/admin/PageHeader';
import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <PageHeader eyebrow="Nouveau" title="Créer un service" />
      <ServiceForm />
    </div>
  );
}
