/* eslint-disable react/jsx-no-bind */
import Icon from '@economist/component-icon';
import React from 'react';

export function handleClick(flyTitle, blogTitle, executeDefault, event) {
  const encodedFlytitle = encodeURIComponent(flyTitle);
  const encodedTitle = encodeURIComponent(blogTitle);
  const text = `&text=${ encodedFlytitle }:%20${ encodedTitle }`;
  const via = '&via=theeconomist';
  if (executeDefault) {
    return;
  }

  if (event && event.preventDefault) {
    event.preventDefault();
  }

  if (event && event.currentTarget && event.currentTarget.getAttribute('href')) {
    const location = (event.currentTarget.getAttribute('href') + window.location.href + text + via);
    window.open(location, '_blank');
  }
}

export default function SharebarIcon({
  url,
  title,
  iconSize,
  icon,
  executeDefault,
  blogTitle,
  flyTitle,
} = {}) {
  return (
    <div className={`share__icon share__icon--${ icon }`}>
      <a href={url}
        title={title}
        className="share__link"
        onClick={handleClick.bind(null, flyTitle, blogTitle, executeDefault)}
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
