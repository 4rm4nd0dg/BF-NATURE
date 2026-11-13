import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const iconsDir = path.join(publicDir, 'icons');
const screenshotsDir = path.join(publicDir, 'screenshots');

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

function getStandardSvg(size) {
  // Icône avec fond canopée profonde et badge vert feuille
  const radius = size * 0.44;
  const center = size / 2;
  const treeScale = (size * 0.88) / 32;
  const offset = center - (16 * treeScale);

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="#132B1B"/>
  <circle cx="${center}" cy="${center}" r="${radius}" fill="#7FA65C"/>
  <g transform="translate(${offset}, ${offset}) scale(${treeScale})">
    <path d="M16 6L9.5 15H12.5L8.5 21H14.5V25.5H17.5V21H23.5L19.5 15H22.5L16 6Z" fill="#132B1B"/>
  </g>
</svg>
`;
}

function getMaskableSvg(size) {
  // Masquable : Safe zone = 80% (rayon 40% du centre), fond complet sans coins arrondis
  const center = size / 2;
  const radius = size * 0.35; // Bien à l'intérieur de la safe zone (35% < 40%)
  const treeScale = (radius * 2) / 32;
  const offset = center - (16 * treeScale);

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#132B1B"/>
  <circle cx="${center}" cy="${center}" r="${radius}" fill="#7FA65C"/>
  <g transform="translate(${offset}, ${offset}) scale(${treeScale})">
    <path d="M16 6L9.5 15H12.5L8.5 21H14.5V25.5H17.5V21H23.5L19.5 15H22.5L16 6Z" fill="#132B1B"/>
  </g>
</svg>
`;
}

function getScreenshotHomeSvg(w, h) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#F7F3E8"/>
  <!-- Status bar & Header -->
  <rect width="${w}" height="140" fill="#1E4029"/>
  <circle cx="70" cy="85" r="28" fill="#7FA65C"/>
  <text x="120" y="85" fill="#F7F3E8" font-family="sans-serif" font-size="28" font-weight="bold">Bangr-Weoogo</text>
  <text x="120" y="112" fill="#C9D8C4" font-family="sans-serif" font-size="16">PARC URBAIN — OUAGADOUGOU</text>

  <!-- Hero Card -->
  <rect x="40" y="170" width="${w - 80}" height="380" rx="24" fill="#132B1B"/>
  <text x="80" y="240" fill="#7FA65C" font-family="sans-serif" font-size="18" font-weight="bold" letter-spacing="2">SANCTUAIRE NATUREL</text>
  <text x="80" y="300" fill="#FFFFFF" font-family="serif" font-size="36" font-weight="bold">Poumon vert de</text>
  <text x="80" y="350" fill="#FFFFFF" font-family="serif" font-size="36" font-weight="bold">Ouagadougou</text>
  <text x="80" y="410" fill="#EDE4CE" font-family="sans-serif" font-size="20">Forêt classée de 265 hectares, faune</text>
  <text x="80" y="440" fill="#EDE4CE" font-family="sans-serif" font-size="20">sahélienne et flore protégée.</text>

  <!-- CTA -->
  <rect x="80" y="470" width="260" height="56" rx="28" fill="#8A5517"/>
  <text x="120" y="506" fill="#FFFFFF" font-family="sans-serif" font-size="20" font-weight="bold">Réserver un billet</text>

  <!-- Cards -->
  <rect x="40" y="580" width="${w - 80}" height="180" rx="20" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <rect x="60" y="605" width="130" height="130" rx="16" fill="#7FA65C" opacity="0.3"/>
  <text x="220" y="650" fill="#132B1B" font-family="sans-serif" font-size="26" font-weight="bold">Singe patas</text>
  <text x="220" y="685" fill="#5B6153" font-family="sans-serif" font-size="18">Erythrocebus patas</text>
  <text x="220" y="720" fill="#8A5517" font-family="sans-serif" font-size="16" font-weight="bold">Emblème du parc • 55 km/h</text>

  <rect x="40" y="780" width="${w - 80}" height="180" rx="20" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <rect x="60" y="805" width="130" height="130" rx="16" fill="#7FA65C" opacity="0.3"/>
  <text x="220" y="850" fill="#132B1B" font-family="sans-serif" font-size="26" font-weight="bold">Crocodile sacré</text>
  <text x="220" y="885" fill="#5B6153" font-family="sans-serif" font-size="18">Crocodylus suchus</text>
  <text x="220" y="920" fill="#8A5517" font-family="sans-serif" font-size="16" font-weight="bold">Marigot du parc</text>

  <!-- Bottom Nav -->
  <rect y="${h - 110}" width="${w}" height="110" fill="#132B1B"/>
  <text x="${w * 0.15}" y="${h - 50}" fill="#7FA65C" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Accueil</text>
  <text x="${w * 0.38}" y="${h - 50}" fill="#EDE4CE" font-family="sans-serif" font-size="18" text-anchor="middle">Nature</text>
  <text x="${w * 0.62}" y="${h - 50}" fill="#EDE4CE" font-family="sans-serif" font-size="18" text-anchor="middle">Billets</text>
  <text x="${w * 0.85}" y="${h - 50}" fill="#EDE4CE" font-family="sans-serif" font-size="18" text-anchor="middle">Visite</text>
</svg>
`;
}

function getScreenshotFauneSvg(w, h) {
  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#F7F3E8"/>
  <rect width="${w}" height="140" fill="#1E4029"/>
  <text x="40" y="90" fill="#F7F3E8" font-family="serif" font-size="34" font-weight="bold">Biodiversit&#233; et Nature</text>

  <!-- Filters -->
  <rect x="40" y="160" width="160" height="48" rx="24" fill="#1E4029"/>
  <text x="120" y="192" fill="#FFFFFF" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Toutes (14)</text>
  <rect x="220" y="160" width="160" height="48" rx="24" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <text x="300" y="192" fill="#23281F" font-family="sans-serif" font-size="18" text-anchor="middle">Faune (8)</text>
  <rect x="400" y="160" width="160" height="48" rx="24" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <text x="480" y="192" fill="#23281F" font-family="sans-serif" font-size="18" text-anchor="middle">Flore (6)</text>

  <!-- Cards Grid -->
  <rect x="40" y="240" width="${(w - 100) / 2}" height="320" rx="20" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <rect x="55" y="255" width="${(w - 100) / 2 - 30}" height="180" rx="14" fill="#7FA65C" opacity="0.3"/>
  <text x="60" y="475" fill="#132B1B" font-family="sans-serif" font-size="22" font-weight="bold">Singe patas</text>
  <text x="60" y="505" fill="#5B6153" font-family="sans-serif" font-size="16">Erythrocebus patas</text>
  <text x="60" y="535" fill="#7FA65C" font-family="sans-serif" font-size="14" font-weight="bold">Faune • Mammifère</text>

  <rect x="${w / 2 + 10}" y="240" width="${(w - 100) / 2}" height="320" rx="20" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <rect x="${w / 2 + 25}" y="255" width="${(w - 100) / 2 - 30}" height="180" rx="14" fill="#7FA65C" opacity="0.3"/>
  <text x="${w / 2 + 30}" y="475" fill="#132B1B" font-family="sans-serif" font-size="22" font-weight="bold">Varan du Nil</text>
  <text x="${w / 2 + 30}" y="505" fill="#5B6153" font-family="sans-serif" font-size="16">Varanus niloticus</text>
  <text x="${w / 2 + 30}" y="535" fill="#7FA65C" font-family="sans-serif" font-size="14" font-weight="bold">Faune • Reptile</text>

  <rect x="40" y="580" width="${(w - 100) / 2}" height="320" rx="20" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <rect x="55" y="595" width="${(w - 100) / 2 - 30}" height="180" rx="14" fill="#7FA65C" opacity="0.3"/>
  <text x="60" y="815" fill="#132B1B" font-family="sans-serif" font-size="22" font-weight="bold">Calao d'Afrique</text>
  <text x="60" y="845" fill="#5B6153" font-family="sans-serif" font-size="16">Tockus erythrorhynchus</text>
  <text x="60" y="875" fill="#7FA65C" font-family="sans-serif" font-size="14" font-weight="bold">Faune • Oiseau</text>

  <rect x="${w / 2 + 10}" y="580" width="${(w - 100) / 2}" height="320" rx="20" fill="#FFFFFF" stroke="#EDE4CE" stroke-width="2"/>
  <rect x="${w / 2 + 25}" y="595" width="${(w - 100) / 2 - 30}" height="180" rx="14" fill="#7FA65C" opacity="0.3"/>
  <text x="${w / 2 + 30}" y="815" fill="#132B1B" font-family="sans-serif" font-size="22" font-weight="bold">Karité sacré</text>
  <text x="${w / 2 + 30}" y="845" fill="#5B6153" font-family="sans-serif" font-size="16">Vitellaria paradoxa</text>
  <text x="${w / 2 + 30}" y="875" fill="#7FA65C" font-family="sans-serif" font-size="14" font-weight="bold">Flore • Arbre</text>

  <rect y="${h - 110}" width="${w}" height="110" fill="#132B1B"/>
  <text x="${w * 0.15}" y="${h - 50}" fill="#EDE4CE" font-family="sans-serif" font-size="18" text-anchor="middle">Accueil</text>
  <text x="${w * 0.38}" y="${h - 50}" fill="#7FA65C" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Nature</text>
  <text x="${w * 0.62}" y="${h - 50}" fill="#EDE4CE" font-family="sans-serif" font-size="18" text-anchor="middle">Billets</text>
  <text x="${w * 0.85}" y="${h - 50}" fill="#EDE4CE" font-family="sans-serif" font-size="18" text-anchor="middle">Visite</text>
</svg>
`;
}

async function generate() {
  console.log('Génération des icônes PWA...');
  
  // 192x192
  await sharp(Buffer.from(getStandardSvg(192)))
    .png()
    .toFile(path.join(iconsDir, 'icon-192.png'));
  console.log('✓ icon-192.png généré');

  // 512x512
  await sharp(Buffer.from(getStandardSvg(512)))
    .png()
    .toFile(path.join(iconsDir, 'icon-512.png'));
  console.log('✓ icon-512.png généré');

  // 512x512 Maskable
  await sharp(Buffer.from(getMaskableSvg(512)))
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-512.png'));
  console.log('✓ icon-maskable-512.png généré');

  // Apple touch icon 180x180 (aussi à la racine de public pour compatibilité iOS classique)
  const appleTouchBuffer = await sharp(Buffer.from(getStandardSvg(180))).png().toBuffer();
  fs.writeFileSync(path.join(iconsDir, 'apple-touch-icon.png'), appleTouchBuffer);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchBuffer);
  console.log('✓ apple-touch-icon.png (180x180) généré');

  // Screenshots
  await sharp(Buffer.from(getScreenshotHomeSvg(720, 1280)))
    .png()
    .toFile(path.join(screenshotsDir, 'screenshot-mobile-home.png'));
  console.log('✓ screenshot-mobile-home.png généré');

  await sharp(Buffer.from(getScreenshotFauneSvg(720, 1280)))
    .png()
    .toFile(path.join(screenshotsDir, 'screenshot-mobile-faune.png'));
  console.log('✓ screenshot-mobile-faune.png généré');

  console.log('Tous les assets PWA ont été générés avec succès !');
}

generate().catch(console.error);
