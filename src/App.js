import React, {useEffect, useState} from 'react';
import 'fontsource-roboto';
import './App.css';
import DataInput from "./components/DataInput";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Navbar from "./components/Navbar";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SortBlock from "./components/SortBlock";
import CardsList from "./components/CardsList";
import SortingItems from "./modules/sortingItems";
import Statistic from "./components/Statistic";
import FilterBlock from "./components/FilterBlock";
import data from './test.data';


function App() {
    const [storageData, setStorageData] = useState(localStorage.getItem('appData') ? JSON.parse(localStorage.getItem('appData')) : data);
    const [viewData, setViewData] = useState(localStorage.getItem('appData') ? JSON.parse(localStorage.getItem('appData')).items : data.items);
    const [sortType, setSortType] = useState('none');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sexStatus, setSexStatus] = useState({female: false, male: false});
    const [englishStatus, setEnglishStatus] = useState({
        A1: false,
        A2: false,
        B1: false,
        B2: false,
        C1: false,
        C2: false
    });

    useEffect(() => {
        setViewData(sortViewData(changeFilters(storageData.items)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sexStatus, englishStatus]);

    useEffect(() => {
        localStorage.setItem('appData', JSON.stringify(storageData));
        setViewData(sortViewData(changeFilters(storageData.items)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageData]);

    useEffect(() => {
        setViewData(sortViewData(viewData.length===storageData.items.length ? storageData.items : viewData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOrder, sortType]);


    const sortViewData = (data) => {
        if (sortType === 'none') {
            return [...data];
        } else {
            return [...SortingItems.sort([...data], sortType, sortOrder)];
        }
    };

    const changeFilters = (data, sex=sexStatus, levels=englishStatus) => {
        let res = [];
        if(sex.male || sex.female) {
            if (sex.male) {
                res = [...res, ...data.filter(i => i.sex === 'male')];
            }
            if (sex.female) {
                res = [...res, ...data.filter(i => i.sex === 'female')];
            }
        }else{
            res=data;
        }

        let isEnglishSort = false;
        for(let key in levels){
            if(levels[key]===true){
                isEnglishSort = true;
            }
        }

        if(isEnglishSort) {
            res = [...res.filter(i => levels[i['english']])];
        }

        return [...res];

    };


    const writeToLocalStorage = (dataObject) => {
        if (storageData.items.filter(i => i.id === dataObject.id).length === 0) {
            const newData = storageData;
            newData.items.push({...dataObject});
            setStorageData({...newData});
            toast.success("Card is added")
        } else {
            toast.error('Card with such id is exist');
        }
    };

    const updateLocalStorageData = (dataObject, oldId) => {
        let data = storageData.items;
        if (dataObject.id === oldId) {
            let index = null;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === oldId) {
                    index = i;
                    break;
                }
            }
            if (index === null) {
                toast.error('Error');
            } else {
                data.splice(index, 1, dataObject);
                setStorageData({items: [...data]});
                toast.success("Card is updated");
            }
        } else {
            if (data.filter(i => i.id === dataObject.id).length > 0) {
                toast.error('Item with such id is exist');
            } else {
                data.push(dataObject);
                data = data.filter(i => i.id !== oldId);
                setStorageData({items: [...data]});
            }
        }
    };


    return (
        <>
            <Navbar/>
            <Container className="mainContainer" maxWidth="lg" spacing={2}>
                <Container className="mainDataContainer" spacing={2}>
                    <Grid container justify="center">
                        <Grid className='mainDataContainerInput' item xs={12} md={6}>
                            <DataInput writeToLocalStorage={writeToLocalStorage}/>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={9}>
                                <div className='mainDataContainerCards'><CardsList viewData={viewData}
                                                                                   updateLocalStorageData={updateLocalStorageData}/>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div className='mainDataContainerRight'>
                                    <SortBlock sortType={sortType}
                                               setSortType={setSortType}
                                               sortOrder={sortOrder}
                                               setSortOrder={setSortOrder}/>
                                    <FilterBlock setSexStatus={setSexStatus} sexStatus={sexStatus} englishStatus={englishStatus} setEnglishStatus={setEnglishStatus}/>
                                    <Statistic storageData={storageData.items}/>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Container>


            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;