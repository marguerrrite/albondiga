import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import "./OrderItem.css";

class OrderItem extends Component {
    static propTypes = {
        currentMenuStep: PropTypes.number,
        emoji: PropTypes.string,
        jumpToMenuStep: PropTypes.func,
        menuStepId: PropTypes.number,
        name: PropTypes.string,
    };

    handleClick = () => {
        this.props.jumpToMenuStep(this.props.menuStepId);
    }
    render() {
        const { currentMenuStep, emoji, menuStepId, name } = this.props;
        return (
            <div onClick={this.handleClick}
                className={classNames(`OrderItem`,
                    { 'OrderItem--current': currentMenuStep === menuStepId })}>
                <span className="OrderItem__emoji emoji">
                    {emoji}
                </span>
                <span className="OrderItem__name">
                    {name}
                </span>
            </div>
        );
    }
}

export default OrderItem;