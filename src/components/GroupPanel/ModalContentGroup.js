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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { connect } from "react-redux"
import { loadContentCurrentGroup } from "../redux/actions"
import { postFileGroup } from "../api/api"

class ModalContentGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadFile: false,
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

    render() {
        return (
            <div>
                <Dialog open={this.props.openModalContentGroup} onClose={this.props.ModalContent} fullWidth maxWidth={"md"}>
                    <DialogTitle>{this.props.selectedGroup.group_name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Статус</TableCell>
                                            <TableCell align="left">Название файла</TableCell>
                                            <TableCell align="left">Размер файла</TableCell>
                                            <TableCell align="left">Автоудаление</TableCell>
                                            <TableCell align="left">
                                            </TableCell>
                                            <TableCell align="left">
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

                                    </TableBody>
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
