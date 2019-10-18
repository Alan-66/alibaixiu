$("#logo").on("change", function() {
  //获取上传的文件
  var file = this.files[0];
  //console.log(file);
  var formData = new FormData();
  formData.append("logo", file);
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      $("#hiddenLogo").val(res[0].logo);
      $("#preview")
        .prop("src", res[0].logo)
        .show();
    }
  });
});
