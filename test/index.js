import 'babel-polyfill';
import React from 'react';
import Sharebar from '../src';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();

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

    it('slugify camel cased icons', () => {
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <Sharebar
          icons={[
            'purchaseRights',
            'facebook',
          ]}
        />
      );

      const sharebar = renderer.getRenderOutput();
      sharebar.props.children.props.children.length.should.equal(2);
      sharebar.props.children.props.children[0].props.icon.should.equal('purchase-rights');
      sharebar.props.children.props.children[1].props.icon.should.equal('facebook');
    });
  });
});
