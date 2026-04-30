"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/works", label: "作品集" },
  { href: "/shop", label: "商店" },
  { href: "/about", label: "關於" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-cream)] border-b border-[var(--color-border)]">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl text-stroke-xs text-[var(--color-dark)] hover:text-[var(--color-brown)] transition-colors">
          貓貓 Live Show
        </Link>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--color-brown)] ${
                  pathname === link.href
                    ? "text-[var(--color-brown)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
