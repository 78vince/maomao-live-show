import Link from "next/link";
import { getFeaturedWorks, getFeaturedProducts } from "@/lib/notion";
import type { Work, Product } from "@/lib/notion";

export const revalidate = 60;

function WorkCard({ work, style }: { work: Work; style?: React.CSSProperties }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      style={{
        backgroundColor: work.placeholderColor,
        ...style,
      }}
      className="relative overflow-hidden rounded-[28px] group block"
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
          style={{ fontSize: 28, WebkitTextStroke: "0.7px currentColor" }}
        >
          {work.title}
        </p>
        {work.category && (
          <span className="text-white/70 text-xs mt-1 block">{work.category}</span>
        )}
      </div>
    </Link>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-[var(--color-card)] rounded-[28px] overflow-hidden flex flex-col">
      <div className="aspect-square overflow-hidden bg-[var(--color-border)]">
        {product.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.coverUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)]">
            🐱
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <h3 className="font-display text-base text-stroke-xs text-[var(--color-dark)] leading-snug">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">
            {product.description}
          </p>
        )}
        <div className="flex gap-2">
          {product.shopeeUrl && (
            <a
              href={product.shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-medium text-white py-2 px-3 rounded-full transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--color-coral)" }}
            >
              Shopee
            </a>
          )}
          {product.pinkoiUrl && (
            <a
              href={product.pinkoiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-medium text-white py-2 px-3 rounded-full transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--color-coral)" }}
            >
              Pinkoi
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const [featuredWorks, featuredProducts] = await Promise.all([
    getFeaturedWorks(),
    getFeaturedProducts(),
  ]);

  const bentoWorks = featuredWorks.slice(0, 10);

  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[var(--color-brown)] font-medium tracking-wide uppercase">
            小禮 Li Studio
          </p>
          <h1
            className="font-display leading-tight text-[var(--color-dark)]"
            style={{ fontSize: "clamp(48px, 8vw, 88px)", WebkitTextStroke: "1.2px currentColor" }}
          >
            貓貓 Live Show
          </h1>
          <p className="text-lg text-[var(--color-muted)] max-w-xl">
            暹羅貓插畫日常 — 散步、釣魚、漂浮、量體重
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              href="/works"
              className="px-6 py-3 rounded-full font-medium text-white text-sm transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--color-brown)" }}
            >
              看作品集
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full font-medium text-white text-sm transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--color-coral)" }}
            >
              逛選物商店
            </Link>
          </div>
        </div>
      </section>

      {/* Bento 作品格 */}
      {bentoWorks.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr 1fr 0.9fr",
              gridAutoRows: "200px",
              gap: 0,
            }}
          >
            {bentoWorks.map((work, i) => {
              const spanStyle = getBentoSpan(i);
              return (
                <WorkCard key={work.id} work={work} style={spanStyle} />
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/works"
              className="inline-block text-sm font-medium text-[var(--color-brown)] hover:underline"
            >
              查看全部作品 →
            </Link>
          </div>
        </section>
      )}

      {/* 商品預覽 */}
      {featuredProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="font-display text-[var(--color-dark)]"
              style={{ fontSize: 32, WebkitTextStroke: "0.7px currentColor" }}
            >
              選物商店
            </h2>
            <Link
              href="/shop"
              className="text-sm font-medium text-[var(--color-brown)] hover:underline"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 空狀態：無資料時顯示提示 */}
      {bentoWorks.length === 0 && featuredProducts.length === 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-[var(--color-muted)]">
            內容正在準備中，敬請期待 🐱
          </p>
        </section>
      )}
    </>
  );
}

function getBentoSpan(index: number): React.CSSProperties {
  const spans: React.CSSProperties[] = [
    { gridColumn: "1", gridRow: "1" },
    { gridColumn: "2", gridRow: "1" },
    { gridColumn: "3", gridRow: "1 / 3" },
    { gridColumn: "4", gridRow: "1" },
    { gridColumn: "1", gridRow: "2" },
    { gridColumn: "4", gridRow: "2" },
    { gridColumn: "1", gridRow: "3" },
    { gridColumn: "2", gridRow: "2 / 4" },
    { gridColumn: "3", gridRow: "3" },
    { gridColumn: "4", gridRow: "3" },
  ];
  return spans[index] ?? {};
}
