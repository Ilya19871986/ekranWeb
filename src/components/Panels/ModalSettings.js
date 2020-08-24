import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import TvIcon from '@material-ui/icons/Tv';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import { Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { isThisWeek } from 'date-fns';
import { changePanel } from "../api/api"
import Tooltip from '@material-ui/core/Tooltip';

export default class ModalSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open,
            vert: this.props.panel.run_text === 1 ? true : false,
            onlyVip : this.props.panel.only_vip === 1 ? true: false,
            timeVip: this.props.panel.time_vip,
            comment: this.props.panel.address, 
            saveChange: false
        }
    }

    handleClose = () => {
        this.props.close()
    }

    handleChange = () => {
        this.setState({
            vert: !this.state.vert
        })
    }

    handleSave = async () => {
        this.setState({
            saveChange: true
        })
       
            await changePanel(this.props.panel.id, (this.state.vert ? 1 : 0), this.state.timeVip, this.state.comment, "", (this.state.onlyVip ? 1 : 0))
         
        this.setState({
            saveChange: false
        })
        this.props.save()
    }

    handleChangeVip = () => {
        this.setState({
            onlyVip: !this.state.onlyVip
        })
    }

    handleChangeTimeVip = (e) => {
        this.setState({
            timeVip: e.target.value
        })
    }

    handleChangeComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    render() {
        return (
            <div>
                 <Dialog
                    fullWidth
                    maxWidth="sm"
                    disableBackdropClick={true}
                    //fullScreen="true"
                    scroll="paper"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Настройки"}</DialogTitle>
                    <Divider/>
                    <DialogContent>
                        <Chip
                            icon={<TvIcon />}
                            label= {this.props.panel.panel_name || ""}
                            color="secondary"
                            /> 
                            <br/><br/>
                            
                            <TextField id="standard-basic"  fullWidth variant="outlined"
                                        label="Коментарий" multiline  rows={4}
                                        value={this.state.comment}
                                        onChange={this.handleChangeComment}
                                        />
                            <br/><br/>
                            {
                                this.props.panel.player_version == "3.0.0" &&
                                <div>
                                    <TextField style={{width: "50%", alignContent: "center"}} variant="outlined" 
                                    label="Время показа изображений" size="small" value={this.state.timeVip} onChange={this.handleChangeTimeVip} />
                                    {"   "}
                                    <Tooltip title="Ориентация изменится после перезагрузки плеера" placement="top-start"> 
                                        <FormControlLabel
                                            control={<Checkbox checked={this.state.onlyVip} onChange={this.handleChangeVip} />}
                                            label="Вертикальная ориентация"
                                        />
                                    </Tooltip>
                                </div>
                            }
                            {
                                this.props.panel.player_version !== "3.0.0" && 
                                <div>
                                    <TextField style={{width: "50%", alignContent: "center"}} variant="outlined" 
                                    label="Запускать ВИП каждые" size="small" value={this.props.panel.time_vip}/>
                                    {"   "}
                                    <FormControlLabel
                                        control={<Checkbox checked={this.state.vert} onChange={this.handleChange} />}
                                        label="Бегущая строка"
                                    />
                                     <FormControlLabel
                                        control={<Checkbox checked={this.state.onlyVip} onChange={this.handleChangeVip} />}
                                        label="Запускать только ВИП"
                                    />
                                </div>
                            }
                            
                    </DialogContent>
                    <DialogActions>

                    <Button color="primary" autoFocus onClick={this.handleSave}>
                        {   
                            this.state.saveChange &&
                            <CircularProgress color="inherit" size={18} />
                        }
                        Сохранить
                    </Button>
                
                    <Button color="primary" autoFocus onClick={this.handleClose}>
                        Закрыть
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
