import React, { Component } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '@material-ui/core/Button';
import {changePassword} from "../api/api"
import LinearProgress from '@material-ui/core/LinearProgress';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkCurPass: false,
            curPass: localStorage.getItem("password"),
            disableNewPass: true, 
            newPass: "", 
            showPassord1: false,
            showPassord2: false,
            showPassord3: false,
            change: false
        }
    }

    CheckPass = (e) => {
        if (e.target.value == this.state.curPass) {
            this.setState({ checkCurPass: true})
        } else {
            this.setState({ checkCurPass: false, disableNewPass: true })
        }
    }

    NewPass = (e) => {
        this.setState({ newPass: e.target.value })
    }

    CheckNewPass = (e) => {
        if (e.target.value == this.state.newPass && this.state.checkCurPass) {
            this.setState({
                disableNewPass: false
            })
        } else {
            this.setState({
                disableNewPass: true
            })
        }
    }

    ChangePass = async () => {
        this.setState({change: true})
        this.setState({ disableNewPass: true})
        const resp = await changePassword(localStorage.getItem("UserId"), this.state.newPass)
        if (resp.ok) {
            localStorage.removeItem('password')
            localStorage.setItem('password', this.state.newPass)
        }
        this.setState({change: false})
        this.setState({ disableNewPass: false})
    }

    HandleShowPassord1 = () => {
        this.setState({
            showPassord1: !this.state.showPassord1
        })
    }

    HandleShowPassord2 = () => {
        this.setState({
            showPassord2: !this.state.showPassord2
        })
    }

    HandleShowPassord3 = () => {
        this.setState({
            showPassord3: !this.state.showPassord3
        })
    }

    render() {
        return (
            <div>
            {
                this.state.change &&
                <LinearProgress color="secondary" />
            }
            <TableContainer component={Paper} style={{width: "50%", minWidth: "300px", display: "flex"}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead  aria-label="customized table" >
                            <TableRow>
                                <TableCell align="center">СМЕНА ПАРОЛЯ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><TextField fullWidth label="Текущий пароль" 
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={this.HandleShowPassord1}> 
                                                    {this.state.showPassord1 ? <Visibility/> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                            ),
                                        }}
                                        onChange={this.CheckPass} 
                                    type={this.state.showPassord1 ? "text" : "password"}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><TextField fullWidth label="Новый пароль" disabled={!this.state.checkCurPass}  error={this.state.disableNewPass}
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.HandleShowPassord2}> 
                                            {this.state.showPassord2 ? <Visibility/> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }} 
                                        onChange={this.NewPass} type={this.state.showPassord2 ? "text" : "password"}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><TextField fullWidth label="Повторите пароль" disabled={!this.state.checkCurPass}  error={this.state.disableNewPass} 
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.HandleShowPassord3}> 
                                            {this.state.showPassord3 ? <Visibility/> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }} 
                                    onChange={this.CheckNewPass} type={this.state.showPassord3 ? "text" : "password"}/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button fullWidth variant="contained" color="primary" 
                                        onClick={this.ChangePass}
                                        disabled={this.state.disableNewPass}>
                                            Сменить пароль
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
        )
    }
}
