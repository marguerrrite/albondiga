import React, { Component } from 'react';
import Spinner from "components/Spinner/Spinner";

import { getFunName } from "../../helpers";
import './Enter.css';

class Enter extends Component {
    myInput = React.createRef();

    goToMenu = event => {
        event.preventDefault();
        const albondigaUrl = this.myInput.current.value;
        this.props.history.push(`${albondigaUrl}`);
    }

    render() {
        return (
            <div className="Enter">
                <div className="content">
                    <form onSubmit={this.goToMenu} className="Enter__form">
                        <input
                            type="text"
                            ref={this.myInput}
                            required
                            placeholder="Bananas"
                            defaultValue={getFunName()}
                        />
                        <button type="submit">submit</button>
                    </form>
                    <Spinner onClick={this.goToMenu}/>
                </div>
            </div>
        );
    }
}

export default Enter;