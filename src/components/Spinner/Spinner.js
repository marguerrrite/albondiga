import React, { Component } from 'react';
import oscar from "./img-oscar.png";
import './Spinner.css';

class Spinner extends Component {

    render() {
        const { onClick } = this.props;
        return (
            <div onClick={onClick} className="Spinner__wrapper">
                <div className="Spinner">
                    <img src={oscar} alt="spinning oscar face!" />
                </div>
            </div>
        );
    }
}

export default Spinner;
