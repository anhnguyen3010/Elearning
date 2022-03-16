import React, {useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import EnhancedTableHead from './TableHead'
import EnhancedTableToolbar from './TableToolBar'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { deleteCourse, getCourseList, getOneCourse } from "../../actions/adminCourse";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import InputBase from '@material-ui/core/InputBase';
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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
  },
  margin : {
    margin : theme.spacing(1)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {pathname} = useLocation()
  const dispatch = useDispatch();
  const { courseList, courseUpdate } = useSelector((state) => state.adminCourse);
  useEffect(() => {
    dispatch(getCourseList());
  }, [pathname]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = courseList.map((n) => n.maKhoaHoc);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, maKhoaHoc) => {
    const selectedIndex = selected.indexOf(maKhoaHoc);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, maKhoaHoc);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);  
    if(selected) {
      dispatch(getOneCourse(maKhoaHoc));
      console.log(courseUpdate)
    }  
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (maKhoaHoc) => selected.indexOf(maKhoaHoc) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, courseList.length - page * rowsPerPage);

  const handleDeleteCourse = async (courseId) => {
    dispatch(deleteCourse(courseId));
    dispatch(getCourseList());
  }

  const [courseFilter, setCourseFilter] = React.useState('')
  const handleChangeFilters = (e) => {
    setCourseFilter(e.target.value);
  }
  let courseFilterList = courseList.filter((course) => {
    if (courseFilter === '') {
      return course;
    } else if (course.biDanh.toLowerCase().includes(courseFilter.toLowerCase())) {
      return course;
    }
  })

  return (
    <div className={classes.root}>
      <div className={classes.search}>
          <div className={classes.searchIcon}>
              <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChangeFilters}
          />
      </div>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} selectedCourse={courseUpdate}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={courseList.length}
            />
            <TableBody>
              {stableSort(courseFilterList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((course, index) => {
                  const isItemSelected = isSelected(course.maKhoaHoc);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, course.maKhoaHoc)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={course.maKhoaHoc}
                      selected={isItemSelected}
                      style = {{ fontSize : '1.2rem' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} component="th" id={labelId} scope="row" padding="none">
                        {course.maKhoaHoc}
                      </TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} align="left">{course.biDanh}</TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} align="left">{course.tenKhoaHoc}</TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} align="center">{course.maNhom}</TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} align="center">{course.soLuongHocVien}</TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} align="left">{[course.nguoiTao].flat().map(username => username.taiKhoan)}</TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} align="left">{[course.danhMucKhoaHoc].flat().map(item => item.maDanhMucKhoahoc)}</TableCell>
                      <TableCell style = {{ fontSize : '1.25rem' }} align="center">{course.luotXem}</TableCell>
                      <TableCell>
                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={() => handleDeleteCourse(course.maKhoaHoc)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows, fontSize: '1.8rem' }}>
                  <TableCell style = {{ fontSize : '1.8rem' }} colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={courseList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          style = {{ fontSize: '1.5rem'}}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
