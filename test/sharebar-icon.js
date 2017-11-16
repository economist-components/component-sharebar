import React from 'react';
import SharebarIcon from '../src/sharebar-icon';
import ShallowRenderer from 'react-test-renderer/shallow';
import chai from 'chai';
chai.should();

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
      const renderer = new ShallowRenderer();
      renderer.render(
        <SharebarIcon
          title={'foo'}
          url={'foo/bar'}
          icon={'share'}
          iconSize={'49px'}
        />
      );
      const result = renderer.getRenderOutput();
      result.type.should.equal('div');
      result.props.className.should.equal('share__icon share__icon--share');
      result.props.children.type.should.equal('a');
      result.props.children.props.href.should.equal('foo/bar');
      result.props.children.props.title.should.equal('foo');
      result.props.children.props.className.should.equal('share__link');
    });
  });
});
