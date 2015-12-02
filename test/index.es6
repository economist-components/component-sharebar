import React from 'react';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();

import Sharebar from '..';

describe('Sharebar', () => {
  it('renders a React element', () => {
    React.isValidElement(
      <Sharebar />
    ).should.equal(true);
  });

  describe('Render', () => {
    it('Facebook, Twitter, Google Plus, LinkedIn and WhatsApp by defaut', () => {
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <Sharebar />
      );
      const sharebar = renderer.getRenderOutput();
      sharebar.props.children.props.children.length.should.equal(5);
    });

    it('can override the share icons', () => {
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <Sharebar
          icons={[
            'facebook',
            'twitter',
          ]}
        />
      );
      const sharebar = renderer.getRenderOutput();
      sharebar.props.children.props.children.length.should.equal(2);
    });
  });
});
