import { Link } from 'react-router-dom';
import './Button.css';

/*
 * В макете — текст «НАЙТИ ЛЕКТОРА» (Inter 600, 16px, #374EE4).
 * По комментарию #1 превращён в полноценную кнопку: рамка, hover, фокус, переход.
 * to — внутренний маршрут, href — внешняя ссылка, иначе обычная <button>.
 */
export default function Button({ to, href, variant = 'outline', className = '', children, ...rest }) {
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
