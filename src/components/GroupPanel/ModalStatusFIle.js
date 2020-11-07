import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

import RefreshIcon from '@material-ui/icons/Refresh';

import {ModalGroupStatusLoader} from "../loaders/MainLoader"
import MuiAlert from '@material-ui/lab/Alert';

import { connect } from "react-redux"
import { getStatusFileInPanelGroup } from "../redux/actions"

 class ModalStatusFIle extends Component {
     constructor(props) {
         super(props)
            this.state = {
                rowsPanels: 10,
                page: 0,
            }
     }

     componentDidMount = async () => {
        await this.props.getStatusFileInPanelGroup(this.props.group_id, this.props.selectedFile)
     }

     Refresh = async () => {
        await this.props.getStatusFileInPanelGroup(this.props.group_id, this.props.selectedFile)
     }

     severity_ = (status) => {
         return (status != 1) ? "error" : "success"
     }

     textStatus = (status) => {
        if (status === 0) {
            return "Ожидает"
        }
        if (status === 1 ) {
            return "Загружен"
        }
        if (status === 2) {
            return "Удаление"
        }
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
        return (
            <div>
                 <Dialog open={this.props.showModasStatus} onClose={this.props.ModalStatus} fullWidth maxWidth={"sm"}>
                    <DialogTitle>Статус файла: {this.props.selectedFile}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            { this.props.showLoaderStatusFileInGroup && <ModalGroupStatusLoader/> }
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" style = {{width: "60%"}}>Панель</TableCell>
                                            <TableCell align="center" style = {{width: "40%"}}>Статус</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        !this.props.showLoaderStatusFileInGroup &&
                                        <TableBody>
                                        {
                                            this.props.statusFileInGroup.map((status, idx) => (
                                                <TableRow key={idx} hover>
                                                    <TableCell>{status.panel_name}</TableCell>
                                                    <TableCell align="center">
                                                        <MuiAlert severity={this.severity_(status.sync)}>{this.textStatus(status.sync)}</MuiAlert>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }                                    
                                        </TableBody>
                                    }
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                count={this.props.statusFileInGroup.length}
                                                rowsPerPage={this.state.rowsPanels}
                                                page={this.state.page}  
                                                onChangePage={this.handleChangePage}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.Refresh} variant="contained" color="primary" component="span" size="small">
                            <RefreshIcon/>
                            Обновить
                        </Button>
                        <Button onClick={this.props.ModalStatus} color="primary" size="small" autoFocus>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getStatusFileInPanelGroup
  }
  
const mapStateToProps = state => {
    return {
        statusFileInGroup: state.Panels.statusFileInGroup,
        showLoaderStatusFileInGroup: state.Panels.showLoaderStatusFileInGroup
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ModalStatusFIle)
