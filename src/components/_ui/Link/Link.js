import React, { Component } from 'react';
import classNames from 'classnames';

import './Link.css';

class Link extends Component {

    render() {
        const { className } = this.props;
        return (
            <a onClick={this.props.onClick} className={classNames("Link", className)}>
                {this.props.children}
            </a>
        );
    }
}

export default Link;