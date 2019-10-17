//渲染分类列表
$.ajax({
  type: "get",
  url: "/categories",
  success: function(res) {
    var html = template("categoryTpl", { data: res });
    $("#categoryBox").html(html);
  }
});

//添加分类功能
$("#addCategory").on("submit", function() {
  $.ajax({
    type: "post",
    url: "/categories",
    data: $(this).serialize(),
    success: function(res) {
      location.reload();
    }
  });
});

//添加编辑功能
$("#categoryBox").on("click", ".edit", function() {
  var id = $(this).attr("data-id");
  $.ajax({
    type: "get",
    url: "/categories/" + id,
    success: function(res) {
      var html = template("modifyTpl", res);
      $("#modifyBox").html(html);
    }
  });
});

$("#modifyBox").on("submit", "#modifyCategory", function() {
  var id = $(this).attr("data-id");
  $.ajax({
    type: "put",
    url: "/categories/" + id,
    data: $(this).serialize(),
    success: function() {
      location.reload();
    }
  });
  return false;
});

//添加删除分类功能
$("#categoryBox").on("click", ".del", function() {
  if (confirm("确认删除该项?")) {
    var id = $(this).attr("data-id");
    $.ajax({
      type: "delete",
      url: "/categories/" + id,
      success: function(res) {
        location.reload();
      }
    });
  }
});

//批量删除功能
$("#selectAll").on("change", function() {
  var status = $(this).prop("checked");
  $('#categoryBox input[type = "checkbox"]').prop("checked", status);
  if (status) {
    $("#deleteAll").css("visibility", "visible");
  } else {
    $("#deleteAll").css("visibility", "hidden");
  }
});

$("#categoryBox").on("change", 'input[type="checkbox"]', function() {
  var checkList = $('#categoryBox input[type="checkbox"]');
  if (checkList.length == checkList.filter(":checked").length) {
    $("#selectAll").prop("checked", true);
  } else {
    $("#selectAll").prop("checked", false);
  }

  if (checkList.filter(":checked").length > 0) {
    $("#deleteAll").css("visibility", "visible");
  } else {
    $("#deleteAll").css("visibility", "hidden");
  }
});

$("#deleteAll").on("click", function() {
  if (confirm("确认删除选中项?")) {
    var ids = [];
    var checkList = $('#categoryBox input[type="checkbox"]:checked');
    checkList.each(function(index, item) {
      ids.push($(item).attr("data-id"));
    });
    //发送ajax
    $.ajax({
      type: "delete",
      url: "/categories/" + ids.join("-"),
      success: function(res) {
        location.reload();
      }
    });
  }
});
