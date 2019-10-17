$("#logout").on("click", function() {
  var isConfirm = confirm("是否退出?");
  if (isConfirm) {
    $.ajax({
      type: "post",
      url: "/logout",
      success: function() {
        location.href = "login.html";
      }
    });
  }
});
