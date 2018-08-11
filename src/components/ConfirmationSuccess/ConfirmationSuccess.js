import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "../_ui/Button/Button";
import './ConfirmationSuccess.css';

class ConfirmationSuccess extends Component {
    static propTypes = {
        menuStepBack: PropTypes.func,
        menuStepForward: PropTypes.func,
    };

    handleClick = () => {
        this.props.clearOrder(0);
    }

    render() {
        return (
            <div className="ConfirmationSuccess">
                <h3 className="ConfirmationSuccess__phrase">
                    That's it! I hope you enjoyed this little app. Happy birthday and I love you.
                </h3>
                <div className="ConfirmationSuccess__actions">
                    <Button
                        onClick={this.handleClick}>
                            Start over
                    </Button>
                </div>
            </div>
        );
    }
}

export default ConfirmationSuccess;
