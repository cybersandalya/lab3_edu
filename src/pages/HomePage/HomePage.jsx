import Button from '../../components/Button/Button.jsx';
import HeroPhoto from '../../components/HeroPhoto/HeroPhoto.jsx';
import LecturerCard from '../../components/LecturerCard/LecturerCard.jsx';
import FeatureGrid from '../../components/FeatureGrid/FeatureGrid.jsx';
import CallToAction from '../../components/CallToAction/CallToAction.jsx';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { lecturers } from '../../data/lecturers.js';
import { steps } from '../../data/content.js';
import { allDisciplines, getStats } from '../../utils/lecturers.js';
import { plural } from '../../utils/format.js';
import './HomePage.css';

const FEATURED_IDS = ['petrov', 'smirnova', 'sokolov'];

export default function HomePage() {
  useDocumentTitle('Учебная платформа — лекторы, спикеры и тренеры');

  const stats = getStats(lecturers);
  const featured = FEATURED_IDS.map((id) => lecturers.find((l) => l.id === id));

  // Комментарий #4: блок под фото дополнен ключевыми цифрами платформы
  const heroStats = [
    { value: stats.lecturers, label: plural(stats.lecturers, ['лектор', 'лектора', 'лекторов']) },
    { value: stats.courses, label: plural(stats.courses, ['курс', 'курса', 'курсов']) },
    { value: `${stats.minYears}–${stats.maxYears}`, label: 'лет практики' },
    { value: stats.withDegree, label: 'кандидатов и докторов наук' },
  ];

  return (
    <>
      {/* Фрейм «Главная»: 1170×447 */}
      <section className="frame hero">
        <HeroPhoto />
        <div className="hero__content">
          <h1 className="hero__title">
            Наши лекторы — признанные специалисты в своих областях, готовые делиться опытом и знаниями.
          </h1>
          <Button to="/lecturers" className="hero__button">
            Найти лектора <span className="button__arrow" aria-hidden="true">→</span>
          </Button>
        </div>
        <ul className="hero__stats">
          {heroStats.map((item) => (
            <li key={item.label}>
              <span className="hero__stat-value">{item.value}</span>
              <span className="hero__stat-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="frame section">
        <h2 className="section__title">Направления</h2>
        <ul className="chips">
          {allDisciplines(lecturers).map((title) => (
            <li key={title}>
              <Link to={`/lecturers?q=${encodeURIComponent(title)}`} className="chip">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="frame section">
        <div className="section__header">
          <h2 className="section__title">Популярные лекторы</h2>
          <Button to="/lecturers">
            Все лекторы <span className="button__arrow" aria-hidden="true">→</span>
          </Button>
        </div>
        <div className="cards-grid">
          {featured.map((lecturer) => (
            <LecturerCard key={lecturer.id} lecturer={lecturer} />
          ))}
        </div>
      </section>

      <section className="frame section">
        <h2 className="section__title">Как это работает</h2>
        <FeatureGrid items={steps} numbered />
      </section>

      <CallToAction
        title="Лекции и тренинги для организаций"
        text="Подберём экспертов для компаний, школ, вузов и НКО: разовые лекции, серии занятий и корпоративные программы."
        action={{ label: 'Подробнее', to: '/about' }}
      />
    </>
  );
}
