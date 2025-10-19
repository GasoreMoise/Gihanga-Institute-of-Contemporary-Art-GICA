export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Gihanga Institute of Contemporary Art',
    url: 'https://www.gica.rw',
    logo: 'https://www.gica.rw/og/og-default.jpg',
    sameAs: ['https://instagram.com/gica.rw']
  };
}

export function eventJsonLd(exh: { title: string; startDate: string; endDate?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: exh.title,
    startDate: exh.startDate,
    endDate: exh.endDate
  };
}

export function breadcrumbsJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item
    }))
  };
}
