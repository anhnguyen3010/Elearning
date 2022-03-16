import React from 'react';
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import UserControl from '../UserControl/UserControl';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
    },
    dialogTitle: {
        paddingRight: 0,
        width: '100%',
        '& .MuiTypography-h6': {
            width: '100%',
            padding: 0,
            fontSize: 32,
            fontWeight: 700,
            color: theme.palette.secondary.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        '& .MuiDialogTitle-root': {
            padding: 0,
            
        }
    }
}))
export default function UserModal(props) {
    const { title, children, setRecordForEdit, openModal, setOpenModal } = props;
    const classes = useStyles();
    const handleClose = () => {
        setRecordForEdit(false);
        setOpenModal(false);
    }
    return (
        <Dialog open={openModal} maxWidth='md' classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <h2 style={{ display: 'inline' },{paddingLeft:'50px'}}>
                    {title}
                </h2>
                <UserControl.ActionButton
                    color='secondary'
                    onClick={handleClose}
                >
                    <CloseIcon />
                </UserControl.ActionButton>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}