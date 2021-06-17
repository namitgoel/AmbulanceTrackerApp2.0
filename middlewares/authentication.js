exports.isLoggedIn= (req, res, next)=>{
   if(req.cookies.role === undefined && req.cookies.username === undefined){
   	res.redirect('/')
   }else{
   	next()
   }
}