import Link from '../../router/Link.jsx';
import Button from '../Button/Button.jsx';
import LecturerPhoto from '../LecturerPhoto/LecturerPhoto.jsx';
import { capitalize, formatPrice, plural } from '../../utils/format.js';
import { lessonPrice } from '../../utils/lecturers.js';
import './LecturerCard.css';

// Карточка в списке лекторов (в макете — одиночный блок «ФИО преподавателя»)
export default function LecturerCard({ lecturer, isFavorite, onToggleFavorite }) {
  const { id, fullName, degree, experienceYears, disciplines } = lecturer;

  return (
    <article className="lecturer-card">
      <LecturerPhoto lecturer={lecturer} size="small" />
      <div className="lecturer-card__body">
        <h3 className="lecturer-card__name">
          <Link to={`/lecturers/${id}`} className="lecturer-card__link">
            {fullName}
          </Link>
        </h3>
        <p className="lecturer-card__meta">
          {degree ? capitalize(degree) : 'Практикующий специалист'}
          <br />
          Стаж {experienceYears} {plural(experienceYears, ['год', 'года', 'лет'])}
        </p>
        <ul className="lecturer-card__tags">
          {disciplines.map((d) => (
            <li key={d.title}>{d.title}</li>
          ))}
        </ul>
        <p className="lecturer-card__price">от {formatPrice(lessonPrice(lecturer))} за занятие</p>
        {onToggleFavorite && (
          <Button
            className="lecturer-card__favorite"
            aria-label={`Избранное: ${fullName}`}
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(id)}
          >
            <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
            Избранное
          </Button>
        )}
      </div>
    </article>
  );
}
