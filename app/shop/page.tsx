import { getProducts } from "@/lib/notion";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1
        className="font-display text-[var(--color-dark)] mb-10"
        style={{ fontSize: 48, WebkitTextStroke: "0.9px currentColor", color: "var(--color-title)" }}
      >
        貓貓雜貨舖
      </h1>

      {products.length === 0 ? (
        <p className="text-[var(--color-muted)]">商品準備中 🐱</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[var(--color-card)] rounded-[28px] overflow-hidden flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-[var(--color-border)]">
                {product.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.coverUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] text-4xl">
                    🐱
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1 gap-3">
                <h2
                  className="font-display text-[var(--color-dark)] leading-snug"
                  style={{ fontSize: 18, WebkitTextStroke: "0.5px currentColor" }}
                >
                  {product.title}
                </h2>
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
                      className="flex-1 text-center text-sm font-medium text-white py-2.5 px-3 rounded-full transition-opacity hover:opacity-85"
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
                      className="flex-1 text-center text-sm font-medium text-white py-2.5 px-3 rounded-full transition-opacity hover:opacity-85"
                      style={{ backgroundColor: "var(--color-coral)" }}
                    >
                      Pinkoi
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
