export default function Section({
  id,
  title,
  children
}: {
  id?: string;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">{title}</h2>
      )}
      {children}
    </section>
  );
}


