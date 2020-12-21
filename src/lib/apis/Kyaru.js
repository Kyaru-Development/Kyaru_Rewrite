const axios = require('axios'),
    base_url = 'https://api.kyaru-dev.ml/v2';
class KyaruAPI {
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
module.exports = KyaruAPI;