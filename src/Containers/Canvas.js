import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadImage } from '../actions';

class Canvas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="file" onChange={ this.props.uploadImage } />
        <canvas id="image-canvas" width="500" height="500">
          Your browser does not support Canvas elements.
        </canvas>
      </div>
    );
  }
}

Canvas.propTypes = {
  uploadImage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({uploadImage}, dispatch);

export default connect(null, mapDispatchToProps)(Canvas);
