import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../assets/style.css";
import Header from '../Header/Header';

const SearchCars = () => {


    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [dealer, setDealer] = useState({});
    const [message, setMessage] = useState({});

    let dealer_url = '/djangoapp/get_inventory/${id}';

    let fetch_url = '/djangoapp/dealer/${id}';

    const fetchDealer = async ()=>{
        const res = await fetch(fetch_url, {
            method: "GET"
        });
        const retobj = await res.json();

        if(retobj.status === 200) {
            let dealer = retobj.dealer;
            setDealer({"fullname": dealer[0].full_name})
        }
    }

    const populateMakesAndModels = (cars) => {
        let tmpmakes = []
        let tmpmodels = []
        cars.forEach((car) => {
            tmpmakes.push(car.make)
            tmpmodels.push(car.model)
        })
        setMakes(Array.from(new Set(tmpmakes)));
        setModels(Array.from(new Set(tmpmodels)));
    }


}