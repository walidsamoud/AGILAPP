export function authHeader(guard = 'user') {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    let kiosk = JSON.parse(localStorage.getItem('kiosk'));

    if (user && user.token) {
        return {
            'Authorization': 'Bearer ' + (guard == 'user' ? user.token : kiosk.token),
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Language': localStorage.getItem('Language') || 'fr'
        };
    } else {
        return {
            'Content-Language': localStorage.getItem('Language') || 'fr'
        };
    }
}
