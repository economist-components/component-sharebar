import React from 'react';
import Icon from '@economist/component-icon';

export function handleClick(executeDefault, event) {
  if (executeDefault) {
    return;
  }

  if (event && event.preventDefault) {
    event.preventDefault();
  }

  if (event && event.currentTarget && event.currentTarget.getAttribute('href')) {
    const location = (event.currentTarget.getAttribute('href') + window.location.href);
    window.open(location, '_blank');
  }
}

export default function SharebarIcon({
  url,
  title,
  iconSize,
  icon,
  executeDefault,
} = {}) {
  return (
    <div className={`share__icon share__icon--${icon}`}>
      <a href={url}
        title={title}
        className="share__link"
        onClick={handleClick.bind(null, executeDefault)}
      >
        <Icon size={iconSize} icon={icon} />
      </a>
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  SharebarIcon.propTypes = {
    url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    iconSize: React.PropTypes.string.isRequired,
  };
}
