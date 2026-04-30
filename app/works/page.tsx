import Link from "next/link";
import { getWorks } from "@/lib/notion";

export const revalidate = 60;

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1
        className="font-display text-[var(--color-dark)] mb-10"
        style={{ fontSize: 48, WebkitTextStroke: "0.9px currentColor" }}
      >
        作品集
      </h1>

      {works.length === 0 ? (
        <p className="text-[var(--color-muted)]">作品準備中 🐱</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {works.map((work) => (
            <Link
              key={work.id}
              href={`/works/${work.slug}`}
              className="group relative aspect-square rounded-[28px] overflow-hidden block"
              style={{ backgroundColor: work.placeholderColor }}
            >
              {work.coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={work.coverUrl}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p
                  className="text-white font-display leading-tight"
                  style={{ fontSize: 22, WebkitTextStroke: "0.5px currentColor" }}
                >
                  {work.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
