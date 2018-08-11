import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "../_ui/Button/Button";
import Link from "../_ui/Link/Link";
import classNames from 'classnames';
import IngredientOption from "../IngredientOption/IngredientOption";

import './SelectIngredient.css';

class SelectIngredient extends Component {
    static propTypes = {
        clearMenuChoice: PropTypes.func,
        currentMenuStep: PropTypes.number,
        menu: PropTypes.object,
        menuStepBack: PropTypes.func,
        menuStepForward: PropTypes.func,
        menuStepId: PropTypes.number,
        order: PropTypes.object,
        phrase: PropTypes.string,
        selections: PropTypes.object,
        setMenuChoice: PropTypes.func,
        type: PropTypes.string,
    };

    state = {
        activeKey: [],
    }

    onClickSet = (index, name, emoji, type, currentMenuStep) => {
        const menu = { ...this.props.menu }

        this.setState({ menu });
        this.setState(prevState => ({
            activeKey: index,
        }));

        this.props.setMenuChoice(name, emoji, type, currentMenuStep);
    }

    onClickClear = (currentMenuStep) => {
        this.props.clearMenuChoice(this.props.type);
    }


    render() {
        const { order, type } = this.props;
        return (
            <div className="SelectIngredient__wrapper">
                <div
                    className="arrow__wrapper"
                    onClick={this.props.menuStepBack}>
                    <svg
                        className="arrow arrow--left"
                        x="0px" y="0px" width="32.1px"
                        height="63.2px" viewBox="0 0 32.1 63.2">
                    <polyline points="31.6,0.5 0.5,31.6 31.6,62.7 " />
                    </svg>
                </div>
                <div className="SelectIngredient">
                    <h2 className="SelectIngredient__phrase">
                        {this.props.phrase}
                    </h2>
                    <div className="SelectIngredient__choices">
                        {Object.keys(this.props.selections).map((key) =>
                            <IngredientOption
                                onClick={this.onClickSet}
                                key={key}
                                index={key}
                                type={this.props.type}
                                name={this.props.selections[key].name}
                                order={this.props.order}
                                emoji={this.props.selections[key].emoji}
                                activeKey={this.state.activeKey}
                                menuStepId={this.props.menuStepId}
                            />
                        )}
                    </div>
                    <div className="SelectIngredient__actions">
                        <Button
                            isEnabled={this.state.isEnabled}
                            className={classNames(`SelectIngredient__button--next`, { 'Button--disabled': !order[type].name })}
                            onClick={this.props.menuStepForward}>
                            {type === "dessert" && (
                                <span>Finish order</span>
                            )}
                            {type !== "dessert" && (
                                <span>Add to order</span>
                            )}
                        </Button>
                        {/* <Link onClick={this.props.menuStepBack}>
                            Back
                        </Link> */}
                        <Link onClick={this.onClickClear}>
                            Clear {type} selection
                        </Link>
                    </div>
                </div>
                <div
                    onClick={this.props.menuStepForward}
                    className={classNames(`arrow__wrapper arrow__wrapper--right`, { 'arrow__wrapper--disabled': !order[type].name })}>
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

export default SelectIngredient;