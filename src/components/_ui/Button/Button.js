import React, { Component } from 'react';
import classNames from 'classnames';
//import PropTypes from 'prop-types';

import './Button.css';

class Button extends Component {

    render() {
        const { className } = this.props;
        return (
            <button onClick={this.props.onClick} className={classNames("Button", className)}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;