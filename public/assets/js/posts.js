//渲染文章列表数据
$.ajax({
  type: "get",
  url: "/posts",
  data: "",
  success: function(res) {
    var html = template("postsTpl", res);
    $("#postsBox").html(html);
    var page = template("pageTpl", res);
    $("#pageList").html(page);
  }
});

//格式化时间函数
function dateformat(date) {
  date = new Date(date);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}
//导入变量
// template.defaults.imports.dateformat = dateformat;

//实现文章分页功能
//页码点击函数
function changePage(page) {
  $.ajax({
    type: "get",
    url: "/posts",
    data: {
      page
    },
    success: function(res) {
      var html = template("postsTpl", res);
      $("#postsBox").html(html);
      var page = template("pageTpl", res);
      $("#pageList").html(page);
    }
  });
}

//实现文章列表筛选功能
$.ajax({
  type: "get",
  url: "/categories",
  success: function(res) {
    // console.log(res);
    var html = template("categoryTpl", { data: res });
    $("#categoryBox").html(html);
  }
});

$("#filterForm").on("submit", function() {
  //获取筛选条件数据
  var formData = $(this).serialize();
  //发送ajax
  $.ajax({
    type: "get",
    url: "/posts",
    data: formData,
    success: function(res) {
      var html = template("postsTpl", res);
      $("#postsBox").html(html);
      var page = template("pageTpl", res);
      $("#pageList").html(page);
    }
  });
  return false;
});
