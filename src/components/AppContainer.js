import React, { Component } from 'react';
import base from "../base";
import FinishOrder from "components/FinishOrder/FinishOrder";
import Intro from "components/Intro/Intro"
import Order from "components/Order/Order";
import SelectIngredient from "components/SelectIngredient/SelectIngredient";
import Welcome from "components/Welcome/Welcome";
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
        const localStorageRefOrder = localStorage.getItem(`${params.albondigaId}-order`);
        const localStorageRefCurrentMenuStep = localStorage.getItem(`${params.albondigaId}-currentMenuStep`);

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
        const { params } = this.props.match;
        localStorage.setItem(`${params.albondigaId}-order`, JSON.stringify(this.state.order));
        localStorage.setItem(`${params.albondigaId}-currentMenuStep`, JSON.stringify(this.state.currentMenuStep));
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

    setOrderItem = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order[type] = { name: name, emoji: emoji, type: type, menuStepId: menuStepId };
        this.setState({ order });
    };

    render() {
        const { currentMenuStep, menuChoices, order } = this.state;
        const steps = [
            {
                name: "start",
                menuStepId: 0,
            },
            {
                name: "intro",
                menuStepId: 1,
            }, {
                name: "pasta",
                isIngredientStep: true,
                menuStepId: 2,
            }, {
                name: "sauce",
                isIngredientStep: true,
                menuStepId: 3,
            }, {
                name: "meat",
                isIngredientStep: true,
                menuStepId: 4,
            }, {
                name: "side",
                isIngredientStep: true,
                menuStepId: 5,
            }, {
                name: "drink",
                isIngredientStep: true,
                menuStepId: 6,
            }, {
                name: "dessert",
                isIngredientStep: true,
                menuStepId: 7,
            }, {
                name: "finish",
                menuStepId: 8,
            }, {
                name: "success",
                menuStepId: 9,
            }
        ];
        //const currentStep = steps[currentMenuStepId];

        return (

            <div className="AppContainer">
                <div className="content">
                    {steps.map(step => (
                        step.isIngredientStep ? (
                            <div>
                                {step.menuStepId === currentMenuStep && (
                                    <SelectIngredient
                                        type={step.name}
                                        phrase={menuChoices[step.name].phrase}
                                        selections={menuChoices[step.name].choices}
                                        order={order}
                                        setMenuChoice={this.setOrderItem}
                                        clearMenuChoice={this.clearMenuChoice}
                                        currentMenuStep={currentMenuStep}
                                        menuStepId={step.menuStepId}
                                        menuStepForward={this.menuStepForward}
                                        menuStepBack={this.menuStepBack}
                                        menu={menuChoices}
                                    />
                                )}
                            </div>
                        ) : (
                            <div>
                                {step.menuStepId === currentMenuStep && currentMenuStep === 0 && (
                                    <Welcome
                                        currentMenuStep={currentMenuStep}
                                        menuStepId={0}
                                        menuStepForward={this.menuStepForward}
                                        menu={menuChoices}
                                    />
                                )}
                                {step.menuStepId === currentMenuStep && currentMenuStep === 1 && (
                                    <Intro
                                        currentMenuStep={currentMenuStep}
                                        menuStepId={1}
                                        menuStepForward={this.menuStepForward}
                                        menuStepBack={this.menuStepBack}
                                    />
                                )}
                                {step.menuStepId === currentMenuStep && currentMenuStep === 8 && (
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
                                {step.menuStepId === currentMenuStep && currentMenuStep === 9 && (
                                    <ConfirmationSuccess
                                        clearOrder={this.clearOrder}
                                        order={order}
                                        currentMenuStep={currentMenuStep}
                                        menuStepId={9}
                                    />
                                )}
                            </div>
                        )
                    ))}
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