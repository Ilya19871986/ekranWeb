import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { connect } from "react-redux"
import { loadUsers, updateUserAsync, createUserAsync, deleteUserAsync } from "../redux/actions"
import { PanelLoader } from "../loaders/MainLoader"

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

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Tooltip from '@material-ui/core/Tooltip';

import ModalNewUser from "./ModalNewUser"
import ModalDelUser from "./ModalDelUser"

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowsUsers: 10,
            page: 0,
            flag: false,
            showModalAdd: false,
            showModalDel: false,
            removableUser: null
        }
    }

    async componentDidMount() {
        await this.props.loadUsers()
    }

    createData = (surname, name, login, password, authTime, locked, deleted, description) => {
        return { surname, name, login, password, authTime, locked, deleted, description}
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    }

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsUsers: e.target.value,
            page: 0
        })
    }

    ChangeComment = (e, user) => {
        user.description = e.target.value
        this.setState({
            flag: !this.state.flag
        })
    }

    Delete = (e, user_id) => {
        this.setState({
            removableUser: this.props.users.filter(user => user.id == user_id)[0],
            showModalDel: !this.state.showModalDel
        })   
    }

    Save = async (e, user_id) => {
        const tmp = this.props.users.filter(user => user.id == user_id)[0]
        await this.props.updateUserAsync(tmp)
    }

    changeLocked = (e, user_id) => {
        let update = this.props.users.filter(user => user.id == user_id)[0]
        update.locked = !update.locked
        this.setState({
            flag: !this.state.flag
        })
    }

    AddUser = () => {
        this.setState({
            showModalAdd: !this.state.showModalAdd
        })
    }

    DelUser = () => {
        this.setState({
            showModalDel: !this.state.showModalDel
        })
    }

    DeleteUser = async (username) => {
        await this.props.deleteUserAsync(username)
        await this.props.loadUsers()
    }

    CreateUser = async (username, password, surname, name, description, adminId, role) => {
        await this.props.createUserAsync(username, password, surname, name, description, adminId, role)
        await this.props.loadUsers()
    }

    render() {
        if (this.props.showLoader) return <PanelLoader/>
        
        return (
            <div>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table" size="small" onChange={this.ChangeTable}>
                <TableHead  aria-label="customized table" 
                    style={{
                        //backgroundColor:'#009688',
                        color: '#ffff8d',
                        fontSize: '18'
                    }}>
                    <TableRow>
                        <TableCell style={{ width: '10%' }}  align="center">ФАМИЛИЯ</TableCell>
                        <TableCell style={{ width: '10%' }} align="center">ИМЯ</TableCell>
                        <TableCell style={{ width: '10%' }} align="center">ЛОГИН</TableCell>
                        
                        <TableCell style={{ width: '5%' }} align="center">КОЛ-ВО ПАНЕЛЕЙ</TableCell>
                        <TableCell style={{ width: '5%' }} align="center">ПОСЛЕДНЯЯ АКТИВНОСТЬ</TableCell>
                        <TableCell style={{ width: '15%' }} align="center">КОМЕНТАРИЙ</TableCell>
                        <TableCell style={{ width: '4%' }} align="center">БЛОКИРОВКА</TableCell>
                        <TableCell style={{ width: '4%' }} align="center">
                        </TableCell>
                        <TableCell style={{ width: '6%' }} align="center">
                            <Tooltip title="Добавить пользователя" aria-label="add" placement="top-start">
                                <Fab color="primary" aria-label="add" onClick={this.AddUser}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        this.props.users
                            .slice(this.state.page * this.state.rowsUsers, this.state.page * this.state.rowsUsers + this.state.rowsUsers)
                            .map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell align="center">{user.surname || ""}</TableCell>
                                <TableCell align="center">{user.name || ""}</TableCell>
                                <TableCell align="center">{user.user_name}</TableCell>
                                
                                <TableCell align="center">{user.countPanel || 0}</TableCell>
                                <TableCell align="center">{user.authTime || ""}</TableCell>
                                <TableCell align="center">
                                    <TextField value={user.description || ""} multiline rowsMax={6} size="small" name={user.user_name}
                                                onChange={(e) => this.ChangeComment(e, user)}> 
                                    </TextField>
                                </TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Временно заблокировать пользователя" placement="top-start">
                                        <Checkbox
                                            checked={user.locked}
                                            onChange={(e) => this.changeLocked(e, user.id)}
                                        />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">  
                                    <Tooltip title="Удалить пользователя" placement="top-start">
                                        <Fab color="secondary" size="small" onClick={(e) =>  this.Delete(e, user.id)}><DeleteIcon /></Fab>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">   
                                    <Tooltip title="Сохранить комментарий" placement="top-start"> 
                                        <Fab  color="inherit" size="small" onClick={(e) =>  this.Save(e, user.id)}><SaveIcon /></Fab>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            count={this.props.users.length}
                            rowsPerPage={this.state.rowsUsers}
                            page={this.state.page}  
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
                </Table>
            </TableContainer>
            {
                this.state.showModalAdd &&
                <ModalNewUser func={this.AddUser} open = {this.state.showModalAdd} users = {this.props.users} CreateUser = {this.CreateUser}/>
            }
            {
                this.state.showModalDel && 
                <ModalDelUser close={this.DelUser} open = {this.state.showModalDel} user = {this.state.removableUser} DeleteUser = {this.DeleteUser}/>
            }
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadUsers,
    updateUserAsync,
    createUserAsync,
    deleteUserAsync
  }
  
  const mapStateToProps = state => {
    return {
        users: state.User.users,
        showLoader: state.User.showLoader,
        user: state.User.user
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (Users);
