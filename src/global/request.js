const axios = require("axios")


module.exports = async (url, method, state) => {
    await axios.get(url).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        
    })
}