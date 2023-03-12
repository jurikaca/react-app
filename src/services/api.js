const  BASE_URL = 'http://localhost/react-api/';

const api = {
    get: (URI) => {
        return fetch(BASE_URL + URI)
            .then((res) => res.json())
        ;
    },
    post: (URI, body) => {
        return fetch(BASE_URL + URI, body)
            .then((res) => res.json())
        ;
    },
};

export default api;