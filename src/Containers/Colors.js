import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Color from '../Components/Color';

class Colors extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.averageColor && <Color color={ this.props.averageColor } />}
      </div>
    );
  }
}

Colors.propTypes = {
  averageColor: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Colors);
