import React, { Component } from 'react';
import Button from "components/_ui/Button/Button";
import './Welcome.css';

class Welcome extends Component {

    render() {
        return (
            <div className="Welcome">
                <span className="emoji" role="img"
                      aria-label="Spaghetti">
                    🍝
                </span>
                <h2 className="Welcome__greeting">
                    Happy birthday, Patrick!
                </h2>
                <h3 className="Welcome__phrase">
                    Let's eat.
                </h3>
                <div className="Welcome__actions">
                    <Button onClick={this.props.menuStepForward}>
                        Begin
                    </Button>
                </div>
            </div>
        );
    }
}

export default Welcome;
