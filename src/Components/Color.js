import React from 'react';
import PropTypes from 'prop-types';

const Color = ({color}) => {
  return (
    <div className="color" style={ {background: `${color}`} }>
      <p className="color-code">{color}</p>
    </div>
  );
};

Color.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Color;
