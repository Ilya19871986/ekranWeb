import React, { Component } from 'react'
import { BallBeat, BallClipRotate, BallClipRotateMultiple } from 'react-pure-loaders';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import history from "../../components/customHistory"

import MiniDrawer from "../drawer/drawer"

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isMenuOpen: false
        }
    }
    
    render() {
        return (
            <div>
                <MiniDrawer open={this.state.isMenuOpen} onToggle={() => this.setState({isMenuOpen: false})}/>
            </div>
        )
    }
}
