import React, { Component } from 'react'
import Image from "../../img/sss.png"
import { connect } from "react-redux"
import { loadPanels } from "../redux/actions"
import regeneratorRuntime from "regenerator-runtime";
import CachedIcon from '@material-ui/icons/Cached';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import Panel from "./Panel"

import Button from '@material-ui/core/Button';
import {PanelLoader} from "../loaders/MainLoader"

class Panels extends Component {
    constructor(props){
        super(props)
       
    }

    async componentDidMount() {
        await this.props.loadPanels()
    }

    Reload = async () => {
        await this.props.loadPanels()
    }

    render() {
        if (this.props.showLoader) return <PanelLoader/>
        return (
            <div>
                <div style={{ marginBlockEnd: '0.5rem'}}>
                     <Button variant="contained" color="primary" startIcon={<CachedIcon/>} size="small" onClick={this.Reload}>Обновить</Button>
                </div>
                    <Divider/>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        this.props.panels.map(panel => 
                        {
                            return <Panel key={panel.id} panel = {panel}  />    
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadPanels
  }
  
  const mapStateToProps = state => {
    return {
        panels: state.Panels.panels,
        showLoader: state.Panels.showLoader
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (Panels);
