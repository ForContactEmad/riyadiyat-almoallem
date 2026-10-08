export default function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="grid-paper border-b border-line">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
        {lead && <p className="mt-2 max-w-2xl text-muted">{lead}</p>}
      </div>
    </section>
  );
}
