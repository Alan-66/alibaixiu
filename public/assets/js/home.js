$.ajax({
  type: "get",
  url: "/slides",
  success: function(res) {
    // console.log(res);
    var html = template("slideTpl", { data: res });
    $("#slideBox").html(html);
    var swiper = new Swiper(".swiper-container", {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
});

//热门推荐渲染
$.ajax({
  type: "get",
  url: "/posts/recommend",
  success: function(res) {
    // console.log(res);
    var html = template("recommendTpl", { data: res });
    $("#recommendBox").html(html);
  }
});

//格式化时间函数
function dateformat(date) {
  date = new Date(date);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}
//获取最新推荐
$.ajax({
  type: "get",
  url: "/posts/lasted",
  success: function(res) {
    //   console.log(res);
      
    var html = template("latestTpl", { data: res });
    $("#latestBox").html(html);
  }
});
