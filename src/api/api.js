import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://80.249.84.47:11000/api/',
});

export const api = {
    viewAllCars() {
        return instance.get("cars")
    },
    viewAllTenants() {
        return instance.get("tenants")
    },
    viewAllBrands() {
        return instance.get("cars/brands")
    },
    viewAllModels(idModel) {
        return instance.get(`cars/brands/${idModel}`)
    },
    addNewCar(number, brand, model, tenant) {
        return instance.post('cars/add', {
            "car_number": number,
            "car_brand": brand,
            "car_model": model,
            "car_tenant": tenant
        })
    },
    viewCarOnTerritory() {
        return instance.get('stat/here')
    },
    addCarIntoTerritory(time, days, flag, id) {

        return instance.post('stat/add', {"time_in": time, "days": days, "last_flag": flag, "car": id})
    },
    removeCarIntoTerritory(time, flag, id) {
        debugger
        return instance.put('stat/add', {"time_out": time, "last_flag": flag, "car": id})
    },

};
