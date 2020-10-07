import React, { Component } from 'react'
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

export default class GroupPanels extends Component {

    AddGroup = () => {
        console.log("add group")
    }

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead  aria-label="customized table" >
                            <TableRow>
                                <TableCell style={{ width: '30%' }}  align="center">ГРУППА</TableCell>
                                <TableCell style={{ width: '30%' }}  align="center">КОЛИЧЕСТВО ПАНЕЛЕЙ</TableCell>
                                <TableCell style={{ width: '30%' }}  align="center">КОМЕНТАРИЙ</TableCell>
                                <TableCell style={{ width: '30%' }}  align="center">
                                    <Tooltip title="Создать группу панелей" aria-label="add" placement="top-start">
                                        <Fab color="primary" aria-label="add" onClick={this.AddGroup}>
                                            <AddIcon />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                            </TableRow> 
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
