import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import {changePassword} from "../api/api"

import Alert from '@material-ui/lab/Alert';

import LinearProgress from '@material-ui/core/LinearProgress';

class ChangePassword extends Component {
    constructor(props) {
        super(props)

            this.state = {
                changePassword: false,
                exit: false,
                showPassord1: false,
                showPassord2: false,
                showPassord3: false,
                oldPassword: "",
                newPassword1: "",
                newPassword2: "",
                error: false,
                errorOldPass: false,
            }
    }

    HandleShowPassord1 = () => {
        this.setState({showPassord1: !this.state.showPassord1})
    }
    HandleShowPassord2 = () => {
        this.setState({showPassord2: !this.state.showPassord2})
    }
    HandleShowPassord3 = () => {
        this.setState({showPassord3: !this.state.showPassord3})
    }

    changeOld = (e) => {
        this.setState({oldPassword: e.target.value})
    }

    changeNew1 = (e) => {
        this.setState({newPassword1: e.target.value})
    }

    changeNew2 = (e) => {
        this.setState({newPassword2: e.target.value})
    }

    Change = async () => {
        if (this.state.newPassword1 === this.state.newPassword2) {
            this.setState({changePassword: true})
            const response = await changePassword(localStorage.getItem("UserId"), this.state.newPassword1, this.state.oldPassword)
            const result = await response.text()
            this.setState({changePassword: false})
            
            if (result.includes("password change")) {
                this.setState({exit: true, errorOldPass: false, error: false})
            } else {
                this.setState({errorOldPass: true, error: false})
            }
        } else {
            this.setState({error: true, errorOldPass: false})
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={1} justify="center" alignItems="center">
                    <Grid item xs={4}>
                        <Paper >
                            <form autoComplete="off" style={{margin: "10px"}} >
                                <div><TextField 
                                        required
                                        fullWidth 
                                        label="Старый пароль" 
                                        variant="outlined" 
                                        style={{marginTop: "10px"}}
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={this.HandleShowPassord1}> 
                                                    {this.state.showPassord1 ? <Visibility/> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                        onChange={this.changeOld}
                                        type={this.state.showPassord1 ? "text" : "password"}
                                    />
                                </div>
                                <div><TextField 
                                        required
                                        fullWidth 
                                        label="Новый пароль" 
                                        variant="outlined" 
                                        style={{marginTop: "10px"}}
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={this.HandleShowPassord2}> 
                                                    {this.state.showPassord2 ? <Visibility/> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                        onChange={this.changeNew1}
                                        type={this.state.showPassord2 ? "text" : "password"}
                                    />
                                </div>
                                <div><TextField 
                                        required
                                        fullWidth 
                                        label="Подтвердите пароль" 
                                        variant="outlined" 
                                        style={{marginTop: "10px", marginBottom: "10px"}}
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={this.HandleShowPassord3}> 
                                                    {this.state.showPassord3 ? <Visibility/> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                        onChange={this.changeNew2}
                                        type={this.state.showPassord3 ? "text" : "password"}
                                    />
                                </div> 
                                {this.state.changePassword && <LinearProgress/>} 
                                {this.state.error && <Alert severity="error" style={{marginBottom: "10px"}}>Пароли не совпадают</Alert>}
                                {this.state.errorOldPass && <Alert severity="error" style={{marginBottom: "10px"}}>Неверный пароль</Alert>}
                                {this.state.exit && <Alert severity="success" style={{marginBottom: "10px"}}>Пароль изменен</Alert>}
                                <Button 
                                        onClick={this.Change}
                                        fullWidth 
                                        variant="contained" 
                                        color="primary" 
                                        style={{marginTop: "5px", marginBottom: "10px"}}>
                                    Изменить пароль
                                </Button>
                                
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default ChangePassword;