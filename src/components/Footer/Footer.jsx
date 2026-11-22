import { Link } from 'react-router-dom';
import { navigation } from '../../data/navigation.js';
import { contacts } from '../../data/content.js';
import Logo from '../Logo/Logo.jsx';
import './Footer.css';

// Подвала в макете нет — добавлен как недостающий блок (контакты, дублирующее меню)
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__about">
          <Logo />
          <p className="footer__text">Онлайн- и офлайн-занятия с экспертами для частных лиц и организаций.</p>
        </div>

        <nav className="footer__nav" aria-label="Меню в подвале">
          <h2 className="footer__heading">Разделы</h2>
          <ul className="footer__list">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contacts">
          <h2 className="footer__heading">Контакты</h2>
          <ul className="footer__list">
            <li>
              <a href={contacts.phoneHref} className="footer__link">
                {contacts.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`} className="footer__link">
                {contacts.email}
              </a>
            </li>
            <li className="footer__muted">{contacts.schedule}</li>
          </ul>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Учебная платформа · учебный проект</p>
    </footer>
  );
}
