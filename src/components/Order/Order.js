import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderItem from "../OrderItem/OrderItem";
//import Link from "../_ui/Link/Link";
import "./Order.css";

class Order extends Component {
    static propTypes = {
        clearOrder: PropTypes.func,
        currentMenuStep: PropTypes.number,
        jumpToMenuStep: PropTypes.func,
        order: PropTypes.object,
    };

    state = {
        orderTitle: "🍝",
    }

    onMouseOver = () => {
        this.setState({ orderTitle: "🍽️"});
    }

    onMouseLeave = () => {
        this.setState({ orderTitle: "🍝" });
    }

    handleClick = () => {
        this.props.clearOrder(3);
    }

    render() {
        const { currentMenuStep, jumpToMenuStep, order } = this.props;
        const { orderTitle } = this.state;
        return <div className="Order">
            <div
                className="Order__title"
                onClick={this.handleClick}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}>
                <span
                    className="Order__title__emoji emoji"
                    role="img" aria-label="emoji dinner">
                    {orderTitle}
                </span>
                <div className="Order__clear">
                    Clear
                </div>
            </div>
            <div className="Order__items">
                {Object.keys(order).map(key =>
                    <OrderItem
                        key={key}
                        name={order[key].name}
                        type={order[key].type}
                        emoji={order[key].emoji}
                        currentMenuStep={currentMenuStep}
                        menuStepId={order[key].menuStepId}
                        jumpToMenuStep={jumpToMenuStep} />
                )}
            </div>
            <div className="OrderDone__emoji__wrapper">
                {order.dessert.name  && (
                    <span
                        className="OrderDone__emoji emoji"
                        role="img" aria-label="Boy/girl smooch emoji">
                        💏
                    </span>
                )}
            </div>
            {/* {currentMenuStep > 2 && (
                <div className="Order__clear">
                    <Link onClick={this.props.clearOrder}>
                        Clear all
                    </Link>
                </div>
            )} */}

        </div>;
    }
}

export default Order;