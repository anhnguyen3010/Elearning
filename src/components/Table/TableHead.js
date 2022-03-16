import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";

const headCells = [
    { id: 'maKhoaHoc', numeric: false, disablePadding: true, label: 'Ma Khoa Hoc' },
    { id: 'biDanh', numeric: false, disablePadding: false, label: 'Bi Danh' },
    { id: 'tenKhoaHoc', numeric: false, disablePadding: false, label: 'Ten Khoa Hoc' },
    { id: 'maNhom', numeric: false, disablePadding: false, label: 'Ma nhom' },
    { id: 'soLuongHocVien', numeric: true, disablePadding: false, label: 'So Luong Hoc Vien' },
    { id: 'nguoiTao', numeric: false, disablePadding: false, label: 'Nguoi Tao' },
    { id: 'danhMuc', numeric: false, disablePadding: false, label: 'Danh Muc' },
    { id: 'luotXem', numeric: true, disablePadding: false, label: 'Luot Xem' },
];

export default function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style = {{ fontSize : '1.4rem' }}
                        align = {headCell.numeric ? 'right' : 'center'}
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
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};