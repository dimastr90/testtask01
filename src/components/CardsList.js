import React, {useEffect, useState} from "react";
import Pagination from "@material-ui/lab/Pagination";
import CardItem from "./CardItem";
import Grid from "@material-ui/core/Grid";

const CardsList = (props) => {
    const PER_PAGE = 8;
    const pageAmount = Math.ceil(props.viewData.length / PER_PAGE);

    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.viewData, currentPage]);

    const getData = () => {
        const offset = currentPage === 1 ? 0 : currentPage * 8 - 8;
        const newData = props.viewData.slice(offset, offset + 8);
        setData(newData);
    };

    const handleChangePage = (e, page) => {
        setCurrentPage(page);
    };


    return (
        <>
            <Grid container spacing={2}>
                {data.map(i => <Grid key={'uniq-card-key-' + i.id} item xs={12} md={6} lg={4}>
                        <CardItem cardData={{...i}} updateLocalStorageData={props.updateLocalStorageData}/>
                    </Grid>
                )}
            </Grid>
            <Grid container justify="center" spacing={2}>
                <Grid item>
                    {pageAmount > 1 && <div className='cardListPagination'>
                        <Pagination count={pageAmount} showFirstButton showLastButton onChange={handleChangePage}/>
                    </div>
                    }
                </Grid>
            </Grid>
        </>
    )
};


export default CardsList;

