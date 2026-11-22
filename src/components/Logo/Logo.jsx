import { Link } from 'react-router-dom';
import './Logo.css';

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" aria-label="Учебная платформа — на главную" onClick={onClick}>
      <svg className="logo__mark" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#fff" />
        <path
          d="M8 12.5c3.3-1.6 6.7-1.6 10 0v12c-3.3-1.6-6.7-1.6-10 0zM18 12.5c3.3-1.6 6.7-1.6 10 0v12c-3.3-1.6-6.7-1.6-10 0"
          fill="none"
          stroke="#374EE4"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__text">
        Учебная
        <br />
        платформа
      </span>
    </Link>
  );
}
