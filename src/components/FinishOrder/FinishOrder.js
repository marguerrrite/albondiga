import React, { Component } from 'react';
import Button from "../_ui/Button/Button";
import PropTypes from 'prop-types';
import './FinishOrder.css';

class FinishOrder extends Component {
    static propTypes = {
        menuStepForward: PropTypes.func,
        order: PropTypes.object,
        orderConfirmed: PropTypes.bool,
    };

    submitForm = () => {
        this.props.menuStepForward();
        //this.form.submit(); No more form! Not paying for formspree anymore.
        //update state before submitting form so that when
        //formspree pops you back, the state is already updated
    }

    render() {
        const { order } = this.props;
        const textareaOrder =
            "Spaghetti and meatballs dinner: " +
            order.pasta.name + ", " +
            order.sauce.name + ", " +
            order.meat.name + ", " +
            order.side.name + ", " +
            order.drink.name + ", and " +
            order.dessert.name + " for dessert.";

        return (
           <div className="FinishOrder__wrapper">
                <div
                    className="FinishOrder__arrow__wrapper arrow__wrapper"
                    onClick={this.props.menuStepBack}>
                    <svg
                        className="arrow arrow--left"
                        x="0px" y="0px" width="32.1px"
                        height="63.2px" viewBox="0 0 32.1 63.2">
                    <polyline points="31.6,0.5 0.5,31.6 31.6,62.7 " />
                    </svg>
                </div>
                <div className="FinishOrder">
                    <span className="FinishOrder__emoji emoji--large" role="img"
                    aria-label="fork and knife">
                        🍽️
                    </span>
                    <h2 className="FinishOrder__phrase">
                        Your spaghetti and meatball dinner is as follows:
                        <span> {order.pasta.name} pasta</span>,
                        <span> {order.sauce.name}</span>,
                        <span> {order.meat.name}</span>,
                        <span> {order.side.name}</span>,
                        <span> {order.drink.name}</span>,
                        and
                        {order.dessert.name === "surprise me" && (
                            <span> a surprise </span>
                        )}
                        {order.dessert.name !== "surprise me" && (
                            <span> {order.dessert.name} </span>
                        )}
                        for desssert.
                    </h2>
                    <div className="FinishOrder__actions">
                        <form
                            ref={(el => this.form = el)}
                            className="FinishOrderForm"
                            action="https://formspree.io/mdzvggkm"
                            method="POST"
                            >
                            <textarea
                                name="message"
                                onChange={this.handleChange}
                                defaultValue={textareaOrder}>
                            </textarea>
                        </form>
                        <Button
                            onClick={this.submitForm}>
                            Confirm dinner selections
                        </Button>
                        <p>
                            Confirming your selection will send
                            me an email with your choices!
                        </p>
                    </div>
                </div>
                <div
                    className="FinishOrder__arrow__wrapper arrow__wrapper arrow__wrapper--right"
                    onClick={this.props.menuStepForward}>
                    <svg
                        className="arrow arrow--right"
                        x="0px" y="0px" width="32.1px"
                        height="63.2px" viewBox="0 0 32.1 63.2">
                        <polyline points="31.6,0.5 0.5,31.6 31.6,62.7 " />
                    </svg>
                </div>
            </div>
        );
    }
}

export default FinishOrder;