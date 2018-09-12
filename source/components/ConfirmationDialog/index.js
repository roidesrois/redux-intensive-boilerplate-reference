import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ConfirmationDialog extends Component {
    state = {
        open: true,
    };

    // handleClickOpen = () => {
    //     this.setState({ open: true });
    // };

    handleClose = () => {
        const { _closeDialog } = this.props;

        this.setState({ open: false });
        _closeDialog({ isDialogOpen: false });
    };

    render () {
        return (
            <div>
                {/*<Button onClick = { this.handleClickOpen }>Open alert dialog</Button>*/}
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open = { this.state.open }
                    onClose = { this.handleClose }
                    aria-labelledby = 'alert-dialog-title'
                    aria-describedby = 'alert-dialog-description'>
                    <DialogTitle id = 'alert-dialog-title'>{"Условия участия в конкурсе"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id = 'alert-dialog-description'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                            with the release of Letraset sheets containing Lorem Ipsum passages.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/*<Button onClick = { this.handleClose } color = 'primary'>*/}
                            {/*Disagree*/}
                        {/*</Button>*/}
                        <Button onClick = { this.handleClose } color = 'primary' autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
