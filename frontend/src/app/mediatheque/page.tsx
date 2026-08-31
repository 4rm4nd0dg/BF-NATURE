import React from 'react';
import { MediathequeClient } from './MediathequeClient';

export const metadata = {
  title: 'Médiathèque (Photothèque & Vidéothèque) — Bangr-Weoogo',
  description: 'Galerie photos HD et vidéothèque officielle du Parc Urbain Bangr-Weoogo à Ouagadougou. Regardez les documentaires et reportages vidéos exclusifs.',
};

export default function MediathequePage() {
  return <MediathequeClient />;
}
