import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from "../_ui/Button/Button";
import Link from "../_ui/Link/Link";
import './Intro.css';

class Intro extends Component {
    static propTypes = {
        menuStepBack: PropTypes.func,
        menuStepForward: PropTypes.func,
    };

    render() {
        return (
            <div className="Intro">
                <h3 className="Intro__phrase">
                    I know you love spaghetti and meatballs, so for your
                    birthday, I'm letting you select all the components
                    making up a special <i>spaghetti and meatballs</i> dinner.
                </h3>
                {/* <h3 className="Intro__phrase">
                    You'll select the <span> pasta</span>,
                                      <span> sauce</span>,
                                      <span> meat</span>,
  and so on.
                </h3> */}
                <h3 className="Intro__phrase">
                    You'll select the <i> pasta</i>,
                                      <i> sauce</i>,
                                      <i> meat</i>,
  and so on.
                </h3>
                <div className="Intro__actions">
                    <span className="emoji" role="img"
                        aria-label="Spaghetti">
                        😊
                    </span>
                    <Button onClick={this.props.menuStepForward}>
                        Let's get started
                    </Button>
                    <Link onClick={this.props.menuStepBack}>
                        Back
                    </Link>
                </div>
            </div>
        );
    }
}

export default Intro;
