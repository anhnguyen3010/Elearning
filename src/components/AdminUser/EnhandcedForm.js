import React,{useState} from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme=> ({
    root: {
        '& MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function EnhancedForm(props){
    const classes = useStyles();
    const {children, ...restProps} = props;
    return(
        <form className={classes.root} autoComplete='off' {...restProps}>
            {props.children}
        </form>
    )
}