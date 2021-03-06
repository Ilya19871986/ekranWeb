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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { GroupLoader } from "../loaders/MainLoader"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';

import { getListGroupAsync } from "../api/api"
import { connect } from "react-redux"
import { loadPanelsGroup } from "../redux/actions"

import ModalNewGroup from "./ModalNewGroup"
import ModalDeleteGroup from "./ModalDeleteGroup"
import ModalEditGroup from "./ModalEditGroup"
import ModalContentGroup from "./ModalContentGroup"

class GroupPanels extends Component {
    constructor(props){
        super(props)

        this.state = {
            openModalNewGroup: false,
            openModalDeleteGroup: false,
            openModalEditGroup: false,
            openModalContentGroup: false,
            selectedGroup: "",
            rowsPanels: 10,
            page: 0,
        }
    }

    componentDidMount = async () => {
        await this.props.loadPanelsGroup(localStorage.getItem('UserId'))
    }

    OpenModalNewGroup = () => {
        console.log("close")
        this.setState({openModalNewGroup: !this.state.openModalNewGroup})
    }

    CloseModalNewGroup = () => {
        console.log("save")
        this.setState({openModalNewGroup: !this.state.openModalNewGroup})
        this.componentDidMount()
    }

    openDeleteGroup = (e, group) => {
        this.setState({selectedGroup: group})
        this.setState({openModalDeleteGroup: !this.state.openModalDeleteGroup})
    }

    CancelDeleteGroup = () => {
        this.setState({openModalDeleteGroup: !this.state.openModalDeleteGroup})
    }

    DeleteGroup = () => {
        this.setState({openModalDeleteGroup: !this.state.openModalDeleteGroup})
        this.componentDidMount()
    }

    openEditGroup = (e, group) => {
        this.setState({selectedGroup: group})
        this.setState({openEditGroup: !this.state.openEditGroup})
    }

    CancelEditGroup = () => {
        this.setState({openEditGroup: !this.state.openEditGroup})
    }

    SaveEditGroup = () => {
        this.setState({openEditGroup: !this.state.openEditGroup})
        this.componentDidMount()
    }

    ModalContent = (e, group) => {
        this.setState({selectedGroup: group})
        this.setState({openModalContentGroup: !this.state.openModalContentGroup})
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    }

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPanels: e.target.value,
            page: 0
        })
    }

    render() {
        if (this.props.showLoaderGroup) {
            return <GroupLoader />
        } else
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead  aria-label="customized table" >
                            <TableRow>
                                <TableCell style={{ width: '34%' }}  align="center">ГРУППА</TableCell>
                                <TableCell style={{ width: '15%' }}  align="center">КОЛИЧЕСТВО ПАНЕЛЕЙ</TableCell>
                                <TableCell style={{ width: '35%' }}  align="center">КОМЕНТАРИЙ</TableCell>
                                <TableCell style={{ width: '10%' }}  align="center"></TableCell>
                                <TableCell style={{ width: '5%' }}  align="center"></TableCell>
                                <TableCell style={{ width: '5%' }}  align="center">
                                    <Tooltip title="Создать группу панелей" aria-label="add" placement="top-start">
                                        <Fab color="primary" aria-label="add" onClick={this.OpenModalNewGroup}>
                                            <AddIcon />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                            </TableRow> 
                        </TableHead>
                        <TableBody>
                            {
                                this.props.groups.map((group, idx) => (
                                    <TableRow hover key = {idx}>
                                        <TableCell align="center">{group.group_name}</TableCell>
                                        <TableCell align="center">{group.count_panel}</TableCell>
                                        <TableCell align="center">{group.comment}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Файлы группы" placement="top-start">
                                                <Fab color ="primary" size="small" onClick = {(e) => {this.ModalContent(e, group)}}><VideoLibraryIcon/></Fab>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center"> 
                                            <Tooltip title="Изменить группу" placement="top-start">
                                                <Fab size="small" onClick = {(e) => {this.openEditGroup(e, group)}}><EditIcon/></Fab>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Удалить группу" placement="top-start">
                                                <Fab color="secondary" size="small" onClick = {(e) => this.openDeleteGroup(e, group)}><DeleteIcon/></Fab>
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
                                    count={this.props.groups.length}
                                    rowsPerPage={this.state.rowsPanels}
                                    page={this.state.page}  
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>

                {
                    this.state.openModalNewGroup && 
                    <ModalNewGroup 
                        openModalNewGroup = {this.state.openModalNewGroup}
                        CloseModalNewGroup = {this.CloseModalNewGroup}
                        OpenModalNewGroup = {this.OpenModalNewGroup}
                    />
                } 
                {
                    this.state.openModalDeleteGroup && 
                    <ModalDeleteGroup 
                        openModalDeleteGroup = {this.state.openModalDeleteGroup}
                        CancelDeleteGroup = {this.CancelDeleteGroup}
                        selectedGroup = {this.state.selectedGroup}
                        DeleteGroup = {this.DeleteGroup}
                    />
                }
                {
                    this.state.openEditGroup && 
                    <ModalEditGroup
                        openEditGroup = {this.state.openEditGroup}
                        selectedGroup = {this.state.selectedGroup}
                        CancelEditGroup = {this.CancelEditGroup}
                        SaveEditGroup = {this.SaveEditGroup}
                    />
                }
                {
                    this.state.openModalContentGroup &&
                    <ModalContentGroup
                        openModalContentGroup = {this.state.openModalContentGroup}
                        selectedGroup = {this.state.selectedGroup}
                        ModalContent = {this.ModalContent}
                    />
                }

            </div>
        )
    }
}

const mapDispatchToProps = {
    loadPanelsGroup,
}
  
const mapStateToProps = state => {
    return {
        groups: state.Panels.panelsGroup,
        showLoaderGroup: state.Panels.showLoaderGroup
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (GroupPanels)