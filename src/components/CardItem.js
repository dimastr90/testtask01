import React, {useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {toast} from "react-toastify";


const CardItem = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({...props.cardData});


    const editButtonHandler = () => {
        setEditMode(!editMode);
        setForm({...props.cardData})
    };

    const fieldsChangeHandler = (e) => {
        setForm({...form, [e.currentTarget.name]: e.currentTarget.value})
    };

    const submitButtonHandler = () => {
        if (form.id.length !== 8 || !isFinite(form.id)) {
            toast.error('Incorrect id');
        } else if (!isFinite(form.age) || (form.age <= 0 || form.age > 100)) {
            toast.error('Incorrect age');
        } else {
            props.updateLocalStorageData(form, props.cardData.id);
            setEditMode(false);
        }
    };


    if (!editMode) {
        return (
            <>
                <Card className='Card'>
                    <CardContent>
                        <div className='cardData'>
                            <div><b>ID:</b> {form.id}</div>
                            <div><b>Age:</b> {form.age}</div>
                            <div><b>Sex:</b> {form.sex}</div>
                            <div><b>English level:</b> {form.english}</div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={editButtonHandler}>Edit</Button>
                    </CardActions>
                </Card>
            </>
        )
    } else {
        return (
            <>
                <Card className='Card'>
                    <CardContent>
                        <div className='cardData'>
                            <div><b>ID:</b> <input type='text' name='id' onChange={fieldsChangeHandler}
                                                   value={form.id}/></div>
                            <div><b>Age:</b> <input type='text' name='age' onChange={fieldsChangeHandler}
                                                    value={form.age}/></div>
                            <div><b>Sex:</b> <select name='sex'
                                                     value={form.sex}
                                                     onChange={fieldsChangeHandler}>
                                <option value='male'>male</option>
                                <option value='female'>female</option>
                            </select>
                            </div>
                            <div><b>English level:</b> <select name='english'
                                                               value={form.english}
                                                               onChange={fieldsChangeHandler}>
                                <option value='A1'>A1</option>
                                <option value='A2'>A2</option>
                                <option value='B1'>B1</option>
                                <option value='B2'>B2</option>
                                <option value='C1'>C1</option>
                                <option value='C2'>C2</option>
                            </select></div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={editButtonHandler}>Cancel</Button>
                        <Button size="small" onClick={submitButtonHandler}>Submit</Button>
                    </CardActions>
                </Card>
            </>
        )
    }
};

export default CardItem;
