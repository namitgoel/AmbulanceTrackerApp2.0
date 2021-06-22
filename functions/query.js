exports.getQuery = (role) => {
	var sql = "";
  if(role === "authority"){
    sql = "select faculty_id, password from faculty where faculty_id=?";
  }else if(role === "student"){
    sql = "select roll_no, password from student where roll_no=?";
  }else if(role === "driver"){
    sql = "select driver_id, password from driver where driver_id=?";
  }else{
    sql = "select admin_id, password from admin where admin_id=?"
  }
  return sql;
};
