import React from 'react';
import PropTypes from 'prop-types'
import Stats from './Stats'
import Stopwatch from './Stopwatch'

const Header = ({ title }) => {
  return (
    <header>
      <Stats />
      <h1>{ title }</h1>
      <Stopwatch />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
