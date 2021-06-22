exports.isAuthority =(req, res, next)=>{
    if(req.cookies.role === "authority"){
        next()
    }else{
        res.redirect('/')
    }
}

exports.isDriver =(req, res, next)=>{
    if(req.cookies.role === "driver"){
        next()
    }else{
        res.redirect('/')
    }
}

exports.isStudent =(req, res, next)=>{
    if(req.cookies.role === "student"){
        next()
    }else{
        res.redirect('/')
    }
}