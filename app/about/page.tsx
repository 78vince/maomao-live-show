export default function AboutPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1
        className="font-display mb-8"
        style={{ fontSize: 48, WebkitTextStroke: "0.9px currentColor", color: "var(--color-title)" }}
      >
        關於貓秀
      </h1>

      <div className="space-y-6 text-base text-[var(--color-dark)] leading-relaxed">
        <p>
          許多年前，我們遇見了一位街頭的流浪靈魂。他是一隻在街頭生存的貓，帶著兩顆斷掉的虎牙、微缺一角的耳朵，以及醫生口中那些因為打架而留下的傷痕。不忍心看他繼續在街頭過著驚險的日子，我們決定將他帶回家，並喚他為「貓貓」。
        </p>
        <p>
          沒想到，這份單純的善意，開啟了一段充滿歡笑的創作旅程。貓貓的生活充滿了令人會心一笑的細節：從吃罐頭與飼料的巨大反差、將頭穿過百葉窗縫隙看風景的背影，到上完廁所只用手假裝摸兩下地板敷衍了事的模樣。為了將這些珍貴的瞬間分享給親友，我拿起了畫筆，開始記錄我們的日常。
        </p>
        <p>
          從 2012 年最初簡單的鉛筆速寫，到後來隨著對他越來越了解，看著他悠哉的生活步調，我開始為他設計主題與故事。我嘗試用他的視角觀察世界，甚至為他過往在街頭巷弄間的「浪人」事蹟編織冒險篇章，想像他那些傷痕與斷牙背後的英勇過往。
        </p>
        <p>
          這段充滿靈感的創作時光一路持續到了 2018 年。後來隨著孩子的出生，生活重心逐漸被育兒與工作填滿，畫筆也只能暫時擱置。
        </p>
        <p>
          2024 年底，貓貓因為疾病離開了我們。雖然他的實體生命畫下了句點，但他為我們一家留下了無可取代的美好回憶。這個空間的誕生與重啟，正是為了紀念這位特別的家人。我們希望透過持續的創作，讓貓貓的故事以另一種形式延續，為他譜寫更多未完的有趣冒險，讓他繼續在我們與大家的世界裡，充滿活力地活躍著。
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
              href="https://www.instagram.com/maomao_live_show/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              Instagram — @maomao_live_show
            </a>
            <a
              href="https://www.facebook.com/MaomaoLiveShow/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-muted)] hover:text-[var(--color-brown)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook — Maomao Live Show
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
