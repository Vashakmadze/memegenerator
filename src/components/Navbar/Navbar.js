import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import trollface from "../../images/trollface.png"

const Navbar = () => (
  <div className="Navbar">
    <img className="trollFace" src={trollface} alt="rame"/>
    <h2 className='memeText'>Meme Generator</h2>
  </div>
);

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
