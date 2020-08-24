import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class ModalNewUser extends Component {
    constructor(props) {
        super(props)
            this.state = {
                open: this.props.open,
                surname: "",
                name: "",
                login: "",
                pass: "",
                comment: "",
                error: "",
                errorRegister: null, 
                role: "2"
            }
    }

    Ok = () => {
        if (this.checkTextField()) {
            this.props.CreateUser(this.state.login, this.state.pass, this.state.surname, 
                this.state.name, this.state.comment, localStorage.getItem("UserId"), this.state.role)
            this.props.func()
        }
    }

    Cancel = () => {
        this.props.func()
    }

    changeSurname = (e) => {
        this.setState({
            surname: e.target.value
        })
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    changeLogin = (e) => {
        this.setState({
            login: e.target.value,
        })
        const x = this.props.users.filter(x => x.user_name === e.target.value)

        if (x.length > 0) {
            this.setState({
                error: "Этот логин уже существует",
            })
        } else {
            this.setState({ 
                error: ""
            })
        }
    }

    changePass = (e) => {
        this.setState({
            pass: e.target.value
        })
    }

    changeComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    checkTextField = () => {
        if ((this.state.surname.length > 0) && (this.state.name.length > 0) && (this.state.login.length > 0) && (this.state.pass.length > 0)) {
            this.setState({
                errorRegister: null
            })
            return true
        } else {
            this.setState({
                errorRegister: "Заполните обязательные поля"
            })
            return false
        }
    }

    handleChangeAdmin = () => {
        this.setState({role: this.state.role === "2" ? "1" : "2"})
    }

    render() {
        return (
            <div>
                
                <Dialog maxWidth="sm" open={this.state.open}  aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Добавить пользователя</DialogTitle>
                <DialogContent>
                    <div>
                        {
                            (this.state.errorRegister !== null ) &&
                            <Alert severity="error">{this.state.errorRegister}</Alert>
                        }
                    </div>
                    <div style={{display: 'flex'}}>
                        <TextField autoFocus margin="dense" id="surname" label="Фамилия" type="text" fullWidth onChange={this.changeSurname} required/>
                        <TextField margin="dense" id="name" label="Имя" type="text" fullWidth onChange={this.changeName} required/>
                    </div>
                    <div style={{display: 'flex'}}>
                        <TextField margin="dense" id="login" label="Логин" type="text" required fullWidth
                                inputProps={{pattern: "[a-z]{1,15}" }} 
                                onChange={this.changeLogin} error={this.state.error !== ""} helperText={this.state.error} />
                        <TextField margin="dense" id="password" label="Пароль" type="text" fullWidth onChange={this.changePass} required/>
                    </div>
                    <div>
                        <TextField margin="dense" id="Comment" label="Коментарий" type="text" fullWidth multiline rowsMax={6} onChange={this.changeComment} />
                    </div>
                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.role === "1"? true:false} onChange={this.handleChangeAdmin} />}
                            label="Создать администратора"
                        />
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <br/><br/><br/>
                    <Button  color="primary" onClick={this.Ok} disabled={this.state.error !== ""}>
                        Добавить
                    </Button>
                    <Button  color="primary" onClick={this.Cancel}>
                        Отмена
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
        )
    }
}
