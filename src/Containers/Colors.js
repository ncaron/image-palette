import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Color from '../Components/Color';

class Colors extends Component {
  constructor(props) {
    super(props);

    this.renderColors = this.renderColors.bind(this);
  }

  renderColors() {
    return this.props.colors.map((color, key) => <Color key={ key } color={ color } />);
  }

  render() {
    return (
      <div className="swatches">
        {this.renderColors()}
      </div>
    );
  }
}

Colors.propTypes = {
  colors: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Colors);
