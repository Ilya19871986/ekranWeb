import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import ChangePassword from "./ChangePassord"
import ChangeMyData from "./ChangeMyData"

import { getMyData } from "../redux/actions"

class Settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            tab: '1'
        }
    }

    handleChange = (e, newValue) => {
        this.setState({tab: newValue})
    }

    render() {
        return (
            <div>
                <TabContext value={this.state.tab}>
                    <TabList onChange={this.handleChange}>
                        <Tab label="Основные" value="1" />
                        <Tab label="Изменить пароль" value="2" />
                    </TabList>
                    <TabPanel value="1"><ChangeMyData/></TabPanel>
                    <TabPanel value="2"><ChangePassword/></TabPanel>
                </TabContext>
            </div>
        );
    }
}

export default Settings;