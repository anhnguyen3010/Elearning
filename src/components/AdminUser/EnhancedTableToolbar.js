import React from 'react';
import clsx from 'clsx';
import { Toolbar, Typography, Tooltip, IconButton,makeStyles  } from '@material-ui/core';
import {DelecteIcon} from '@material-ui/icons'
import clsx from 'clsx';

const useToolbarStyles = makeStyles((theme)=>({
    root:{
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor:lighten(theme.palette.secondary.light,0.85),
        }
        :{
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    title: {
        flex: '1 1 100%',
    }
}))

export default function EnhancedTableToolbar(props){
    const classes = useToolbarStyles();
    const {numSelect} = props;
    return(
        <Toolbar> 
          {props.children}
        </Toolbar>
    )
}