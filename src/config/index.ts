import { getEnvironmentValue } from '../utils/getEnvironmentValue';

export const PORT = getEnvironmentValue('PORT', '3000');
export const BASE_URL = getEnvironmentValue('BASE_URL', `http://localhost:${PORT}`);
export const CDN_HOST = getEnvironmentValue('CDN_HOST');
export const NODE_SSL_ENABLED = getEnvironmentValue('NODE_SSL_ENABLED', 'false');

export const PATH_SSL_PRIVATE_KEY = getEnvironmentValue('PATH_SSL_PRIVATE_KEY', 'false');
export const PATH_SSL_CERTIFICATE = getEnvironmentValue('PATH_SSL_CERTIFICATE', 'false');

export const SERVICE_NAME = 'Contacts Node Prototype';

// Template
export const CONTACTS_PAGE = 'contacts';
export const NOT_FOUND = 'page-not-found';
export const ERROR_PAGE = 'error';
export const CONTACT = 'contact';

// Routing paths
export const ROOT_URL = '/';
export const CONTACTS_URL = '/contacts';
export const INFO_URL = '/contacts';
export const CONTACT_URL = '/contact';
export const HEALTHCHECK_URL = '/healthcheck';
export const SERVICE_URL = `${BASE_URL}${CONTACTS_URL}`;

// MISC
export const CREATE = '/create';
export const REMOVE = '/remove';
export const UPDATE = '/update';
export const ID = 'id';
export const PARAM_ID = `/:${ID}`;