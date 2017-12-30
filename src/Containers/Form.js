import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadImage, changeNumSwatches } from '../actions';
import * as constants from '../contants';

class Form extends Component {
  constructor(props) {
    super(props);

    this.renderOptions = this.renderOptions.bind(this);
  }

  componentDidMount() {
    document.getElementById('swatch-select').selectedIndex = this.props.numSwatches.toString() - 1;
  }

  renderOptions() {
    let options = [];

    for (let i = 1; i <= constants.MAX_SWATCHES; i++) {
      options.push(<option key={ i } value={ i }>{i}</option>);
    }

    return options;
  }

  render() {
    return (
      <form action="#">
        <input
          type="file"
          onChange={ (e) => this.props.uploadImage(e, this.props.numSwatches) } />
        <select
          name="swatch-select"
          id="swatch-select"
          onChange={ (e) => this.props.changeNumSwatches(e, this.props.loaded) }>
          {this.renderOptions()}
        </select>
      </form>
    );
  }
}

Form.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  changeNumSwatches: PropTypes.func.isRequired,
  numSwatches: PropTypes.number.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({uploadImage, changeNumSwatches}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
