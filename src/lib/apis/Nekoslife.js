const axios = require('axios'),
base_url = 'https://nekos.life/api';
class Nekoslife {
    constructor(){
    };
    get(name) {
    if(!name){
        return false;
    };
    let res = await axios(`${base_url}/${name}`)
    return res.json();
    };
};
module.exports = Nekoslife;