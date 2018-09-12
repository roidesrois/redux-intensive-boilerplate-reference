// Core
import React, { Component } from 'react';

// Components
import { Catcher, Spinner, Nav, SignupForm, Notification } from '../components';
import ConfirmationDialog from "../components/ConfirmationDialog";

export default class Signup extends Component {

    state = {
        isDialogOpen: true,
    };

    _closeDialog = (param) => {
        this.setState(param);
    };

    render () {
        const { isDialogOpen } = this.state;

        return (
            <Catcher>
                <Spinner />
                <Nav />
                {isDialogOpen ? <ConfirmationDialog _closeDialog = { this._closeDialog } /> : <SignupForm />}
                <Notification />
            </Catcher>
        );
    }
}
