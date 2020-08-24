import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TvIcon from '@material-ui/icons/Tv';
import Chip from '@material-ui/core/Chip';

export default class ModalDelPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open
        }
    }

    Cancel = () => {
        this.props.ShowModalDel()
    }

    Delete = () => {
        this.props.DeletePanel()
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
                    <DialogTitle id="alert-dialog-title">Удалить панель</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            <Chip
                                icon={<TvIcon />}
                                label= {this.props.panel.panel_name || ""}
                                color="secondary"
                            />
                            <br/><br/>
                            Вы действительно хотите безвозвратно удалить панель?
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
