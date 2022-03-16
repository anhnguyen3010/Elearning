import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
//css
import styles from '../../assets/jss/material-dashboard-react/views/dashboardStyle';
//@material-ui/core
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
//core components
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardIcon from '../Card/CardIcon';

//API
import { getUserList } from 'src/actions/adminUser';
import {getCourseList} from 'src/actions/adminCourse';
import { getCategory } from 'src/actions/category';

const useStyles = makeStyles(styles);
export default function Dashboard() {
  const { userList} = useSelector((state) => state.adminUser);
  const {courseList} = useSelector((state)=> state.adminCourse);
  const classes = useStyles();
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  let numOfUser = 0;
  let numOfAdmin = 0;

  for(let user of userList){
    if(user.maLoaiNguoiDung === 'HV'){
      numOfUser++;
    }else if(user.maLoaiNguoiDung === 'GV'){
      numOfAdmin++;
    }
  }

  
  useEffect(()=>{
    dispatch(getCategory())
    dispatch(getUserList())
    dispatch(getCourseList())
  }, [pathname])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>person</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Users</p>
              <h3 className={classes.cardTitle}>
                {numOfUser}
              </h3>
            </CardHeader>
            {/* <CardFooter stats>
              <Danger>
                <Warning />
              </Danger>
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>admin_panel_settings</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Admins</p>
              <h3 className={classes.cardTitle}>
                {numOfAdmin}
              </h3>
            </CardHeader>
            {/* <CardFooter stats>
              <Danger>
                <Warning />
              </Danger>
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon>menu_book</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Courses</p>
              <h3 className={classes.cardTitle}>
                {courseList.length}
              </h3>
            </CardHeader>
           
          </Card>
        </GridItem>
      </GridContainer>
    
    </div>
  )
}
