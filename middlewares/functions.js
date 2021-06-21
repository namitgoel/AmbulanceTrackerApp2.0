exports.checkPassword = (req,res,next) => {
  if(req.body.password === req.body.confirm_password){
    next();
  }else{
    res.render('studentHome',{message: "passwords do not match"});
  }
}
