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
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default class UserRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }

    setOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <React.Fragment>
                <TableRow hover >
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={this.setOpen}>
                            {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="center">{this.props.user.surname}</TableCell>
                    <TableCell align="center">{this.props.user.name}</TableCell>
                    <TableCell align="center">{this.props.user.user_name}</TableCell>
                    <TableCell align="center">{this.props.user.countPanel}</TableCell>
                    <TableCell align="center">{this.props.user.authTime}</TableCell>
                    <TableCell align="center">
                        <Tooltip title="Временно заблокировать пользователя" placement="top-start">
                            <Checkbox checked={this.props.user.locked} onChange={(e) => this.props.changeLocked(e, this.props.user.id)} />
                        </Tooltip>
                    </TableCell>
                    <TableCell align="center">  
                        <Tooltip title="Удалить пользователя" placement="top-start">
                            <Fab color="secondary" size="small" onClick={(e) =>  this.props.Delete(e, this.props.user.id)}><DeleteIcon /></Fab>
                        </Tooltip>
                    </TableCell>
                    <TableCell align="center">   
                        <Tooltip title="Сохранить изменения" placement="top-start"> 
                            <Fab  color="inherit" size="small" onClick={(e) =>  this.props.Save(e, this.props.user.id)}><SaveIcon /></Fab>
                        </Tooltip>
                    </TableCell>
                </TableRow>
                <TableRow >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography gutterBottom variant="h6">Дополнительная информация (Дата регистрации: {this.props.user.creation_date})</Typography>
                                <TableContainer component={Paper} style={{width: "140%"}} >
                                <Table aria-label="purchases">
                                    <TableBody>
                                        <TableRow key={this.props.user.id}>
                                            <TableCell component="th" scope="row" width="15%">
                                                <TextField style={{width: "100%"}} label="Город" variant="outlined" value={this.props.user.town} multiline rowsMax={6} size="small" 
                                                        onChange={(e) => this.props.ChangeTown(e, this.props.user)}></TextField>
                                            </TableCell>
                                            <TableCell width="20%">
                                                <TextField  style={{width: "100%"}} label="Организация" variant="outlined" value={this.props.user.organization} multiline rowsMax={6} size="small" 
                                                        onChange={(e) => this.props.ChangeOrg(e, this.props.user)}></TextField>
                                            </TableCell>
                                            <TableCell width="20%">
                                                <TextField style={{width: "100%"}} label="Телефон" variant="outlined" value={this.props.user.phone} multiline rowsMax={6} size="small" 
                                                            onChange={(e) => this.props.ChangePhone(e, this.props.user)}></TextField>
                                            </TableCell>
                                            <TableCell width="20%">
                                                <TextField style={{width: "100%"}} label="Почта" variant="outlined" value={this.props.user.email} multiline rowsMax={6} size="small" 
                                                            onChange={(e) => this.props.ChangeEmail(e, this.props.user)}></TextField>
                                            </TableCell>
                                            <TableCell width="60%"> 
                                                <TextField style={{width: "100%"}} label="Коментарий" variant="outlined" value={this.props.user.description} multiline rowsMax={6} size="small" 
                                                            onChange={(e) => this.props.ChangeComment(e, this.props.user)}></TextField>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }
}
