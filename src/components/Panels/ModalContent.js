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
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import MuiAlert from '@material-ui/lab/Alert';
import {ContentLoader} from "../loaders/MainLoader"
import { connect } from "react-redux"
import { loadContentType } from "../redux/actions"
import moment from "moment"
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {postFile, UpdateFile, delFile} from "../api/api"
import CircularProgress from '@material-ui/core/CircularProgress';

class ModalContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open,
            rowsContent: 10,
            page: 0,
            buttonStyleAkcii: "secondary",
            buttonStyleAfisha: "primary",
            buttonStyleOb: "primary",
            buttonStyleVideo: "primary",
            buttonStyleStr: "primary",
            buttonStyleVip: "primary",
            typeContent: 1, 
            loadFile: false, 
            fileDate: null
        }
    }

    async componentDidMount() {
        if (this.props.panel.player_version === "3.0.0") {
            await this.props.loadContentType(this.props.panel.id, 4)
            this.setState({
                typeContent: 4
            })
        } else {
            await this.props.loadContentType(this.props.panel.id, this.state.typeContent)
        }
    }

    handleClose = () => {
        this.props.close()
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    }

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsContent: e.target.value,
            page: 0
        })
    }

    Status = (sync) => {
        return  (sync === 1) ?  "success" : "error" 
    }

    StatusName = (sync) => {
        if (sync === 0) {
            return "Ожидает загрузки"
        }
        if (sync === 1 ) {
            return "Загружен"
        }
        if (sync === 2) {
            return "Ожидает удаления"
        }
    }

    ChangeDate = (e) => {
        this.setState({
            fileDate: e.target.value
        })
        
    }

    Reload = async () => {
        if (this.props.panel.player_version === "3.0.0") {
            await this.props.loadContentType(this.props.panel.id, 4)
            this.setState({
                typeContent: 4
            })
        } else {
            await this.props.loadContentType(this.props.panel.id, this.state.typeContent)
        }
    }

    Akcii = async () => {
        this.setState({
            buttonStyleAkcii: "secondary",
            buttonStyleAfisha: "primary",
            buttonStyleOb: "primary",
            buttonStyleVideo: "primary",
            buttonStyleStr: "primary",
            buttonStyleVip: "primary",
            typeContent: 1
        })
        await this.props.loadContentType(this.props.panel.id, 1)
    }

    Afisha = async () => {
        this.setState({
            buttonStyleAkcii: "primary",
            buttonStyleAfisha: "secondary",
            buttonStyleOb: "primary",
            buttonStyleVideo: "primary",
            buttonStyleStr: "primary",
            buttonStyleVip: "primary",
            typeContent: 2
        })
        await this.props.loadContentType(this.props.panel.id, 2)
    }

    Ob =  async () => {
        this.setState({
            buttonStyleAkcii: "primary",
            buttonStyleAfisha: "primary",
            buttonStyleOb: "secondary",
            buttonStyleVideo: "primary",
            buttonStyleStr: "primary",
            buttonStyleVip: "primary",
            typeContent: 3
        })
        await this.props.loadContentType(this.props.panel.id, 3)
    }

    Video = async () => {
        
        this.setState({
            buttonStyleAkcii: "primary",
            buttonStyleAfisha: "primary",
            buttonStyleOb: "primary",
            buttonStyleVideo: "secondary",
            buttonStyleStr: "primary",
            buttonStyleVip: "primary",
            typeContent: 4
        })
        await this.props.loadContentType(this.props.panel.id, 4)
    }

    Str = async () => {
        this.setState({
            buttonStyleAkcii: "primary",
            buttonStyleAfisha: "primary",
            buttonStyleOb: "primary",
            buttonStyleVideo: "primary",
            buttonStyleStr: "secondary",
            buttonStyleVip: "primary",
            typeContent: 5
        })
        await this.props.loadContentType(this.props.panel.id, 5)
    }

    Vip = async () => {
        this.setState({
            buttonStyleAkcii: "primary",
            buttonStyleAfisha: "primary",
            buttonStyleOb: "primary",
            buttonStyleVideo: "primary",
            buttonStyleStr: "primary",
            buttonStyleVip: "secondary",
            typeContent: 6
        })
        await this.props.loadContentType(this.props.panel.id, 6)
    }

    getNameTypeContent = (type) => {
        let rez;
        switch (type) {
            case 1: rez = "Акции" 
                break;
            case 2: rez = "Афиша" 
                break;
            case 3: rez = "Объявления"
                break;
            case 4: rez = "Видео"
                break;
            case 5: rez = "Строка"
                break;
            case 6: rez = "Vip" 
                break;
        
            default: rez = ""
                break;
        }
        return rez
    }

    onChangeHandler = async (event) => {
        this.setState({ loadFile: true })
        await postFile(
            event.target.files[0], 
            localStorage.getItem("UserFolder") + "\\" + this.props.panel.panel_name + "\\" + this.getNameTypeContent(this.state.typeContent) + "\\",
            this.props.panel.id,
            this.state.typeContent
        )
        this.setState({ loadFile: false })
        await this.props.loadContentType(this.props.panel.id, this.state.typeContent)
    }

    SaveFile = async (e, id) => {
        await UpdateFile(id, this.state.fileDate)
    }

    DeleteFile = async (e, id) => {
        await delFile(id)
        await this.props.loadContentType(this.props.panel.id, this.state.typeContent)
    }

    render() {
        return (
            <div>
                
                <Dialog
                    fullWidth
                    maxWidth="lg"
                    disableBackdropClick={true}
                    //fullScreen="true"
                    scroll="paper"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Контент: " + this.props.panel.panel_name}</DialogTitle>
                    <DialogContent>

                    {
                        this.props.panel.player_version !== "3.0.0" &&
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button color={this.state.buttonStyleAkcii} onClick={this.Akcii}>Акции</Button>
                            <Button color={this.state.buttonStyleAfisha} onClick={this.Afisha}>Афиша</Button>
                            <Button color={this.state.buttonStyleOb} onClick={this.Ob}>Объявления</Button>
                            <Button color={this.state.buttonStyleVideo} onClick={this.Video}>Видео</Button>
                            <Button color={this.state.buttonStyleStr} onClick={this.Str}>Бегущая строка</Button>
                            <Button color={this.state.buttonStyleVip} onClick={this.Vip}>Вип</Button>
                        </ButtonGroup>
                    }
                    
                    <DialogContentText id="alert-dialog-description">
                    { this.props.showLoaderContent && <ContentLoader/> }
                    {
                        !this.props.showLoaderContent &&
                        <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead  aria-label="customized table">
                            <TableRow>
                                <TableCell style={{ width: '4%' }} align="center">СТАТУС</TableCell>
                                <TableCell style={{ width: '10%' }} align="center">Название файла</TableCell>
                                <TableCell style={{ width: '10%' }} align="center">Размер файла</TableCell>
                                <TableCell style={{ width: '10%' }} align="center">Авто удаление</TableCell>
                                <TableCell style={{ width: '5%' }} align="center">
                                    <Tooltip title="Обновить" aria-label="add" placement="top-start">
                                        <Fab size="medium" aria-label="add" onClick={this.Reload}>
                                            <RefreshIcon />
                                                </Fab>
                                        </Tooltip>
                                    </TableCell>
                                <TableCell style={{ width: '2%' }} align="center">
                                    <input style={{display: "none"}}
                                        accept=".jpg,.png,.mp4"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        onChange={this.onChangeHandler}
                                    />
                                    <label htmlFor="contained-button-file">
                                        {   !this.state.loadFile && 
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
                                this.props.content
                                    .slice(this.state.page * this.state.rowsContent, this.state.page * this.state.rowsContent + this.state.rowsContent)
                                    .map((file) => ( 
                                    <TableRow key={file.id} hover>
                                        <TableCell align="center">
                                            <MuiAlert severity={this.Status(file.sync)}>{this.StatusName(file.sync)}</MuiAlert>
                                        </TableCell>
                                        <TableCell align="center">{file.file_name || ""}</TableCell>
                                        <TableCell align="center">{(file.file_size / 1024 / 1024).toFixed(2) + " Mb" || ""}</TableCell>
                                        <TableCell align="center">
                                        <TextField
                                            id="date"
                                            type="date"
                                            defaultValue={moment(file.end_date).format('YYYY-MM-DD')}
                                            onChange={this.ChangeDate}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Сохранить" placement="top-start">
                                                <Fab  color="inherit" size="small" onClick={ e => this.SaveFile(e, file.id)}><SaveIcon /></Fab>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Удалить" placement="top-start">
                                                <Fab  color="secondary" size="small" onClick={ e => this.DeleteFile(e, file.id)}><DeleteIcon /></Fab>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 20, 30]}
                                    count={this.props.content.length}
                                    rowsPerPage={this.state.rowsContent}
                                    page={this.state.page}  
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                        </Table>
                    </TableContainer>
                    }
                    
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Закрыть
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadContentType
  }
  
  const mapStateToProps = state => {
    return {
        content: state.Panels.content,
        showLoaderContent: state.Panels.showLoaderContent
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent)
