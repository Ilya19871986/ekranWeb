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
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

import { connect } from "react-redux"
import { loadPanelsInGroup } from "../redux/actions"

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TvIcon from '@material-ui/icons/Tv';
import AddBoxIcon from '@material-ui/icons/AddBox';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';


import { ModalGroupLoader } from "../loaders/MainLoader"

import { changeNameGroupAsync, setGroupAsync } from "../api/api"

class ModalEditGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            group_name: this.props.selectedGroup.group_name,
            comment: this.props.selectedGroup.comment,
            change: false,
            tab: '1',

            rowsPanels: 5,
            page: 0,

            rowsPanels2: 5,
            page2: 0,
        }

    }

    componentDidMount = async () => {
        await this.props.loadPanelsInGroup(localStorage.getItem('UserId'), this.props.selectedGroup.id)
    }

    handleCancel = () => {
        this.props.CancelEditGroup()
    }

    handleSave = async () => {
        
        this.setState({change: true})

        await changeNameGroupAsync(this.props.selectedGroup.id, this.state.group_name, this.state.comment)

        this.setState({change: false})

        this.props.SaveEditGroup()
    }

    changeName = (e) => {
        this.setState({group_name: e.target.value})
    }

    changeComment = (e) => {
        this.setState({comment: e.target.value})
    }

    delete = async (e, panel) => {
        await setGroupAsync(panel.id, 0)
        this.componentDidMount()
    }

    addGroup = async (e, panel) => {
        await setGroupAsync(panel.id, this.props.selectedGroup.id)
        this.componentDidMount()
    }

    handleChangeTab = (event, newValue) => {
        this.setState({tab: newValue})
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

    handleChangePage2 = (event, newPage) => {
        this.setState({
            page: newPage
        })
    }

    handleChangeRowsPerPage2 = (e) => {
        this.setState({
            rowsPanels: e.target.value,
            page: 0
        })
    }

    render() {
        return (
            <div>
                <Dialog open={this.props.openEditGroup} onClose={this.props.CancelEditGroup} fullWidth maxWidth={"md"}>
                    <DialogTitle>{"Изменить группу: "} {this.props.selectedGroup.group_name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        <form noValidate autoComplete="off" style={{marginBottom: "10px"}}>
                            <TextField label="Название группы" variant="outlined" 
                                style = {{ width: "450px"}} defaultValue = {this.state.group_name} onChange = {this.changeName}></TextField>
                            
                            <TextField label="Коментарий" variant="outlined" 
                                style = {{ width: "450px", marginLeft: "10px"}} defaultValue = {this.state.comment} onChange = {this.changeComment}></TextField>
                        </form>
                            {
                                this.state.change && <LinearProgress/>
                            }
                            {
                                this.props.showLoaderInGroup && <ModalGroupLoader/>
                            }
                            { 
                                !this.props.showLoaderInGroup &&
                                <TabContext value={this.state.tab}>
                                    <AppBar position="static">
                                        <TabList onChange={this.handleChangeTab}>
                                            <Tab label={"Панели в группе: " + this.props.panelsInGroup.length}  value="1" />
                                            <Tab label={"Панели без группы: " + this.props.panelsNoGroup.length} value="2" />
                                        </TabList>
                                    </AppBar>
                                    <TabPanel value="1">
                                        <TableContainer component={Paper}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ width: '5%' }}></TableCell>
                                                        <TableCell style={{ width: '90%' }}>Панели группы</TableCell>
                                                        <TableCell style={{ width: '10%' }}></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.props.panelsInGroup.map((panel) => (
                                                            <TableRow key={panel.id} hover>
                                                                <TableCell><TvIcon/></TableCell>
                                                                <TableCell>{panel.panel_name}</TableCell>
                                                                <TableCell>
                                                                    <Tooltip title="Удалить панель из этой группы" placement="top-start">
                                                                        <IconButton color="secondary" component="span" onClick={e => this.delete(e, panel)}>
                                                                            <DeleteIcon/>
                                                                        </IconButton>
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
                                                            count={this.props.panelsInGroup.length}
                                                            rowsPerPage={this.state.rowsPanels}
                                                            page={this.state.page}  
                                                            onChangePage={this.handleChangePage}
                                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                        />
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        {/** ПАНЕЛИ БЕЗ ГРУППЫ */}
                                        <TableContainer component={Paper}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell style={{ width: '5%' }}></TableCell>
                                                        <TableCell style={{ width: '90%' }}>Панели без группы</TableCell>
                                                        <TableCell style={{ width: '10%' }}></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        this.props.panelsNoGroup.map((panel) => (
                                                            <TableRow key={panel.id} hover>
                                                                <TableCell><TvIcon/></TableCell>
                                                                <TableCell>{panel.panel_name}</TableCell>
                                                                <TableCell>
                                                                    <Tooltip title="Добавить панель в эту группу" placement="top-start">
                                                                        <IconButton color="primary" component="span" onClick={e => this.addGroup(e, panel)}>
                                                                            <AddBoxIcon/>
                                                                        </IconButton>
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
                                                            count={this.props.panelsNoGroup.length}
                                                            rowsPerPage={this.state.rowsPanels2}
                                                            page={this.state.page2}  
                                                            onChangePage={this.handleChangePage2}
                                                            onChangeRowsPerPage={this.handleChangeRowsPerPage2}
                                                        />
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                </TabContext>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary">Сохранить</Button>
                        <Button onClick={this.handleCancel} color="primary" autoFocus>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadPanelsInGroup
  }
  
  const mapStateToProps = state => {
    return {
        panelsInGroup: state.Panels.panelsInGroup,
        panelsNoGroup: state.Panels.panelsNoGroup,
        showLoaderInGroup: state.Panels.showLoaderInGroup
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps) (ModalEditGroup)
