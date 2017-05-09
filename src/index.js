/* eslint-disable camelcase, id-match  */
import React from 'react';
import SharebarIcon from './sharebar-icon';

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
        {icons.map((icon) => {
          const I13nShareBarIcon =
              typeof i13nFunction === 'undefined' ? SharebarIcon : i13nFunction.generateI13nNode(SharebarIcon, true);
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
                    position: 1,
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
    iconSize: React.PropTypes.string,
    icons: React.PropTypes.arrayOf(React.PropTypes.string),
    title: React.PropTypes.string,
    flyTitle: React.PropTypes.string,
    urlOverrides: React.PropTypes.shape({
      facebook: React.PropTypes.string,
      twitter: React.PropTypes.string,
      googleplus: React.PropTypes.string,
      linkedin: React.PropTypes.string,
      mail: React.PropTypes.string,
      print: React.PropTypes.string,
      whatsapp: React.PropTypes.string,
      purchaseRights: React.PropTypes.string,
    }),
    i13nFunction: React.PropTypes.shape({
      generateI13nNode: React.PropTypes.func,
      createI13nModel: React.PropTypes.func,
      createModule: React.PropTypes.func,
      createModuleItem: React.PropTypes.func,
    }),
  };
}
