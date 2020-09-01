import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

export default class ModalDelUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: this.props.open,
            removUser: (this.props.user.surname || "") + " " + (this.props.user.name || "") + "  логин: " + this.props.user.user_name
        }
    }

    Delete = () => {
        this.props.DeleteUser(this.props.user.user_name)
        this.props.close()
    }

    Cancel = () => {
        this.props.close()
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.Cancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Удалить пользователя</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div>
                            <Chip
                                icon={<FaceIcon />}
                                label= {this.state.removUser || ""}
                                color="secondary"
                            />
                             <br/><br/>
                        Вы действительно хотите безвозвратно удалить пользователя?
                        </div>
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.Delete} color="primary">
                        Удалить
                    </Button>
                    <Button onClick={this.Cancel} color="primary" autoFocus>
                        Отмена
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
