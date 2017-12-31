import React, { Component } from 'react';

class Logo extends Component {
  constructor(props) {
    super(props);

    this.colorInterval;
    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    this.colorInterval = setInterval(this.changeColor, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.colorInterval);
  }

  changeColor() {
    let swatches = document.querySelectorAll('[class^="swatch-"]');

    let red;
    let green;
    let blue;

    for (let i = 0; i < swatches.length; i++) {
      red = Math.floor(Math.random() * 256);
      green = Math.floor(Math.random() * 256);
      blue = Math.floor(Math.random() * 256);

      swatches[i].style.fill = `rgb(${red}, ${green}, ${blue})`;
    }
  }

  render() {
    return (
      <svg preserveAspectRatio="xMidYMid" width="110" height="110" viewBox="0 0 110 110" className="logo">
        <path d="M4.000,77.245 L13.559,48.809 L94.129,75.894 C101.981,78.533 106.207,87.039 103.567,94.891 C100.927,102.744 92.422,106.970 84.569,104.330 L4.000,77.245 Z" className="swatch-4"/>
        <path d="M23.512,34.396 L46.687,15.346 L100.662,81.010 C105.922,87.410 104.998,96.863 98.599,102.123 C92.199,107.384 82.746,106.460 77.486,100.060 L23.512,34.396 Z" className="swatch-3"/>
        <path d="M46.675,14.884 L75.000,5.000 L103.005,85.254 C105.734,93.076 101.606,101.629 93.784,104.359 C85.962,107.088 77.409,102.960 74.680,95.138 L46.675,14.884 Z" className="swatch-2"/>
        <path d="M75.000,5.000 L105.000,5.000 L105.000,90.000 C105.000,98.284 98.284,105.000 90.000,105.000 C81.716,105.000 75.000,98.284 75.000,90.000 L75.000,5.000 Z" className="swatch-1"/>
        <circle cx="90" cy="91" r="5" className="circle-1"/>
      </svg>
    );
  }
}

export default Logo;
