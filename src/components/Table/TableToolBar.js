import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Modal from "../Modal";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import PropTypes from "prop-types";
import React from "react";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1.1rem",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.75),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

export default function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected, selectedCourse } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  return (
    <Toolbar className={clsx(classes.root, { [classes.highlight]: numSelected > 0})}>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {/* <Button onClick={handleOpenModal}>
            <Modal openModal={openModal} edit={true} selectedCourse={selectedCourse}/>
          </Button> */}
          <Modal openModal={openModal} edit={true} selectedCourse={selectedCourse} onClose={handleCloseModal} onClick={handleOpenModal}/>
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            <Modal onClick={handleOpenModal} openModal={openModal} onClose={handleCloseModal}/>          
        </Typography>
      )}

      {numSelected === 1 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedCourse: PropTypes.object,
};
