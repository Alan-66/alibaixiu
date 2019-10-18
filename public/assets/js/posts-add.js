//获取文章分类选项数据
$.ajax({
  type: "get",
  url: "/categories",
  success: function(res) {
    // console.log(res);
    var html = template("categoryTpl", { data: res });
    $("#category").html(html);
  }
});

$("#feature").on("change", function() {
  //接收上传的文件
  var file = this.files[0];
  //创建formData对象 实现二进制文件上传
  var formData = new FormData();
  //将选择的文件追加到formData对象中
  formData.append("cover", file);
  //发送ajax 上传文件
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    //告诉$.ajax方法不要处理data属性对应的参数
    processData: false,
    //告诉$.ajax方法不要设置参数类型
    contentType: false,
    success: function(res) {
      //   console.log(res);
      $("#hiddenCover").val(res[0].cover);
      $(".thumbnail")
        .prop("src", res[0].cover)
        .show();
    }
  });
});

$("#addForm").on("submit", function() {
  //获取表单提交的数据
  var data = $(this).serialize();
  //发送ajax
  $.ajax({
    type: "post",
    url: "/posts",
    data: data,
    success: function(res) {
      location.href = "/admin/posts.html";
    }
  });
  return false;
});
