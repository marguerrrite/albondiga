import React, { Component } from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import './IngredientOption.css';

class IngredientOption extends Component {
    static propTypes = {
        emoji: PropTypes.string,
        index: PropTypes.string,
        menuStepId: PropTypes.number,
        name: PropTypes.string,
        onClick: PropTypes.func,
        order: PropTypes.object,
        type: PropTypes.string,
    };

    handleClick = () => {
        this.props.onClick(this.props.index, this.props.name, this.props.emoji, this.props.type, this.props.menuStepId);
    }


    render() {
        const { emoji, order, name, type } = this.props;
        return (
            <div
                onClick={this.handleClick}
                className={classNames(`IngredientOption`,
                    { 'IngredientOption--clicked': order[type].name === name })}>
                <span className="IngredientOption__emoji emoji">
                    {emoji}
                </span>
                <div name="name" className="IngredientOption__name">
                    {name}
                </div>
            </div>
        );
    }
}

export default IngredientOption;