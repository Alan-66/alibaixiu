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

$.ajax({
  type: "get",
  url: "/users/" + userId,
  success: function(res) {
    // console.log(res);
    $(".profile .avatar").prop("src", res.avatar);
    $(".profile .name").html(res.nickName);
  }
});
