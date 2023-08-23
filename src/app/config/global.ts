// export const URL_SERVICIOS = 'http://167.71.101.134:3000';
// export const URL_SERVICIOS = 'https://mburgos.xyz';
// export const URL_SERVICIOS = 'http://192.168.100.95:3000';
export const URL_SERVICIOS = window.location.origin.indexOf('localhost') != -1 ? 'http://localhost:3100' : window.location.origin ;