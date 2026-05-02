import Link from "next/link";
import { getFeaturedWorks, getFeaturedProducts } from "@/lib/notion";
import type { Product } from "@/lib/notion";
import HeroCarousel from "@/components/HeroCarousel";

export const revalidate = 60;

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
        <h3 className="font-display text-base text-[var(--color-dark)] leading-snug" style={{ WebkitTextStroke: "0.4px currentColor" }}>
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

  const bentoWorks = featuredWorks.slice(0, 8);

  return (
    <>
      {/* Hero — full width, offset the layout spacer */}
      <section className="-mt-16">
        <HeroCarousel />
      </section>

      {/* Bento 九宮格 */}
      {bentoWorks.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {bentoWorks.map((work) => (
              <Link
                key={work.id}
                href={`/works/${encodeURIComponent(work.slug)}`}
                className="aspect-square relative overflow-hidden rounded-[28px] group block"
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
                    style={{ fontSize: 20, WebkitTextStroke: "0.5px currentColor" }}
                  >
                    {work.title}
                  </p>
                </div>
              </Link>
            ))}

            {/* 看其他日常 */}
            <Link
              href="/works"
              className="aspect-square rounded-[28px] flex flex-col items-center justify-center group"
              style={{ backgroundColor: "var(--color-brown)" }}
            >
              <span
                className="font-display text-2xl text-white group-hover:opacity-80 transition-opacity"
                style={{ WebkitTextStroke: "0.5px currentColor" }}
              >
                看其他日常
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* 商品預覽 */}
      {featuredProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {/* 貓貓雜貨鋪 link card */}
            <Link
              href="/shop"
              className="rounded-[28px] flex flex-col items-center justify-center p-6 group hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-brown)" }}
            >
              <span
                className="font-display text-xl text-white text-center"
                style={{ WebkitTextStroke: "0.5px currentColor" }}
              >
                貓貓雜貨鋪
              </span>
            </Link>
          </div>
        </section>
      )}

      {bentoWorks.length === 0 && featuredProducts.length === 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="text-[var(--color-muted)]">內容正在準備中，敬請期待 🐱</p>
        </section>
      )}
    </>
  );
}
