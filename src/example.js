import 'babel-polyfill';
import Icon from '@economist/component-icon';
import React from 'react';
import Sharebar from '.';

export default (
  <div className="sharebar-example">
    <h2>Default</h2>
    <div className="header">
      <div className="header__home">
        <Icon size="49px" icon="home" />
      </div>
      <div className="header__spacer" />
      <div className="header__share">
        <Sharebar />
      </div>
    </div>
    <h2>Override icons</h2>
    <div className="header">
      <div className="header__home">
        <Icon size="49px" icon="home" />
      </div>
      <div className="header__spacer" />
      <div className="header__share">
        <Sharebar
          icons={[
            'facebook',
            'twitter',
            'googleplus',
            'mail',
            'print',
          ]}
          urlOverrides={{
            mail: 'mailto:?body=',
          }}
        />
      </div>
    </div>
  </div>
);
