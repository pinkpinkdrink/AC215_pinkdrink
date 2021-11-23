import { BASE_API_URL } from "./Common";

const axios = require('axios');

const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    Predict: async function (formData) {
        return await axios.post(BASE_API_URL + "/predict", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    Text2Audio: function (path) {
        return BASE_API_URL + "/text2audio?path=" + path
    },
    SetLanguage: async function (language) {
        return await axios.post(BASE_API_URL + "/set-language?language=" + language);
    }
}

export default DataService;