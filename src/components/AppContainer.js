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

const emptyOrder = {
    pasta: [],
    sauce: [],
    meat: [],
    side: [],
    drink: [],
    dessert: [],
}
class AppContainer extends Component {
    state = {
        menuChoices: menu,
        currentMenuStep: 0,
        order: emptyOrder,
    };

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRefOrder = localStorage.getItem(`${params.albondigaId}-order`);
        const localStorageRefCurrentMenuStep = localStorage.getItem(`${params.albondigaId}-currentMenuStep`);

        this.setState({ menuChoices: menu });

        try {
            if (localStorageRefOrder || localStorageRefCurrentMenuStep) {
                this.setState({ order: JSON.parse(localStorageRefOrder) });
                this.setState({ currentMenuStep: JSON.parse(localStorageRefCurrentMenuStep) });
            }

            this.ref = base.syncState(`${params.albondigaId}/menuChoices`, {
                state: 'menuChoices'
            });
        } catch(e) {}

    }

    componentDidUpdate() {
        const { params } = this.props.match;

        try {
            localStorage.setItem(`${params.albondigaId}-order`, JSON.stringify(this.state.order));
            localStorage.setItem(`${params.albondigaId}-currentMenuStep`, JSON.stringify(this.state.currentMenuStep));
        } catch (e) {}
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
        this.setState({ currentMenuStep: step });
    }

    clearMenuChoice = (currentMenuStep) => {
        const order = { ...this.state.order };
        order[currentMenuStep] = [];
        this.setState({ order });
    };

    clearOrder = (desiredStartingStep) => {
        const currentMenuStep = desiredStartingStep;
        this.setState({ currentMenuStep, order: emptyOrder });
    }

    setOrderItem = (name, emoji, type, menuStepId) => {
        const order = { ...this.state.order };
        order[type] = { name, emoji, type, menuStepId };
        this.setState({ order });
    };

    render() {
        const { currentMenuStep, menuChoices, order } = this.state;
        const steps = [
            {
                name: "start",
            },
            {
                name: "intro",
            }, {
                name: "pasta",
                isIngredientStep: true,
                id: 2,
            }, {
                name: "sauce",
                isIngredientStep: true,
                id: 3,
            }, {
                name: "meat",
                isIngredientStep: true,
                id: 4,
            }, {
                name: "side",
                isIngredientStep: true,
                id: 5,
            }, {
                name: "drink",
                isIngredientStep: true,
                id: 6,
            }, {
                name: "dessert",
                isIngredientStep: true,
                id: 7,
            }, {
                name: "finish",
            }, {
                name: "success",
            }
        ];

        const currentStep = steps[currentMenuStep];

        return (
            <div className="AppContainer">
                <div className="content">
                    {currentStep.isIngredientStep ? (
                        <React.Fragment>
                            <SelectIngredient
                                type={currentStep.name}
                                phrase={menuChoices[currentStep.name].phrase}
                                selections={menuChoices[currentStep.name].choices}
                                order={order}
                                setMenuChoice={this.setOrderItem}
                                clearMenuChoice={this.clearMenuChoice}
                                currentMenuStep={currentMenuStep}
                                menuStepId={currentStep.id}
                                menuStepForward={this.menuStepForward}
                                menuStepBack={this.menuStepBack}
                                menu={menuChoices}
                            />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
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
                        </React.Fragment>
                    )}
                </div>
                {currentMenuStep > 1 && currentMenuStep < 9 && (
                    <Order
                        order={order}
                        clearOrder={this.clearOrder}
                        jumpToMenuStep={this.jumpToMenuStep}
                        currentMenuStep={currentMenuStep} />
                )}
            </div>
        );
    }
}

export default AppContainer;