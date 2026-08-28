import { notFound } from 'next/navigation';

export default function AdminPage() {
  // Rendre la route /admin totalement invisible et renvoyer une erreur 404 sur le site public
  notFound();
}
