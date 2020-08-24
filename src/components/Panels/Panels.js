import React, { Component } from 'react'
import Image from "../../img/sss.png"
import { connect } from "react-redux"
import { loadPanels, deletePanelAsync } from "../redux/actions"
import regeneratorRuntime from "regenerator-runtime";
import CachedIcon from '@material-ui/icons/Cached';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

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

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import RefreshIcon from '@material-ui/icons/Refresh';
import MuiAlert from '@material-ui/lab/Alert';

import ModalDelPanel from "./ModalDelPanel"

import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import {PanelLoader} from "../loaders/MainLoader"

import ModalContent from "./ModalContent"
import ModalSettings from "./ModalSettings"

class Panels extends Component {
    constructor(props){
        super(props)
        this.state = {
            rowsPanels: 10,
            page: 0,
            showModalDel: false,
            showModalContent: false,
            showModalSettings: false,
            removablePanel: null,
            contentPanel: null
        }
    }

    async componentDidMount() {
        await this.props.loadPanels()
    }

    Reload = async () => {
        await this.props.loadPanels()
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

    Settings = (e, panel) => {
        this.setState({
            contentPanel: panel,
            showModalSettings: !this.state.showModalSettings
        })
    }

    SaveSettings  = async () => {
        this.setState({
            showModalSettings: !this.state.showModalSettings
        })
        await this.props.loadPanels()
    }

    Status = (time) => {
        var Data = new Date();
        var Data1 = Date.parse(Data);
        var Data2 = Date.parse(time);
        var resultTime = (((Data1 - Data2)/1000)/60).toFixed(2)

        return (resultTime > 6) ? "Не в сети" : "В сети"
    }

    LastConnect = (time) => {
        var Data = new Date();
        var Data1 = Date.parse(Data);
        var Data2 = Date.parse(time);
        var resultTime = (((Data1 - Data2)/1000)/60).toFixed(2)

        return "Последнее подключение к серверу: " + resultTime + " мин."
    }

    severity_ = (time) => {
        var Data = new Date();
        var Data1 = Date.parse(Data);
        var Data2 = Date.parse(time);
        var resultTime = (((Data1 - Data2)/1000)/60).toFixed(2)

        return (resultTime > 6) ? "error" : "success"
    }

    DeletePanel = async (e, panel) => {
        
        this.setState({
            showModalDel: !this.state.showModalDel
        })
        await this.props.deletePanelAsync(this.state.removablePanel.id)
        await this.props.loadPanels()
    }

    ShowModalDel = (e, panel) => {
        this.setState({
            showModalDel: !this.state.showModalDel,
            removablePanel: panel
        })
    }

    ShowModalContent = (e, panel) => {
        this.setState({
            contentPanel: panel,
            showModalContent: !this.state.showModalContent
        })
    }

    render() {
        if (this.props.showLoader) return <PanelLoader/>
        return (
            <div>
                    <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead  aria-label="customized table" 
                                style={{
                                    //backgroundColor:'#009688',
                                    color: '#ffff8d',
                                    fontSize: '18'
                                }}>
                                <TableRow>
                                    <TableCell style={{ width: '4%' }}  align="center">СТАТУС</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center">ИМЯ ПАНЕЛИ</TableCell>
                                    <TableCell style={{ width: '5%' }} align="center">ВЕРСИЯ ПЛЕЕРА</TableCell>
                                    <TableCell style={{ width: '15%' }} align="center">КОМЕНТАРИЙ</TableCell>
                                    <TableCell style={{ width: '3%' }} align="center"></TableCell>
                                    <TableCell style={{ width: '3%' }} align="center"></TableCell>
                                    <TableCell style={{ width: '3%' }} align="center">
                                        <Tooltip title="Обновить" aria-label="add" placement="top-start">
                                            <Fab color="primary" aria-label="add" onClick={this.Reload}>
                                                <RefreshIcon />
                                            </Fab>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.panels
                                        .slice(this.state.page * this.state.rowsPanels, this.state.page * this.state.rowsPanels + this.state.rowsPanels)
                                        .map((panel) => ( 
                                        <TableRow key={panel.id} hover>
                                            <TableCell align="center">
                                                <Tooltip title={this.LastConnect(panel.last_connect)} placement="top-start">
                                                    <MuiAlert severity={this.severity_(panel.last_connect)}>{this.Status(panel.last_connect)}</MuiAlert>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">{panel.panel_name || ""}</TableCell>
                                            <TableCell align="center">{panel.player_version}</TableCell>
                                            <TableCell align="center">{panel.address}</TableCell>
                                            
                                            <TableCell align="center">    
                                                <Tooltip title="Настройки" placement="top-start">
                                                    <Fab  color="inherit" size="small" onClick={(e) =>  this.Settings(e, panel)}><SettingsIcon /></Fab>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">  
                                                <Tooltip title="Контент" placement="top-start">
                                                    <Fab color="primary" size="small" onClick={(e) =>  this.ShowModalContent(e, panel)} ><VideoLibraryIcon /></Fab>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">  
                                                <Tooltip title="Удалить панель" placement="top-start">
                                                    <Fab color="secondary" size="small" onClick={(e) =>  this.ShowModalDel(e, panel)}><DeleteIcon /></Fab>
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
                                        count={this.props.panels.length}
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
                            this.state.showModalDel && 
                            <ModalDelPanel 
                                open = {this.state.showModalDel} DeletePanel = {this.DeletePanel} ShowModalDel = {this.ShowModalDel}
                                panel = {this.state.removablePanel}
                            />
                        }
                        {
                            this.state.showModalContent && 
                            <ModalContent open = {this.state.showModalContent} close = {this.ShowModalContent} 
                                panel = {this.state.contentPanel}
                            />
                        }
                        {
                            this.state.showModalSettings && 
                            <ModalSettings open = {this.state.showModalSettings} close = {this.Settings} save = {this.SaveSettings}
                            panel = {this.state.contentPanel}
                            />
                        }
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadPanels,
    deletePanelAsync
  }
  
  const mapStateToProps = state => {
    return {
        panels: state.Panels.panels,
        showLoader: state.Panels.showLoader
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (Panels);
