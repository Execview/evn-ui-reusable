import React from 'react';
import './TripleFill.css';

export default function TripleFill(props) {
  return (
    <div id="parent" style={props.style} className={props.className}>
      <div id="colLeft">{props.left}</div>
      <div id="colwrap">
        <div id="colRight">{props.right}</div>
        <div id="colCenter">{props.center}</div>
      </div>
    </div>
  );
}
