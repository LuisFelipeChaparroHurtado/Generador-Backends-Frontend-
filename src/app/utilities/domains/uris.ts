// Base URL for the API
export const API_URL = 'http://localhost:3124/';

// Public Services
export const API_LOGIN = API_URL + 'api/public/user'; // Endpoint for user login
export const API_OBTENER_UN_USUARIO = API_URL + 'api/private/user'; // Endpoint to retrieve user details
export const API_EDITAR_USUARIO = API_URL + 'api/private/user'; // Endpoint to edit user details

// Private Services
export const API_LIST_USERS = API_URL + 'api/private/admin'; // Endpoint to list users (admin access)
export const API_CREATE_USERS = API_URL + 'api/private/admin'; // Endpoint to create users (admin access)
export const API_SEARCH_USERS = API_URL + 'api/private/admin'; // Endpoint to search for users (admin access)
export const API_UPDATE_USER = API_URL + 'api/private/admin'; // Endpoint to update user details (admin access)
export const API_DELETE_USER = API_URL + 'api/private/admin'; // Endpoint to delete users (admin access)
export const API_CONECTIONDB = API_URL + 'api/private/connection'; // Endpoint for database connection (private access)
export const API_GENERATEMODELS = API_URL + 'api/private/models'; // Endpoint to generate models (private access)
export const API_GENERATESERVER = API_URL + 'api/private/server'; // Endpoint to generate server (private access)
export const API_GENERATECONNECTIONDB = API_URL + 'api/private/connectiondb'; // Endpoint to generate database connection (private access)
export const API_GENERATEVARDATABASE = API_URL + 'api/private/vardatabase'; // Endpoint to generate database variables (private access)
export const API_GENERATEROUTES = API_URL + 'api/private/routes'; // Endpoint to generate routes (private access)
export const API_GENERATECONTROLLERS = API_URL + 'api/private/controller'; // Endpoint to generate controllers (private access)
export const API_GENERATEDAO = API_URL + 'api/private/dao'; // Endpoint to generate data access objects (private access)
export const API_GENERATEINDEX = API_URL + 'api/private/index'; // Endpoint to generate index (private access)
export const API_GENERATEREADME = API_URL + 'api/private/readme'; // Endpoint to generate readme (private access)
export const API_GENERATEPACKAGE = API_URL + 'api/private/package'; // Endpoint to generate package (private access)
export const API_GENERATEPACKAGELOCK = API_URL + 'api/private/package-lock'; // Endpoint to generate package-lock (private access)
export const API_GENERATETSCONFIG = API_URL + 'api/private/tsconfig'; // Endpoint to generate TypeScript configuration (private access)
