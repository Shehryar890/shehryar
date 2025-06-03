


             function metadata(req, res , next){


                const fetchsite = req.headers['sec-fetch-site']
                const fetchmode = req.headers['sec-fetch-mode'];
                const fetchdest = req.headers['sec-fetch-dest']

                if(process.env.Dev == "production"){
if(fetchsite  !== "samesite" && fetchsite!=="sameorigin" ){
    return res.status(403).json({
        error:"blocked by fetchmetdata protection"
    })
}
                }


                next();
             }



             module.exports = {metadata}