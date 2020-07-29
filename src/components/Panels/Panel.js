import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from '../../img/login.png'
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import TheatersIcon from '@material-ui/icons/Theaters';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default class Panel extends Component {
    constructor(props) {
        super(props)

        var Data = new Date();
        var Data1 = Date.parse(Data);
        var Data2 = Date.parse(this.props.panel.last_connect);
        var resultTime = (((Data1 - Data2)/1000)/60).toFixed(2)
        console.log(this.props.panel)
        this.state = {
            classes: (resultTime > 6) ? "error" : "success",
            status: (resultTime > 6) ? "Не в сети" : "В сети"
        }
    }
    render() {
        return (
                <Card style={{width: "20%", height: '30%', minHeight: '20%', minWidth: '40%', margin:'0.6rem'}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <MuiAlert severity={this.state.classes}>{this.state.status}</MuiAlert>
                                {this.props.panel.panel_name}
                            </Typography>
                               
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.panel.address}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Tooltip title="Delete">
                            <Button size="small" color="primary" startIcon={<TheatersIcon/>}>
                                Контент
                            </Button>
                        </Tooltip>
                            <Button size="small" color="primary" startIcon={<Icon>settings</Icon>}>
                                Настройки
                            </Button>
                            <Button size="small"  color="primary" startIcon={<Icon>delete</Icon>}>
                                Удалить
                            </Button>
                    </CardActions>
                </Card>
        )
    }
}
