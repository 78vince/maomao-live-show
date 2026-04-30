import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkBySlug, getWorks } from "@/lib/notion";
import CopyLinkButton from "@/components/CopyLinkButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((w) => ({ slug: encodeURIComponent(w.slug) }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const work = await getWorkBySlug(decodedSlug);

  if (!work) notFound();

  const shareUrl = `https://maomao.listudio.art/works/${work.slug}`;
  const shareText = encodeURIComponent(`${work.title} — 貓貓 Live Show`);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Back */}
      <Link
        href="/works"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors mb-8 inline-block"
      >
        ← 作品集
      </Link>

      {/* Cover */}
      <div
        className="w-full aspect-video rounded-[28px] overflow-hidden mb-8"
        style={{ backgroundColor: work.placeholderColor }}
      >
        {work.videoUrl ? (
          <iframe
            src={work.videoUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : work.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.coverUrl}
            alt={work.title}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1
            className="font-display text-[var(--color-dark)] leading-tight"
            style={{ fontSize: 36, WebkitTextStroke: "0.7px currentColor" }}
          >
            {work.title}
          </h1>
          {work.category && (
            <span className="text-sm text-[var(--color-muted)] mt-1 block">
              {work.category}
            </span>
          )}
        </div>

        {/* Share icons */}
        <div className="flex items-center gap-3 shrink-0 pt-1">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="分享到 Facebook"
            className="text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a
            href={`https://www.instagram.com/li_studio_art`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <CopyLinkButton url={shareUrl} />
        </div>
      </div>

      {work.description && (
        <p className="text-[var(--color-dark)] leading-relaxed text-base">
          {work.description}
        </p>
      )}

      {work.tags && (
        <div className="flex flex-wrap gap-2 mt-6">
          {work.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--color-card)] text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
