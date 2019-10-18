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
