//渲染用户列表
$.ajax({
  type: "get",
  url: "/users",
  success: function(res) {
    var html = template("userTpl", { data: res });
    $("#userBox").html(html);
  }
});

//添加用户
$("#userForm").on("submit", function() {
  //获取表单提交的内容 并自动格式化成参数格式
  var formData = $(this).serialize();
  //想服务器端发送添加用户请求
  $.ajax({
    type: "post",
    url: "/users",
    data: formData,
    success: function(res) {
      //刷新页面
      location.reload();
    },
    error: function() {
      alert("提交失败");
    }
  });

  return false;
});

//上传用户头像
$("#modifyBox").on("change", "#avatar", function() {
  var formData = new FormData();
  formData.append("avatar", this.files[0]);
  //发送ajax
  $.ajax({
    type: "post",
    url: "/upload",
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      //   console.log(res);
      //头像预览功能
      $("#preview").attr("src", res[0].avatar);
      //为了上传表单时 同时上传文件的地址
      $("#hiddenAvatar").val(res[0].avatar);
    }
  });
});

//事件委托的方式 渲染用户信息修改页面
$("#userBox").on("click", ".edit", function() {
  //获取对应数据的id值
  var id = $(this).attr("data-id");
  //发送ajax
  $.ajax({
    type: "get",
    url: "/users/" + id,
    success: function(res) {
      //console.log(res);
      var html = template("modifyTpl", res);
      $("#modifyBox").html(html);
    }
  });
});

//事件委托 添加用户修改功能
$("#modifyBox").on("submit", "#modifyForm", function() {
  //jq中自动手机表单数据
  var formData = $(this).serialize();
  //获取数据对应的的id
  var id = $(this).attr("data-id");
  $.ajax({
    type: "put",
    url: "/users/" + id,
    data: formData,
    success: function() {
      location.reload();
    }
  });
  return false;
});

//添加删除用户功能
$("#userBox").on("click", ".delete", function() {
  if (confirm("确认删除该项?")) {
    var id = $(this).attr("data-id");
    $.ajax({
      type: "delete",
      url: "/users/" + id,
      success: function(res) {
        //刷新页面 重新渲染用户列表
        location.reload();
      }
    });
  }
});

//全选功能
// $("#selectAll").on("change", function() {
//   //获取全选按钮当前的状态
//   var status = $(this).prop("checked");
//   //让所有项目的状态和全选按钮保持一致
//   $(".userStatus").prop("checked", status);
//   if (status) {
//     $(".deleteMany").show();
//   } else {
//     $(".deleteMany").hide();
//   }
// });

//当用户界面的复选框发生改变 全选按钮也随之改变
// $("#userBox").on("change", ".userStatus", function() {
//   var selects = $("#userBox input[type='checkbox']");
//   // .find("input");
//   if (selects.length == selects.filter(":checked").length) {
//     $("#selectAll").prop("checked", true);
//   } else {
//     $("#selectAll").prop("checked", false);
//   }
//   //显示隐藏全删按钮
//   if (selects.filter(":checked").length > 0) {
//     $(".deleteMany").show();
//   } else {
//     $(".deleteMany").hide();
//   }
// });

//批量删除功能实现
$("#selectAll").on("change", function() {
  var bool = $(this).prop("checked");
  //找到tbody下面所有的checkbox 添加checked属性
  var checkList = $('#userBox input[type="checkbox"]');
  checkList.prop("checked", bool);
  if (bool) {
    $(".deleteMany").css("visibility", "visible");
  } else {
    $(".deleteMany").css("visibility", "hidden");
  }
});

$("#userBox").on("change", 'input[type="checkbox"]', function() {
  //只有当tbody中多有的checkbox的数量和打钩的checkbox数量相同时 全选按钮选中
  var checkList = $('#userBox input[type = "checkbox"]');
  if (checkList.length == checkList.filter(":checked").length) {
    $("#selectAll").prop("checked", true);
  } else {
    $("#selectAll").prop("checked", false);
  }
  //显示隐藏批量删除按钮
  if (checkList.filter(":checked").length > 0) {
    $(".deleteMany").css("visibility", "visible");
  } else {
    $(".deleteMany").css("visibility", "hidden");
  }
});

//批量删除功能
$(".deleteMany").on("click", function() {
  if (confirm("确认删除选中项?")) {
    //字符串的方式
    var checkList = $('#userBox input[type="checkbox"]:checked');
    var str = "";
    checkList.each(function(index, item) {
      str += $(item).attr("data-id") + "-";
    });
    str = str.substr(0, str.length - 1);

    //数组转换的方式
    // var ids = [];
    // //筛选出已被选中的元素
    // var userChecked = $(".userStatus").filter(":checked");
    // //遍历数组 将元素的自定义属性data-id 添加进ids数组中
    // userChecked.each(function(index, item) {
    //   ids.push($(item).attr("data-id"));
    // });
    //发送ajax

    $.ajax({
      type: "delete",
      // url: "/users/" + ids.join("-"),
      url: "/users/" + str,
      success: function() {
        location.reload();
      }
    });
  }
});
