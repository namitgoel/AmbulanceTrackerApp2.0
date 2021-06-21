var result = null;
var fileInput = document.getElementById("customFile"),

    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            result = reader.result.split("\n");

            var result2 = [];
            var i;
            for(i=1;i<result.length;i++){
                result2[i] = result[i].split(",");
            }
            result = result2;
           console.log(result);
        };


        reader.readAsBinaryString(fileInput.files[0]);
    };


fileInput.addEventListener('change', readFile);

function submitdata(){
    $.ajax({
      url: "/authority/registercsv",
      type: "POST",
      data: {'data': result},
      success: function (data) {
        alert("Registered Successfully")
      }
    });
  }
$("#csvbtn").click(submitdata);
 