import React from 'react';
import { FormControl,InputLabel,Select as MuiSelect, MenuItem } from '@material-ui/core';
export default function Select(props){
    const {name, label, value , error=null, onChange, options} = props;
    return(
        <FormControl variant='outlined'
        {...error && {error:true}}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                    {options.map(
                        (item,index) => (
                            <MenuItem 
                                key={index}
                                value={item.value}>
                                    {item.title}
                                </MenuItem>
                        )
                    )}
                </MuiSelect>
        </FormControl>
    )
}