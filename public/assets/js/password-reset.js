$("#modifyForm").on("submit", function() {
  var formData = $(this).serialize();
  $.ajax({
    type: "put",
    url: " /users/password",
    data: formData,
    success: function() {
        //跳转到登入页面
      location.href = "login.html";
    }
  });
  //阻止表单提交的默认行为
  return false;
});
