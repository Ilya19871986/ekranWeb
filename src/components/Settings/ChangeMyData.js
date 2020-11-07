import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ModalGroupStatusLoader} from "../loaders/MainLoader"

import LinearProgress from '@material-ui/core/LinearProgress';

import { changeMyDataAsync, getMyDataAsync } from "../api/api"

import { connect } from "react-redux"

import { getMyData } from "../redux/actions"

class ChangeMyData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            surname: "",
            name: "",
            phone: "",
            email: "",
            town: "",
            organ: "",
            change: false,
        }
    }

    componentDidMount = async () => {
        await this.props.getMyData(localStorage.getItem("UserId"))
        this.setState({
            surname: this.props.mydata.surname, 
            name: this.props.mydata.name, 
            phone: this.props.mydata.phone, 
            email: this.props.mydata.email, 
            town: this.props.mydata.town, 
            organ: this.props.mydata.organization})
            localStorage.setItem("surname", this.props.mydata.surname)
            localStorage.setItem("name", this.props.mydata.name)
    }

    ChangeSurname = (e) => {
        this.setState({surname: e.target.value})
    }

    ChangeName = (e) => {
        this.setState({name: e.target.value})
    }

    ChangePhone = (e) => {
        this.setState({phone: e.target.value})
    }

    ChangeEmail = (e) => {
        this.setState({email: e.target.value})
    }

    ChangeTown = (e) => {
        this.setState({town: e.target.value})
    }

    ChangeOrgan = (e) => {
        this.setState({organ: e.target.value})
    }

    SaveChange = async () => {
        this.setState({change: true})
        console.log(this.state.name, this.state.surname, this.state.phone, this.state.email, this.state.town, this.state.organ )
        await changeMyDataAsync(localStorage.getItem("UserId"), this.state.name, this.state.surname, this.state.phone, this.state.email, this.state.town, this.state.organ)
        this.setState({change: false})
    }

    render() {
        if (this.props.loaderMyData) {
            return (<ModalGroupStatusLoader/>)
        } else
        return (
            <div>
                <Grid container spacing={1} justify="center" alignItems="center">
                    <Grid item xs={4}>
                            <Paper >
                                <form autoComplete="off" style={{margin: "10px"}} >
                                    <div>
                                        <TextField 
                                            fullWidth 
                                            label="Фамилия" 
                                            defaultValue = {this.props.mydata.surname}
                                            variant="outlined" 
                                            onChange = {this.ChangeSurname}
                                            style={{marginTop: "10px"}}>

                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField 
                                            fullWidth 
                                            label="Имя" 
                                            defaultValue = {this.props.mydata.name}
                                            variant="outlined" 
                                            onChange = {this.ChangeName}
                                            style={{marginTop: "10px"}}>

                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField 
                                            fullWidth 
                                            label="Телефон" 
                                            defaultValue = {this.props.mydata.phone}
                                            variant="outlined" 
                                            onChange = {this.ChangePhone}
                                            style={{marginTop: "10px"}}>

                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField 
                                            fullWidth 
                                            label="Почта" 
                                            defaultValue = {this.props.mydata.email}
                                            variant="outlined" 
                                            onChange = {this.ChangeEmail}
                                            style={{marginTop: "10px"}}>

                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField 
                                            fullWidth 
                                            label="Город" 
                                            defaultValue = {this.props.mydata.town}
                                            variant="outlined" 
                                            onChange = {this.ChangeTown}
                                            style={{marginTop: "10px"}}>

                                        </TextField>
                                    </div>
                                    <div>
                                        <TextField 
                                            fullWidth 
                                            label="Организация" 
                                            defaultValue = {this.props.mydata.organization}
                                            variant="outlined" 
                                            onChange = {this.ChangeOrgan}
                                            style={{marginTop: "10px", marginBottom: "10px"}}>

                                        </TextField>
                                    </div>
                                    {this.state.change && <LinearProgress/>}
                                    <Button 
                                        onClick={this.SaveChange}
                                        fullWidth 
                                        variant="contained" 
                                        color="primary" 
                                        style={{marginTop: "5px", marginBottom: "10px"}}>
                                    Сохранить
                                </Button>
                                </form>
                            </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getMyData
  }
  
  const mapStateToProps = state => {
    return {
        mydata: state.User.mydata,
        loaderMyData: state.User.loaderMyData,
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (ChangeMyData);
