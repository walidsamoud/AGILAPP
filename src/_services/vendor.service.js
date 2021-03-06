import { authHeader, ApiConfigs } from '../_helpers';

export const vendorsService = {
    getAll,
    getPage,
    getTrending,
    get,
    getByHashedId,
    filter,
    filterMap,
    getVisited,
    isVip
};


function getAll(data = {}) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.getAll}`, requestOptions).then(handleResponse);
}


function getPage(page) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.getPage+page}`, requestOptions).then(handleResponse);
}


function getTrending(location,organization, order_by,order_type, show, radius) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({"lat":location['lat'],"lng":location['lng'],"organization":organization,"order_by": order_by,"order_type": order_type,"show": show,"radius": radius})
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.getTrending}`, requestOptions).then(handleResponse);
}


function filter(data, page) {
    if(data.rating)
    {   
        let rating_array=[];
        if(data.rating.length==1)
            rating_array.push(data.rating);
        else
            rating_array= data.rating;
    
        data.rating=rating_array;

    }
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.filter+page}`, requestOptions).then(handleResponse);
}

function filterMap(data, organization) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({"lat":data['lat'],"lng":data['lng'],"organization":organization})
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.filterMap}`, requestOptions).then(handleResponse);
}


function get(id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.get.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function getByHashedId(id, organization="") {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.getByHashedId.replace(':id', id).replace(':org', organization)}`, requestOptions).then(handleResponse);
}

function getVisited() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.getVisited}`, requestOptions).then(handleResponse);
}

function isVip(id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.vendors.isVip.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
