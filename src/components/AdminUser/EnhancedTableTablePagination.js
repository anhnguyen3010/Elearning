import { TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme)=>({
    root:{
        fontSize:13,
        '& .MuiTypography-body2':{
            fontSize: 13,
        },
    },
}))
export default function EnhancedTablePagination(props){
    const classes = useStyles();
    return(
        <TablePagination
            {...props}
            className={classes.root}
        />
    )
}