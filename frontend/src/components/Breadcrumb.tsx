import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 px-4 bg-sand/40 rounded-lg text-sm mb-6 inline-block">
      <ol className="flex items-center space-x-2 text-ink/70">
        <li>
          <Link href="/" className="hover:text-canopy font-medium transition-colors">
            Accueil
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-canopy/40">/</span>
              {isLast || !item.href ? (
                <span className="font-semibold text-canopy" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-canopy font-medium transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
