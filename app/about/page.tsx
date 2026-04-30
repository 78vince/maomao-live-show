export default function AboutPage() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h1
        className="font-display text-[var(--color-dark)] mb-8"
        style={{ fontSize: 48, WebkitTextStroke: "0.9px currentColor" }}
      >
        關於
      </h1>

      <div className="space-y-6 text-base text-[var(--color-dark)] leading-relaxed">
        <p>
          貓貓 Live Show 是小禮 Li Studio 的插畫子品牌，主角是一隻暹羅貓，記錄他的日常 — 散步、釣魚、漂浮、量體重。
        </p>
        <p>
          每個作品都是某個下午、某個心情的切片。
        </p>

        <div className="border-t border-[var(--color-border)] pt-6 mt-8">
          <h2
            className="font-display text-[var(--color-dark)] mb-4"
            style={{ fontSize: 22, WebkitTextStroke: "0.5px currentColor" }}
          >
            找到我們
          </h2>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.instagram.com/li_studio_art"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              Instagram — @li_studio_art
            </a>
            <a
              href="https://www.facebook.com/LiStudio.art"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook — 小禮 Li Studio
            </a>
            <a
              href="https://shopee.tw/shop/15712419"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Shopee 商店
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
