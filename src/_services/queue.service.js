import { authHeader, ApiConfigs } from '../_helpers';

export const queueService = {
    getConfirmed,
    getPending,
    getArchive,
    getQueueById,
    createTicket,
    getRequestById,
    cancelRequest,
    getTicketByUId
};

function getTicketByUId(uid){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.getTicketByUId.replace(':uid', uid)}`, requestOptions).then(handleResponse);
}

function cancelRequest(id){
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.cancelRequest.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function getRequestById(id){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.getRequestById.replace(':id', id)}`, requestOptions).then(handleResponse);
}

function getConfirmed() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.getConfirmed}`, requestOptions).then(handleResponse);
}

function getPending() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.getPending}`, requestOptions).then(handleResponse);
}

function getArchive() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.getArchive}`, requestOptions).then(handleResponse);
}

function getQueueById(id) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.getQueueById.replace(':id', id)}`, requestOptions).then(handleResponse);
}


function createTicket(id, payload) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    return fetch(`${ApiConfigs.base_url+ApiConfigs.queue.push.replace(':id', id)}`, requestOptions).then(handleResponse);
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
