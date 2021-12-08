import { BASE_API_URL } from "./Common";

const axios = require('axios');

const DataService = {
    Init: function () {
        // Any application initialization logic comes here
    },
    Predict: async function (formData, language) {
        return await axios.post(BASE_API_URL + "/predict?language=" + language, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    Text2Audio: function (path) {
        return BASE_API_URL + "/text2audio?path=" + path
    }
}

export default DataService;