/* eslint-disable camelcase, id-match  */
import React from 'react';
import SharebarIcon from './sharebar-icon';
import PropTypes from 'prop-types';

function slugCamelCase(word) {
  const slugCamelCaseReplacer = (match) => `-${ match.toLowerCase() }`;
  return word.replace(/[A-Z]/g, slugCamelCaseReplacer);
}

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
  mail: {
    title: 'Mail',
    url: 'mailto:',
  },
  print: {
    title: 'Print',
    /* eslint-disable no-script-url */
    url: 'javascript:if(window.print)window.print()',
    /* eslint-enable no-script-url */
    executeDefault: true,
  },
  whatsapp: {
    title: 'WhatsApp',
    url: 'whatsapp://send?text=',
  },
  purchaseRights: {
    title: 'Purchase Rights',
    // This url will need to be overridden because this will error
    url: 'https://s100.copyright.com/AppDispatchServlet',
  },
};
export default function Sharebar({
  iconSize = '49px',
  icons = [
    'facebook', 'twitter', 'googleplus', 'linkedin', 'whatsapp',
  ],
  urlOverrides,
  title,
  flyTitle,
  i13nFunction,
}) {
  return (
    <div className="share-component">
      <div className="share-component__icons">
        {icons.map((icon, index) => {
          const I13nShareBarIcon =
              typeof i13nFunction === 'undefined' ?
                SharebarIcon :
                i13nFunction.generateI13nNode(
                  SharebarIcon,
                  true,
                  { props: { follow: false } }
                );
          return (<I13nShareBarIcon
            key={icon}
            icon={slugCamelCase(icon)}
            executeDefault={iconProps[icon].executeDefault}
            title={iconProps[icon].title}
            url={urlOverrides[icon] || iconProps[icon].url}
            iconSize={iconSize}
            blogTitle={title}
            flyTitle={flyTitle}
            i13nModel={
              typeof i13nFunction === 'undefined' ?
                null :
                i13nFunction.createI13nModel(
                  i13nFunction.createModuleItem({
                    id: icon,
                    position: `${ index + 1 }`,
                    type: 'content',
                  }),
                  'moduleItem')
            }
                  />);
        }
        )}
      </div>
    </div>
  );
}

Sharebar.defaultProps = {
  urlOverrides: {},
};

if (process.env.NODE_ENV !== 'production') {
  Sharebar.propTypes = {
    iconSize: PropTypes.string,
    icons: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    flyTitle: PropTypes.string,
    urlOverrides: PropTypes.shape({
      facebook: PropTypes.string,
      twitter: PropTypes.string,
      googleplus: PropTypes.string,
      linkedin: PropTypes.string,
      mail: PropTypes.string,
      print: PropTypes.string,
      whatsapp: PropTypes.string,
      purchaseRights: PropTypes.string,
    }),
    i13nFunction: PropTypes.shape({
      generateI13nNode: PropTypes.func,
      createI13nModel: PropTypes.func,
      createModule: PropTypes.func,
      createModuleItem: PropTypes.func,
    }),
  };
}
