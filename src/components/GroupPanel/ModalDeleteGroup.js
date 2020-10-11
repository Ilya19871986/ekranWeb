import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import {deleteGroupAsync} from "../api/api"

export default class ModalDeleteGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            delete: false,
        }
    }

    handleCancel = () => {
        this.props.CancelDeleteGroup()
    }

    handleDelete = async () => {

        this.setState({delete: true})

        await deleteGroupAsync(this.props.selectedGroup.id)

        this.setState({delete: false})

        this.props.DeleteGroup()
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.openModalDeleteGroup} onClose={this.props.CancelDeleteGroup}>
                    <DialogTitle>{"Удалить группу"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Вы действительно хотите удалить группу {this.props.selectedGroup.group_name} ?
                            {
                                this.state.delete && <LinearProgress/>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDelete} color="primary">Удалить</Button>
                        <Button onClick={this.handleCancel} color="primary" autoFocus>Отмена</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
