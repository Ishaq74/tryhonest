import type { Language } from '../types/i18n';
import { getTranslation } from '../i18n';

interface FooterProps {
  currentLang: Language;
}

export default function Footer({ currentLang }: FooterProps) {
  const t = getTranslation(currentLang);

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.home.title}</h3>
            <p className="text-gray-400">{t.home.subtitle}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.nav.explore}</h4>
            <ul className="space-y-2">
              <li><a href="/explore" className="text-gray-400 hover:text-white transition">{t.nav.explore}</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white transition">{t.nav.events}</a></li>
              <li><a href="/hiking" className="text-gray-400 hover:text-white transition">{t.nav.hiking}</a></li>
              <li><a href="/magazine" className="text-gray-400 hover:text-white transition">{t.nav.magazine}</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.nav.community}</h4>
            <ul className="space-y-2">
              <li><a href="/community" className="text-gray-400 hover:text-white transition">{t.nav.community}</a></li>
              <li><a href="/classifieds" className="text-gray-400 hover:text-white transition">{t.nav.classifieds}</a></li>
              <li><a href="/professional" className="text-gray-400 hover:text-white transition">{t.nav.professional}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.about}</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition">{t.footer.about}</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition">{t.footer.contact}</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition">{t.footer.privacy}</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition">{t.footer.terms}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
