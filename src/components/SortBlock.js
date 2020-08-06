import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


const SortBlock = (props) => {

    const sortOrderHandleChange = (event) => {
        props.setSortOrder(event.target.value);
    };

    const sortHandleChange = (event) => {
        props.setSortType(event.target.value);
    };

    return (
        <div className='sortBlock'>
            <div className='sortBlockTop'>
                <span>Sort</span>
            </div>
            <div className='sortBlockForms'>
                <div className='sortBlockSortType'>
                    <FormLabel component="legend">Sort by:</FormLabel>
                    <RadioGroup aria-label="sort" name="sort1" value={props.sortType} onChange={sortHandleChange}>
                        <FormControlLabel value="none" control={<Radio/>} label="None"/>
                        <FormControlLabel value="id" control={<Radio/>} label="ID"/>
                        <FormControlLabel value="age" control={<Radio/>} label="Age"/>
                        <FormControlLabel value="sex" control={<Radio/>} label="Sex"/>
                        <FormControlLabel value="english" control={<Radio/>} label="English Level"/>
                    </RadioGroup>
                </div>
                {props.sortType !== 'none' && <div className='sortBlockSortOrder'>
                    <FormLabel component="legend">Sort order:</FormLabel>
                    <RadioGroup aria-label="sortOrd" name="sortOrd1" value={props.sortOrder}
                                onChange={sortOrderHandleChange}>
                        <FormControlLabel value="asc" control={<Radio/>} label="Ascending"/>
                        <FormControlLabel value="desc" control={<Radio/>} label="Descending"/>
                    </RadioGroup>
                </div>}
            </div>
        </div>
    )
};


export default SortBlock;