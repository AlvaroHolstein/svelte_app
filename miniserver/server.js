const express = require("express");
const axios = require("axios");
const cors = require("cors")

const app = express()

const port = 5100;
const host = "192.168.1.83"

app.use(cors())

app.get("/info", (req, res) => {
    res.send("<h2>API for svelte app ('read new tagged posts')</h2>")
})
app.get("/", (req, res) => {
    console.log(req.query.tagname, "introu")
    axios({
        method: "get",
        url: `https://stackoverflow.com/questions/tagged/${req.query.tagname}`
    }).then(re => {  
        // let validTags = re.data.filter(tag =<)

        /** Enviar os hearders e o body separados */
        let headTag = re.data.substring(re.data.indexOf("<head"), re.data.indexOf("</head>") + 7);
        let bodyTag = re.data.substring(re.data.indexOf("<body"), re.data.indexOf("</body>") + 7)
        console.log(headTag)
        res.json({msg: "Nice!!!!", success: true, html: {headTag: headTag, bodyTag: bodyTag}})
    }).catch(err => {
        console.log(err);
        res.json({error: err, msg:"deu merda!!!!"})
    })
})

app.listen(port, host, () => {
    console.log("A correr....");
})