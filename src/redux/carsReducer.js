import {api} from "../api/api";

const SET_CARS = '/redux/songsReducer/SET_CARS';
const SET_CURRENT_CARS = '/redux/songsReducer/SET_CURRENT_CARS';
const SET_PAGE = '/redux/songsReducer/SET_PAGE';
const SET_TENANTS = '/redux/songsReducer/SET_TENANTS';
const SET_BRANDS = '/redux/songsReducer/SET_BRANDS';
const SET_MODELS = '/redux/songsReducer/SET_MODELS';
const SET_LOADING = '/redux/songsReducer/SET_LOADING';
const SET_TOTAL_COUNT_PAGE = '/redux/songsReducer/SET_TOTAL_COUNT_PAGE';

const initialState = {
    cars: [],
    currentCars: [],
    mergeCars: [],
    totalCount: 1,
    page: 1,
    pageCount: 10,
    tenants: [],
    brands: [],
    models: [],
    loading: false,
};

export const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARS:
            return {
                ...state,
                cars: action.cars,
                currentCars: action.cars,
                totalCount: action.cars.length
            };
        case SET_CURRENT_CARS:
            return {
                ...state,
                currentCars: action.cars,
                totalCount: action.cars.length
            };
        case SET_PAGE:
            return {
                ...state,
                page: action.page,
                pageCount: action.pageCount,
            };
        case SET_TOTAL_COUNT_PAGE: {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case SET_TENANTS:
            return {
                ...state,
                tenants: action.tenants,
            };

        case SET_BRANDS:
            return {
                ...state,
                brands: action.brands,
            };
        case SET_MODELS:
            return {
                ...state,
                models: action.models,
            };
        case SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }

        default:
            return state;
    }
};

export const setCars = (cars) => {
    return {
        type: SET_CARS,
        cars
    }
};

export const setCurrentCars = (cars) => {
    return {
        type: SET_CURRENT_CARS,
        cars
    }
};

export const setPage = (page, pageCount) => ({type: SET_PAGE, page, pageCount});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT_PAGE, totalCount});

const setTenants = (tenants) => ({type: SET_TENANTS, tenants});
const setBrands = (brands) => ({type: SET_BRANDS, brands});
const setModels = (models) => ({type: SET_MODELS, models});
const setLoading = (loading) => ({type: SET_LOADING, loading});

export const getCars = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await api.viewAllCars();
        const sortedData = data.data.map((c) => {
            if (c.car_brand === null || c.car_model === null) {
                return {
                    id: c.id,
                    car_tenant: c.car_tenant.name,
                    car_number: c.car_number,
                    car_brand: 'не указан',
                    car_model: 'не указан'
                }
            } else {
                return {
                    id: c.id,
                    car_tenant: c.car_tenant.name,
                    car_number: c.car_number,
                    car_brand: c.car_brand.name,
                    car_model: c.car_model.name
                }
            }
        });
        const dataCar = await api.viewCarOnTerritory();
        const carOnTerritory = dataCar.data;
        const mergeCars = sortedData.map(item => {
            const obj = carOnTerritory.find(o => o.id === item.id);
            return {...item, ...obj};
        });
        dispatch(setCars(mergeCars));
    } catch (e) {
        console.log('Message error' + e);
    } finally {
        dispatch(setLoading(false))
    }
};

export const getTenants = () => async (dispatch) => {
    try {
        const data = await api.viewAllTenants();
        dispatch(setTenants(data.data));
    } catch (e) {
        console.log('Message error' + e);
    }
};

export const getBrands = () => async (dispatch) => {
    try {
        const data = await api.viewAllBrands();
        dispatch(setBrands(data.data));
    } catch (e) {
        console.log('Message error' + e);
    }
};
export const getModels = (idModel) => async (dispatch) => {
    try {
        const data = await api.viewAllModels(idModel);
        dispatch(setModels(data.data));
    } catch (e) {
        console.log('Message error' + e);
    }
};

export const setNewCar = (number, brand, model, tenant) => async () => {
    try {
        await api.addNewCar(number, brand, model, tenant);
    } catch (e) {
        console.log('Message error' + e);
    }
};


export const addCarOnTerritory = (time, days, flag, id) => async () => {
    try {
        await api.addCarIntoTerritory(time, days, flag, id);
    } catch (e) {
        console.log('Message error' + e);
    }
};

export const removeCarOnTerritory = (time, flag, id) => async () => {
    try {
        await api.removeCarIntoTerritory(time, flag, id);
    } catch (e) {
        console.log('Message error' + e);
    }
};


