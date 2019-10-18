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

$("#settingsForm").on("submit", function() {
  $.ajax({
    type: "post",
    url: "/settings",
    data: $(this).serialize(),
    success: function(res) {
      location.reload();
      //   console.log(res);
    }
  });

  return false;
});

//向服务器索要数据渲染页面
$.ajax({
  type: "get",
  url: "/settings",
  success: function(res) {
    console.log(res);
    if (res) {
      // $("#logo").val(res.logo);
      $("#preview").prop("src", res.logo);
      $("input[name='title']").val(res.title);
      $("input[name='comment']").prop("checked", res.comment);
      $("input[name='review']").prop("checked", res.review);
    }
  }
});
