// import $ from 'jquery';

function server(){
    // var Config = require("@config");
    var usedApi='';
    if(localStorage.getItem('Server')=='tn'){
        if( process.env.VUE_APP_MODE=='production' ){
            usedApi= process.env.VUE_APP_API_URL;
            // usedApi= Config.api_url_prod;
        }else if( process.env.VUE_APP_MODE=='local' ){
            usedApi= process.env.VUE_APP_API_URL;
            // usedApi= Config.api_url_local;
        }else{
            // usedApi= Config.api_url_dev;
            usedApi= process.env.VUE_APP_API_URL;
        }
    }else if(localStorage.getItem('Server')=='ci'){
        usedApi= process.env.VUE_APP_API_URL_CI;
    }else{
        usedApi= process.env.VUE_APP_API_URL;
    }
    
    console.log(' API URL: ' + usedApi);
    return usedApi;
    // switch (localStorage.getItem('Server')) {
    //     case 'tn': return process.env.VUE_APP_API_URL_TN;
    //     default: return process.env.VUE_APP_API_URL;
    // }
}

export const ApiConfigs = {
    base_url: server() + '/user',
    business_base_url: server() + '/business',
    /* -------------------------------- */
    // ACCOUNTS
    accounts: {
        login: '/account/auth',
        logout: '/account/logout',
        update: '/account/update',
        verify: '/account/auth/code',
        register: '/account/register'
    },
    // PUSHER
    pusher: {
        auth: '/broadcasting/auth',
    },
    // ACCOUNT
    vendors: {
        getAll: '/vendors',
        getPage: '/vendors?perPage=10&page=',
        getTrending: '/vendors/trending',
        filter: '/vendors/filter?perPage=10&page=',
        filterMap: '/vendors/filter?perPage=1000',
        get: '/vendors/:id',
        getByHashedId: '/vendors/hid/:id?organization=:org',
        getVisited: '/vendors/visited',
        isVip: '/vendors/:id/isVip'
    },
    // HELPERS
    helpers: {
        getAllServices: '/industry/:id/services',
        getAllTypes: '/industry/:id/types',
        getAllTypesByOrganization: '/industry/:id/types/:organization_id',
        getIndustries: '/industry',
        getCountries: '/countries',
        getOrganizations: '/organizations',
        getConfig: '/../config'
    },
    // FEEDBACK
    feedback: {
        get: '/vendors/:id/feedback?pagination=10',
        getPage: '/vendors/:id/feedback?pagination=3&page=',
    },
    // BOOKINGS
    bookings: {
        getAll: '/booking',
        getConfirmed: '/booking',
        getPending: '/booking/requests',
        getArchive: '/booking/archived',
        get: '/booking/:id',
        availability: '/booking/availability',
        create: '/booking/create',
        cancelBooking: '/booking/cancel',
        cancelRequest: '/booking/requests/:id/cancel',
        getPendingByUid: '/booking/uid/:uid'
    },
    // QUEUE
    queue: {
        getConfirmed: '/queue',
        getPending: '/queue/requests',
        getArchive: '/queue/archive',
        getQueueById: '/queue/:id',
        push: '/queue/:id/push',
        getRequestById: '/queue/request/:id',
        cancelRequest: '/queue/requests/:id/cancel',
        getTicketByUId: '/queue/uid/:uid'
    }
};
