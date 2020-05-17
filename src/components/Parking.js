import React, {useEffect, useState} from "react";
import s from '../App.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getCars, setCars, setCurrentCars, setPage, setTotalCount} from "../redux/carsReducer";
import {slice} from "lodash";
import {TableBody} from "./TableBody";
import {Table} from "./Table";
import {Settings} from "./Settings";
import {Pagination} from "./Pagination";

export const CAR_NUMBER = 'car_number';
export const CAR_TENANT = 'car_tenant';
export const CAR_BRAND = 'car_brand';
export const CAR_MODEL = 'car_model';
export const ALL = 'Все';
export const UP = "up";
export const DOWN = "down";

export const Parking = () => {

    const {cars, currentCars, page, pageCount, totalCount, loading} = useSelector((state) => state.carsPage);
    const dispatch = useDispatch();

    const [selected, setSelected] = useState(ALL);
    const [showCars, setShowCars] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(currentCars);

    useEffect(() => {
        dispatch(getCars());
    }, [dispatch]);

    useEffect(() => {
        const results = currentCars.filter(s =>
            s.car_number.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
        dispatch(setTotalCount(results.length));
    }, [dispatch, searchTerm, currentCars]);

    const tableElementsAllCars = slice(searchResults, [(page - 1) * pageCount], [pageCount * page])
        .map(c => {
            return <TableBody tenants={c.car_tenant}
                              number={c.car_number}
                              brand={c.car_brand}
                              model={c.car_model}
                              time={c.time_in}
                              days={c.days}
                              flag={!!c.days}
                              key={c.id}
                              id={c.id}/>
        });

    const carsOnTerritory = searchResults.filter(e => e.last_flag === false);

    const tableElementsOnTerritoryCars = slice(carsOnTerritory, [(page - 1) * pageCount], [pageCount * page])
        .map(c => {
            return <TableBody tenants={c.car_tenant}
                              number={c.car_number}
                              brand={c.car_brand}
                              model={c.car_model}
                              time={c.time_in}
                              days={c.days}
                              flag={!!c.days}
                              key={c.id}
                              id={c.id}/>
        });


    const sortParams = (param, direction) => {
        let sortered = searchResults.sort((a, b) => {
            return a[param].localeCompare(b[param])
        });
        if (direction === UP) {
            dispatch(setCars(sortered));
        } else if (direction === DOWN) {
            let reverse = sortered.reverse();
            dispatch(setCars(reverse));
        }
    };

    const sortByUP = (sort) => {
        sortParams(sort, UP);
    };

    const sortByDown = (sort) => {
        sortParams(sort, DOWN);
    };

    const onChanged = (str, selectedValue) => {
        let filtered = cars.filter((value) => {
            return value[str] === selectedValue
        });
        if (selectedValue === ALL) {
            setSelected(ALL);
            dispatch(getCars());
        } else {
            setSelected(selectedValue);
            dispatch(setCurrentCars(filtered));
        }
    };

    const onChangedValue = (str, e) => {
        onChanged(str, e.currentTarget.value);
    };

    const getPage = (newPage, newPageCount) => {
        dispatch(setPage(newPage, newPageCount));
    };

    return (
        <div className={s.container}>
            {loading && <div className={s.loader}> Загрузка...</div>}
            <div className={s.tableCars}>
                <Table sortByUP={sortByUP}
                       sortByDown={sortByDown}
                       tableElementsAllCars={tableElementsAllCars}
                       tableElementsOnTerritoryCars={tableElementsOnTerritoryCars}
                       showCars={showCars}/>
                <Settings onChangedValue={onChangedValue}
                          selected={selected}
                          cars={cars}
                          setShowCars={setShowCars}
                          setSearchTerm={setSearchTerm}
                          searchTerm={searchTerm}
                          carsOnTerritory={carsOnTerritory}/>
            </div>
            <div className={s.paginatorContainer}>
                <Pagination page={page}
                            pageCount={pageCount}
                            totalCount={totalCount}
                            getPage={getPage}/>
            </div>
        </div>
    )
};
