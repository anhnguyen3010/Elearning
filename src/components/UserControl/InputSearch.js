import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    inputSearch: {
        width: '100%',
        border: `3px solid ${theme.palette.secondary.light}`,
        padding: 20,
        height: 20,
        borderRadius: 5,
        outline: 'none',
        color: theme.palette.grey[800],
        margin: 4,
        '&:focus':{
            border: `3px solid ${theme.palette.secondary.dark}`,
        }
    }
}
))
export default function InputSearch(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <input
                {...props}
                type='search'
                placeholder='Search...'
                className={classes.inputSearch}
            />
        </div>
    )
}