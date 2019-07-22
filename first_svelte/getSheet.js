const axios = require("axios");

axios({
    method: "get",
    url: "https://stackoverflow.com/questions/tagged/svelte",
    headers: {
        "Content-type": "text/html"
    }
}).then(res => {
    // let htmlParser = new DOMParser(); // não está definido o DOMParser................, secalhar só se este .js estivesse num html
    // Pois, não há document nem windoww aqui .....
    let headers = res.headers   

    let rawHtml = res.data

    console.log(rawHtml, "HTML.");
    console.log(headers, "headers.") 
    // let html = htmlParser.parseFromString(rawHtml, "text/html")


})