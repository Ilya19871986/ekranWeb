import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';  

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class AppHeader extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{flexGrow: "1"}}>
                <AppBar position="static" >
                    <Toolbar>
                    <IconButton edge="start" style={{marginRight: "2"}} color="inherit" aria-label="menu" onClick={()=>this.props.onMenuButton()}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: "1"}}>
                        ЭКРАН ОНЛАЙН
                    </Typography>
                    <Button color="inherit">Выход</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
