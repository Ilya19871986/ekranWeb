import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import { createGroupPanesAsync } from "../api/api"

export default class ModalNewGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            comment: "",
            save: false,
        }
    }

    changeName = (e) => {
        this.setState({ name: e.target.value })
    }

    changeComment = (e) => {
        this.setState({ comment: e.target.value })
    }

    // закрыть
    handleClose = () => {
        this.props.OpenModalNewGroup()
    }
    // сохранить
    handleSave = async () => {
        this.setState({save: true})
        if (this.state.name.length > 0)
            await createGroupPanesAsync(localStorage.getItem("UserId"), this.state.name, this.state.comment)
        this.setState({save: false})
        this.props.CloseModalNewGroup()
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.openModalNewGroup} onClose={this.props.CloseModalNewGroup} disableBackdropClick>
                <DialogTitle >{"Добавить группу панелей"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <TextField label="Название группы" variant="outlined" style = {{ width: "400px"}} onChange = { this.changeName } />
                            <br/><br/>
                            <TextField label="Коментарий" variant="outlined" style = {{ width: "400px"}} onChange = { this.changeComment }/>
                            {
                                this.state.save && <LinearProgress />
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary">Сохранить</Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
