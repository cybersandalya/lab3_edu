import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LecturerPhoto from '../../components/LecturerPhoto/LecturerPhoto.jsx';
import Accordion from '../../components/Accordion/Accordion.jsx';
import TariffList from '../../components/TariffList/TariffList.jsx';
import BookingForm from '../../components/BookingForm/BookingForm.jsx';
import Button from '../../components/Button/Button.jsx';
import NotFoundPage from '../NotFoundPage/NotFoundPage.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { lecturers } from '../../data/lecturers.js';
import { capitalize, formatPrice, plural } from '../../utils/format.js';
import { lessonPrice } from '../../utils/lecturers.js';
import './LecturerPage.css';

function scrollToBooking() {
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
}

export default function LecturerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecturer = lecturers.find((l) => l.id === id);
  const [tariffIndex, setTariffIndex] = useState(0);

  useDocumentTitle(lecturer ? `${lecturer.fullName} — Учебная платформа` : 'Лектор не найден');

  if (!lecturer) return <NotFoundPage />;

  const { fullName, education, experienceYears, degree, disciplines, tariffs } = lecturer;

  function selectTariff(index) {
    setTariffIndex(index);
    scrollToBooking();
  }

  return (
    <>
      <button type="button" className="back-link" onClick={() => navigate('/lecturers')}>
        ← Все лекторы
      </button>

      {/* Фрейм «Лекторы» 1058×525: фото слева, блок «ФИО преподавателя» справа */}
      <section className="frame frame--narrow lecturer-profile">
        <LecturerPhoto lecturer={lecturer} size="large" />

        <div className="lecturer-profile__info">
          <h1 className="lecturer-profile__name">{fullName}</h1>
          {/* Комментарий в макете: «Подумайте чем ещё можно восполнить этот блок» */}
          <dl className="facts">
            <dt>Образование</dt>
            <dd>
              {education.university}, {education.speciality} ({education.year})
            </dd>
            <dt>Стаж</dt>
            <dd>
              {experienceYears} {plural(experienceYears, ['год', 'года', 'лет'])}
            </dd>
            <dt>Учёная степень</dt>
            <dd>{degree ? capitalize(degree) : 'Нет'}</dd>
            <dt>Занятие</dt>
            <dd>от {formatPrice(lessonPrice(lecturer))} · 60 минут · онлайн или офлайн</dd>
          </dl>
          <Button variant="primary" onClick={scrollToBooking}>
            Записаться на занятие
          </Button>
        </div>
      </section>

      {/* «Блок для заполнения по своему усмотрению» — программы курсов */}
      <section className="frame frame--narrow section">
        <h2 className="section__title">Программы курсов</h2>
        <div className="lecturer-programs">
          {disciplines.map((discipline, index) => (
            <Accordion
              key={discipline.title}
              title={discipline.title}
              subtitle={capitalize(discipline.description)}
              defaultOpen={index === 0}
            >
              <ol className="topics">
                {discipline.topics.map((topic) => (
                  <li key={topic.title}>
                    <strong>{topic.title}:</strong> {topic.description}
                  </li>
                ))}
              </ol>
            </Accordion>
          ))}
        </div>
      </section>

      <section className="frame frame--narrow section">
        <h2 className="section__title">Тарифы</h2>
        <TariffList tariffs={tariffs} selectedIndex={tariffIndex} onSelect={selectTariff} />
      </section>

      <section id="booking" className="frame frame--narrow section">
        <h2 className="section__title">Записаться к лектору</h2>
        <BookingForm lecturer={lecturer} tariffIndex={tariffIndex} onTariffChange={setTariffIndex} />
      </section>
    </>
  );
}
