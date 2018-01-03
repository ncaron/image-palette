import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Clipboard from 'clipboard';
import Color from '../Components/Color';
import { swapCase } from '../actions';

class Colors extends Component {
  constructor(props) {
    super(props);

    this.renderColors = this.renderColors.bind(this);
  }

  componentDidUpdate() {
    const colors = document.querySelectorAll('.color');
    const clipboard = new Clipboard(colors); // eslint-disable-line no-unused-vars
  }

  renderColors() {
    return this.props.colors.map((color, key) => <Color key={ key } color={ color } />);
  }

  render() {
    return (
      <div>
        {this.props.colors.length > 0 &&
          <p className="copy">
            Click on a color to copy to clipboard (<span className="swapCase" onClick={ () => this.props.swapCase(this.props.case) }>{this.props.case}</span>)
          </p>
        }

        <div className="swatches">
          {this.renderColors()}
        </div>
      </div>
    );
  }
}

Colors.propTypes = {
  colors: PropTypes.array.isRequired,
  case: PropTypes.string.isRequired,
  swapCase: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({swapCase}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Colors);
