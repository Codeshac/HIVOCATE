// utils/urlPolyfill.js
import { URL, URLSearchParams } from 'whatwg-url';

// Override the global URL implementation
global.URL = URL;
global.URLSearchParams = URLSearchParams;