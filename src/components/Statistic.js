import React, {useEffect, useState} from "react";
import FormLabel from "@material-ui/core/FormLabel";


const Statistic = (props) => {
    const [level, setLevel] = useState('');
    const [average, setAverage] = useState('');

    const ENGLISH_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    useEffect(()=>{
        if(level!=='') {
                const filtered = props.storageData.filter(i => i.english === level);
                if(filtered.length>0) {
                    setAverage(Math.floor(filtered.reduce((acc, i) => acc + Number(i.age), 0) / filtered.length));
                }else{
                    setAverage("No users with this level")
                }
        }
    },[level,props.storageData]);

    const handleSelectChange = (e) => {
        setLevel(e.target.value);
    };

    return (
        <div className='statisticBlock'>
            <div className='statisticBlockTop'>
                <span>Age Statistic</span>
            </div>
            <div className='statisticBlockForm'>
                <div className='statisticBlockHeader'>
                    <FormLabel component="legend">Select English level to get age statistics</FormLabel>
                </div>
                <select name='english'
                        value={level}
                        onChange={handleSelectChange}>
                    <option disabled={true} value=''>Select level</option>
                    {ENGLISH_LEVELS.map(i=><option value={i} key={i}>{i}</option>)}
                </select>
                {level!=='' && <div className='statisticBlockResult'>
                    <div><FormLabel component="legend">Average age for this level:</FormLabel></div>
                    <div className='statisticBlockResult'>{average}</div>
                </div>}
            </div>
        </div>
    )
};


export default Statistic;