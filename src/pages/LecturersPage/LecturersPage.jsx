import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LecturerCard from '../../components/LecturerCard/LecturerCard.jsx';
import Button from '../../components/Button/Button.jsx';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import useLocalStorage from '../../hooks/useLocalStorage.js';
import { lecturers } from '../../data/lecturers.js';
import { SORT_OPTIONS, filterLecturers, sortLecturers } from '../../utils/lecturers.js';
import { plural } from '../../utils/format.js';
import './LecturersPage.css';

export default function LecturersPage() {
  useDocumentTitle('Лекторы — Учебная платформа');

  // ?q= приходит из «Направлений» на главной
  const [query] = useSearchParams();
  const urlQuery = query.get('q') ?? '';
  const [search, setSearch] = useState(urlQuery);
  const [lastUrlQuery, setLastUrlQuery] = useState(urlQuery);
  const [sort, setSort] = useState('default');
  const [favoriteIds, setFavoriteIds] = useLocalStorage('edu-platform:favorite-lecturers', []);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  if (lastUrlQuery !== urlQuery) {
    setLastUrlQuery(urlQuery);
    setSearch(urlQuery);
  }

  const favorites = Array.isArray(favoriteIds) ? favoriteIds : [];
  const matching = useMemo(() => sortLecturers(filterLecturers(lecturers, search), sort), [search, sort]);
  const visible = favoritesOnly
    ? matching.filter((lecturer) => favorites.includes(lecturer.id))
    : matching;
  const emptyMessage = favoritesOnly
    ? 'Нет избранных лекторов по текущим фильтрам'
    : `По запросу «${search.trim()}» никого не нашли`;

  function toggleFavorite(id) {
    setFavoriteIds((storedIds) => {
      const ids = Array.isArray(storedIds) ? storedIds : [];
      return ids.includes(id) ? ids.filter((favoriteId) => favoriteId !== id) : [...ids, id];
    });
  }

  return (
    <section className="frame section">
      <div className="section__header">
        <div>
          <h1 className="section__title">Лекторы</h1>
          <p className="section__lead">Образование, стаж, программы курсов и стоимость занятий.</p>
        </div>
      </div>

      <div className="toolbar" role="search">
        <label className="toolbar__search">
          <span className="visually-hidden">Поиск по лекторам</span>
          <input
            type="search"
            className="field__control"
            placeholder="Дисциплина, тема или фамилия — например, «Python» или «ЕГЭ»"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <label className="toolbar__sort">
          <span className="visually-hidden">Сортировка</span>
          <select className="field__control" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <Button
          variant={favoritesOnly ? 'primary' : 'outline'}
          aria-pressed={favoritesOnly}
          onClick={() => setFavoritesOnly((enabled) => !enabled)}
        >
          Только избранные
        </Button>
      </div>

      <p className="toolbar__count" aria-live="polite">
        {visible.length > 0
          ? `Найдено ${visible.length} ${plural(visible.length, ['лектор', 'лектора', 'лекторов'])}`
          : emptyMessage}
      </p>

      {visible.length > 0 ? (
        <div className="cards-grid">
          {visible.map((lecturer) => (
            <LecturerCard
              key={lecturer.id}
              lecturer={lecturer}
              isFavorite={favorites.includes(lecturer.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <Button onClick={() => {
          setSearch('');
          setFavoritesOnly(false);
        }}>
          {favoritesOnly ? 'Показать всех лекторов' : 'Сбросить поиск'}
        </Button>
      )}
    </section>
  );
}
