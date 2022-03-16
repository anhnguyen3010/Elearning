import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import { TableHead,TableRow,TableCell, TableSortLabel } from '@material-ui/core';
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.black,
      fontSize: 13,
      fontWeight: 700,
      padding:16,
      paddingLeft: 5,
    }}))(TableCell);

const headCells = [
    {id:'taiKhoan',numberic:false,minWidth:115, disablePadding:true, label: 'Account'},
    {id:'hoTen', numberic:false,minWidth:150,disablePadding:true, label: 'User Name'},
    {id:'soDt',numberic:false,minWidth:100,disablePadding:true, label: 'Phone Number'},
    {id:'email',numberic:false,minWidth:200,disablePadding:true, label: 'User Email'},
    {id:'maLoaiNguoiDung',numberic:false,minWidth:50,disablePadding:true, label: 'Type'},
    {id:'actions',numberic:true, label:'Actions', disableSorting:true}
  ];

export default function EnhancedTableHead(props){
    const {classes, order, orderBy, onRequestSort} = props;

    const createSortHandler = (property) => (event) =>{
        onRequestSort(event, property);
    }

    return(
        <TableHead>
            <TableRow>
                {headCells.map((headCell)=>(
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numberic ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'center' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ):null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
}