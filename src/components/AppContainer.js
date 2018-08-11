import React, { Component } from 'react';
import base from "../base";
import FinishOrder from "./FinishOrder/FinishOrder";
import Intro from "./Intro/Intro"
import Order from "./Order/Order";
import SelectIngredient from "./SelectIngredient/SelectIngredient";
import Welcome from "./Welcome/Welcome";
import menu from "../menu";
import '../styles/global.css';
import ConfirmationSuccess from './ConfirmationSuccess/ConfirmationSuccess';

class AppContainer extends Component {
    state = {
        menuChoices: menu,
        currentMenuStep: 0,
        order: {
            pasta: [],
            sauce: [],
            meat: [],
            side: [],
            drink: [],
            dessert: [],
        },
    };

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRefOrder = localStorage.getItem(`${this.props.match.params.albondigaId}-order`);
        const localStorageRefCurrentMenuStep = localStorage.getItem(`${this.props.match.params.albondigaId}-currentMenuStep`);

        if (localStorageRefOrder || localStorageRefCurrentMenuStep) {
            this.setState({ order: JSON.parse(localStorageRefOrder) });
            this.setState({ currentMenuStep: JSON.parse(localStorageRefCurrentMenuStep) });
        }

        this.ref = base.syncState(`${params.albondigaId}/menuChoices`, {
            context: this,
            state: 'menuChoices'
        });

        this.setState({ menuChoices: menu });
    }

    componentDidUpdate() {
        localStorage.setItem(`${this.props.match.params.albondigaId}-order`, JSON.stringify(this.state.order));
        localStorage.setItem(`${this.props.match.params.albondigaId}-currentMenuStep`, JSON.stringify(this.state.currentMenuStep));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    menuStepBack = () => {
        this.setState(prevState => ({
            currentMenuStep: prevState.currentMenuStep - 1
        }));
    };

    menuStepForward = () => {
        this.setState(prevState => ({
            currentMenuStep: prevState.currentMenuStep + 1
        }));
    };

    jumpToMenuStep = (step) => {
        let currentMenuStep = { ...this.state.currentMenuStep }
        currentMenuStep = step;
        this.setState({ currentMenuStep });
    }

    clearMenuChoice = (currentMenuStep) => {
        const order = { ...this.state.order };
        order[currentMenuStep] = [];
        this.setState({ order });
    };

    clearOrder = (desiredStartingStep) => {
        let currentMenuStep = { ...this.state.currentMenuStep }
        let order = { ...this.state.order }
        currentMenuStep = desiredStartingStep;
        order = {pasta: [], sauce: [], meat: [], side: [], drink: [], dessert: [],}
        this.setState({ currentMenuStep, order });
    }

    setPasta = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order.pasta = { name: name, emoji: emoji, type: type, menuStepId: menuStepId };
        this.setState({ order });
    };


    setSauce = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order.sauce = { name: name, emoji: emoji, type: type, menuStepId: menuStepId };
        this.setState({ order });
    };

    setMeat = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order.meat = { name: name, emoji: emoji, type: type, menuStepId: menuStepId };
        this.setState({ order });
    };

    setSide = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order.side = { name: name, emoji: emoji, type: type, menuStepId: menuStepId };
        this.setState({ order });
    };

    setDrink = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order.drink = { name: name, emoji: emoji, type: type, menuStepId: menuStepId };
        this.setState({ order });
    };

    setDessert = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order.dessert = { name: name, emoji: emoji, type: type, menuStepId: menuStepId };
        this.setState({ order });
    };

    render() {
        const { currentMenuStep, menuChoices, order } = this.state;

        return (
            <div className="AppContainer">
                <div className="content">
                    {currentMenuStep === 0 && (
                        <Welcome
                            currentMenuStep={currentMenuStep}
                            menuStepId={0}
                            menuStepForward={this.menuStepForward}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 1 && (
                        <Intro
                            currentMenuStep={currentMenuStep}
                            menuStepId={1}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                        />
                    )}
                    {currentMenuStep === 2 && (
                        <SelectIngredient
                            type="pasta"
                            phrase={menuChoices.pasta.phrase}
                            selections={menuChoices.pasta.choices}
                            order={order}
                            setMenuChoice={this.setPasta}
                            clearMenuChoice={this.clearMenuChoice}
                            currentMenuStep={currentMenuStep}
                            menuStepId={2}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 3 && (
                        <SelectIngredient
                            type="sauce"
                            phrase={menuChoices.sauce.phrase}
                            selections={menuChoices.sauce.choices}
                            order={order}
                            setMenuChoice={this.setSauce}
                            clearMenuChoice={this.clearMenuChoice}
                            currentMenuStep={currentMenuStep}
                            menuStepId={3}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 4 && (
                        <SelectIngredient
                            type="meat"
                            phrase={menuChoices.meat.phrase}
                            selections={menuChoices.meat.choices}
                            order={order}
                            setMenuChoice={this.setMeat}
                            clearMenuChoice={this.clearMenuChoice}
                            currentMenuStep={currentMenuStep}
                            menuStepId={4}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 5 && (
                        <SelectIngredient
                            type="side"
                            phrase={menuChoices.side.phrase}
                            selections={menuChoices.side.choices}
                            order={order}
                            setMenuChoice={this.setSide}
                            clearMenuChoice={this.clearMenuChoice}
                            currentMenuStep={currentMenuStep}
                            menuStepId={5}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 6 && (
                        <SelectIngredient
                            type="drink"
                            phrase={menuChoices.drink.phrase}
                            selections={menuChoices.drink.choices}
                            order={order}
                            setMenuChoice={this.setDrink}
                            clearMenuChoice={this.clearMenuChoice}
                            currentMenuStep={currentMenuStep}
                            menuStepId={6}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 7 && (
                        <SelectIngredient
                            type="dessert"
                            phrase={menuChoices.dessert.phrase}
                            selections={menuChoices.dessert.choices}
                            order={order}
                            setMenuChoice={this.setDessert}
                            clearMenuChoice={this.clearMenuChoice}
                            currentMenuStep={currentMenuStep}
                            menuStepId={7}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 8 && (
                        <FinishOrder
                            order={order}
                            clearMenuChoice={this.clearMenuChoice}
                            currentMenuStep={currentMenuStep}
                            menuStepId={8}
                            menuStepForward={this.menuStepForward}
                            menuStepBack={this.menuStepBack}
                            menu={menuChoices}
                        />
                    )}
                    {currentMenuStep === 9 && (
                        <ConfirmationSuccess
                            clearOrder={this.clearOrder}
                            order={order}
                            currentMenuStep={currentMenuStep}
                            menuStepId={9}
                        />
                    )}
                </div>
                {currentMenuStep > 1 && currentMenuStep < 9 && (
                    <Order order={order}
                        clearOrder={this.clearOrder}
                        jumpToMenuStep={this.jumpToMenuStep}
                        currentMenuStep={currentMenuStep} />
                )}
            </div>
        );
    }
}

export default AppContainer;