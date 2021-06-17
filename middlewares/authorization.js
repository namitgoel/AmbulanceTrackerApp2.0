exports.isAuthority =(req, res, next)=>{
    if(req.cookies.role === "authority"){
        next()
    }else{
        res.redirect('/')
    }
}