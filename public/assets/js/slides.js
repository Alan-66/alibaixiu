$.ajax({
  type: "get",
  url: "/slides",
  success: function(res) {
    // console.log(res);
    var html = template("slidesTpl", { data: res });
    $("#slidesBox").html(html);
  }
});

//图片上传
$("#file").on("change", function() {
  //获取上传的文件
  var file = this.files[0];
  //   console.log(file);
  var formData = new FormData();
  formData.append("slidePic", file);
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      //   console.log(res[0]);
      $("#slidesImage").val(res[0].slidePic);
      $(".thumbnail")
        .prop("src", res[0].slidePic)
        .show();
    }
  });
});

//添加轮播图功能
$("#slidesForm").on("submit", function() {
  var data = $(this).serialize();
  //   console.log(data);
  $.ajax({
    type: "post",
    url: "/slides",
    data: data,
    success: function(res) {
      location.reload();
    }
  });
  return false;
});

//删除功能
$("#slidesBox").on("click", ".del", function() {
  var id = $(this).attr("data-id");
  // console.log(id);
  $.ajax({
    type: "delete",
    url: "/slides/" + id,
    success: function(res) {
      location.reload();
    }
  });
});
