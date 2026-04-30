import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkBySlug, getWorks } from "@/lib/notion";
import CopyLinkButton from "@/components/CopyLinkButton";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const [work, allWorks] = await Promise.all([
    getWorkBySlug(decodedSlug),
    getWorks(),
  ]);

  if (!work) notFound();

  const currentIndex = allWorks.findIndex((w) => w.slug === work.slug);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;

  const shareUrl = `https://maomao-live-show.vercel.app/works/${encodeURIComponent(work.slug)}`;
  const shareText = encodeURIComponent(`${work.title} — 貓貓 Live Show`);

  const tags = work.tags
    ? work.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <article className="max-w-6xl mx-auto px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] mb-4">
        <Link href="/" className="hover:text-[var(--color-brown)] transition-colors">首頁</Link>
        <span>/</span>
        <Link href="/works" className="hover:text-[var(--color-brown)] transition-colors">作品集</Link>
        <span>/</span>
        <span className="text-[var(--color-dark)] truncate max-w-[200px]">{work.title}</span>
      </nav>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mb-8">
        {prevWork ? (
          <Link
            href={`/works/${encodeURIComponent(prevWork.slug)}`}
            className="group flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
          >
            <span>←</span>
            <span className="group-hover:text-[var(--color-brown)] transition-colors line-clamp-1 max-w-[180px]">
              {prevWork.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextWork ? (
          <Link
            href={`/works/${encodeURIComponent(nextWork.slug)}`}
            className="group flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
          >
            <span className="group-hover:text-[var(--color-brown)] transition-colors line-clamp-1 max-w-[180px]">
              {nextWork.title}
            </span>
            <span>→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Cover */}
      <div
        className="w-full rounded-[28px] overflow-hidden mb-8"
        style={{ backgroundColor: work.placeholderColor }}
      >
        {work.videoUrl ? (
          <div className="aspect-video">
            <iframe
              src={work.videoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        ) : work.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.coverUrl}
            alt={work.title}
            className="w-full h-auto block"
          />
        ) : null}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          {work.category && (
            <span className="text-sm text-[var(--color-muted)] mb-1 block">
              {work.category}
            </span>
          )}
          <h1
            className="font-display text-[var(--color-dark)] leading-tight"
            style={{ fontSize: 36, WebkitTextStroke: "0.7px currentColor" }}
          >
            {work.title}
          </h1>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--color-card)] text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
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
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="分享到 LINE"
            className="text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.105.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="分享到 X"
            className="text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <CopyLinkButton url={shareUrl} />
        </div>
      </div>

      {work.description && (
        <p className="text-[var(--color-dark)] leading-relaxed text-base mt-2">
          {work.description}
        </p>
      )}
    </article>
  );
}
