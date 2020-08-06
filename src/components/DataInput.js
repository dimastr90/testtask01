import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {toast} from "react-toastify";


const DataInput = (props) => {
    const [inputValue, setInputValue] = useState('');

    const verifyInputData = (data) => {
        const resObject = {};
        const array = data.split(',');


        if (array.length !== 4) {
            toast.error('You must enter four parameters, separated by commas');
        } else {
            array.map(i => {
                if (isFinite(i)) {
                    if (i.length === 8) {
                        resObject.id = i;
                    } else if (i.length > 0 && i.length < 3) {
                        resObject.age = i;
                    }
                } else if (i.toLowerCase() === 'male' || i.toLowerCase() === 'female') {
                    resObject.sex = i.toLowerCase();
                } else if (/[a-c][1-2]/.test(i.toLowerCase())) {
                    resObject.english = i.toUpperCase();
                }
                return i;
            });
            if (Object.keys(resObject).length !== 4) {
                toast.error("Incorrect input.")
            } else {
                props.writeToLocalStorage(resObject);
            }
        }
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const value = inputValue.replace(/\s/g, '');
        if (value.length < 1) {
            toast.warning('Input field is empty.');
        } else {
            verifyInputData(value);
        }
        setInputValue('');
    };

    return (
        <>
            <form onSubmit={formSubmitHandler}>
                <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='inputField'
                           id="outlined-basic" label="Enter id, sex, age and english level" variant="outlined"/>
            </form>
        </>
    )
};


export default DataInput;