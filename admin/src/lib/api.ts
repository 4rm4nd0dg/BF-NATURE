const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export interface Site {
  id: string;
  nom: string;
  slug: string;
  type: string;
  description: string;
  region: string;
  latitude: number;
  longitude: number;
}

export interface Espece {
  id: string;
  site_id: string;
  categorie: 'animal' | 'plante';
  nom_commun: string;
  nom_scientifique: string;
  description: string;
  photo_url: string;
}

export interface EspaceLocation {
  id: string;
  site_id: string;
  nom: string;
  capacite: number;
  description: string;
  tarif_horaire: number;
}

export interface Reservation {
  id: string;
  site_id: string;
  utilisateur_id?: string;
  date_visite: string;
  type_billet: 'individuel' | 'groupe' | 'scolaire' | 'tarif_reduit';
  quantite: number;
  montant_total: number;
  statut_paiement: 'en_attente' | 'paye' | 'echoue' | 'rembourse';
  qr_code: string;
  created_at: string;
  site?: Partial<Site>;
}

export interface DemandeLocation {
  id: string;
  espace_id: string;
  nom_demandeur?: string;
  email_demandeur?: string;
  telephone_demandeur?: string;
  date_evenement: string;
  heure_debut: string;
  heure_fin: string;
  type_evenement: string;
  nombre_personnes: number;
  statut: 'en_attente' | 'validee' | 'refusee';
  montant_devis: number;
  created_at: string;
  espace?: Partial<EspaceLocation>;
}

export interface ContenuSensibilisation {
  id: string;
  site_id?: string;
  titre: string;
  contenu: string;
  type: 'article' | 'quiz' | 'actualite';
  publie_le: string;
  site?: Partial<Site>;
}

export async function loginApi(email: string, mot_de_passe: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, mot_de_passe }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Identifiants incorrects');
  }
  return res.json();
}

export async function fetchAdminReservations(token: string): Promise<Reservation[]> {
  const res = await fetch(`${API_BASE_URL}/admin/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Accès interdit ou erreur serveur');
  return res.json();
}

export async function fetchAdminLocations(token: string): Promise<DemandeLocation[]> {
  const res = await fetch(`${API_BASE_URL}/admin/locations`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Accès interdit ou erreur serveur');
  return res.json();
}

export async function updateLocationStatusApi(id: string, statut: string) {
  const res = await fetch(`${API_BASE_URL}/locations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ statut }),
  });
  if (!res.ok) throw new Error('Erreur lors de la mise à jour');
  return res.json();
}

export async function createContenuAdminApi(token: string, data: { titre: string; contenu: string; type: string; site_id?: string }) {
  const res = await fetch(`${API_BASE_URL}/admin/contenus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur lors de la publication');
  return res.json();
}

export async function createEspeceAdminApi(token: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/admin/especes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erreur lors de la création de l\'espèce');
  return res.json();
}

export async function deleteEspeceAdminApi(token: string, id: string) {
  const res = await fetch(`${API_BASE_URL}/admin/especes/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
}

export async function fetchSites(): Promise<Site[]> {
  const res = await fetch(`${API_BASE_URL}/sites`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Erreur chargement des sites');
  return res.json();
}

export async function fetchSiteEspeces(slug: string): Promise<Espece[]> {
  const res = await fetch(`${API_BASE_URL}/sites/${slug}/especes`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Erreur chargement des espèces');
  return res.json();
}
