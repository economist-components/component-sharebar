import React from 'react';
import Icon from '@economist/component-icon';

export default class ShareBar extends React.Component {

  static get propTypes() {
    return {
      title: React.PropTypes.string,
      titleTag: React.PropTypes.string,
      customClass: React.PropTypes.string,
      layout: React.PropTypes.string,
      useFx: React.PropTypes.bool,
      fxDirection: React.PropTypes.string,
      fxType: React.PropTypes.string,
      background: React.PropTypes.string,
      icon: React.PropTypes.object,
      icons: React.PropTypes.array,
      hostModule: React.PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      layout: 'horizontal',
      background: 'none',
      useFx: false,
      fxDirection: '',
      fxType: '',
      hostModule: '',
      icon: {
        color: '#FFFFFF',
      },
      icons: [
        {
          href: 'http://www.facebook.com/sharer/sharer.php?u=',
          title: 'Share on Facebook',
          className: 'fb',
          size: '100%',
          icon: 'facebook',
        },
        {
          href: 'https://twitter.com/intent/tweet?url=',
          title: 'Share on Twitter',
          className: 'twitter',
          size: '100%',
          icon: 'twitter',
        },
        {
          href: 'https://plus.google.com/share?url=',
          title: 'Share on Google Plus',
          className: 'gplus',
          size: '100%',
          icon: 'googleplus',
        },
        {
          href: 'https://www.linkedin.com/cws/share?url=',
          title: 'Linked In',
          className: 'linkedin',
          size: '100%',
          icon: 'linkedin',
        },
        {
          href: 'whatsapp://send?text=',
          title: '',
          className: 'whatsapp',
          size: '100%',
          icon: 'whatsapp',
        },
        {
          href: 'http://www.economist.com/node/21644150/email/',
          title: 'Email a friend',
          className: 'mail',
          size: '100%',
          icon: 'mail',
        },
      ],
    };
  }

  constructor() {
    super();
    this.state = { isMobile: 'no-mobile', fxState: 'fxOff', open: false };
  }

  componentWillMount() {
    if (this.props.title) {
      this.props.titleTag = <h3>{this.props.title}</h3>;
    }
    if (typeof navigator !== 'undefined') {
      this.setState({
        isMobile: (
          navigator.userAgent.match(/Android|iPhone/i) &&
          !navigator.userAgent.match(/iPod|iPad/i)
        ) ? 'mobile' : 'no-mobile',
      });
    }
  }

  handleClick(icon, event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.returnValue = false;
    }
    if (event.target.className === 'mail') {
      window.open(event.target.getAttribute('href'), '_blank');
    } else if (this.props.hostModule !== 'wifgobbet') {
      const location = (event.target.getAttribute('href') + window.location.href);
      window.open(location,
      event.target.getAttribute('target'),
      'scrollbars=1,resizable=1,height=550,width=550');
    } else {
      const location = (event.target.getAttribute('href'));
      window.open(location,
      event.target.getAttribute('target'),
      'scrollbars=1,resizable=1,height=550,width=550');
    }
  }

  toggleExpandShare(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.returnValue = false;
    }
    if (this.state.open) {
      this.close();
    } else {
      this.open();
    }
  }

  close() {
    this.setState({ open: false });
    this.setState({ fxState: 'fxOff' });
  }

  open() {
    this.setState({ open: true });
    this.setState({ fxState: 'fxOn' });
  }


  render() {
    let fxPanel = null;
    if (this.props.useFx) {
      fxPanel = (
        <div className="default-state">
        </div>
      );
    }
    return (
      <div className="container">
        <div className="controls">
          <div className="mnv-ec-share-icons-close-open" onClick={this.toggleExpandShare.bind(this)}>
            <div className="share" data-open={this.state.open}>
              <Icon
                icon="share"
                color={this.props.icon.color}
                background="none"
                size="100%"
              />
            </div>
            <div className="close" data-open={this.state.open}>
              <Icon
                icon="close"
                color={this.props.icon.color}
                background="none"
                size="100%"
              />
            </div>
          </div>
        </div>

      <div className={`mnv-ec-share
        ${this.props.layout}
        ${this.state.isMobile}
        ${this.props.customClass}
        ${this.props.fxDirection}
        ${this.props.fxType}
        ${this.state.fxState}`}
      >
        {this.props.titleTag ? this.props.titleTag : null}

        {fxPanel}

        <div
          className="mnv-ec-share-icons"
          style={(this.props.background) ? { background: this.props.background } : null}
        >

        <div className="mnv-ec-share-icons-container">
          <div className="mnv-ec-share-icons-container-inner">
              {this.props.icons.map((icon, key) => {
                return (
                <a
                  key={key}
                  onClick={this.handleClick.bind(this, icon)}
                  href={icon.href}
                  title={icon.title}
                  className={icon.className}
                  target="_blank"
                >
                  <Icon icon={icon.icon} color={this.props.icon.color} size={icon.size} />
                </a>
                );
              })}
              </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
