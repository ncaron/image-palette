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
        <input type="file" onChange={ (e) => this.props.uploadImage(e, this.props.numSwatches) } />
        <canvas id="image-canvas">
          Your browser does not support Canvas elements.
        </canvas>
      </div>
    );
  }
}

Canvas.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  numSwatches: PropTypes.number.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({uploadImage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
