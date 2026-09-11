import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-harmattan px-4 py-16">
      <div className="max-w-lg text-center bg-sand/30 p-8 md:p-12 rounded-3xl border border-sand shadow-xl">
        <span className="text-6xl md:text-7xl mb-4 block animate-bounce">🌳</span>
        <h1 className="text-5xl font-serif font-extrabold text-canopy mb-2">404</h1>
        <h2 className="text-xl font-bold text-baobab mb-4">
          Oups ! Vous vous êtes égaré dans la forêt de Bangr-Weoogo...
        </h2>
        <p className="text-ink/80 text-sm md:text-base leading-relaxed mb-8">
          La page que vous recherchez semble introuvable ou a été déplacée. Pas d'inquiétude, la nature saura vous guider vers le bon chemin.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-canopy hover:bg-canopy-deep text-harmattan font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
        >
          <span>🌱 Retourner à l'Accueil</span>
        </Link>
      </div>
    </div>
  );
}
