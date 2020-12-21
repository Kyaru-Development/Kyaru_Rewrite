const axios = require('axios'),
    base_url = 'https://miss-api.ml/api/v2';
class MissAPI {
    constructor(key) {
        this.token = key;
        if (!this.token) {
            console.error("❌ | Токен для АПИ не указан.");
            return;
        };
    };
    get(name) {
        if (!name) {
            return false;
        };
        let res = await axios(`${base_url}/${name}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.token,
            },
        });
        return res.data;
    };
};
module.exports = MissAPI;