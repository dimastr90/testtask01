import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";


const FilterBlock = (props) => {


    const handleSexChange = (e) => {
        props.setSexStatus({...props.sexStatus, [e.target.name]: e.target.checked});
    };

    const handleEnglishChange = (e) => {
        props.setEnglishStatus({...props.englishStatus, [e.target.name]: e.target.checked});
    };

    return (
        <div className='filterBlock'>
            <div className='filterBlockTop'>
                <span>Filters</span>
            </div>
            <div className='filterBlockForm'>
                <div className='filterBlockHeader'>
                    <FormLabel component="legend">Filter by sex:</FormLabel>
                </div>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onChange={handleSexChange} checked={props.sexStatus.male} name="male"/>}
                        label="male"
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleSexChange} checked={props.sexStatus.female} name="female"/>}
                        label="female"
                    />
                </FormGroup>
                <div className='filterBlockHeader'>
                    <FormLabel component="legend">Filter by english:</FormLabel>
                </div>
                <FormGroup>
                    {Object.keys(props.englishStatus).map(i => <FormControlLabel
                        key={'filter-checkbox-' + i}
                        control={<Checkbox onChange={handleEnglishChange} name={i} checked={props.englishStatus[i]}/>}
                        label={i}
                    />)}
                </FormGroup>
            </div>
        </div>
    )
};


export default FilterBlock;