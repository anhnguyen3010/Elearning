import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from '@material-ui/core/Button'
import { Paper,TableBody, TableRow, TableCell, TableContainer, Table} from "@material-ui/core";
import UserModal from '../../components/AdminUser/UserModal';

import { getUserList, deleteUser, getUser, getTypeOfUser } from "../../actions/adminUser.js";
import UserForm from "../../components/AdminUser/UserForm";

import EnhancedTableHead from "src/components/AdminUser/EnhancedTableHead.js";
import { getComparator, stableSort } from "src/components/AdminUser/TableControl.js";
import UserControl from "src/components/UserControl/UserControl";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import InputSearch from "src/components/UserControl/InputSearch";
import EnhancedTablePagination from '../../components/AdminUser/EnhancedTableTablePagination';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '10px',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
  ,
  table: {
    minWidth: 650,
  },
  
}));

const StyledTableCell = withStyles((theme) => ({
  root: {
    color: theme.palette.black,
    fontSize: 13,
    padding: 10,
    paddingLeft: 5,
    paddingRight: 0,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}))(TableRow);
export default function AdminUsers() {
  //
  const dispatch = useDispatch();
  const classes = useStyles();
  const { pathname } = useLocation();
  const { userList, userUpdate, typeOfUser} = useSelector((state) => state.adminUser);

  console.log(typeOfUser)

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getTypeOfUser())
  }, [pathname])

  //ModalAdd or ModalUpdate
  const [openModal, setOpenModal] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(false);
  

  const handleOpenUpdateForm = async (item) => {
    try {
      await dispatch(getUser(item.hoTen))
      setRecordForEdit(true);
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenAddForm = () => {
    setRecordForEdit(false);
    setOpenModal(true)
  }

  const handleDeleteUser = async (data) => {
    await dispatch(deleteUser(data))
    dispatch(getUserList())
  }
  //End 

  //Table
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('taiKhoan');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userList.length - page * rowsPerPage);
  //End Table

  //Find User By Account
  const [userFilter, setUserFilter] = useState('')
  const handleChangeFilters = (e) => {
    setUserFilter(e.target.value);
  }
  let userFilterList = userList.filter((user) => {
    if (userFilter === '') {
      return user;
    } else if (user.taiKhoan.toLowerCase().includes(userFilter.toLowerCase())) {
      return user;
    }
  })
  //End Find User By Account

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex' }}>
        <UserControl.ActionButton
          color='secondary'
          onClick={handleOpenAddForm}
        > Add </UserControl.ActionButton>
        <InputSearch
          type='text'
          onChange={handleChangeFilters}
        />
      </div>


      <Paper className={classes.paper}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(userFilterList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <StyledTableRow
                      key={index}
                      hover
                      tabIndex={-1}>
                      <StyledTableCell component="th" scope="row">
                        {user.taiKhoan}
                      </StyledTableCell>
                      <StyledTableCell>
                        {user.hoTen}
                      </StyledTableCell>
                      <StyledTableCell>
                        {user.soDt}
                      </StyledTableCell>
                      <StyledTableCell>
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell>
                        {user.maLoaiNguoiDung}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          onClick={() => { handleOpenUpdateForm(user) }}
                        >
                          <EditOutlinedIcon fontSize='small' />
                        </Button>
                        <Button>
                          <CloseIcon fontSize='small'
                            onClick={() => { handleDeleteUser(user.taiKhoan) }}
                          />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  )

                })
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <EnhancedTablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <UserModal
        title="Student Form"
        openModal={openModal}
        setOpenModal={setOpenModal}
        setRecordForEdit={setRecordForEdit}
      >
        <UserForm
          recordForEdit={recordForEdit}
          setOpenModal={setOpenModal}
          userUpdate={userUpdate}
        openModal={openModal}
        typeOfUser={typeOfUser}
          // setUser={setUser}
        />
      </UserModal>
    </div>
  );
}