export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-cream)]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--color-muted)]">
          © 2025 小禮 Li Studio · 貓貓 Live Show
        </p>
        <div className="flex items-center gap-5">
          {/* Facebook */}
          <a href="https://www.facebook.com/MaomaoLiveShow/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/maomao_live_show/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@li_studio_art" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
