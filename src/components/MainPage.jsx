import React, {useState, useEffect} from 'react'
import CardBuilder from "./CardBuilder";
import {getAll, getByCountryName} from "../utils/apiCalls";

const arraySort = require('array-sort');

function MainPage(){
    const [cardsData, setCardsData] = useState([]);
    const [countryName, setCountryName] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [buttonsSort, setButtonsSort] = useState([]);
    const [updating, setUpdating] = useState(0);

    const Buttons = [
        {placeholder: 'Name', value: 'name'}
    ];

    useEffect( () => {
        fetchApiData(countryName);
        buttonsCreate()
    }, []);

    useEffect(() => {
        if(sortBy !== '') {
            const sort = arraySort(cardsData, sortBy, {reverse: true});
            setCardsData(sort);
            setUpdating(updating + 1);
            buttonsCreate()
        }
    }, [sortBy]);

    const fetchApiData = async (country) => {
        let reverse = true;
        if(sortBy === 'name') reverse = false;
        if(country === '') {
            const result = await getAll();
            setCardsData(arraySort(result.data, sortBy, {reverse: reverse}));
        }
        else{
            const result = await getByCountryName(country);
            setCardsData(arraySort(result.data, sortBy, {reverse: reverse}));
        }
    };

    const buttonsCreate = () => {
        const btns = [];
        Buttons.map((data) => {
            let css = 'btn-sort';
            let disable = false;

            if(data.value === sortBy) {css = 'btn-picked'; disable = true}

            return btns.push(<button disabled={disable} className={css} onClick={() => {
                    setSortBy(data.value)
                }}>{data.placeholder}</button>
            )
        });
        setButtonsSort(btns);
    };

    return(
        <div>
            <div>
                {cardsData.map((data, index) => {
                    return  <CardBuilder key={index} cardData={data}/>
                })}
            </div>
        </div>
    )
}

export default MainPage