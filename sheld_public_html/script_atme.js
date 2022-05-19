var j = 1;
var n = 0;
var n2 = 0;
var n3 = 0;
var slide_train = 0;
var count = 1;
var stroy_otr = [];
var betwen_phase = [];
var page = 0;
$(document).on("ready", loadpage); // Ждём загрузки страницы

$(function () {
  var wrapper = $(".file_upload"),
    inp = wrapper.find("input[type='file']"),
    btn = wrapper.find("button"),
    lbl = wrapper.find("div");

  btn.focus(function () {
    inp.focus();
  });
  // Crutches for the :focus style:
  inp
    .focus(function () {
      wrapper.addClass("focus");
    })
    .blur(function () {
      wrapper.removeClass("focus");
    });

  var file_api =
    window.File && window.FileReader && window.FileList && window.Blob
      ? true
      : false;

  inp
    .change(function () {
      var file_name;
      if (file_api && inp[0].files[0]) file_name = inp[0].files[0].name;
      else file_name = inp.val().replace("C:\\fakepath\\", "");

      if (!file_name.length) return;

      if (lbl.is(":visible")) {
        lbl.text(file_name);
        btn.text("Выбрать");
      } else btn.text(file_name);
    })
    .change();
});
$(window).resize(function () {
  $(".file_upload input").triggerHandler("change");
});

function add() {
  // Number of inputs to create
  var number = document.getElementById("member").value;
  // Container <div> where dynamic content will be placed
  var container = document.getElementById("container");
  // Clear previous contents of the container
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  for (i = 0; i < number; i++) {
    // Append a node with a random text
    container.appendChild(document.createTextNode("Member " + (i + 1)));
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "text";
    input.name = "member" + i;
    container.appendChild(input);
    // Append a line break
    container.appendChild(document.createElement("br"));
  }
}

function data2blob(data, isBase64) {
  var chars = "";
  if (isBase64) chars = atob(data);
  else chars = data;
  var bytes = new Array(chars.length);
  for (var i = 0; i < chars.length; i++) bytes[i] = chars.charCodeAt(i);
  var blob = new Blob([new Uint8Array(bytes)]);
  return blob;
}

function getJson(form) {
  var result = {};
  form.find("input, select").each(function (index, element) {
    var $element = $(element);
    var name = $element.attr("name");
    if (!name) return true;

    if ($element.is("input[type='checkbox']")) {
      result[name] = $element.prop("checked");
    } else if ($element.is("input[type='radio']")) {
      if (!result[name]) {
        result[name] = [];
      }
      result[name].push($element.prop("checked"));
    } else if ($element.is("input[type='button']")) {
      //если кнопка то не надо ей состояние вызвращать
      result[name] = "";
    } else if (!$element.is("input[name='my_file_name']")) {
      result[name] = $element.val();
    }
  });
  return JSON.stringify(result);
}

function mapJson(form, data) {
  for (var name in data) {
    var $element = form.find(
      'input[name="' + name + '"],select[name="' + name + '"]'
    );
    if ($element.is("input[type='checkbox']")) {
      $element.prop("checked", data[name] || false);
    } else if ($element.is("input[type='radio']")) {
      $element.each(function (index, value) {
        $(value).prop("checked", data[name][index] || false);
      });
    } else if ($element.is("input[type='text']")) {
      $element.val(data[name]);
    } else if (!$element.is("input[type='button']")) {
      $element.val(data[name]);
    }
    if ($element.is("input[name='sp_kol_dlin']")) {
      dinamic_part(); //вызывай функцию, чтобы динамичеки создать поля
    }
    if ($element.is("input[name='kod_unvis']")) {
      var lll = $("#kod_unvis").val();
      lll = lll.replace(/[,]/g, "");
      $("#kod_d").val(lll);
    }
    if ($element.is("input[name='my_file_name']")) {
      $element.val("");
    }
    full_cicle_trans_l8();
    sposobi();
  }
  j = $("input[name=sp_kol]").val() * 1;
  j = j - 1;

  // hideshow();//что это?
  n = document.getElementById("geometry").options.selectedIndex;
  blokpost();
  full_cicle_trans_l8();
}

function showValues() {
  $("#results").text(getJson($("form")));
}

function save() {
  var my_file_name = $("#my_file_name").val();
  if (my_file_name != 0) {
    saveAs(data2blob(getJson($("form"))), my_file_name + ".txt");
  } else {
    saveAs(data2blob(getJson($("form"))), "no_name.txt");
  }
}

function data2blob(data, isBase64) {
  var chars = "";
  if (isBase64) chars = atob(data);
  else chars = data;
  var bytes = new Array(chars.length);
  for (var i = 0; i < chars.length; i++) bytes[i] = chars.charCodeAt(i);
  var blob = new Blob([new Uint8Array(bytes)]);
  return blob;
}

function loadFile(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.addEventListener("load", function () {
    // document.getElementById('file').innerText = this.result;

    //reader.onload = function () {
    var data = JSON.parse(reader.result);
    mapJson($("form"), data);
    showValues();
    //};
  });
  reader.readAsText(file, "UTF-8");
}

var logic1 = false;
//

//
function onfocus() {
  // установка цвета границ поля (всех с классом lala)
  /* fs1=document.getElementsByClassName('lala').length;
             for (var i = 0; i< fs1; i++) {
                document.getElementsByClassName('lala')[i].style.borderColor = "green";
             }*/
  logic1 = true;
}

function onblur() {
  logic1 = false;
}

function loadpage() {
  $("#add").on("click", add);
  $("#save").on("click", save);

  $("#fileToLoad").on("change", loadFile);

  $(".lala").on("focus", onfocus);
  $(".lala").on("blur", onblur);

  $("#prev").on("click", function () {
    //$('#div_10').hide(); //все остальные страницы скрываем
    //$('#div_11').hide();
    $("#div_12").hide();
    if (page > 0) {
      page--;
      $("#div_" + page).show();
      $("#div_" + (page + 1)).hide();
    }
  });
  $("#next").on("click", function () {
    //$('#div_10').hide(); //все остальные страницы скрываем
    //$('#div_11').hide();
    $("#div_12").hide();
    $("#div_0").hide();
    if (page < 11) {
      page++;
      $("#div_" + page).show();
      $("#div_" + (page - 1)).hide();
    }
  });
  // Функция реагирует на клавиши со стрелками
  $(document).keydown(function (e) {
    if (e.keyCode == 37 && logic1 == false) {
      //$('#div_10').hide(); //все остальные страницы скрываем
      //$('#div_11').hide();
      $("#div_12").hide();

      if (page > 0) {
        page--;
        $("#div_" + page).show();
        $("#div_" + (page + 1)).hide();
      }
    } else if (e.keyCode == 39 && logic1 == false) {
      //$('#div_10').hide(); //все остальные страницы скрываем
      //$('#div_11').hide();
      $("#div_12").hide();
      $("#div_0").hide();
      if (page < 11) {
        page++;
        $("#div_" + page).show();
        $("#div_" + (page - 1)).hide();
      }
    }
  });

  $("#vibor").on("click", vibor_file);
  $("#fileToLoad").on("change", function () {
    var a = $("#fileToLoad").val().replace("C:\\fakepath\\", "");

    $("#name_to_file").val(a);
    if (a == "") {
      $("#name_to_file").val("");
    }
  });
  $("input[type='checkbox'], input[type='radio'], input[type='text']").on(
    "click",
    showValues
  );
  $("select").on("change", showValues);

  showValues();

  sposobi();
  blokpost();
  blokpost2();
  close_pile_list2();
  full_cicle_trans_l8();

  $("#link_3").on("click", close_pile_list2);

  $(".selector").on("change", blokpost);
  $(".haracteri").on("change", blokpost2);
  $(".sposob_all1").on("change", sposobi);

  $(".sposob_all1").on("change", close_pile_list2);
  $("#sp_keep1").on("change", close_pile_list_k1);
  $("#sp_keep2").on("change", close_pile_list_k2);
  $("#sp_keep3").on("change", close_pile_list_k3);
  $("#sp_keep4").on("change", close_pile_list_k4);

  $("#ne_trans").on("change", full_cicle_trans_l8);

  $(".neitral").on("change", close_pile_list3);
  $(".sp_keep_all").on("change", close_pile_list2);
  $(".rassta").on("change", close_pile_list2);

  $("input[name=send]").on("click", mathpath);
  $("input[name=send2]").on("click", mathpath_l2);

  $("#clear_all").on("click", clearTexts);
  $(".calc_all").on("click", mathpath);
  $(".calc_all").on("click", mathpath_l2);

  $("#m_default").on("click", my_default);

  $("input[name=sp_kol]").hide();

  $("input[name=sp_kol_dlin]").on("change", dinamic_part);

  $("#clear_all").on("click", dinamic_part);
  $("#clear_all").on("click", sposobi);
  $("#clear_all").on("change", full_cicle_trans_l8);

  $("#kod_d").on("change", function () {
    $("#kod_unvis").val($("#kod_d").val());
  });

  $(".calc_all").on("click", decoder);
  //$('.before').on("change", change_with_from_before);
  //Нажатие кнопки расчет
  $(".calc_all").on("click", all_math_operation);
  $("#dbl_norm_reg").on("change", all_math_operation);
  $("#single_reg").on("change", all_math_operation);
  $("#single_k").on("change", all_math_operation);
  $("#id_reg").on("change", all_math_operation);
  $("#id_n").on("change", all_math_operation);
  $("#neid_reg").on("change", all_math_operation);
  $("#neid_select").on("change", all_math_operation);
  $("#param_ek_ground").on("change", all_math_operation);
  $("input[name=send3]").on("click", all_math_operation);
  $("#ne_trans_select").on("click", all_math_operation);
  $("#but3").on("click", mathpath_l2);
  $("#but3").on("click", all_math_operation);

  $("#clear_div1").on("click", clear_div1_);
  $("#clear_div2").on("click", clear_div2_);
  $("#clear_div3").on("click", clear_div3_);

  $("#ativated").on("click", activ_my_prog);

  //var in_grunt = $("input[name=ud_grunt1]").val() * 1;
  //$("input[name=ud_grunt2]").val(in_grunt); // записываем результат
  var in_fg = $("input[name=Fg1]").val() * 1;
  $("input[name=Fg2]").val(in_fg); // записываем результат
  //var in_d_glub1 = $("input[name=d_glub1]").val() * 1;
  //$("input[name=d_glub2]").val(in_d_glub1); // записываем результат

  $("input[name=Fg1]").on("change", function () {
    in_fg = $("input[name=Fg1]").val() * 1;
    $("input[name=Fg2]").val(in_fg);
  });
  //$("input[name=ud_grunt1]").on("change", function () {
  //    in_grunt = $("input[name=ud_grunt1]").val() * 1;
  //    $("input[name=ud_grunt2]").val(in_grunt);
  //});
  //$("input[name=d_glub1]").on("change", function () {
  //   in_d_glub1 = $("input[name=d_glub1]").val() * 1;
  //   $("input[name=d_glub2]").val(in_d_glub1);
  //});

  $("#open_my_file").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();

    $("#div_12").hide();
    $("#div_0").show();
    page = 0;
  });
  $("#save_my_file").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").show();
    $("#div_0").hide();
  });

  // Hide div 2 by default
  $("#div_2").hide();
  $("#div_3").hide();
  $("#div_4").hide();
  $("#div_5").hide();
  $("#div_6").hide();
  $("#div_7").hide();
  $("#div_8").hide();
  $("#div_9").hide();
  $("#div_10").hide();
  $("#div_10").hide(); //все остальные страницы скрываем
  $("#div_11").hide();
  $("#div_12").hide();
  $("#div_1").hide();

  $("#link_11").click(function () {
    for (var i = 0; i <= 10; i++) {
      $("#div_" + i).hide();
    }
    $("#div_11").show();
    page = 11;
  });
  $("#link_10").click(function () {
    for (var i = 0; i <= 9; i++) {
      $("#div_" + i).hide();
    }
    $("#div_10").show();
    $("#div_11").hide();
    page = 10;
  });
  $("#link_9").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").show();
    $("#div_10").hide();
    //все остальные страницы скрываем
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 9;
  });
  $("#link_8").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").show();
    $("#div_9").hide();
    $("#div_10").hide();

    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 8;
  });
  $("#link_7").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").show();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 7;
  });
  $("#link_6").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").show();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 6;
  });
  $("#link_5").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").show();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 5;
  });
  $("#link_4").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").show();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 4;
  });

  $("#link_3").click(function () {
    $("#div_4").hide();
    $("#div_3").show();
    $("#div_2").hide();
    $("#div_1").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 3;
  });

  $("#link_2").click(function () {
    $("#div_1").hide();
    $("#div_2").show();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 2;
  });

  $("#link_1").click(function () {
    $("#div_4").hide();
    $("#div_3").hide();
    $("#div_2").hide();
    $("#div_1").show();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_9").hide();
    $("#div_10").hide();
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    page = 1;
  });
  $("input[type='text']").on("change", function () {
    var id = this.id;
    //alert(id);
    var rr = 0;
    if (
      id != "my_file_name" &&
      id != "kod_d" &&
      id != "kod_unvis" &&
      id != "name_to_file"
    ) {
      rr = parseFloat(document.getElementById(id).value.replace(/,/, "."));
      $("#" + id).val(rr);
    }
    //alert(rr);
  });
}

function sposobi() {
  n3 = document.getElementById("sposob_all").options.selectedIndex;
  var i;
  if (n3 == 0) {
    $(".spsp4").hide();
    $(".spsp3").hide();
    $(".spsp2").hide();
    $(".spsp1").show();
    //$('#otrezok2').val(0);
    //$('#otrezok3').val(0);
    //$('#otrezok4').val(0);
    for (i = 1; i <= count; i++) {
      $("#dlinn2" + i).val(0);
      $("#dlinn3" + i).val(0);
      $("#dlinn4" + i).val(0);
    }
  }
  if (n3 == 1) {
    $(".spsp4").hide();
    $(".spsp1").show();
    $(".spsp2").show();
    $(".spsp3").hide();
    //$('#otrezok3').val(0);
    //$('#otrezok4').val(0);
    for (i = 1; i <= count; i++) {
      $("#dlinn3" + i).val(0);
      $("#dlinn4" + i).val(0);
    }
  }
  if (n3 == 2) {
    $(".spsp4").hide();
    $(".spsp1").show();
    $(".spsp2").show();
    $(".spsp3").show();

    // $('#otrezok4').val(0);
    for (i = 1; i <= count; i++) {
      $("#dlinn4" + i).val(0);
    }
  }
  if (n3 == 3) {
    $(".spsp4").show();
    $(".spsp1").show();
    $(".spsp2").show();
    $(".spsp3").show();
  }
}

function handle(e) {
  if (form.elements[e.type + "Ignore"].checked) return;

  if ((e.keyCode = 39)) {
    alert("->");
  }
  if ((e.keyCode = 37)) {
    alert("<-");
  }
}

function full_cicle_trans_l8() {
  slide_train = document.getElementById("ne_trans").options.selectedIndex;
  var i;
  var size1 = $("select[id=ne_trans_select] option").size() * 1;
  if (size1 - 1 > slide_train) {
    for (i = size1; i > slide_train + 2; i--) {
      $("#ne_trans_select").find("option:last").remove();
    }
  } else if (size1 - 1 <= slide_train) {
    for (i = size1; i < slide_train + 2; i++) {
      $("#ne_trans_select").find("option:last").add();
      var option1 = $("<option/>", {
        value: "otrez01ej" + i,
        text: "цикл №" + i,
      });
      option1.appendTo($("#ne_trans_select"));
    }
  }

  //$("select[id=ne_trans_select] option").size(slide_train);

  if (slide_train == 0) {
    $(".parts_cicle6").hide();
    $(".parts_cicle5").hide();
    $(".parts_cicle4").hide();
    $(".parts_cicle3").hide();
    $(".parts_cicle2").hide();
    $(".parts_cicle1").show();
  }
  if (slide_train == 1) {
    $(".parts_cicle6").hide();
    $(".parts_cicle5").hide();
    $(".parts_cicle4").hide();
    $(".parts_cicle3").hide();
    $(".parts_cicle2").show();
    $(".parts_cicle1").show();
  }
  if (slide_train == 2) {
    $(".parts_cicle6").hide();
    $(".parts_cicle5").hide();
    $(".parts_cicle4").hide();
    $(".parts_cicle3").show();
    $(".parts_cicle2").show();
    $(".parts_cicle1").show();
  }
  if (slide_train == 3) {
    $(".parts_cicle6").hide();
    $(".parts_cicle5").hide();
    $(".parts_cicle4").show();
    $(".parts_cicle3").show();
    $(".parts_cicle2").show();
    $(".parts_cicle1").show();
  }
  if (slide_train == 4) {
    $(".parts_cicle6").hide();
    $(".parts_cicle5").show();
    $(".parts_cicle4").show();
    $(".parts_cicle3").show();
    $(".parts_cicle2").show();
    $(".parts_cicle1").show();
  }
  if (slide_train == 5) {
    $(".parts_cicle6").show();
    $(".parts_cicle5").show();
    $(".parts_cicle4").show();
    $(".parts_cicle3").show();
    $(".parts_cicle2").show();
    $(".parts_cicle1").show();
  }
}

function blokpost2() {
  //n2 = document.getElementById("haracter").options.selectedIndex;

  $(".maxinf1").show();
}

function blokpost() {
  n = document.getElementById("geometry").options.selectedIndex;
  if (n == 0) {
    document.getElementById("d1").disabled = true;
    document.getElementById("d2").disabled = true;
    document.getElementById("d3").disabled = true;
    document.getElementById("d4").disabled = true;
    //document.getElementById('Ukab').disabled = false;
    //document.getElementById('sech1').disabled = false;
    //document.getElementById('sech2').disabled = false;
    //document.getElementById('psi1').disabled = false;
    //document.getElementById('psi2').disabled = false;
    document.getElementById("but1").disabled = false;
    //document.getElementById('material').disabled = false;
    //document.getElementById('material1').disabled = false;
    $("input[name=send]").val("Расчет геометрии кабеля");
  }
  if (n == 1) {
    document.getElementById("d1").disabled = false;
    document.getElementById("d2").disabled = false;
    document.getElementById("d3").disabled = false;
    document.getElementById("d4").disabled = false;
    //document.getElementById('Ukab').disabled = true;
    //document.getElementById('sech1').disabled = true;
    //document.getElementById('sech2').disabled = true;
    //document.getElementById('psi1').disabled = true;
    //document.getElementById('psi2').disabled = true;
    document.getElementById("but1").disabled = false;
    //document.getElementById('material').disabled = true;
    //document.getElementById('material1').disabled = true;
    $("input[name=send]").val("Ввод геометрии кабеля");
  }
}

function close_pile_list_k1() {
  var k1 = 0;
  reg = document.getElementById("rasst").options.selectedIndex;
  k1 = document.getElementById("sp_keep1").options.selectedIndex;
  var d4 = $("input[name=d4]").val() * 1;
  switch (reg) {
    case 0:
      $("input[name=otrezok1]").removeAttr("change");
      $("input[name=otrezok1]").prop("change", "").unbind("change");
      $("input[name=otrezok1]").on("change", function () {
        handleChange_prev(this, d4, 10000);
      });
      document.getElementById("otrezok1").disabled = false;
      if (k1 == 0) {
        $("input[name=otrezok1]").val(d4);
        document.getElementById("otrezok1").disabled = true;
      }
      if (
        (k1 == 1 || k1 == 2) &&
        ($("input[name=otrezok1]").val() <= d4 ||
          isNaN($("input[name=otrezok1]").val()))
      ) {
        $("input[name=otrezok1]").val(d4);
      }
      break;
    case 1:
      $("input[name=otrezok1]").removeAttr("change");
      $("input[name=otrezok1]").prop("change", "").unbind("change");
      $("input[name=otrezok1]").on("change", function () {
        handleChange_prev(this, 0, 10000);
      });
      if (k1 == 0) {
        document.getElementById("otrezok1").disabled = true;
        $("input[name=otrezok1]").val(0);
      }
      if (k1 == 1 || k1 == 2) {
        document.getElementById("otrezok1").disabled = false;
        if (isNaN($("input[name=otrezok1]").val())) {
          $("input[name=otrezok1]").val(0);
        }
      }
      break;
  }
}

function close_pile_list_k2() {
  var k2 = 0;
  reg = document.getElementById("rasst").options.selectedIndex;
  k2 = document.getElementById("sp_keep2").options.selectedIndex;
  var d4 = $("input[name=d4]").val() * 1;
  switch (reg) {
    case 0:
      $("input[name=otrezok2]").removeAttr("change");
      $("input[name=otrezok2]").prop("change", "").unbind("change");
      $("input[name=otrezok2]").on("change", function () {
        handleChange_prev(this, d4, 10000);
      });
      document.getElementById("otrezok2").disabled = false;
      if (k2 == 0) {
        $("input[name=otrezok2]").val(d4);
        document.getElementById("otrezok2").disabled = true;
      }
      if (
        (k2 == 1 || k2 == 2) &&
        ($("input[name=otrezok2]").val() <= d4 ||
          isNaN($("input[name=otrezok2]").val()))
      ) {
        $("input[name=otrezok2]").val(d4);
      }
      break;
    case 1:
      $("input[name=otrezok2]").removeAttr("change");
      $("input[name=otrezok2]").prop("change", "").unbind("change");
      $("input[name=otrezok2]").on("change", function () {
        handleChange_prev(this, 0, 10000);
      });
      if (k2 == 0) {
        document.getElementById("otrezok2").disabled = true;
        $("input[name=otrezok2]").val(0);
      }
      if (k2 == 1 || k2 == 2) {
        document.getElementById("otrezok2").disabled = false;
        if (isNaN($("input[name=otrezok2]").val())) {
          $("input[name=otrezok2]").val(0);
        }
      }
      break;
  }
}

function close_pile_list_k3() {
  var k3 = 0;
  reg = document.getElementById("rasst").options.selectedIndex;
  k3 = document.getElementById("sp_keep3").options.selectedIndex;
  var d4 = $("input[name=d4]").val() * 1;
  switch (reg) {
    case 0:
      $("input[name=otrezok3]").removeAttr("change");
      $("input[name=otrezok3]").prop("change", "").unbind("change");
      $("input[name=otrezok3]").on("change", function () {
        handleChange_prev(this, d4, 10000);
      });
      document.getElementById("otrezok3").disabled = false;
      if (k3 == 0) {
        $("input[name=otrezok3]").val(d4);
        document.getElementById("otrezok3").disabled = true;
      }
      if (
        (k3 == 1 || k3 == 2) &&
        ($("input[name=otrezok3]").val() <= d4 ||
          isNaN($("input[name=otrezok3]").val()))
      ) {
        $("input[name=otrezok3]").val(d4);
      }
      break;
    case 1:
      $("input[name=otrezok3]").removeAttr("change");
      $("input[name=otrezok3]").prop("change", "").unbind("change");
      $("input[name=otrezok3]").on("change", function () {
        handleChange_prev(this, 0, 10000);
      });
      if (k3 == 0) {
        document.getElementById("otrezok3").disabled = true;
        $("input[name=otrezok3]").val(0);
      }
      if (k3 == 1 || k3 == 2) {
        document.getElementById("otrezok3").disabled = false;
        if (isNaN($("input[name=otrezok3]").val())) {
          $("input[name=otrezok3]").val(0);
        }
      }
      break;
  }
}

function close_pile_list_k4() {
  var k4 = 0;
  reg = document.getElementById("rasst").options.selectedIndex;
  k4 = document.getElementById("sp_keep4").options.selectedIndex;
  var d4 = $("input[name=d4]").val() * 1;
  switch (reg) {
    case 0:
      $("input[name=otrezok4]").removeAttr("change");
      $("input[name=otrezok4]").prop("change", "").unbind("change");
      $("input[name=otrezok4]").on("change", function () {
        handleChange_prev(this, d4, 10000);
      });
      document.getElementById("otrezok4").disabled = false;
      if (k4 == 0) {
        $("input[name=otrezok4]").val(d4);
        document.getElementById("otrezok4").disabled = true;
      }
      if (
        (k4 == 1 || k4 == 2) &&
        ($("input[name=otrezok4]").val() <= d4 ||
          isNaN($("input[name=otrezok4]").val()))
      ) {
        $("input[name=otrezok4]").val(d4);
      }
      break;
    case 1:
      $("input[name=otrezok4]").removeAttr("change");
      $("input[name=otrezok4]").prop("change", "").unbind("change");
      $("input[name=otrezok4]").on("change", function () {
        handleChange_prev(this, 0, 10000);
      });
      if (k4 == 0) {
        document.getElementById("otrezok4").disabled = true;
        $("input[name=otrezok4]").val(0);
      }
      if (k4 == 1 || k4 == 2) {
        document.getElementById("otrezok4").disabled = false;
        if (isNaN($("input[name=otrezok4]").val())) {
          $("input[name=otrezok4]").val(0);
        }
      }
      break;
  }
}

function close_pile_list2() {
  var k_all = 0;
  var k1 = 0;
  var k2 = 0;
  var k3 = 0;

  reg = document.getElementById("rasst").options.selectedIndex;

  k1 = document.getElementById("sp_keep1").options.selectedIndex;
  k2 = document.getElementById("sp_keep2").options.selectedIndex;
  k3 = document.getElementById("sp_keep3").options.selectedIndex;
  k4 = document.getElementById("sp_keep4").options.selectedIndex;
  var d4 = $("input[name=d4]").val() * 1;

  close_pile_list_k1();
  close_pile_list_k2();
  close_pile_list_k3();
  close_pile_list_k4();

  if (reg == 0) {
    $("#m_phase_1").text("Расстояние между осями фаз #1, мм:");
    $("#m_phase_2").text("Расстояние между осями фаз #2, мм:");
    $("#m_phase_3").text("Расстояние между осями фаз #3, мм:");
    $("#m_phase_4").text("Расстояние между осями фаз #4, мм:");
  } else {
    $("#m_phase_1").text("Расстояние в свету между фазами #1, мм:");
    $("#m_phase_2").text("Расстояние в свету между фазами #2, мм:");
    $("#m_phase_3").text("Расстояние в свету между фазами #3, мм:");
    $("#m_phase_4").text("Расстояние в свету между фазами #4, мм:");
  }
}
function vibor_file() {
  var k = $("#fileToLoad").val().replace("C:\\fakepath\\", "");
  if ($("#fileToLoad").val() == "") {
    alert("Файл не выбран" + k);
  } else {
    alert("Загружены данные из файла: " + k);
  }
}
function dinamic_part() {
  var spos = document.getElementById("sposob_all").options.selectedIndex; //количество способов прокладки
  var d = $("input[name=sp_kol_dlin]").val() * 1; //Количество частей
  var d_m = d - 1;
  // $("input[name=sp_kol_muft]").val(d_m);
  if (d > count) {
    while (d > count) {
      count++;
      var divi1 = $("<div/>", {
        id: "otrez1" + count,
      });
      var divi2 = $("<div/>", {
        id: "otrez2" + count,
      });
      var divi3 = $("<div/>", {
        id: "otrez3" + count,
      });
      var divi4 = $("<div/>", {
        id: "otrez4" + count,
      });
      var hr = $("<hr/>");

      divi1.appendTo("#part1");
      divi2.appendTo("#part2");
      divi3.appendTo("#part3");
      divi4.appendTo("#part4");

      //hr.appendTo(div1);

      var div2 = $("<div/>", {
        class: "field",
      }).appendTo(divi1);
      div2.appendTo(divi2);
      div2.appendTo(divi3);
      div2.appendTo(divi4);

      var diva1 = $("<div/>", {
        class: "spsp1 mysp1",
      }).appendTo(divi1);
      var div3 = $("<div/>", {
        class: "field",
      }).appendTo(diva1);
      var strong1 = $("<strong/>")
        .text("Протяженность на участке №" + count + ", м:")
        .appendTo(div3);
      var input1 = $("<input/>", {
        type: "text",
        class: "dinamic_t lala",
        id: "dlinn1" + count,
        name: "dlin1" + count,
        size: "5",
        value: "0",
        onblur: "if(value=='') value = '0'",
        onchange: "handleChange(this, 0, 50000);",
        autocomplete: "off",
      }).appendTo(div3);

      if (spos == 0) {
        var diva2 = $("<div/>", {
          class: "spsp2 mysp2",
          style: "display: none;",
        }).appendTo(divi2);
      } else {
        var diva2 = $("<div/>", {
          class: "spsp2 mysp2",
        }).appendTo(divi2);
      }
      var div4 = $("<div/>", {
        class: "field",
      }).appendTo(diva2);
      var strong1 = $("<strong/>")
        .text("Протяженность на участке №" + count + ", м:")
        .appendTo(div4);
      var input1 = $("<input/>", {
        type: "text",
        class: "dinamic_t lala",
        id: "dlinn2" + count,
        name: "dlin2" + count,
        size: "5",
        value: "0",
        onblur: "if(value=='') value = '0'",
        onchange: "handleChange(this, 0, 50000);",
        autocomplete: "off",
      }).appendTo(div4);

      if (spos == 0 || spos == 1) {
        var diva3 = $("<div/>", {
          class: "spsp3 mysp3",
          style: "display: none;",
        }).appendTo(divi3);
      } else {
        var diva3 = $("<div/>", {
          class: "spsp3 mysp3",
        }).appendTo(divi3);
      }
      var div5 = $("<div/>", {
        class: "field",
      }).appendTo(diva3);
      var strong1 = $("<strong/>")
        .text("Протяженность на участке №" + count + ", м:")
        .appendTo(div5);
      var input1 = $("<input/>", {
        type: "text",
        class: "dinamic_t lala",
        id: "dlinn3" + count,
        name: "dlin3" + count,
        size: "5",
        value: "0",
        onblur: "if(value=='') value = '0'",
        onchange: "handleChange(this, 0, 50000);",
        autocomplete: "off",
      }).appendTo(div5);

      if (spos == 0 || spos == 1 || spos == 2) {
        var diva4 = $("<div/>", {
          class: "spsp4 mysp4",
          style: "display: none;",
        }).appendTo(divi4);
      } else {
        var diva4 = $("<div/>", {
          class: "spsp4 mysp4",
        }).appendTo(divi4);
      }
      var div6 = $("<div/>", {
        class: "field",
      }).appendTo(diva4);

      var strong1 = $("<strong/>")
        .text("Протяженность на участке №" + count + ", м:")
        .appendTo(div6);
      var input1 = $("<input/>", {
        type: "text",
        class: "dinamic_t lala",
        id: "dlinn4" + count,
        name: "dlin4" + count,
        size: "5",
        value: "0",
        onblur: "if(value=='') value = '0'",
        onchange: "handleChange(this, 0, 50000);",
        autocomplete: "off",
      }).appendTo(div6);
    }
  } else {
    while (d != count) {
      $("#otrez1" + count).remove();
      $("#otrez2" + count).remove();
      $("#otrez3" + count).remove();
      $("#otrez4" + count).remove();
      count--;
      //alert(count);
    }
  }
}

function close_pile_list3() {
  var m = 0;
  m = document.getElementById("neitral").options.selectedIndex;
  if (m != 0) {
    document.getElementById("Ik1").disabled = true;
    $("input[name=Ik1]").val("--");
  } else {
    document.getElementById("Ik1").disabled = false;
  }
}

function handleChange_prev(input, min, max) {
  if (input.value < min) {
    input.value = min;
  }
  if (input.value > max) {
    input.value = max;
  }
}

function handleChange(input, min, max) {
  if (input.value < min) {
    input.value = min;
  }
  if (input.value > max) {
    input.value = max;
  }
  if (isNaN(input.value)) {
    input.value == "--";
  }
}

function mathpath() {
  // Событие нажатия на кнопку "Расчёт"
  if (document.getElementById("geometry").options.selectedIndex == 1) {
    var result1 = $("input[name=di1]").val() * 1; // Переменная
    var result2 = $("input[name=di2]").val() * 1; // Переменная
    var result3 = $("input[name=di3]").val() * 1;
    var result4 = $("input[name=di4]").val() * 1;
    $("input[name=di1]").val(d1); // записываем результат
    $("input[name=di2]").val(d2); // записываем результат
    $("input[name=di3]").val(d3); // записываем результат
    $("input[name=di4]").val(d4); // записываем результат
    document.all.d1_td.innerHTML = $("input[name=d1]").val() * 1; // записываем результат
    document.all.d2_td.innerHTML = $("input[name=d2]").val() * 1;
    document.all.d3_td.innerHTML = $("input[name=d3]").val() * 1;
    document.all.d4_td.innerHTML = $("input[name=d4]").val() * 1;
  }

  if (document.getElementById("geometry").options.selectedIndex == 0) {
    var Ukab = $("input[name=Ukab]").val() * 1; // Переменная
    var sech1 = $("input[name=sech1]").val() * 1; // Переменная
    var sech2 = $("input[name=sech2]").val() * 1;
    var psi1 = $("input[name=psi1]").val() * 1;
    var psi2 = $("input[name=psi2]").val() * 1;
    var result1; // Переменная результата
    var result2; // Переменная результата
    var result3; // Переменная результата
    var result4; // Переменная результата
    var Diz;
    var Dop;
    if (Ukab == "") {
      //alert("Вы не указали напряжение");
    } else if (sech1 == "" || sech2 == "") {
      //alert("Вы не указали сечение");
    } else {
      Diz = 1.4 * Math.sqrt(Ukab);
      Dob = 0.01 * Ukab + 4;
      var r1 = Math.sqrt(sech1 / (psi1 * Math.PI));
      var r2 = r1 + Diz;
      var r3 = Math.sqrt(Math.pow(r2, 2) + sech2 / (psi2 * Math.PI));
      var r4 = r3 + Dob;
      result1 = 2 * r1;
      result2 = 2 * r2;
      result3 = 2 * r3;
      result4 = 2 * r4;

      result1 = result1.toFixed(2);
      result2 = result2.toFixed(2);
      result3 = result3.toFixed(2);
      result4 = result4.toFixed(2);
    }
    $("input[name=d1]").val(result1); // записываем результат
    $("input[name=d2]").val(result2); // записываем результат
    $("input[name=d3]").val(result3); // записываем результат
    $("input[name=d4]").val(result4); // записываем результат
    close_pile_list_k1();
    close_pile_list_k2();
    close_pile_list_k3();
    close_pile_list_k4();
  }
}

function mathpath_l2() {
  // Событие нажатия на кнопку "Эквивалент"
  var d4 = $("input[name=d4]").val() * 1;
  //var L1 = $("input[name=otrez_all]").val() * 1;
  var S1 = 0;
  var S1ab = 0;
  var L_ob = 0;
  var S_sr = 0;
  var dS_sr = 0;
  var dS = [];
  var i;
  var mas = [];
  var S1ab = [];
  var S2ab = [];
  var S3ab = [];
  var S4ab = [];
  var dS1ab = [];
  var dS2ab = [];
  var dS3ab = [];
  var dS4ab = [];
  var S = [];
  var S1 = [];
  var S2 = [];
  var S3 = [];
  var S4 = [];
  var dl1;
  var dl2;
  var dl3;
  var dl4;
  var n1;
  var n2;
  var n3;
  var n4;
  var k_stroy = $("input[name=sp_kol_dlin]").val() * 1;
  var sum_dl1 = 0;
  var sum_dl2 = 0;
  var sum_dl3 = 0;
  var sum_dl4 = 0;
  stroy_otr = [];
  betwen_phase = [];
  stroy_otr[0] = 0;
  betwen_phase[0] = 0;
  for (i = 1; i <= count; i++) {
    //проходим по всем полям
    //

    dl1 = $("#dlinn1" + i).val() * 1;
    dl2 = $("#dlinn2" + i).val() * 1;
    dl3 = $("#dlinn3" + i).val() * 1;
    dl4 = $("#dlinn4" + i).val() * 1;
    sum_dl1 = sum_dl1 + dl1;
    sum_dl2 = sum_dl2 + dl2;
    sum_dl3 = sum_dl3 + dl3;
    sum_dl4 = sum_dl4 + dl4;

    mas[i] = dl1 + dl2 + dl3 + dl4; //L_count
    stroy_otr[i] = mas[i];

    L_ob = L_ob + mas[i];
    if (document.getElementById("rasst").options.selectedIndex == 0) {
      //выбрано "между осями"
      S1ab[i] = $("input[name=otrezok1]").val() * 1;
      S2ab[i] = $("input[name=otrezok2]").val() * 1;
      S3ab[i] = $("input[name=otrezok3]").val() * 1;
      S4ab[i] = $("input[name=otrezok4]").val() * 1;
    } else if (document.getElementById("rasst").options.selectedIndex == 1) {
      dS1ab[i] = $("input[name=otrezok1]").val() * 1;
      dS2ab[i] = $("input[name=otrezok2]").val() * 1;
      dS3ab[i] = $("input[name=otrezok3]").val() * 1;
      dS4ab[i] = $("input[name=otrezok4]").val() * 1;
      S1ab[i] = dS1ab[i] + d4;
      S2ab[i] = dS2ab[i] + d4;
      S3ab[i] = dS3ab[i] + d4;
      S4ab[i] = dS4ab[i] + d4;
    }

    if (document.getElementById("sp_keep1").options.selectedIndex == 0) {
      S1[i] = d4;
    } else if (document.getElementById("sp_keep1").options.selectedIndex == 1) {
      S1[i] = S1ab[i];
    } else if (document.getElementById("sp_keep1").options.selectedIndex == 2) {
      S1[i] = S1ab[i] * 1.26;
    }

    if (document.getElementById("sp_keep2").options.selectedIndex == 0) {
      S2[i] = d4;
    } else if (document.getElementById("sp_keep2").options.selectedIndex == 1) {
      S2[i] = S2ab[i];
    } else if (document.getElementById("sp_keep2").options.selectedIndex == 2) {
      S2[i] = S2ab[i] * 1.26;
    }
    if (document.getElementById("sp_keep3").options.selectedIndex == 0) {
      S3[i] = d4;
    } else if (document.getElementById("sp_keep3").options.selectedIndex == 1) {
      S3[i] = S3ab[i];
    } else if (document.getElementById("sp_keep3").options.selectedIndex == 2) {
      S3[i] = S3ab[i] * 1.26;
    }
    if (document.getElementById("sp_keep4").options.selectedIndex == 0) {
      S4[i] = d4;
    } else if (document.getElementById("sp_keep4").options.selectedIndex == 1) {
      S4[i] = S4ab[i];
    } else if (document.getElementById("sp_keep4").options.selectedIndex == 2) {
      S4[i] = S4ab[i] * 1.26;
    }
    S[i] = S1[i] * dl1 + S2[i] * dl2 + S3[i] * dl3 + S4[i] * dl4;
    betwen_phase[i] = S[i] / mas[i];
  }

  S_sr = S1[1] * sum_dl1 + S2[1] * sum_dl2 + S3[1] * sum_dl3 + S4[1] * sum_dl4;
  S_sr = S_sr / L_ob;
  dS_sr = S_sr - d4;

  S_sr = S_sr.toFixed(2);
  dS_sr = dS_sr.toFixed(2);
  L_ob = L_ob.toFixed(1);

  if (isNaN(L_ob)) {
    $("input[name=L_]").val("--"); // записываем результат
  } else {
    $("input[name=L_]").val(L_ob); // записываем результат
  }
  if (isNaN(S_sr)) {
    $("input[name=S_]").val("--"); // записываем результат
  } else {
    $("input[name=S_]").val(S_sr); // записываем результат
  }
  if (isNaN(dS_sr)) {
    $("input[name=dS_]").val("--"); // записываем результат
  } else {
    $("input[name=dS_]").val(dS_sr); // записываем результат
  }
}
function activ_my_prog() {
  if (!decoder()) {
    alert("Вы ввели неверный код активации");
  } else {
    alert("Код принят");
  }
}
function all_math_operation() {
  //Считаем все при нажатии главной кнопки расчет
  if (!decoder()) {
    alert("Вы ввели неверный код активации");
    return 0;
  }
  //**************ДВУСТОРОНЕЕ********************
  var regim = document.getElementById("dbl_norm_reg").options.selectedIndex; //Выбираем режим текущий
  var ig_1 = $("input[name=In1]").val() * 1;
  var ig_2 = $("input[name=In2]").val() * 1;
  var ig_3 = $("input[name=In3]").val() * 1;
  var frg = $("input[name=Fg1]").val() * 1; //Частота -> настройки
  var lk = $("input[name=L_]").val() * 1;
  var S = $("input[name=S_]").val() * 1;
  var r2 = ($("input[name=d2]").val() * 1) / 2;
  var fe = $("input[name=sech2]").val() * 1;
  var pe;
  var pg;
  if (document.getElementById("material1").options.selectedIndex == 0) {
    pe = new_t_math(0, 1);
  } else if (document.getElementById("material1").options.selectedIndex == 1) {
    pe = new_t_math(1, 1);
  }
  if (document.getElementById("material").options.selectedIndex == 0) {
    pg = new_t_math(0, 0);
  } else if (document.getElementById("material").options.selectedIndex == 1) {
    pg = new_t_math(1, 0);
  }

  var miu = 4 * Math.PI * Math.pow(10, -7);
  var omega = 2 * Math.PI * frg;
  var prom_1 = S / r2;
  var Xi = omega * (miu / (2 * Math.PI)) * lk * Math.log(prom_1);
  var re = lk * (pe / fe);

  var ie_1 = ig_1 / Math.sqrt(1 + Math.pow(re / Xi, 2)); //режим 1 - формула 1
  var ie_2 = ig_2 / Math.sqrt(1 + Math.pow(re / Xi, 2)); //режим 2 - формула 1
  var ie_3 = ig_3 / Math.sqrt(1 + Math.pow(re / Xi, 2)); //режим 3 - формула 1

  var ieig_1 = 1 / Math.sqrt(1 + Math.pow(re / Xi, 2)); //режим 1 - формула 2
  var ieig_2 = 1 / Math.sqrt(1 + Math.pow(re / Xi, 2)); //режим 2 - формула 2
  var ieig_3 = 1 / Math.sqrt(1 + Math.pow(re / Xi, 2)); //режим 3 - формула 2

  var fg = $("input[name=sech1]").val() * 1;

  var rerg_1 = Math.pow(ieig_1, 2) * (pe / pg) * (fg / fe); //режим 1 - формула 3
  var rerg_2 = Math.pow(ieig_2, 2) * (pe / pg) * (fg / fe); //режим 2 - формула 3
  var rerg_3 = Math.pow(ieig_3, 2) * (pe / pg) * (fg / fe); //режим 3 - формула 3

  var ki_1 = 1 / Math.sqrt(1 + rerg_1); // формула 4
  var ki_2 = 1 / Math.sqrt(1 + rerg_2); // формула 4
  var ki_3 = 1 / Math.sqrt(1 + rerg_3); // формула 4

  var rg = lk * (pg / fg);

  var kn = $("input[name=set_kn]").val() * 1;

  var three_rg_1 = 0.003 * Math.pow(ig_1, 2) * rg * kn; // формула 5
  var three_rg_2 = 0.003 * Math.pow(ig_2, 2) * rg * kn; // формула 5
  var three_rg_3 = 0.003 * Math.pow(ig_3, 2) * rg * kn; // формула 5

  var three_re_1 = rerg_1 * three_rg_1; // формула 6
  var three_re_2 = rerg_2 * three_rg_2; // формула 6
  var three_re_3 = rerg_3 * three_rg_3; // формула 6

  var p_sum_1 = three_rg_1 + three_re_1; // формула 7
  var p_sum_2 = three_rg_2 + three_re_2; // формула 7
  var p_sum_3 = three_rg_3 + three_re_3; // формула 7

  var C = $("input[name=k_money1]").val() * 1;

  var cg_1 = (three_rg_1 / 1000) * 8760 * C; // формула 8
  var cg_2 = (three_rg_2 / 1000) * 8760 * C; // формула 8
  var cg_3 = (three_rg_3 / 1000) * 8760 * C; // формула 8

  var ce_1 = (three_re_1 / 1000) * 8760 * C; // формула 9
  var ce_2 = (three_re_2 / 1000) * 8760 * C; // формула 9
  var ce_3 = (three_re_3 / 1000) * 8760 * C; // формула 9

  var c_sum_1 = cg_1 + ce_1; // формула 10
  var c_sum_2 = cg_2 + ce_2; // формула 10
  var c_sum_3 = cg_3 + ce_3; // формула 10

  ie_1 = sigFigs(ie_1);
  ie_2 = sigFigs(ie_2);
  ie_3 = sigFigs(ie_3);

  ieig_1 = sigFigs(ieig_1);
  ieig_2 = sigFigs(ieig_2);
  ieig_3 = sigFigs(ieig_3);

  rerg_1 = sigFigs(rerg_1);
  rerg_2 = sigFigs(rerg_2);
  rerg_3 = sigFigs(rerg_3);

  ki_1 = sigFigs(ki_1);
  ki_2 = sigFigs(ki_2);
  ki_3 = sigFigs(ki_3);

  three_rg_1 = sigFigs(three_rg_1);
  three_rg_2 = sigFigs(three_rg_2);
  three_rg_3 = sigFigs(three_rg_3);

  three_re_1 = sigFigs(three_re_1);
  three_re_2 = sigFigs(three_re_2);
  three_re_3 = sigFigs(three_re_3);

  p_sum_1 = sigFigs(p_sum_1);
  p_sum_2 = sigFigs(p_sum_2);
  p_sum_3 = sigFigs(p_sum_3);

  cg_1 = sigFigs(cg_1);
  cg_2 = sigFigs(cg_2);
  cg_3 = sigFigs(cg_3);

  ce_1 = sigFigs(ce_1);
  ce_2 = sigFigs(ce_2);
  ce_3 = sigFigs(ce_3);

  c_sum_1 = sigFigs(c_sum_1);
  c_sum_2 = sigFigs(c_sum_2);
  c_sum_3 = sigFigs(c_sum_3);

  var limit_ki = $("input[name=limit_ki]").val() * 1;
  var limit_money = $("input[name=limit_money]").val() * 1;

  if (regim == 0 && ig_1 != 0) {
    $("input[name=dbl_ig]").val(ig_1); // записываем результат
    $("input[name=dbl_ie]").val(ie_1); // записываем результат
    $("input[name=dbl_ieig]").val(ieig_1); // записываем результат
    $("input[name=dbl_rerg]").val(rerg_1); // записываем результат
    $("input[name=dbl_ki]").val(ki_1); // записываем результат
    $("input[name=dbl_3rg]").val(three_rg_1); // записываем результат
    $("input[name=dbl_3re]").val(three_re_1); // записываем результат
    $("input[name=dbl_rsum]").val(p_sum_1); // записываем результат
    $("input[name=dbl_cg]").val(cg_1); // записываем результат
    $("input[name=dbl_ce]").val(ce_1); // записываем результат
    $("input[name=dbl_csum]").val(c_sum_1); // записываем результат
    if (ki_1 >= limit_ki) {
      $("input[name=dbl_ki]").css("background-color", "");
    } else {
      $("input[name=dbl_ki]").css("background-color", "red");
    }

    if (ce_1 <= limit_money) {
      $("input[name=dbl_ce]").css("background-color", "");
    } else {
      $("input[name=dbl_ce]").css("background-color", "red");
    }
  } else if (regim == 1 && ig_2 != 0) {
    $("input[name=dbl_ig]").val(ig_2); // записываем результат
    $("input[name=dbl_ie]").val(ie_2); // записываем результат
    $("input[name=dbl_ieig]").val(ieig_2); // записываем результат
    $("input[name=dbl_rerg]").val(rerg_2); // записываем результат
    $("input[name=dbl_ki]").val(ki_2); // записываем результат
    $("input[name=dbl_3rg]").val(three_rg_2); // записываем результат
    $("input[name=dbl_3re]").val(three_re_2); // записываем результат
    $("input[name=dbl_rsum]").val(p_sum_2); // записываем результат
    $("input[name=dbl_cg]").val(cg_2); // записываем результат
    $("input[name=dbl_ce]").val(ce_2); // записываем результат
    $("input[name=dbl_csum]").val(c_sum_2); // записываем результат
    if (ki_2 < limit_ki) {
      $("input[name=dbl_ki]").css("background-color", "red");
    } else {
      $("input[name=dbl_ki]").css("background-color", "");
    }

    if (ce_2 > limit_money) {
      $("input[name=dbl_ce]").css("background-color", "red");
    } else {
      $("input[name=dbl_ce]").css("background-color", "");
    }
  } else if (regim == 2 && ig_3 != 0) {
    $("input[name=dbl_ig]").val(ig_3); // записываем результат
    $("input[name=dbl_ie]").val(ie_3); // записываем результат
    $("input[name=dbl_ieig]").val(ieig_3); // записываем результат
    $("input[name=dbl_rerg]").val(rerg_3); // записываем результат
    $("input[name=dbl_ki]").val(ki_3); // записываем результат
    $("input[name=dbl_3rg]").val(three_rg_3); // записываем результат
    $("input[name=dbl_3re]").val(three_re_3); // записываем результат
    $("input[name=dbl_rsum]").val(p_sum_3); // записываем результат
    $("input[name=dbl_cg]").val(cg_3); // записываем результат
    $("input[name=dbl_ce]").val(ce_3); // записываем результат
    $("input[name=dbl_csum]").val(c_sum_3); // записываем результат
    if (ki_3 < limit_ki) {
      $("input[name=dbl_ki]").css("background-color", "red");
    } else {
      $("input[name=dbl_ki]").css("background-color", "");
    }

    if (ce_3 > limit_money) {
      $("input[name=dbl_ce]").css("background-color", "red");
    } else {
      $("input[name=dbl_ce]").css("background-color", "");
    }
  } else {
    $("input[name=dbl_ig]").val("--"); // записываем результат
    $("input[name=dbl_ie]").val("--"); // записываем результат
    $("input[name=dbl_ieig]").val("--"); // записываем результат
    $("input[name=dbl_rerg]").val("--"); // записываем результат
    $("input[name=dbl_ki]").val("--"); // записываем результат
    $("input[name=dbl_3rg]").val("--"); // записываем результат
    $("input[name=dbl_3re]").val("--"); // записываем результат
    $("input[name=dbl_rsum]").val("--"); // записываем результат
    $("input[name=dbl_cg]").val("--"); // записываем результат
    $("input[name=dbl_ce]").val("--"); // записываем результат
    $("input[name=dbl_csum]").val("--"); // записываем результат
    $("input[name=dbl_ce]").css("background-color", "");
    $("input[name=dbl_ki]").css("background-color", "");
  }
  if ($("input[name=dbl_ki]").val() == "--") {
    $("input[name=dbl_ki]").css("background-color", "");
  }
  if ($("input[name=dbl_ce]").val() == "--") {
    $("input[name=dbl_ce]").css("background-color", "");
  }

  //**************ОДНОСТОРОННЕЕ********************
  var single_regim =
    document.getElementById("single_reg").options.selectedIndex;
  var single_k = document.getElementById("single_k").options.selectedIndex;
  var single_ue_1 = (Xi / (single_k + 1)) * ig_1; //Формула 1
  var single_ue_2 = (Xi / (single_k + 1)) * ig_2; //Формула 1
  var single_ue_3 = (Xi / (single_k + 1)) * ig_3; //Формула 1
  var ik3 = $("input[name=Ik3]").val() * 1;
  var single_ukz = (Xi / (single_k + 1)) * ik3; //Формула 2
  var pz = $("input[name=ud_grunt1]").val() * 1;
  var D3 = 0;
  var parametr_ground =
    document.getElementById("param_ground").options.selectedIndex;
  if (parametr_ground == 0) {
    D3 = 2.24 * Math.sqrt(pz / (omega * miu));
  } else if (parametr_ground == 1) {
    D3 = $("input[name=d_glub1]").val() * 1;
  }
  var xge =
    omega * (miu / (2 * Math.PI)) * lk * Math.log(D3 / (r2 * Math.pow(10, -3)));
  var ik1 = $("input[name=Ik1]").val() * 1;
  var single_uk1 = (xge / (single_k + 1)) * ik1; //Формула 3;

  single_ue_1 = sigFigs(single_ue_1);
  single_ue_2 = sigFigs(single_ue_2);
  single_ue_3 = sigFigs(single_ue_3);

  single_ukz = sigFigs(single_ukz);
  single_uk1 = sigFigs(single_uk1);

  var limit_norm_ue = $("input[name=norm_ue]").val() * 1;
  var limit_out_ue = $("input[name=out_ue]").val() * 1;

  if (single_ukz == 0) {
    $("input[name=single_uk3]").val("--");
  } else {
    $("input[name=single_uk3]").val(single_ukz);
  }
  if (single_uk1 == 0) {
    $("input[name=single_uk1]").val("--");
  } else {
    $("input[name=single_uk1]").val(single_uk1);
  }

  if (single_regim == 0 && ig_1 != 0) {
    $("input[name=single_ig]").val(ig_1); // записываем результат
    $("input[name=single_ue]").val(single_ue_1); // записываем результат

    if (single_ue_1 > limit_norm_ue) {
      $("input[name=single_ue]").css("background-color", "red");
    } else {
      $("input[name=single_ue]").css("background-color", "");
    }
  } else if (single_regim == 1 && ig_2 != 0) {
    $("input[name=single_ig]").val(ig_2); // записываем результат
    $("input[name=single_ue]").val(single_ue_2); // записываем результат
    if (single_ue_2 > limit_norm_ue) {
      $("input[name=single_ue]").css("background-color", "red");
    } else {
      $("input[name=single_ue]").css("background-color", "");
    }
  } else if (single_regim == 2 && ig_3 != 0) {
    $("input[name=single_ig]").val(ig_3); // записываем результат
    $("input[name=single_ue]").val(single_ue_3); // записываем результат
    if (single_ue_3 > limit_norm_ue) {
      $("input[name=single_ue]").css("background-color", "red");
    } else {
      $("input[name=single_ue]").css("background-color", "");
    }
  } else {
    $("input[name=single_ig]").val("--"); // записываем результат
    $("input[name=single_ue]").val("--"); // записываем результат
    $("input[name=single_ue]").css("background-color", "");
  }
  if (single_ukz > limit_out_ue) {
    $("input[name=single_uk3]").css("background-color", "red");
  } else {
    $("input[name=single_uk3]").css("background-color", "");
  }
  if (single_uk1 > limit_out_ue) {
    $("input[name=single_uk1]").css("background-color", "red");
  } else {
    $("input[name=single_uk1]").css("background-color", "");
  }

  //**************ИД.ТРАНСПОЗИЦИЯ********************
  var id_regim = document.getElementById("id_reg").options.selectedIndex;
  var id_n = document.getElementById("id_n").options.selectedIndex;
  var id_ue_1 = (Xi / (3 * (id_n + 1))) * ig_1;
  var id_ue_2 = (Xi / (3 * (id_n + 1))) * ig_2;
  var id_ue_3 = (Xi / (3 * (id_n + 1))) * ig_3;
  var id_ukz = (Xi / (3 * (id_n + 1))) * ik3;
  var id_uk1 = ((2 * Xi) / (9 * (id_n + 1))) * ik1;

  id_ue_1 = sigFigs(id_ue_1);
  id_ue_2 = sigFigs(id_ue_2);
  id_ue_3 = sigFigs(id_ue_3);

  id_ukz = sigFigs(id_ukz);
  id_uk1 = sigFigs(id_uk1);

  if (id_ukz == 0) {
    $("input[name=id_uk3]").val("--");
  } else {
    $("input[name=id_uk3]").val(id_ukz);
  }
  if (id_uk1 == 0) {
    $("input[name=id_uk1]").val("--");
  } else {
    $("input[name=id_uk1]").val(id_uk1);
  }

  if (id_regim == 0 && ig_1 != 0) {
    $("input[name=id_ig]").val(ig_1); // записываем результат
    $("input[name=id_ue]").val(id_ue_1); // записываем результат
  } else if (id_regim == 1 && ig_2 != 0) {
    $("input[name=id_ig]").val(ig_2); // записываем результат
    $("input[name=id_ue]").val(id_ue_2); // записываем результат
  } else if (id_regim == 2 && ig_3 != 0) {
    $("input[name=id_ig]").val(ig_3); // записываем результат
    $("input[name=id_ue]").val(id_ue_3); // записываем результат
  } else {
    $("input[name=id_ig]").val("--"); // записываем результат
    $("input[name=id_ue]").val("--"); // записываем результат
  }
  var all_neitral = document.getElementById("neitral").options.selectedIndex;

  if (all_neitral != 0) {
    $("input[name=single_uk1]").val("--");
    $("input[name=id_uk1]").val("--");
  }
  //**************НЕИД.ТРАНСПОЗИЦИЯ********************

  var neid_n = document.getElementById("ne_trans").options.selectedIndex;
  var neid_reg = 0;
  neid_reg = document.getElementById("neid_reg").options.selectedIndex;
  var neid_detaliz =
    document.getElementById("ne_trans_select").options.selectedIndex;
  var kn = $("input[name=set_kn]").val() * 1;
  var ck = 1;
  var j = 0;
  var lt = [];
  var st = [];
  var Xi_mas = [];
  var array_prov = [];
  var kt = [];
  var neid_X_all = [];
  var neid_ig = [];
  var neid_ie = [];
  var neid_ieig = [];
  var neid_pepg = [];
  var neid_ki = [];
  var neid_pg = [];
  var neid_pe = [];
  var neid_ce = [];
  var neid_re = [];
  var neid_rg = [];
  var neid_ue = [];
  var neid_ukz = [];
  var neid_uk1 = [];
  neid_pe[6] = [];
  neid_ie[6] = [];
  neid_ieig[6] = [];
  neid_pepg[6] = [];
  neid_ki[6] = [];
  neid_ce[6] = [];
  neid_ue[6] = [];
  neid_ukz[6] = 0;
  neid_uk1[6] = 0;
  kt[6] = 0;
  neid_pe[6][0] = 0;
  neid_pe[6][1] = 0;
  neid_pe[6][2] = 0;
  neid_ce[6][0] = 0;
  neid_ce[6][1] = 0;
  neid_ce[6][2] = 0;
  var neid_ue_max = [];
  var metka = false;

  for (var stroy_y = 1; stroy_y <= count; stroy_y++) {
    array_prov[stroy_y] = 1;
  }
  for (var i = 1; i <= neid_n + 1; i++) {
    neid_ukz[i - 1] = 0;
    neid_uk1[i - 1] = 0;
    neid_ue_max[6] = 0;
    neid_rg[i - 1] = 0;
    neid_X_all[i - 1] = 0;
    kt[i - 1] = 0;
    neid_re[i - 1] = 0;

    lt[i - 1] = [];
    st[i - 1] = [];
    Xi_mas[i - 1] = [];
    neid_ie[i - 1] = [];
    neid_ieig[i - 1] = [];
    neid_pepg[i - 1] = [];
    neid_ki[i - 1] = [];
    neid_pg[i - 1] = [];
    neid_pe[i - 1] = [];
    neid_ce[i - 1] = [];
    neid_ue[i - 1] = [];

    for (var b = 1; b <= 3; b++) {
      lt[i - 1][b - 1] = 0;
      st[i - 1][b - 1] = 0;
      Xi_mas[i - 1][b - 1] = 0;
      neid_ie[i - 1][b - 1] = 0;
      neid_ieig[i - 1][b - 1] = 0;
      neid_pepg[i - 1][b - 1] = 0;
      neid_ki[i - 1][b - 1] = 0;
      neid_pg[i - 1][b - 1] = 0;
      neid_pe[i - 1][b - 1] = 0;
      neid_ce[i - 1][b - 1] = 0;
      neid_ue[i - 1][b - 1] = 0;

      neid_ie[6][b - 1] = 0;
      neid_ieig[6][b - 1] = 0;
      neid_pepg[6][b - 1] = 0;
      neid_ki[6][b - 1] = 1;
      //neid_pe[6][b - 1] = 0;
      //neid_ce[6][b - 1] = 0;
      neid_ue[6][b - 1] = 0;
      lt[i - 1][b - 1] = 0;
      st[i - 1][b - 1] = 0;
      var with_n1 = $("#with_n" + i + "_" + b).val() * 1;
      var before_n1 = $("#befor_n" + i + "_" + b).val() * 1;
      //alert(with_n1 +" "+ before_n1);
      if (with_n1 == 0 && before_n1 != 0) {
        with_n1 = before_n1;
      } else if (before_n1 == 0 && with_n1 != 0) {
        before_n1 = with_n1;
      }

      if (with_n1 > before_n1) {
        //alert("Лист НЕИД. ТРАНСПОЗИЦИЯ \n Вы ошибочно ввели значения для Части " + i + "." + b);
        metka = true;
        break;
      } else {
        if (before_n1 > count || with_n1 > count) {
          //alert("Лист НЕИД. ТРАНСПОЗИЦИЯ \n Вы привысили число заданных строительных длин в Части " +
          //   i + "." + b);
          metka = true;
          break;
        } else {
          /*if ((with_n1 == 0) && (before_n1 == 0)){
                                
                            }
                            else if (with_n1 == 0) {

                            }
                            else if (before_n1 == 0){

                            }*/
          for (var j = with_n1; j <= before_n1; j++) {
            lt[i - 1][b - 1] += stroy_otr[j]; //Этап 0
            st[i - 1][b - 1] += stroy_otr[j] * betwen_phase[j];
          }
          if (lt[i - 1][b - 1] != 0) {
            st[i - 1][b - 1] = st[i - 1][b - 1] / lt[i - 1][b - 1]; //Этап 0
            Xi_mas[i - 1][b - 1] =
              omega *
              (miu / (2 * Math.PI)) *
              lt[i - 1][b - 1] *
              Math.log(st[i - 1][b - 1] / r2);
          } else {
            Xi_mas[i - 1][b - 1] = 0;
          }
          neid_ig[0] = ig_1;
          neid_ig[1] = ig_2;
          neid_ig[2] = ig_3;
          neid_ue[i - 1][b - 1] = Xi_mas[i - 1][b - 1] * neid_ig[neid_reg]; //Этап 1
        }
      }
      if (metka == false) {
        for (var jo = with_n1; jo <= before_n1; jo++) {
          if (array_prov[jo] != 0) {
            array_prov[jo] = 0;
            metka = false;
          } else if (jo != 0) {
            //alert("Вы дважды ввели длину №" + jo);

            metka = true;
            break;
          }
          /*else{
                                alert("Вы не указали Часть транспозиции");
                                
                                metka = true;
                                break;
                            }*/
        }
      }
    }
  }
  if (metka == false) {
    /*for (var stroy_y = 1; stroy_y <= count; stroy_y++) {
                    var metka1 = false;
                    if (array_prov[stroy_y] != 1) {
                        //alert("Вы забыли ввести Часть №" + stroy_y);
                        metka1 = true;
                        break;
                    }
                    if (!metka1) {
                        metka = true;
                    }

                }
                    */
  }
  if (metka == false) {
    //Здесь считаем
    for (var i = 1; i <= neid_n + 1; i++) {
      for (var b = 1; b <= 3; b++) {
        neid_re[i - 1] =
          (lt[i - 1][0] + lt[i - 1][1] + lt[i - 1][2]) * (pe / fe);
        neid_X_all[i - 1] =
          Xi_mas[i - 1][0] + Xi_mas[i - 1][1] + Xi_mas[i - 1][2];

        kt[i - 1] =
          Math.sqrt(
            Math.pow(
              neid_ue[i - 1][0] - 0.5 * (neid_ue[i - 1][1] + neid_ue[i - 1][2]),
              2
            ) +
              Math.pow(
                0.5 * Math.sqrt(3) * (neid_ue[i - 1][1] - neid_ue[i - 1][2]),
                2
              )
          ) /
          (neid_ue[i - 1][0] + neid_ue[i - 1][1] + neid_ue[i - 1][2]); //Этап 2

        neid_ie[i - 1][b - 1] =
          (1 / Math.sqrt(1 + Math.pow(neid_re[i - 1] / neid_X_all[i - 1], 2))) *
          neid_ig[b - 1] *
          kt[i - 1];

        neid_ieig[i - 1][b - 1] =
          (1 / Math.sqrt(1 + Math.pow(neid_re[i - 1] / neid_X_all[i - 1], 2))) *
          kt[i - 1];

        neid_pepg[i - 1][b - 1] =
          Math.pow(neid_ieig[i - 1][b - 1], 2) * (pe / pg) * (fg / fe);

        neid_ki[i - 1][b - 1] = 1 / Math.sqrt(1 + neid_pepg[i - 1][b - 1]);

        neid_rg[i - 1] =
          (lt[i - 1][0] + lt[i - 1][1] + lt[i - 1][2]) * (pg / fg);

        neid_pg[i - 1][b - 1] =
          (3 / 1000) * Math.pow(neid_ig[b - 1], 2) * neid_rg[i - 1] * kn;

        neid_pe[i - 1][b - 1] = neid_pepg[i - 1][b - 1] * neid_pg[i - 1][b - 1];

        neid_ce[i - 1][b - 1] = neid_pe[i - 1][b - 1] * 8.76 * C;

        neid_ue_max[i - 1] = Math.max(neid_ue[i - 1][0], neid_ue[i - 1][2]);
        neid_ukz[i - 1] = Math.max(Xi_mas[i - 1][0], Xi_mas[i - 1][2]) * ik3;
        neid_uk1[i - 1] =
          (2 / 3) * ik1 * Math.max(Xi_mas[i - 1][0], Xi_mas[i - 1][2]);

        if (kt[6] < kt[i - 1]) {
          kt[6] = kt[i - 1];
        }

        if (neid_ie[6][b - 1] < neid_ie[i - 1][b - 1]) {
          neid_ie[6][b - 1] = neid_ie[i - 1][b - 1];
        }
        if (neid_ieig[6][b - 1] < neid_ieig[i - 1][b - 1]) {
          neid_ieig[6][b - 1] = neid_ieig[i - 1][b - 1];
        }
        if (neid_pepg[6][b - 1] < neid_pepg[i - 1][b - 1]) {
          neid_pepg[6][b - 1] = neid_pepg[i - 1][b - 1];
        }
        if (neid_ki[6][b - 1] > neid_ki[i - 1][b - 1]) {
          neid_ki[6][b - 1] = neid_ki[i - 1][b - 1];
        }
        neid_pe[6][b - 1] += neid_pe[i - 1][b - 1];
        neid_ce[6][b - 1] += neid_ce[i - 1][b - 1];

        if (neid_ue_max[6] < neid_ue_max[i - 1]) {
          neid_ue_max[6] = neid_ue_max[i - 1];
        }
        if (neid_ukz[6] < neid_ukz[i - 1]) {
          neid_ukz[6] = neid_ukz[i - 1];
        }
        if (neid_uk1[6] < neid_uk1[i - 1]) {
          neid_uk1[6] = neid_uk1[i - 1];
        }
      }
      if (
        (neid_ue[i - 1][0] == 0 && neid_ue[i - 1][1] == 0) ||
        (neid_ue[i - 1][1] == 0 && neid_ue[i - 1][2] == 0) ||
        (neid_ue[i - 1][2] == 0 && neid_ue[i - 1][0] == 0)
      ) {
        neid_ue_max[i - 1] = 0;
        neid_ukz[i - 1] = 0;
        neid_uk1[i - 1] = 0;
        if (neid_ue_max[6] < neid_ue_max[i - 1]) {
          neid_ue_max[6] = neid_ue_max[i - 1];
        }
        if (neid_ukz[6] < neid_ukz[i - 1]) {
          neid_ukz[6] = neid_ukz[i - 1];
        }
        if (neid_uk1[6] < neid_uk1[i - 1]) {
          neid_uk1[6] = neid_uk1[i - 1];
        }
      }
    }

    neid_detaliz = neid_detaliz - 1;
    if (neid_detaliz == -1) {
      $("input[name=neid_ig]").val(sigFigs(neid_ig[neid_reg])); // записываем результат
      $("input[name=neid_ie]").val(sigFigs(neid_ie[6][neid_reg])); // записываем результат
      $("input[name=neid_ieig]").val(sigFigs(neid_ieig[6][neid_reg])); // записываем результат
      $("input[name=neid_rerg]").val(sigFigs(neid_pepg[6][neid_reg])); // записываем результат
      $("input[name=neid_ki]").val(sigFigs(neid_ki[6][neid_reg])); // записываем результат
      $("input[name=neid_3pe]").val(sigFigs(neid_pe[6][neid_reg])); // записываем результат
      $("input[name=neid_ce]").val(sigFigs(neid_ce[6][neid_reg])); // записываем результат
      $("input[name=neid_ue]").val(sigFigs(neid_ue_max[6])); // записываем результат
      $("input[name=neid_uk3]").val(sigFigs(neid_ukz[6])); // записываем результат
      $("input[name=neid_uk1]").val(sigFigs(neid_uk1[6])); // записываем результат
      $("input[name=neid_kt]").val(sigFigs(kt[6]));
      if (neid_ki[6][neid_reg] <= limit_ki) {
        $("input[name=neid_ki]").css("background-color", "red");
      } else {
        $("input[name=neid_ki]").css("background-color", "");
      }
      if (neid_ce[6][neid_reg] >= limit_money) {
        $("input[name=neid_ce]").css("background-color", "red");
      } else {
        $("input[name=neid_ce]").css("background-color", "");
      }
      if (neid_ue_max[6] > limit_norm_ue) {
        $("input[name=neid_ue]").css("background-color", "red");
      } else {
        $("input[name=neid_ue]").css("background-color", "");
      }
      if (neid_ukz[6] > limit_out_ue) {
        $("input[name=neid_uk3]").css("background-color", "red");
      } else {
        $("input[name=neid_uk3]").css("background-color", "");
      }
      if (neid_uk1[6] > limit_out_ue) {
        $("input[name=neid_uk1]").css("background-color", "red");
      } else {
        $("input[name=neid_uk1]").css("background-color", "");
      }
    } else {
      $("input[name=neid_ig]").val(sigFigs(neid_ig[neid_reg])); // записываем результат
      $("input[name=neid_ie]").val(sigFigs(neid_ie[neid_detaliz][neid_reg])); // записываем результат
      $("input[name=neid_ieig]").val(
        sigFigs(neid_ieig[neid_detaliz][neid_reg])
      ); // записываем результат
      $("input[name=neid_rerg]").val(
        sigFigs(neid_pepg[neid_detaliz][neid_reg])
      ); // записываем результат
      $("input[name=neid_ki]").val(sigFigs(neid_ki[neid_detaliz][neid_reg])); // записываем результат
      $("input[name=neid_3pe]").val(sigFigs(neid_pe[neid_detaliz][neid_reg])); // записываем результат
      $("input[name=neid_ce]").val(sigFigs(neid_ce[neid_detaliz][neid_reg])); // записываем результат
      $("input[name=neid_ue]").val(sigFigs(neid_ue_max[neid_detaliz])); // записываем результат
      $("input[name=neid_uk3]").val(sigFigs(neid_ukz[neid_detaliz])); // записываем результат
      $("input[name=neid_uk1]").val(sigFigs(neid_uk1[neid_detaliz])); // записываем результат
      $("input[name=neid_kt]").val(sigFigs(kt[neid_detaliz]));
      if (neid_ki[neid_detaliz][neid_reg] < limit_ki) {
        $("input[name=neid_ki]").css("background-color", "red");
      } else {
        $("input[name=neid_ki]").css("background-color", "");
      }
      if (neid_ce[neid_detaliz][neid_reg] > limit_money) {
        $("input[name=neid_ce]").css("background-color", "red");
      } else {
        $("input[name=neid_ce]").css("background-color", "");
      }
      if (neid_ue_max[neid_detaliz] > limit_norm_ue) {
        $("input[name=neid_ue]").css("background-color", "red");
      } else {
        $("input[name=neid_ue]").css("background-color", "");
      }
      if (neid_ukz[neid_detaliz] > limit_out_ue) {
        $("input[name=neid_uk3]").css("background-color", "red");
      } else {
        $("input[name=neid_uk3]").css("background-color", "");
      }
      if (neid_uk1[neid_detaliz] > limit_out_ue) {
        $("input[name=neid_uk1]").css("background-color", "red");
      } else {
        $("input[name=neid_uk1]").css("background-color", "");
      }
    }
    if (
      (neid_reg == 0 && ig_1 == 0) ||
      (neid_reg == 1 && ig_2 == 0) ||
      (neid_reg == 2 && ig_3 == 0)
    ) {
      $("input[name=neid_ig]").val("--"); // записываем результат
      $("input[name=neid_ie]").val("--"); // записываем результат
      $("input[name=neid_ieig]").val("--"); // записываем результат
      $("input[name=neid_rerg]").val("--"); // записываем результат
      $("input[name=neid_ki]").val("--"); // записываем результат
      $("input[name=neid_3pe]").val("--"); // записываем результат
      $("input[name=neid_ce]").val("--"); // записываем результат
      $("input[name=neid_ue]").val("--");
      $("input[name=neid_kt]").val("--");
      $("input[name=neid_ki]").css("background-color", "");

      $("input[name=neid_ce]").css("background-color", "");

      $("input[name=neid_ue]").css("background-color", "");
    }
    if ($("input[name=neid_ki]").val() == "--") {
      $("input[name=neid_ki]").css("background-color", "");
    }
    if ($("input[name=neid_ce]").val() == "--") {
      $("input[name=neid_ce]").css("background-color", "");
    }
    if ($("input[name=neid_ue]").val() == "--") {
      $("input[name=neid_ue]").css("background-color", "");
    }
    if (neid_ukz[6] > limit_out_ue) {
      $("input[name=neid_uk3]").css("background-color", "red");
    } else {
      $("input[name=neid_uk3]").css("background-color", "");
    }
    if (neid_uk1[6] > limit_out_ue) {
      $("input[name=neid_uk1]").css("background-color", "red");
    } else {
      $("input[name=neid_uk1]").css("background-color", "");
    }
    if (ik3 == 0) {
      $("input[name=neid_uk3]").val("--");
      $("input[name=neid_uk3]").css("background-color", "");
    }

    if (ik1 == 0) {
      $("input[name=neid_uk1]").val("--");
      $("input[name=neid_uk1]").css("background-color", "");
    }
  }
  if (metka) {
    $("input[name=neid_ig]").val("--"); // записываем результат
    $("input[name=neid_ie]").val("--"); // записываем результат
    $("input[name=neid_ieig]").val("--"); // записываем результат
    $("input[name=neid_rerg]").val("--"); // записываем результат
    $("input[name=neid_ki]").val("--"); // записываем результат
    $("input[name=neid_3pe]").val("--"); // записываем результат
    $("input[name=neid_ce]").val("--"); // записываем результат
    $("input[name=neid_ue]").val("--");
    $("input[name=neid_kt]").val("--");
    $("input[name=neid_uk3]").val("--");
    $("input[name=neid_uk1]").val("--");
    $("input[name=neid_uk3]").css("background-color", "");
    $("input[name=neid_uk1]").css("background-color", "");
    $("input[name=neid_ue]").css("background-color", "");
    $("input[name=neid_ki]").css("background-color", "");
    $("input[name=neid_ce]").css("background-color", "");
  }
  /*********************ПАРАМЕТРЫ КЛ************************/
  var v = Math.pow(ieig_1, 2);
  var param_rg = (pg / fg) * 1000;
  var param_re = (pe / fe) * 1000;
  var param_r3 = (Math.PI / 4) * miu * frg * 1000;
  var S_sr = $("input[name=S_]").val();
  var param_xez =
    omega *
    (miu / (2 * Math.PI)) *
    1000 *
    Math.log(Math.pow(D3 * 1000, 3) / (r2 * Math.pow(S_sr, 2)));
  var h =
    Math.pow(param_re, 2) /
    (Math.pow(param_re + 3 * param_r3, 2) + Math.pow(param_xez, 2));

  var param_ek_ground =
    document.getElementById("param_ek_ground").options.selectedIndex;
  var param_r1 = [];
  var param_r0 = [];
  param_r1[0] = param_rg + v * param_re;
  param_r0[0] = param_rg + param_re - h * (param_re + 3 * param_r3);
  param_r1[1] = param_rg;
  param_r0[1] = param_rg + 3 * param_r3;
  param_r1[2] = param_rg;
  param_r0[2] = param_rg + param_re - h * (param_re + 3 * param_r3);

  $("#param_r1").val(sigFigs(param_r1[param_ek_ground]));
  $("#param_r0").val(sigFigs(param_r0[param_ek_ground]));

  var param_x1 = [];
  var param_x0 = [];
  var r1 = ($("#d1").val() * 1) / 2;
  param_x1[0] =
    omega *
    (miu / (2 * Math.PI)) *
    1000 *
    Math.log((S_sr / r1) * Math.pow(r2 / S_sr, v));
  param_x1[1] =
    omega *
    (miu / (2 * Math.PI)) *
    1000 *
    Math.log((S_sr / r1) * Math.pow(r2 / S_sr, 0));
  param_x1[2] = param_x1[1];

  param_x0[0] =
    omega *
    (miu / (2 * Math.PI)) *
    1000 *
    Math.log(
      Math.pow(D3 * 1000, 3 * h) /
        (r1 * Math.pow(r2, h - 1) * Math.pow(S_sr, 2 * h))
    );
  param_x0[1] =
    omega *
    (miu / (2 * Math.PI)) *
    1000 *
    Math.log(
      Math.pow(D3 * 1000, 3 * 1) /
        (r1 * Math.pow(r2, 1 - 1) * Math.pow(S_sr, 2 * 1))
    );
  param_x0[2] = param_x0[0];

  $("#param_x1").val(sigFigs(param_x1[param_ek_ground]));
  $("#param_x0").val(sigFigs(param_x0[param_ek_ground]));

  var param_l1 = [];
  var param_l0 = [];

  param_l1[0] = (param_x1[0] / omega) * 1000;
  param_l1[1] = (param_x1[1] / omega) * 1000;
  param_l1[2] = (param_x1[2] / omega) * 1000;

  param_l0[0] = (param_x0[0] / omega) * 1000;
  param_l0[1] = (param_x0[1] / omega) * 1000;
  param_l0[2] = (param_x0[2] / omega) * 1000;

  $("#param_l1").val(sigFigs(param_l1[param_ek_ground]));
  $("#param_l0").val(sigFigs(param_l0[param_ek_ground]));

  var d_elec1 = $("#d_elec1").val();
  var param_cc =
    ((2 * Math.PI * 8.85 * Math.pow(10, -12) * d_elec1) / Math.log(r2 / r1)) *
    Math.pow(10, 9);
  var param_xx = 1 / (omega * param_cc);
  var uc = $("#Uc").val();
  var param_ic = (uc / (1000 * Math.sqrt(3))) * omega * param_cc;

  $("#param_cc").val(sigFigs(param_cc));
  $("#param_xx").val(sigFigs(param_xx));
  $("#param_ic").val(sigFigs(param_ic));
}

/* function change_with_from_before(event) {

             var d = event.target.id; //id измененого элемента before
             var num_s = Number(d[7]);
             var num_h = Number(d[9]);
             if (num_h == 3) {
                 num_h = 1;
                 num_s++;
             } else {
                 num_h++;
             }
             $("#with_n" + num_s + "_" + num_h).val($("#" + d).val() * 1 + 1);
         } */
//Инженерная точность
function sigFigs(n) {
  if (n != 0) {
    var mult = Math.pow(10, 3 - Math.floor(Math.log(n) / Math.LN10) - 1);
    var exit = Math.round(n * mult) / mult;
    if (isNaN(exit)) {
      return "--";
    } else {
      return exit;
    }
  } else {
    return 0;
  }
}
//Возврат настроек
function returnDefault() {}
//Ключик

function decoder() {
  var my_serial = $("#kod_d").val();
  var now = new Date();
  var tYear = now.getFullYear();
  var tMon = now.getMonth();
  var tDay = now.getDate();
  var date = my_serial.substring(0, my_serial.length - 6);

  var id_progr = parseInt(
    my_serial.substring(my_serial.length - 6, my_serial.length - 3)
  );

  var id_user = parseInt(my_serial.substring(my_serial.length - 3));

  var yourNumber = parseInt(date, 16);
  if (yourNumber % 87 == 0) {
    yourNumber = yourNumber / 87;
  } else {
    return false;
  }
  var youYear = yourNumber % 10000;
  var youMon = Math.floor((yourNumber / 10000) % 100);
  var youDay = Math.floor((yourNumber / 1000000) % 10000);

  if (id_progr == 114) {
    if (youYear > tYear) {
      return true;
    } else if (youYear == tYear) {
      if (youMon > tMon + 1) {
        return true;
      } else if (youMon == tMon + 1) {
        if (youDay >= tDay) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function my_default() {
  $("#Fg1").val(50);
  $("#set_kn").val(1.0);
  $("#k_money1").val(2);
  $("#ud_grunt1").val(100);
  $("#d_glub1").val(1);
  $("#limit_ki").val(0.9);
  $("#limit_money").val(100);
  $("#norm_ue").val(100);
  $("#out_ue").val(5);
  $("#psi1").val(0.9);
  $("#psi2").val(0.5);
  $("#ud_s_m").val(0.02);
  $("#ud_s_al").val(0.032);

  $("#kab_r_cu").val(0.0172);
  $("#kab_r_al").val(0.028);
  $("#kab_kt_cu").val(0.0039);
  $("#kab_kt_al").val(0.0039);
}

function clearTexts() {
  $("input[name=neid_uk3]").css("background-color", "");
  $("input[name=neid_uk1]").css("background-color", "");
  $("input[name=neid_ue]").css("background-color", "");
  $("input[name=neid_ki]").css("background-color", "");
  $("input[name=neid_ce]").css("background-color", "");
  $("input[name=dbl_ki]").css("background-color", "");
  $("input[name=dbl_ce]").css("background-color", "");
  $("input[name=single_ue]").css("background-color", "");
  $("input[name=single_uk1]").css("background-color", "");
  $("input[name=single_uk3]").css("background-color", "");
  full_cicle_trans_l8();
}

function clear_div1_() {
  $("#Ukab").val("");
  $("#sech1").val("");
  $("#sech2").val("");
  document.getElementById("material").value = "cu";
  document.getElementById("material1").value = "cu";
  document.getElementById("geometry").value = "math";
  $("#psi1").val(0.9);
  $("#psi2").val(0.5);
  $("#kab_tj_unt_kz").val(90);
  $("#kab_te_unt_kz").val(80);

  $("#d_elec1").val(2.5);
  $("#d1").val("");
  $("#d2").val("");
  $("#d3").val("");
  $("#d4").val("");
  blokpost();
}
function clear_div3_() {
  $("#Uc").val("");
  document.getElementById("neitral").value = "ground";
  document.getElementById("param_ground").value = "ground";
  $("#In1").val("");
  $("#In2").val("");
  $("#In3").val("");
  $("#Ik3").val("");
  $("#Ik1").val("");
  close_pile_list3();
}
function clear_div2_() {
  $("#sp_kol_dlin1").val("1");
  document.getElementById("sposob_all").value = "first";
  dinamic_part();
  sposobi();
  document.getElementById("sp_keep1").value = "teck_in";
  $("#otrezok1").val("0");
  $("#dlinn11").val("0");

  $("#L_").val("");
  $("#S_").val("");
  $("#dS_").val("");
}

function new_t_math(material, struct) {
  kab_tj_unt_kz = $("#kab_tj_unt_kz").val() * 1;
  kab_te_unt_kz = $("#kab_te_unt_kz").val() * 1;
  kab_kt_cu = $("#kab_kt_cu").val() * 1;
  kab_kt_al = $("#kab_kt_al").val() * 1;
  kab_r_cu = $("#kab_r_cu").val() * 1;
  kab_r_al = $("#kab_r_al").val() * 1;

  if (struct == 0 && material == 0) {
    return kab_r_cu * (1 + kab_kt_cu * (kab_tj_unt_kz - 20));
  } else if (struct == 0 && material == 1) {
    return kab_r_al * (1 + kab_kt_al * (kab_tj_unt_kz - 20));
  } else if (struct == 1 && material == 0) {
    return kab_r_cu * (1 + kab_kt_cu * (kab_te_unt_kz - 20));
  } else if (struct == 1 && material == 1) {
    return kab_r_al * (1 + kab_kt_al * (kab_te_unt_kz - 20));
  }
}
