import { authHeader, ApiConfigs } from '../_helpers';

export const helpersService = {
    getAllServices,
    getIndustries,
    getCountries,
    getOrganizations,
    getAllTypes,
    getAllTypesByOrganization,
    getConfig
};


function getAllServices(industry) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(),'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getAllServices.replace(':id',industry)}`, requestOptions).then(handleResponse);
}


function getIndustries() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getIndustries}`, requestOptions).then(handleResponse);
}


function getCountries() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getCountries}`, requestOptions).then(handleResponse);
}


function getOrganizations() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getOrganizations}`, requestOptions).then(handleResponse);
}

function getAllTypes(industry) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getAllTypes.replace(':id',industry)}`, requestOptions).then(handleResponse);
}

function getAllTypesByOrganization(industry, organization_id) {
    organization_id = (typeof organization_id !== 'undefined') ?  organization_id : '0';
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getAllTypesByOrganization.replace(':id',industry).replace(':organization_id',organization_id)}`, requestOptions).then(handleResponse);
}

function getConfig() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.helpers.getConfig}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}