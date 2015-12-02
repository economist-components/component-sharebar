import React from 'react';
import chai from 'chai';
chai.should();

import SharebarIcon, { handleClick } from '../sharebar-icon';
import Icon from '@economist/component-icon';

describe('Sharebar Icon', () => {
  it('renders a React element', () => {
    React.isValidElement(
      <SharebarIcon
        title={'foo'}
        url={'foo/bar'}
        icon={'share'}
        iconSize={'49px'}
      />
    ).should.equal(true);
  });

  describe('Render', () => {
    it('displays an icon', () => {
      SharebarIcon({
        title: 'foo',
        url: 'foo/bar',
        icon: 'share',
        iconSize: '49px',
      }).should.deep.equal(
        <div className="share__icon">
          <a href="foo/bar"
            title="foo"
            className="share__link"
            onClick={handleClick}
          >
            <Icon size={'49px'} icon={'share'} />
          </a>
        </div>
      );
    });
  });
});
