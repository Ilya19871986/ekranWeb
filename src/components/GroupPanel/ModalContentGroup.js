import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ModalStatusFIle from "./ModalStatusFIle"

import moment from "moment"

import { connect } from "react-redux"
import { loadContentCurrentGroup, getStatusFileInPanelGroup } from "../redux/actions"
import { postFileGroup, changeTimeDeleteAsync, deleteFileGroupAsync } from "../api/api"

class ModalContentGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadFile: false,
            filedate: null,
            loader: false,
            deleteFile: false,
            showModasStatus: false,
            selectedFile: "",
            rowsPanels: 10,
            page: 0,
        }

    }

    componentDidMount = async () => {
        await this.props.loadContentCurrentGroup(this.props.selectedGroup.id)
    }

    onDownloadFile = async (event) => {
        this.setState({loadFile: true})
        await postFileGroup(event.target.files[0], this.props.selectedGroup.id, 4)
        this.setState({loadFile: false})
        await this.props.loadContentCurrentGroup(this.props.selectedGroup.id)
    }

    ChangeDate = (e) => {
        this.setState({
            fileDate: e.target.value
        })
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

    SaveFile = async (e, file_name) => {
        this.setState({loader: true})
        await changeTimeDeleteAsync(this.props.selectedGroup.id, file_name, this.state.fileDate)
        this.setState({loader: false})
        await this.props.loadContentCurrentGroup(this.props.selectedGroup.id)
    }

    DeleteFile = async (e, file_name) => {
        this.setState({deleteFile: true})
        await deleteFileGroupAsync(this.props.selectedGroup.id, file_name)
        this.setState({deleteFile: false})
    }

    ModalStatus = (e, file_name) => {
        this.setState({selectedFile: file_name})
        this.setState({showModasStatus: !this.state.showModasStatus})
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.openModalContentGroup} onClose={this.props.ModalContent} fullWidth maxWidth={"md"}>
                    <DialogTitle>{this.props.selectedGroup.group_name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <TableContainer component={Paper}>
                            {this.state.deleteFile && <LinearProgress/>}
                            {this.state.loader && <LinearProgress/>}
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Название файла</TableCell>
                                            <TableCell align="left">Размер файла</TableCell>
                                            <TableCell align="left">Автоудаление</TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center">
                                                <input style={{display: "none"}}
                                                    accept=".jpg,.png,.mp4"
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                    onChange={this.onDownloadFile}
                                                />
                                                <label htmlFor="contained-button-file">
                                                    {
                                                        !this.state.loadFile &&
                                                        <Tooltip title="Загрузить файл" placement="top-start">
                                                            <Button variant="contained" color="primary" component="span">
                                                                <AddIcon/>
                                                            </Button>
                                                        </Tooltip> 
                                                    }
                                                    {
                                                        this.state.loadFile &&
                                                        <CircularProgress
                                                            variant="indeterminate"
                                                            disableShrink 
                                                            size={40}
                                                            thickness={4}
                                                        />
                                                    }
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.contentCurrentGroup.map((content) => ( 
                                                <TableRow key={content.file_name} hover>
                                                    <TableCell>{content.file_name}</TableCell>
                                                    <TableCell>{(content.file_size / 1024 / 1024).toFixed(2) + " Mb" || ""}</TableCell>
                                                    <TableCell>
                                                    <TextField
                                                        id="date"
                                                        type="date"
                                                        defaultValue={moment(content.end_date).format('YYYY-MM-DD')}
                                                        onChange={this.ChangeDate}
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                    />
                                                   
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Tooltip title="Статус файла на панелях" placement="top-start">
                                                            <Fab  color="primary" size="small" onClick={ e => this.ModalStatus(e, content.file_name)}><InfoIcon /></Fab>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Tooltip title="Сохранить дату автоудаления" placement="top-start">
                                                            <Fab  color="inherit" size="small" onClick={ e => this.SaveFile(e, content.file_name)}><SaveIcon /></Fab>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Tooltip title="Удалить со всех панелей" placement="top-start">
                                                            <Fab color="secondary" size="small" onClick={ e => this.DeleteFile(e, content.file_name)}><DeleteIcon /></Fab>
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
                                                count={this.props.contentCurrentGroup.length}
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
                        <Button onClick={this.props.ModalContent} color="primary" autoFocus>
                            Закрыть
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    this.state.showModasStatus && 
                    <ModalStatusFIle
                        showModasStatus = {this.state.showModasStatus}
                        ModalStatus = {this.ModalStatus}
                        selectedFile = {this.state.selectedFile}
                        group_id = {this.props.selectedGroup.id}
                    />
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadContentCurrentGroup,
  }
  
  const mapStateToProps = state => {
    return {
        contentCurrentGroup: state.Panels.contentCurrentGroup, 
        showLoaderContentGroup: state.Panels.showLoaderContentGroup,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (ModalContentGroup)
