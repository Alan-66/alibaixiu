$.ajax({
  type: "get",
  url: "/comments",
  success: function(res) {
    var html = template("commentsTpl", res);
    $("#commentsList").html(html);
    var page = template("pageTpl", res);
    $("#pageList").html(page);
  }
});
//时间格式化函数
function dateformat(date) {
  date = new Date(date);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

//换页函数
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/comments",
    data: {
      page
    },
    success: function(res) {
      var html = template("commentsTpl", res);
      $("#commentsList").html(html);
      var page = template("pageTpl", res);
      $("#pageList").html(page);
    }
  });
}

//更改评论的状态
$("#commentsList").on("click", ".status", function() {
  var id = $(this).attr("data-id");
  var status = $(this).attr("data-state");

  $.ajax({
    type: "put",
    url: "/comments/" + id,
    data: {
      state: status == 1 ? 0 : 1
    },
    success: function(res) {
      location.reload();
    }
  });
});

//评论删除功能
$("#commentsList").on("click", ".del", function() {
  var id = $(this).attr("data-id");

  $.ajax({
    type: "delete",
    url: "/comments/" + id,
    success: function(res) {
      location.reload();
    }
  });
});
