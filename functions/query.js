exports.getQuery = (role) => {
	var sql = "";
  if(role === "authority"){
    sql = "select username, password from authority where username=?";
  }else if(role === "student"){
    sql = "select roll_no, password from student where roll_no=?";
  }else if(role === "driver"){
    sql = "select username, password from driver where username=?";
  }else{
    sql = "select admin_id, password from admin where admin_id=?"
  }
  return sql;
};
