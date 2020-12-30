import axios from "axios";
import Vue from 'vue'

const flaskInstance = createInstance("http://127.0.0.1:5001");
const vueInstance = createInstance("http://localhost:8678");
// const productionInstance = createInstance("http://localhost:3000"); // will change later

function createInstance(baseURL){
    return axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.token}`
        }
    });
}

export default {
    install () {
        Vue.prototype.$flask = flaskInstance
        Vue.prototype.$public = vueInstance
    }
}; // Check debug/build mode