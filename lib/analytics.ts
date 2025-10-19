export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', event, params || {});
  }
}

export function trackExhibitionClick(slug: string) {
  track('exhibition_click', { slug });
}

export function trackProgrammeClick(slug: string) {
  track('programme_click', { slug });
}

export function trackContactForm() {
  track('contact_form_submit');
}
