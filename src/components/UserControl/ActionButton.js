import React from 'react';
import { Button, makeStyles}  from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root:{
        margin:0,
        minWidth: 0,
        margin: theme.spacing(0.5),
        padding:15,
        paddingTop:8,
        paddingBottom:8,
        fontSize:13,
        fontWeight: 600
    },
    secondary:{
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label': {
            color:theme.palette.common.black,
        },
        '&:hover':{
            backgroundColor: theme.palette.secondary.dark,
            '& .MuiButton-label': {
                color:theme.palette.common.white,
            }
        }
    },
    primary:{
        backgroundColor: theme.palette.primary.light,
        '& .Muibutton-label':{
            color: theme.palette.primary.main,
        }
    },
}))

export default function ActionButton(props) {
    const {color, children, onClick, ...restProps } = props;
    const classes = useStyles();

    return(
        <Button
        className={`${classes.root} ${classes[color]}`}
        onClick={onClick}
        {...restProps}
        >
        {children}
        </Button>
    )
}