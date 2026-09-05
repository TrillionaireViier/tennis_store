import { Link } from 'react-router-dom';
import { Phone, Mail, Map, Clock } from 'lucide-react';
import { useLang } from '../context/LangContext';

const footerT = {
  uk: {
    aboutTitle: "Про Нас",
    aboutDesc: "Обирай спорядження рівня майстрів спорту. Грайте на максимумі, перемагайте та розвивайте український спорт разом із нами!",
    clientsTitle: "Клієнтам",
    privacy: "Політика конфіденційності",
    terms: "Умови використання",
    contactsTitle: "Контакти",
    address: "м. Київ, вул. Спортивна, 1",
    hours: "Пн-Нд: 09:00 - 22:00",
    rights: "Всі права захищені."
  },
  en: {
    aboutTitle: "About Us",
    aboutDesc: "Choose Master of Sports level equipment. Play at your maximum, win, and develop sports together with us!",
    clientsTitle: "Customers",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    contactsTitle: "Contacts",
    address: "Kyiv, Sportyvna st., 1",
    hours: "Mon-Sun: 09:00 - 22:00",
    rights: "All rights reserved."
  }
};

export default function Footer() {
  const { lang } = useLang();
  const t = footerT[lang];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>{t.aboutTitle}</h4>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {t.aboutDesc}
            </p>
          </div>
          
          <div className="footer-column">
            <h4>{t.clientsTitle}</h4>
            <div className="footer-links">
              <Link to="/privacy-policy">{t.privacy}</Link>
              <Link to="/terms-of-use">{t.terms}</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4>{t.contactsTitle}</h4>
            <div className="footer-contact-item">
              <Phone size={18} color="var(--color-secondary)" />
              <span>+38 (000) 000-00-00</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} color="var(--color-secondary)" />
              <span>info@tabletennis.com.ua</span>
            </div>
            <div className="footer-contact-item">
              <Map size={18} color="var(--color-secondary)" />
              <span>{t.address}</span>
            </div>
            <div className="footer-contact-item">
              <Clock size={18} color="var(--color-secondary)" />
              <span>{t.hours}</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} TableTennis Store. {t.rights}
        </div>
      </div>
    </footer>
  );
}
