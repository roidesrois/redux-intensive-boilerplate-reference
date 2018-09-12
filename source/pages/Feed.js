// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Nav, Notification } from '../components';
import Questionnaire from "../components/Questionnaire";

export default class Feed extends Component {
    render () {
        return (
            <Catcher>
                <Spinner />
                <Nav />
                <Questionnaire />
                <Notification />
            </Catcher>
        );
    }
}
