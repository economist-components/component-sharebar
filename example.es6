import ShareBar from './index.es6';
import React from 'react';
export default (
  <div>
    <h2 style={{ border: 'solid red 1px' }}>Attention this component use .no-touch class by Modernizr</h2>
    <h1>SVG version</h1>
    <ShareBar background="#CCFFDD" />
    <hr/>
    <ShareBar layout="vertical" />
    <hr/>
    <h1>Flip version (Mouseover)</h1>
    <div className="no-touch">
      <ShareBar
        useFX
        fxDirection="flip-to-top"
        fxType="cube"
        background="#333333"
        fxDefaultStateBackground="#999999"
      />
      <hr/>
      <ShareBar
        useFX
        fxDirection="flip-to-bottom"
        fxType="cube"
        background="#333333"
        fxDefaultStateBackground="#999999"
      />
    </div>
    <h1>Touch version</h1>
    <div className="touch">
      <ShareBar
        useFX
        fxDirection="flip-to-top"
        fxType="cube"
        background="#333333"
        fxDefaultStateBackground="#999999"
      />
    </div>
  </div>
);
