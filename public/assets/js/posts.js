//渲染文章列表数据
$.ajax({
  type: "get",
  url: "/posts",
  data: "",
  success: function(res) {
    var html = template("postsTpl", res);
    $("#postsBox").html(html);
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
