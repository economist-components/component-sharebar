import React from 'react';
import SharebarIcon from './sharebar-icon';

const iconProps = {
  facebook: {
    title: 'Share on Facebook',
    url: 'http://www.facebook.com/sharer/sharer.php?u=',
  },
  twitter: {
    title: 'Share on Twitter',
    url: 'https://twitter.com/intent/tweet?url=',
  },
  googleplus: {
    title: 'Share on Google Plus',
    url: 'https://plus.google.com/share?url=',
  },
  linkedin: {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/cws/share?url=',
  },
  whatsapp: {
    title: 'WhatsApp',
    url: 'whatsapp://send?text=',
  },
};
export default function Sharebar({
  iconSize = '49px',
  icons = [
    'facebook', 'twitter', 'googleplus', 'linkedin', 'whatsapp',
  ],
} = {}) {
  return (
    <div className="share-component">
      <div className="share-component__icons">
        {icons.map((icon) => {
          return (
            <SharebarIcon
              key={icon}
              icon={icon}
              title={iconProps[icon].title}
              url={iconProps[icon].url}
              iconSize={iconSize}
            />
          );
        })}
      </div>
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Sharebar.propTypes = {
    iconSize: React.PropTypes.string,
    icons: React.PropTypes.arrayOf(React.PropTypes.string),
  };
}
