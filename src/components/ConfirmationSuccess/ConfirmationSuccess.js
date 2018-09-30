import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "components/_ui/Button/Button";
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
                <span className="emoji" role="img"
                    aria-label="Spaghetti">
                    🍝
                </span>
                <h2 className="ConfirmationSuccess__greeting">
                    That's it!
                </h2>
                {/* <h4 className="ConfirmationSuccess__phrase">
                   I'll will cook the dinner per your requests.
                </h4> */}
                {/* <h4 className="ConfirmationSuccess__phrase">
                    I hope you enjoyed this little app. <br/> Happy birthday and I love you.
                </h4> */}
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
