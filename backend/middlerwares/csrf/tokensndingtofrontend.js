const sendcsrftoken = (req,res)=>{
    const token = req.csrfToken();

   return res.status(200).json({
    csrf:token
   })

}

module.exports = {
    sendcsrftoken
}