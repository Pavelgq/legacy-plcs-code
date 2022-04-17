var page = 0;
var tr_princ = 0;
var tr_grunt = 0;
var tr_transport = 0;
var gnb_transport = 0;

var standart_d = [
  32, 40, 50, 63, 75, 90, 110, 125, 140, 160, 180, 200, 225, 250, 280, 315, 355,
  400,
];
var standart_SN = [12, 16, 24, 32, 48, 64, 96];
var standatr_Drh = [200, 300, 400, 500, 600, 700, 800, 900, 1000];
var g = 9.81;

var index_st_d = 0;
var index_st_d_gn = 0;

var index_st_SN = 0;
var index_Drh = 0;
var index_st_gn_SN = 0;

//Объявление переменных расчетов
var kt_n;
var kt_d;
var kt_dekv;
var kt_dv_dekv;
var kt_dv_;
var tr_h;
var tr_grunt;
var tr_transport;
var tr_modul;
var tr1_qg;
var tr1_qt;
var tr1_qsum;
var tr1_SN;
var tr1_SN_mas;
var tr1_D;
var tr1_e;
var tr1_Fmax;
var tr1_Dv;
var tr1_Dv_dekv;

var kt_d_min;

var gn_transport;
var gn_d;
var gn_n;
var gn_d_min;
var gn_dekv;
var gn_dv_;
var gn_dv_dekv;
var gn_modul;
var gn_scene;

var gnb1_qr_min;
var gnb1_qt_min;
var gnb1_qsum_min;
var gnb1_SN_min;
var gnb1_SN_mas;
var gnb1_D;
var gnb1_e;
var gnb1_F;
var gnb1_Fmax;
var gnb1_Dv;
var gnb1_Dv_dekv;
var gnb1_Hr;
var gnb1_dekv;
var gnb1_Drsh_Dekv;
var gnb_L;
var gnb_N;
var gnb_Hmin;
var gnb_Hmax;

var gnb1_qg_;
var gnb1_P;

var gn_modul;

var set_pg;
var set_E;
var set_sigma;
var set_pro;
var set_miu;
var set_F_Fmax;
var set_pho_b;
var set_Pi;
var set_P_Pmax;

var f_;
var D_e_;
var math_pred_;
var D_final = 0;

var $calcEl = $(".calc_all");
var kod_status = false;

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
    } else {
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
  }
  kod_root();
  math_kt_dekv();
  math_fr_modul();
  tr1_qg_();
  tr1_qt_();

  math_gn_dekv();
  math_gn_d_min();
  math_gnb1_dekv();

  // hideshow();//что это?
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

  const data = getJson($("form"));

  const kt_d = $("#kt_d").val() * 1;
  const kt_n = document.getElementById("kt_n").options.selectedIndex * 1 + 1;
  sendActionData("save", my_file_name, JSON.parse(data), kt_d, kt_n);
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
    console.log(reader, data, "data");
    //};
  });
  reader.readAsText(file, "UTF-8");
  console.log(file, "filename");
  const fileName = file.name.split(".");

  const kt_d = $("#kt_d").val() * 1;
  const kt_n = document.getElementById("kt_n").options.selectedIndex * 1 + 1;
  sendActionData(
    "load",
    fileName[0],
    reader.result || JSON.stringify(getJson($("form"))),
    kt_d,
    kt_n
  );
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

function vibor_file() {
  var k = $("#fileToLoad").val().replace("C:\\fakepath\\", "");
  if ($("#fileToLoad").val() == "") {
    alert("Файл не выбран" + k);
  } else {
    alert("Загружены данные из файла: " + k);
  }
}

function loadpage() {
  $("#add").on("click", add);
  $("#save").on("click", save);

  $("#vibor").on("click", vibor_file);

  $("#fileToLoad").on("change", loadFile);

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
    if (page < 7) {
      page++;
      $("#div_" + page).show();
      $("#div_" + (page - 1)).hide();
    }
  });
  // Функция реагирует на клавиши со стрелками
  $(document).keydown(function (e) {
    if (e.keyCode == 37 && logic1 == false) {
      $("#div_10").hide(); //все остальные страницы скрываем
      $("#div_11").hide();
      $("#div_12").hide();

      if (page > 0) {
        page--;
        $("#div_" + page).show();
        $("#div_" + (page + 1)).hide();
      }
    } else if (e.keyCode == 39 && logic1 == false) {
      $("#div_10").hide(); //все остальные страницы скрываем
      $("#div_11").hide();
      $("#div_12").hide();
      $("#div_0").hide();
      if (page < 7) {
        page++;
        $("#div_" + page).show();
        $("#div_" + (page - 1)).hide();
      }
    }
  });

  $("input[type='checkbox'], input[type='radio'], input[type='text']").on(
    "click",
    showValues
  );
  $("select").on("change", showValues);

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
  //все остальные страницы скрываем
  $("#div_11").hide();
  $("#div_12").hide();
  $("#div_1").hide();

  $("#m_about_prg").click(function () {
    for (var i = 1; i <= 9; i++) {
      $("#div_" + i).hide();
    }
    $("#div_10").show();
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
  //Здесь

  $("#kod_d").on("change", kod_root);

  //Динамический вызов функций по событиям
  $("#fileToLoad").on("change", function () {
    var a = $("#fileToLoad").val().replace("C:\\fakepath\\", "");

    $("#name_to_file").val(a);
    if (a == "") {
      $("#name_to_file").val("");
    }
  });
  $("#ativated").on("click", activ_my_prog);
  $(".calc_all").on("click", math_all);
  $("#calc_form").on("change", function () {
    if (!kod_status) {
      // alert("Вы ввели неверный код активации");
    } else {
      if ($("#div_1").css("display") != "none") {
        clear_tr_math();
      }
      //if ($("#div_2").css('display') != 'none') {
      $("#tr1_SN_mas").on("change", tr1_e_);
      //};
      if ($("#div_2").css("display") != "none") {
        clear_gnb_math();
      }
      if ($("#div_6").css("display") != "none") {
        $("#gnb1_SN_mas").on("change", gnb1_e_);
        $("#gnb1_Drsh").on("change", math_gnb1_Hr);
      }

      $("#kt_d").on("change", math_kt_dekv);
      math_kt_dekv();
      $("#kt_n").on("change", math_kt_dekv);

      $("#kt_dekv").on("change", math_kt_dv_);

      $("#kt_dv_dekv").on("change", math_kt_dv_);
      /*$('#kt_dv_dekv').on("change", tr1_qt_);*/

      $("#tr_h").on("change", math_fr_modul);

      $("#kt_d").on("change", math_kt_d_min);
      $("#kt_n").on("change", math_kt_d_min);
      $("#kt_dekv").on("change", math_kt_d_min);
      /*  $('#tr_h').on("change", tr1_SN_);
            $('#tr_grunt').on("change", math_fr_modul);
            $("#n_pho").on("change", tr1_qg_);
            $("#tr_h").on("change", tr1_qg_);
            $("#tr_h").on("change", tr1_qt_);
            $("#tr_transport").on("change", tr1_qt_);
            $("#tr1_SN_mas").on("change", tr1_e_);
            $("#kt_d_min").on("change", tr1_e_);*/

      math_gn_dekv();
      $("#gn_d").on("change", math_gn_dekv);
      $("#gn_n").on("change", math_gn_dekv);
      $("#gn_dv_dekv").on("change", math_gn_dekv);
      $("#gn_dekv").on("change", math_gn_dv_);

      $("#gn_n").on("change", math_gn_d_min);
      $("#gn_d").on("change", math_gn_d_min);
      $("#gn_dv_dekv").on("change", math_gn_d_min);
      $("#gn_d_min").on("change", change_gnb_d_min);

      /*   $('#gn_n').on("change", math_gnb1_dekv);
            $('#gn_d').on("change", math_gnb1_dekv);*/

      /* $('#gn_dv_dekv').on("change", math_gnb1_dekv);*/

      $("#gn_dv_dekv").on("change", math_gn_dv_);
      /*   $('#gn_d_min').on("change", math_gnb1_dekv);


            $('#gnb1_Drsh').on("change", math_gnb1_Hr);
            $('#gn_d_min').on("change", math_gnb1_F);
            $('#gn_n').on("change", math_gnb1_Hr);
            $('#gn_d').on("change", math_gnb1_Hr);
            $('#gnb_L').on("change", math_gnb1_Hr);

            $('#gnb_N').on("change", math_gnb1_dekv);

            $('#gnb1_SN_mas').on("change", gnb1_e_);

            $('#gnb_Hmin').on("change", math_gnb1_qr_min);
            //$('#gnb_Hmin').on("change", math_gnb_modul);
            $('#gnb_Hmax').on("change", math_gnb1_qr_min);
            //$('#gnb_grunt').on("change", math_gnb_modul);
            $('#gn_transport').on("change", math_gnb1_qr_min);
            $('#gn_scene').on("change", math_gnb1_Hr);


            $("#n_type1").on("change", math_gnb1_Hr);
            $("#n_type2").on("change", math_gnb1_Hr);
            $("#n_type3").on("change", math_gnb1_Hr);
            $("#n_type4").on("change", math_gnb1_Hr);
            $("#n_type5").on("change", math_gnb1_Hr);
            $("#n_type6").on("change", math_gnb1_Hr);
            $("#n_type7").on("change", math_gnb1_Hr);

            $('#gnb_L').on("change", math_gnb1_dekv);
            $('#n_short').on("change", math_gnb1_dekv);
            $('#n_medium').on("change", math_gnb1_dekv);
            $('#n_long').on("change", math_gnb1_dekv);
            $('#n_very_long').on("change", math_gnb1_dekv);



            $("#n_pq").on("change", tr1_qg_);
            $("#n_E").on("change", tr1_e_);
            $("#n_sigma").on("change", tr1_e_);
            $('#n_pro').on("change", math_gnb1_F);
            $('#n_min').on("change", math_gnb1_F);
            $('#n_F_Fmax').on("change", math_gnb1_SN);
            $('#n_sigma').on("change", math_gnb1_SN);
            $('#n_E').on("change", math_gnb1_SN);
            $('#n_pro').on("change", math_gnb1_qr_min);
            $('#n_E').on("change", gnb1_e_);
            $('#n_sigma').on("change", gnb1_e_);

            $('#gnb_grunt').on("change", math_gnb1_qr_min);
*/
      $("#clear_all").on("click", clearTexts);
      $("#m_default").on("click", my_default);

      $("#tr_in_sloy").on("click", border_change);
      $("#tr_in_border").on("click", border_change);
      $("#tr_tok_search").on("click", border_change);
      $("#gn_in_sloy").on("click", border_change);
      $("#gn_in_border").on("click", border_change);
      $("#gn_tok_search").on("click", border_change);

      /*$('#n_P_Pmax').on("change", math_gnb1_qr_min);
            $('#n_Pi').on("change", math_gnb1_qr_min);
            $('#n_pho_b').on("change", math_gnb1_qr_min);*/
    }
  });
}

function math_all() {
  console.log("math...");
  if (kod_status) {
    var ge_1 = get_tr_();
    var ge_2 = get_gnb_();
    if (get_tr_() && typeof get_tr_() === "number") {
      /*math_kt_dekv();
        math_kt_dv_();
        math_fr_modul();*/

      tr1_qt_();

      tr1_SN_();

      tr1_qg_();
      tr1_qt_();
      tr1_e_();

      const data = getJson($("form"));

      const kt_d = $("#kt_d").val() * 1;
      const kt_n =
        document.getElementById("kt_n").options.selectedIndex * 1 + 1;
      sendActionData("calculation", "No name", JSON.parse(data), kt_d, kt_n);
    }
    if (get_gnb_() && typeof get_gnb_() === "number") {
      /*
        math_gn_dekv();
        math_gn_dv_();
        math_gn_d_min();
        */
      math_gnb1_dekv();
      math_gnb1_Hr();
      math_gnb1_F();
      gnb1_e_();
      math_gnb1_qr_min();
    }
    math_kt_dekv();
    math_kt_dv_();
    math_fr_modul();
    //if ($("#div_3").css('display') != 'none' || $("#div_4").css('display') != 'none'){
    /*
        math_kt_dekv();
        math_kt_dv_();
        tr1_qt_();
        math_fr_modul();
        tr1_SN_();

        tr1_qg_();
        tr1_qt_();
        tr1_e_();

        math_gn_dekv();
        math_gn_dv_();
        math_gn_d_min();
        math_gnb1_dekv();
        math_gnb1_Hr();
        math_gnb1_F();
        gnb1_e_();

        math_gnb1_qr_min();
        */
    //}
  } else {
    alert("Код доступа не активен");
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

function kod_root() {
  $("#kod_unvis").val($("#kod_d").val());
  decoder();
  $("#kod_d").off("change", kod_root);
}

function all_round(r, k) {
  if (isNaN(r)) {
    return "--";
  }
  if (k == 1) {
    return parseFloat(r).toFixed(1);
  }
  if (k == 2) {
    return parseFloat(r).toFixed(2);
  }
  return Math.trunc(r); //отбросить
  //return Math.ceil(r); //округлить вверх
  //return Math.floor(r); //округлить вниз
}

function math_kt_dekv() {
  kt_n = document.getElementById("kt_n").options.selectedIndex;
  kt_d = $("#kt_d").val() * 1;
  if (kt_d == 0) {
    kt_n = 8;
  }

  switch (kt_n) {
    case 0:
      kt_dekv = kt_d;
      break;
    case 1:
      kt_dekv = 2 * kt_d;
      break;
    case 2:
      kt_dekv = 2.15 * kt_d;
      break;
    case 3:
      kt_dekv = 2.41 * kt_d;
      break;
    case 4:
      kt_dekv = 3 * kt_d;
      break;
    case 5:
      kt_dekv = 3 * kt_d;
      break;
    case 6:
      kt_dekv = 3 * kt_d;
      break;

    default:
      kt_dekv = 0;
      break;
  }
  if (kt_dekv != 0) {
    $("#kt_dekv").val(all_round(kt_dekv));
    if ($("#kt_dv_dekv").val() * 1 != 0) {
      math_kt_dv_();
    }
  }
}

function math_kt_dv_() {
  kt_dekv = all_round(kt_dekv);
  kt_dv_dekv = $("#kt_dv_dekv").val() * 1;
  kt_dv_ = kt_dekv * kt_dv_dekv;
  if (kt_dekv != 0) {
    $("#kt_dv_").val(all_round(kt_dv_));
    var pustota = document.getElementById("kt_d_min").options[0].text;
    if (pustota == "--") {
      math_kt_d_min();
    }
  }
}

function math_kt_d_min() {
  kt_dv_ = all_round(kt_dv_);
  var d = kt_dv_ + 4;
  var i = 0;
  while (standart_d[i] < d) {
    i++;
  }
  //Создаем три поля с типовыми диаметрами больше d
  index_st_d = i;
  for (var j = 0; j < 18; ++j) {
    $("#kt_d_min").find("option:last").remove();
  }

  for (var j = i; j < 18; ++j) {
    $("#kt_d_min").find("option:last").add();
    var option1 = $("<option/>", {
      value: "kt_d_min" + j,
      text: standart_d[j],
    });
    option1.appendTo($("#kt_d_min"));
  }
  //tr1_SN_();
}

function math_fr_modul() {
  tr_grunt = document.getElementById("tr_grunt").options.selectedIndex;
  tr_h = $("#tr_h").val() * 1;
  if (tr_h == 0) {
    tr_grunt = 8;
  }

  switch (tr_grunt) {
    case 0:
      tr_modul = 0;
      break;
    case 1:
      tr_modul = 0.1 * tr_h + 0.3;
      break;
    case 2:
      tr_modul = 0.2 * tr_h + 0.9;
      break;
    case 3:
      tr_modul = 0.3 * tr_h + 1.2;
      break;

    default:
      tr_modul = 0;
      break;
  }

  $("#tr_modul").val(all_round(tr_modul, 1));
  //tr1_SN_();
}

function tr1_qg_() {
  set_pg = $("#n_pho").val() * 1;
  tr1_qg = set_pg * g * tr_h;

  if (tr1_qg != 0) {
    $("#tr1_qg").val(all_round(tr1_qg, 1));
  }
}

function tr1_qt_() {
  tr_transport = document.getElementById("tr_transport").options.selectedIndex;
  switch (tr_transport) {
    case 0:
      tr1_qt = 0;
      break;
    case 1:
      tr1_qt = (20 * g) / (2.7 + tr_h);
      break;
    case 2:
      tr1_qt = (2 * 14 * g) / (2.7 + tr_h);
      break;
    default:
      tr1_qt = 0;
      break;
  }
  $("#tr1_qt").val(all_round(tr1_qt, 1));

  tr1_qsum = tr1_qg + tr1_qt;

  $("#tr1_qsum").val(all_round(tr1_qsum, 1));
  tr1_SN_();
}

function tr1_SN_() {
  tr1_SN = 0.458 * tr1_qsum - 7.5 * tr_modul;

  if (tr1_qsum != 0 /*&& (tr_modul != 0)*/) {
    if (tr1_SN >= 12) {
      $("#tr1_SN").val(all_round(tr1_SN, 1));
    } else $("#tr1_SN").val(12);
  }
  var i = 0;
  while (standart_SN[i] < tr1_SN) {
    i++;
  }
  //Создаем три поля с типовыми диаметрами больше d

  index_st_SN = i;
  for (var j = 0; j < 7; ++j) {
    $("#tr1_SN_mas").find("option:last").remove();
  }

  for (var j = i; j < 7; ++j) {
    $("#tr1_SN_mas").find("option:last").add();
    var option1 = $("<option/>", {
      value: "tr1_SN_mas" + j,
      text: standart_SN[j],
    });
    option1.appendTo($("#tr1_SN_mas"));
  }
  tr1_e_();
}

function tr1_e_() {
  var id_SN = document.getElementById("tr1_SN_mas").options.selectedIndex;
  if (index_st_SN + id_SN < 7 && index_st_SN + id_SN >= 0 && id_SN != -1) {
    tr1_SN_mas =
      standart_SN[
        index_st_SN +
          document.getElementById("tr1_SN_mas").options.selectedIndex
      ];
  } else {
    tr1_SN_mas = NaN;
  }
  kt_d_min =
    standart_d[
      index_st_d + document.getElementById("kt_d_min").options.selectedIndex
    ];
  set_E = $("#n_E").val();
  var root = Math.pow((set_E * 1000) / (12 * tr1_SN_mas), 1 / 3);
  var e1, e2;
  if (root != 1 && kt_dv_ != 0) {
    e1 = kt_dv_ / (root - 1);
  }
  if (root != -1 && kt_d_min != "--") {
    e2 = kt_d_min / (root + 1);
  }
  var e = Math.max(e1, e2);

  tr1_D = e * (root + 1); //Значение в марку трубы
  if (!isNaN(tr1_D)) {
    var i = 0;
    while (tr1_D > standart_d[i]) {
      ++i;
    }

    tr1_D = standart_d[i];
  }
  if (isNaN(tr1_D)) {
    $("#tr1_D").val("--");
    $("#tr_D_end").text("D");
  } else {
    $("#tr1_D").val(tr1_D);
    $("#tr_D_end").text(tr1_D);
  }

  tr1_e = tr1_D / (root + 1);
  $("#tr_e_end").text(tr1_e);
  if (isNaN(tr1_e)) {
    $("#tr1_e").val("--");
    $("#tr_e_end").text("e");
  } else {
    $("#tr1_e").val(all_round(tr1_e, 1));
    $("#tr_e_end").text(all_round(tr1_e, 1));
  }
  tr1_Dv = tr1_D - 2 * tr1_e;
  if (isNaN(tr1_Dv)) {
    $("#tr1_Dv").val("--");
  } else {
    $("#tr1_Dv").val(all_round(tr1_Dv, 1));
  }
  set_sigma = $("#n_sigma").val() * 1;

  tr1_Fmax =
    ((Math.PI * (Math.pow(tr1_D, 2) - Math.pow(tr1_Dv, 2))) / 4) *
    (set_sigma / 1000);
  //tr1_Fmax = all_round(tr1_Fmax, 1);
  tr1_Fmax = sigFigs(tr1_Fmax);
  if (isNaN(tr1_Fmax)) {
    $("#tr1_Fmax").val("--");
    $("#tr_Fmax_end").text("Fмакс");
  } else {
    $("#tr1_Fmax").val(all_round(tr1_Fmax));
    $("#tr_Fmax_end").text("F" + tr1_Fmax);
  }
  if (isNaN(tr1_SN_mas)) {
    $("#tr1_SN_mas").val("--");
    $("#tr_SN_end").text("SN");
  } else {
    $("#tr_SN_end").text("SN" + tr1_SN_mas);
  }

  tr1_Dv_dekv = tr1_Dv / kt_dekv;

  if (isNaN(tr1_Dv_dekv)) {
    $("#tr1_Dv_dekv").val("--");
  } else {
    $("#tr1_Dv_dekv").val(all_round(tr1_Dv_dekv, 2));
  }

  border_change();
}

//Расчет ГНД
function math_gn_dekv() {
  gn_n = document.getElementById("gn_n").options.selectedIndex;
  gn_d = $("#gn_d").val() * 1;
  if (gn_d == 0) {
    gn_n = 8;
  }

  switch (gn_n) {
    case 0:
      gn_dekv = gn_d;
      break;
    case 1:
      gn_dekv = 2 * gn_d;
      break;
    case 2:
      gn_dekv = 2.15 * gn_d;
      break;
    case 3:
      gn_dekv = 2.41 * gn_d;
      break;
    case 4:
      gn_dekv = 3 * gn_d;
      break;
    case 5:
      gn_dekv = 3 * gn_d;
      break;
    case 6:
      gn_dekv = 3 * gn_d;
      break;

    default:
      gn_dekv = 0;
      break;
  }
  if (gn_dekv != 0) {
    $("#gn_dekv").val(all_round(gn_dekv));
    if ($("#gn_dv_dekv").val() * 1 != 0) {
      math_gn_dv_();
    }
  }
}

function math_gn_dv_() {
  gn_dekv = all_round(gn_dekv);
  gn_dv_dekv = $("#gn_dv_dekv").val() * 1;
  gn_dv_ = gn_dekv * gn_dv_dekv;
  if (gn_dekv != 0) {
    $("#gn_dv_").val(all_round(gn_dv_));
    var pustota = document.getElementById("gn_d_min").options[0].text;
    if (pustota == "--") {
      math_gn_d_min();
    }
  }
}

function math_gn_d_min() {
  gn_dv_ = all_round(gn_dv_);
  var d = gn_dv_ + 4;
  var i = 0;
  while (standart_d[i] < d) {
    i++;
  }
  //Создаем три поля с типовыми диаметрами больше d
  index_st_d_gn = i;
  for (var j = 0; j < 18; ++j) {
    $("#gn_d_min").find("option:last").remove();
  }

  for (var j = i; j < 18; ++j) {
    $("#gn_d_min").find("option:last").add();
    var option1 = $("<option/>", {
      value: "gn_d_min" + j,
      text: standart_d[j],
    });
    option1.appendTo($("#gn_d_min"));
  }
}

function math_gnb_modul() {
  gnb_grunt = document.getElementById("gnb_grunt").options.selectedIndex;
  gnb_Hmin = $("#gnb_Hmin").val() * 1;
  if (gnb_Hmin == 0) {
    gnb_grunt = 8;
  }

  switch (gnb_grunt) {
    case 0:
      gnb_modul = 0.1 * gnb_Hmin + 0.3;
      break;
    case 1:
      gnb_modul = 0.2 * gnb_Hmin + 0.9;
      break;
    case 2:
      gnb_modul = 0.3 * gnb_Hmin + 1.2;
      break;
    default:
      gnb_modul = 0;
      break;
  }
  if (gnb_modul != 0) {
    $("#gnb_modul").val(all_round(gnb_modul, 1));
  }
}

function change_gnb_d_min() {
  gn_d_min = document.getElementById("gn_d_min").options.selectedIndex;
  gn_d_min = standart_d[index_st_d_gn + gn_d_min];
}

function math_gnb1_dekv() {
  gnb_N = document.getElementById("gnb_N").options.selectedIndex;
  if (gn_d_min != D_final) {
    gn_d_min = document.getElementById("gn_d_min").options.selectedIndex;
    gn_d_min = standart_d[index_st_d_gn + gn_d_min];
  }
  if (gn_d_min == "--") {
    gn_n = 8;
  }

  switch (gnb_N) {
    case 0:
      gnb1_dekv = gn_d_min;
      break;
    case 1:
      gnb1_dekv = 2 * gn_d_min;
      break;
    case 2:
      gnb1_dekv = 2.15 * gn_d_min;
      break;
    case 3:
      gnb1_dekv = 2.41 * gn_d_min;
      break;
    case 4:
      gnb1_dekv = 3 * gn_d_min;
      break;
    case 5:
      gnb1_dekv = 3 * gn_d_min;
      break;
    case 6:
      gnb1_dekv = 3 * gn_d_min;
      break;

    default:
      gnb1_dekv = 0;
      break;
  }
  if (gnb1_dekv != 0) {
    $("#gnb1_Dekv").val(all_round(gnb1_dekv));

    if ($("#gn_dv_dekv").val() * 1 != 0) {
      //math_gn_dv_();
    }
  }
  gnb_L = $("#gnb_L").val() * 1;

  if (gnb_L < 49) {
    gnb1_Drsh_Dekv = $("#n_short").val() * 1;
  }
  if (gnb_L >= 50 && gnb_L < 99) {
    gnb1_Drsh_Dekv = $("#n_medium").val() * 1;
  }
  if (gnb_L >= 100 && gnb_L < 299) {
    gnb1_Drsh_Dekv = $("#n_long").val() * 1;
  }
  if (gnb_L >= 300) {
    gnb1_Drsh_Dekv = $("#n_very_long").val() * 1;
  }

  gnb1_Drsh = gnb1_dekv * gnb1_Drsh_Dekv;

  var i = 0;
  while (gnb1_Drsh > standatr_Drh[i]) {
    ++i;
  }
  if (
    i != index_Drh ||
    index_Drh == 0 ||
    document.getElementById("gnb1_Drsh").options[0].text == "--"
  ) {
    index_Drh = i;
    for (var j = 0; j < 9; ++j) {
      $("#gnb1_Drsh").find("option:last").remove();
    }

    for (var j = i; j < 9; ++j) {
      $("#gnb1_Drsh").find("option:last").add();
      var option1 = $("<option/>", {
        value: "gnb1_Drsh" + j,
        text: standatr_Drh[j],
      });
      option1.appendTo($("#gnb1_Drsh"));
    }
  }
  math_gnb1_Hr();
}

function math_gnb1_Hr() {
  gnb1_Drsh = document.getElementById("gnb1_Drsh").options.selectedIndex;
  gnb1_Drsh = standatr_Drh[index_Drh + gnb1_Drsh];
  gnb_L = $("#gnb_L").val() * 1;
  gn_scene = document.getElementById("gn_scene").options.selectedIndex;

  if (gn_scene == 0) {
    f_ = $("#n_type1").val() * 1;
  } else if (gn_scene == 1) {
    f_ = $("#n_type2").val() * 1;
  } else if (gn_scene == 2) {
    f_ = $("#n_type3").val() * 1;
  } else if (gn_scene == 3) {
    f_ = $("#n_type4").val() * 1;
  } else if (gn_scene == 4) {
    f_ = $("#n_type5").val() * 1;
  } else if (gn_scene == 5) {
    f_ = $("#n_type6").val() * 1;
  } else if (gn_scene == 6) {
    f_ = $("#n_type7").val() * 1;
  }

  gnb1_Hr = gnb1_Drsh / 1000 / (2 * f_);
  $("#gnb1_Hr").val(all_round(gnb1_Hr, 1));
  math_gnb1_F();
}

function math_gnb1_F() {
  set_pro = $("#n_pho").val() * 1;
  gnb1_qg_ = set_pro * g * gnb1_Hr;
  set_miu = $("#n_miu").val() * 1;
  gnb1_F = set_miu * (gnb1_qg_ * (gnb1_dekv / 1000)) * (gnb_L / (gnb_N + 1));
  $("#gnb1_F").val(all_round(gnb1_F, 1));
  math_gnb1_SN();
}

function math_gnb1_SN() {
  set_F_Fmax = $("#n_F_Fmax").val() * 1;
  if (gn_d_min != D_final) {
    gn_d_min = document.getElementById("gn_d_min").options.selectedIndex;
    gn_d_min = standart_d[index_st_d_gn + gn_d_min];
  }
  gnb1_Fmax = gnb1_F / set_F_Fmax;
  set_sigma = $("#n_sigma").val() * 1;
  math_pred_ = gn_d_min * gn_d_min;
  D_e_ =
    2 /
    (1 -
      Math.sqrt(1 - (4000 * gnb1_Fmax) / (set_sigma * math_pred_ * Math.PI)));
  set_E = $("#n_E").val() * 1;
  gnb1_SN = ((set_E * 1000) / 12) * Math.pow(1 / (D_e_ - 1), 3);
  if (gnb1_SN < 12) {
    $("#gnb1_SN").val(12.0);
    gnb1_SN = 12.0;
  } else {
    $("#gnb1_SN").val(all_round(gnb1_SN, 1));
  }

  math_gnb1_qr_min();
}

function math_gnb1_qr_min() {
  gnb_modul = $("#gnb_modul").val() * 1;
  gnb_Hmin = $("#gnb_Hmin").val() * 1;

  var HH1 = gnb_Hmin;
  gnb1_qr_min = set_pro * g * HH1;
  $("#gnb1_qr_min").val(all_round(gnb1_qr_min, 1));
  gn_transport = document.getElementById("gn_transport").options.selectedIndex;
  switch (gn_transport) {
    case 0:
      gnb1_qt_min = 0;
      break;
    case 1:
      gnb1_qt_min = (20 * g) / (2.7 + gnb_Hmin);
      break;
    case 2:
      gnb1_qt_min = (2 * 14 * g) / (2.7 + gnb_Hmin);
      break;
    default:
      gnb1_qt_min = 0;
      break;
  }
  gnb1_qsum_min = gnb1_qr_min + gnb1_qt_min;
  $("#gnb1_qr_min").val(all_round(gnb1_qr_min, 1));
  $("#gnb1_qt_min").val(all_round(gnb1_qt_min, 1));
  $("#gnb1_qsum_min").val(all_round(gnb1_qsum_min, 1));
  gn_modul = $("#gn_modul").val();
  gnb1_SN_min = 0.458 * gnb1_qsum_min - 7.5 * gnb_modul;
  if (gnb1_SN_min > 12) {
    $("#gnb1_SN_min").val(all_round(gnb1_SN_min, 1));
  } else {
    $("#gnb1_SN_min").val(12.0);
    gnb1_SN_min = 12.0;
  }
  gnb_Hmax = $("#gnb_Hmax").val() * 1;

  var HH2 = gnb1_Hr;

  gnb1_qr_max = set_pro * g * HH2;
  $("#gnb1_qr_max").val(all_round(gnb1_qr_max, 1));
  gn_transport = document.getElementById("gn_transport").options.selectedIndex;
  /*switch (gn_transport) {
        case 0:
            gnb1_qt_max = 0.;
            break;
        case 1:
            gnb1_qt_max = (20 * g) / (2.7 + gnb_Hmax);
            break;
        case 2:
            gnb1_qt_max = (2 * 14 * g) / (2.7 + gnb_Hmax);
            break;
        default:
            gnb1_qt_max = 0.;
            break;
    }*/
  gnb1_qt_max = 0;
  gnb1_qsum_max = gnb1_qr_max + gnb1_qt_max;
  $("#gnb1_qr_max").val(all_round(gnb1_qr_max, 1));
  $("#gnb1_qt_max").val(all_round(gnb1_qt_max, 1));
  $("#gnb1_qsum_max").val(all_round(gnb1_qsum_max, 1));
  gn_modul = $("#gn_modul").val();

  var gnb1_SNa = 0.458 * gnb1_qsum_max - 7.5 * gnb_modul;

  set_Pi = $("#n_Pi").val() * 1;
  set_pho_b = $("#n_pho_b").val() * 1;
  set_P_Pmax = $("#n_P_Pmax").val() * 1;
  gnb1_P = gnb_Hmax * g * set_pho_b + set_Pi;
  $("#gnb1_P").val(all_round(gnb1_P));
  var gnb1_SNb = gnb1_P / (24 * set_P_Pmax);
  gnb1_SN_max = gnb1_SNa + gnb1_SNb;
  if (gnb1_SN_max > 12) {
    $("#gnb1_SN_max").val(all_round(gnb1_SN_max, 1));
  } else {
    $("#gnb1_SN_max").val(12.0);
    gnb1_SN_max = 12.0;
  }
  math_gnb1_SN_mas();
}

function math_gnb1_SN_mas() {
  var gnb1_SN_ = Math.max(gnb1_SN_max, gnb1_SN_min, gnb1_SN);

  var i = 0;

  //var i = document.getElementById("gnb1_SN_mas").options.selectedIndex + index_st_gn_SN;

  if (i == -1) {
    i = 0;
  }
  while (standart_SN[i] < gnb1_SN_) {
    i++;
  }
  var rrr = document.getElementById("gnb1_SN_mas").options[0].text;
  if (
    index_st_gn_SN != i ||
    index_st_gn_SN == 0 ||
    document.getElementById("gnb1_SN_mas").options[0].text == "--"
  ) {
    index_st_gn_SN = i;
    for (var j = 0; j < 7; ++j) {
      $("#gnb1_SN_mas").find("option:last").remove();
    }

    for (var j = i; j < 7; ++j) {
      $("#gnb1_SN_mas").find("option:last").add();
      var option1 = $("<option/>", {
        value: "gnb1_SN_mas" + j,
        text: standart_SN[j],
      });
      option1.appendTo($("#gnb1_SN_mas"));
    }
  }
  gnb1_e_();
}

function gnb1_e_() {
  var id_SN = document.getElementById("gnb1_SN_mas").options.selectedIndex;
  if (
    index_st_gn_SN + id_SN < 7 &&
    index_st_gn_SN + id_SN >= 0 &&
    id_SN != -1
  ) {
    gnb1_SN_mas = standart_SN[index_st_gn_SN + id_SN];
  } else {
    gnb1_SN_mas = NaN;
  }
  set_E = $("#n_E").val();

  if (gn_d_min != D_final) {
    gn_d_min = document.getElementById("gn_d_min").options.selectedIndex;
    gn_d_min = standart_d[index_st_d_gn + gn_d_min];
  }
  gn_dv_ = $("#gn_dv_").val() * 1;
  var root = Math.pow((set_E * 1000) / (12 * gnb1_SN_mas), 1 / 3);
  var e1, e2;
  if (root != 1 && gn_dv_ != "--") {
    e1 = gn_dv_ / (root - 1);
  }
  if (root != -1 && gn_d_min != "--") {
    e2 = gn_d_min / (root + 1);
  }
  var e = Math.max(e1, e2);

  gnb1_D = e * (root + 1); //Значение в марку трубы

  if (!isNaN(gnb1_D)) {
    var i = 0;
    while (gnb1_D > standart_d[i]) {
      ++i;
    }

    gnb1_D = standart_d[i];
  }
  if (isNaN(gnb1_D)) {
    $("#gnb1_D").val("--");
    $("#gnb1_D_end").text("D");
  } else {
    $("#gnb1_D").val(gnb1_D);
    $("#gnb1_D_end").text(gnb1_D);
  }

  gnb1_e = gnb1_D / (root + 1);
  $("#gnb1_e_end").text(gnb1_e);
  if (isNaN(gnb1_e)) {
    $("#gnb1_e").val("--");
    $("#gnb1_e_end").text("е");
  } else {
    $("#gnb1_e").val(all_round(gnb1_e, 1));
    $("#gnb1_e_end").text(all_round(gnb1_e, 1));
  }
  gnb1_Dv = gnb1_D - 2 * gnb1_e;
  if (isNaN(gnb1_Dv)) {
    $("#gnb1_Dv").val("--");
  } else {
    $("#gnb1_Dv").val(all_round(gnb1_Dv, 1));
  }
  set_sigma = $("#n_sigma").val() * 1;

  gnb1_Fmax =
    ((Math.PI * (gnb1_D * gnb1_D - gnb1_Dv * gnb1_Dv)) / 4) *
    (set_sigma / 1000);
  gnb1_Fmax = all_round(gnb1_Fmax, 1);
  gnb1_Fmax = sigFigs(gnb1_Fmax);
  if (isNaN(gnb1_Fmax)) {
    $("#gnb1_Fmax").val("--");
    $("#gnb1_Fmax_end").text("Fмакс");
  } else {
    $("#gnb1_Fmax").val(gnb1_Fmax);
    $("#gnb1_Fmax_end").text("F" + gnb1_Fmax);
  }
  if (isNaN(gnb1_SN_mas)) {
    $("#gnb1_SN_end").text("SN");
  } else {
    $("#gnb1_SN_end").text("SN" + gnb1_SN_mas);
  }

  gnb1_Dv_dekv = gnb1_Dv / gn_dekv;

  if (isNaN(gnb1_Dv_dekv)) {
    $("#gnb1_Dv_dekv").val("--");
  } else {
    $("#gnb1_Dv_dekv").val(all_round(gnb1_Dv_dekv, 2));
  }
  if (gnb1_D > gn_d_min) {
    //    alert("gnb1_D = " + gnb1_D);
    final();
  }

  border_change();
}

function final() {
  if (gn_d_min != D_final) {
    gn_d_min = document.getElementById("gn_d_min").options.selectedIndex;
    gn_d_min = standart_d[index_st_d_gn + gn_d_min];
  }
  //alert("D_final = " + D_final + " gn_d_min = " + gn_d_min + " gnb1_D = " + gnb1_D );
  D_final = gnb1_D;

  if (D_final > gn_d_min) {
    gn_d_min = D_final;

    math_gnb1_dekv();

    //gnb1_e_();
    //D_final = 0;
  }
  /*else {
         alert("breAK");
         break;
     };*/
}

//Инженерная точность
function sigFigs(n) {
  if (n != 0) {
    if (n > 100) {
      var mult = Math.pow(10, 3 - Math.floor(Math.log(n) / Math.LN10) - 1);
      var exit = Math.round(n * mult) / mult;
      var length = (Math.log(exit / 1) * Math.LOG10E + 1) | 0;
      if ((length = 3)) {
        var b = exit % 10;
        if (b < 2.5) {
          exit = exit - b;
        } else if (b >= 2.5 && b < 7.5) {
          exit = exit - b + 5;
        } else if (b >= 7.5) {
          exit = exit - b + 10;
        }
      }
    } else {
      var mult = Math.pow(10, 2 - Math.floor(Math.log(n) / Math.LN10) - 1);
      var exit = Math.round(n * mult) / mult;
    }

    if (isNaN(exit)) {
      return "--";
    } else {
      return exit;
    }
  } else {
    return 0;
  }
}

function my_default() {
  $("#n_sigma").val(21);
  $("#n_E").val(950);
  $("#n_miu").val(0.2);
  $("#n_F_Fmax").val(0.5);
  $("#n_pho_b").val(1.5);
  $("#n_Pi").val(200);
  $("#n_P_Pmax").val(0.5);

  $("#n_type1").val(0.1);
  $("#n_type2").val(0.3);
  $("#n_type3").val(0.5);
  $("#n_type4").val(0.6);
  $("#n_type5").val(0.8);
  $("#n_type6").val(1.0);
  $("#n_type7").val(1.5);

  $("#n_pho").val(2);
  $("#n_short").val(1.2);
  $("#n_medium").val(1.3);
  $("#n_long").val(1.4);
  $("#n_very_long").val(1.5);
}

function clearTexts() {}

function border_change() {
  tr_in_sloy = document.getElementById("tr_in_sloy").options.selectedIndex;
  tr_in_border = document.getElementById("tr_in_border").options.selectedIndex;
  tr_tok_search =
    document.getElementById("tr_tok_search").options.selectedIndex;

  if (tr_in_sloy == 1 && tr_tok_search == 0) {
    document.getElementById("tr_in_border").value = "tr_in_border_1";
    document.getElementById("tr_in_border").disabled = true;
  }
  if (!isNaN(tr1_D) && tr1_D != "--") {
    if (tr_in_sloy == 0 && tr_in_border == 0 && tr_tok_search == 0) {
      document.getElementById("tr_in_border").disabled = false;
      $("#tr_type_end").html("&nbsp;СТ");
      $("#tr_T_end").html("T95&deg;C");
    }
    if (tr_in_sloy == 0 && tr_in_border == 0 && tr_tok_search == 1) {
      document.getElementById("tr_in_border").disabled = false;
      $("#tr_type_end").html("&nbsp;СТ-ОМП");
      $("#tr_T_end").html("T95&deg;C");
    }
    if (tr_in_sloy == 0 && tr_in_border == 1 && tr_tok_search == 0) {
      document.getElementById("tr_in_border").disabled = false;
      $("#tr_type_end").html("&nbsp;БК");
      $("#tr_T_end").html("T95&deg;C");
    }
    if (tr_in_sloy == 0 && tr_in_border == 1 && tr_tok_search == 1) {
      document.getElementById("tr_in_border").disabled = false;
      $("#tr_type_end").html("&nbsp;БК-ОМП");
      $("#tr_T_end").html("T95&deg;C");
    }

    if (tr_in_sloy == 1 && tr_tok_search == 0) {
      document.getElementById("tr_in_border").value = "tr_in_border_1";
      document.getElementById("tr_in_border").disabled = true;
      $("#tr_type_end").html("&nbsp;ПРО");
      $("#tr_T_end").html("T110&deg;C");
    }
    if (tr_in_sloy == 1 && tr_tok_search == 1) {
      document.getElementById("tr_in_border").value = "tr_in_border_1";
      document.getElementById("tr_in_border").disabled = true;
      $("#tr_type_end").html("&nbsp;ПРО-ОМП");
      $("#tr_T_end").html("T110&deg;C");
    }
  } else {
    $("#tr_type_end").html("");
    $("#tr_T_end").html("T");

    if (tr_in_sloy == 0 && tr_in_border == 0 && tr_tok_search == 0) {
      document.getElementById("tr_in_border").disabled = false;
    }
    if (tr_in_sloy == 0 && tr_in_border == 0 && tr_tok_search == 1) {
      document.getElementById("tr_in_border").disabled = false;
    }
    if (tr_in_sloy == 0 && tr_in_border == 1 && tr_tok_search == 0) {
      document.getElementById("tr_in_border").disabled = false;
    }
    if (tr_in_sloy == 0 && tr_in_border == 1 && tr_tok_search == 1) {
      document.getElementById("tr_in_border").disabled = false;
    }

    if (tr_in_sloy == 1 && tr_tok_search == 0) {
      document.getElementById("tr_in_border").value = "tr_in_border_1";
      document.getElementById("tr_in_border").disabled = true;
    }
    if (tr_in_sloy == 1 && tr_tok_search == 1) {
      document.getElementById("tr_in_border").value = "tr_in_border_1";
      document.getElementById("tr_in_border").disabled = true;
    }
  }
  gn_in_sloy = document.getElementById("gn_in_sloy").options.selectedIndex;
  gn_in_border = document.getElementById("gn_in_border").options.selectedIndex;
  gn_tok_search =
    document.getElementById("gn_tok_search").options.selectedIndex;
  if (gn_in_sloy == 1 && gn_tok_search == 0) {
    document.getElementById("gn_in_border").value = "gn_in_border_1";
    document.getElementById("gn_in_border").disabled = true;
  }
  if (!isNaN(gnb1_D) && gnb1_D != "--") {
    if (gn_in_sloy == 0 && gn_in_border == 0 && gn_tok_search == 0) {
      document.getElementById("gn_in_border").disabled = false;
      $("#gnb1_type_end").html("&nbsp;СТ");
      $("#gnb1_T_end").html("T95&deg;C");
    }
    if (gn_in_sloy == 0 && gn_in_border == 0 && gn_tok_search == 1) {
      document.getElementById("gn_in_border").disabled = false;
      $("#gnb1_type_end").html("&nbsp;СТ-ОМП");
      $("#gnb1_T_end").html("T95&deg;C");
    }
    if (gn_in_sloy == 0 && gn_in_border == 1 && gn_tok_search == 0) {
      document.getElementById("gn_in_border").disabled = false;
      $("#gnb1_type_end").html("&nbsp;БК");
      $("#gnb1_T_end").html("T95&deg;C");
    }
    if (gn_in_sloy == 0 && gn_in_border == 1 && gn_tok_search == 1) {
      document.getElementById("gn_in_border").disabled = false;
      $("#gnb1_type_end").html("&nbsp;БК-ОМП");
      $("#gnb1_T_end").html("T95&deg;C");
    }

    if (gn_in_sloy == 1 && gn_tok_search == 0) {
      document.getElementById("gn_in_border").value = "gn_in_border_1";
      document.getElementById("gn_in_border").disabled = true;
      $("#gnb1_type_end").html("&nbsp;ПРО");
      $("#gnb1_T_end").html("T110&deg;C");
    }
    if (gn_in_sloy == 1 && gn_tok_search == 1) {
      document.getElementById("gn_in_border").value = "gn_in_border_1";
      document.getElementById("gn_in_border").disabled = true;
      $("#gnb1_type_end").html("&nbsp;ПРО-ОМП");
      $("#gnb1_T_end").html("T110&deg;C");
    }
  } else {
    $("#gnb1_type_end").html("");
    $("#gnb1_T_end").html("T");

    if (gn_in_sloy == 0 && gn_in_border == 0 && gn_tok_search == 0) {
      document.getElementById("gn_in_border").disabled = false;
      $("#gnb1_type_end").html("&nbsp;СТ");
      $("#gnb1_T_end").html("T95&deg;C");
    }
    if (gn_in_sloy == 0 && gn_in_border == 0 && gn_tok_search == 1) {
      document.getElementById("gn_in_border").disabled = false;
    }
    if (gn_in_sloy == 0 && gn_in_border == 1 && gn_tok_search == 0) {
      document.getElementById("gn_in_border").disabled = false;
    }
    if (gn_in_sloy == 0 && gn_in_border == 1 && gn_tok_search == 1) {
      document.getElementById("gn_in_border").disabled = false;
    }

    if (gn_in_sloy == 1 && gn_tok_search == 0) {
      document.getElementById("gn_in_border").value = "gn_in_border_1";
      document.getElementById("gn_in_border").disabled = true;
    }
    if (gn_in_sloy == 1 && gn_tok_search == 1) {
      document.getElementById("gn_in_border").value = "gn_in_border_1";
      document.getElementById("gn_in_border").disabled = true;
    }
  }
}

function activ_my_prog() {
  decoder();
}

function clear_tr_math() {
  $("#tr1_D").val("");
  $("#tr1_e").val("");
  $("#tr1_Fmax").val("");
  $("#tr1_Dv").val("");

  for (var j = 0; j < 7; ++j) {
    $("#tr1_SN_mas").find("option:last").remove();
  }

  $("#tr1_SN_mas").find("option:last").add();
  var option1 = $("<option/>", {
    value: "tr1_SN_mas" + j,
    text: "--",
  });
  option1.appendTo($("#tr1_SN_mas"));

  $("#tr1_Dv_dekv").val("");
  $("#tr1_qg").val("");
  $("#tr1_qt").val("");
  $("#tr1_qsum").val("");
  $("#tr1_SN").val("");
  $("#tr_D_end").text("D");
  $("#tr_type_end").text("");
  $("#tr_e_end").text("e");
  $("#tr_SN_end").text("SN");
  $("#tr_Fmax_end").text("Fмакс");
  $("#tr_T_end").text("T");
}

function get_tr_() {
  var exit = 0;
  exit += $("#kt_d").val() * 1;

  exit += $("#kt_dekv").val() * 1;
  exit += $("#kt_dv_dekv").val() * 1;
  exit += $("#kt_dv_").val() * 1;

  exit += $("#tr_h").val() * 1;
  exit += $("#tr_modul").val() * 1;

  return exit - 1.5;
}

function get_gnb_() {
  var exit = 0;
  exit += $("#gnb_L").val() * 1;
  exit += $("#gnb_Hmax").val() * 1;
  exit += $("#gnb_Hmin").val() * 1;
  exit += $("#gn_dv_").val() * 1;
  exit += $("#gn_dv_dekv").val() * 1;
  exit += $("#gn_dekv").val() * 1;
  exit += $("#gn_d").val() * 1;
  return exit - 1.5;
}

function clear_tr_() {
  $("#kt_d").val("");

  $("#kt_dekv").val("");
  $("#kt_dv_dekv").val(1.5);
  $("#kt_dv_").val("");
  $("#kt_d_min").val("");
  $("#tr_h").val("");
  $("#tr_modul").val("");
  $("#tr1_D").val("");
  $("#tr1_e").val("");
  $("#tr1_Fmax").val("");
  $("#tr1_Dv").val("");
  for (var j = 0; j < 18; ++j) {
    $("#kt_d_min").find("option:last").remove();
  }
  $("#kt_d_min").find("option:last").add();
  var option1 = $("<option/>", {
    value: "kt_d_min" + j,
    text: "--",
  });
  option1.appendTo($("#kt_d_min"));
  for (var j = 0; j < 7; ++j) {
    $("#tr1_SN_mas").find("option:last").remove();
  }

  $("#tr1_SN_mas").find("option:last").add();
  var option1 = $("<option/>", {
    value: "tr1_SN_mas" + j,
    text: "--",
  });
  option1.appendTo($("#tr1_SN_mas"));

  $("#tr1_Dv_dekv").val("");
  $("#tr1_qg").val("");
  $("#tr1_qt").val("");
  $("#tr1_qsum").val("");
  $("#tr1_SN").val("");
  $("#tr_D_end").text("D");
  $("#tr_type_end").text("");
  $("#tr_e_end").text("e");
  $("#tr_SN_end").text("SN");
  $("#tr_Fmax_end").text("Fмакс");
  $("#tr_T_end").text("T");
}

function clear_gnb_math() {
  $("#gnb1_D").val("");
  $("#gnb1_e").val("");
  $("#gnb1_Fmax").val("");
  $("#gnb1_Dv").val("");
  $("#gnb1_Dv_dekv").val("");
  $("#gnb1_Dekv").val("");
  $("#gnb1_Hr").val("");
  $("#gnb1_F").val("");
  $("#gnb1_SN").val("");
  $("#gnb1_qr_min").val("");
  $("#gnb1_qt_min").val("");
  $("#gnb1_qsum_min").val("");
  $("#gnb1_SN_min").val("");
  $("#gnb1_qr_max").val("");
  $("#gnb1_qt_max").val("");
  $("#gnb1_qsum_max").val("");
  $("#gnb1_P").val("");
  $("#gnb1_SN_max").val("");
  $("#gnb1_D_end").text("D");
  $("#gnb1_type_end").text("");
  $("#gnb1_e_end").text("e");
  $("#gnb1_SN_end").text("SN");
  $("#gnb1_Fmax_end").text("Fмакс");
  $("#gnb1_T_end").text("T");

  for (var j = 0; j < 9; ++j) {
    $("#gnb1_Drsh").find("option:last").remove();
  }

  $("#gnb1_Drsh").find("option:last").add();
  var option1 = $("<option/>", {
    value: "gnb1_Drsh" + j,
    text: "--",
  });
  option1.appendTo($("#gnb1_Drsh"));

  for (var j = 0; j < 7; ++j) {
    $("#gnb1_SN_mas").find("option:last").remove();
  }

  $("#gnb1_SN_mas").find("option:last").add();
  var option1 = $("<option/>", {
    value: "gnb1_SN_mas" + j,
    text: "--",
  });
  option1.appendTo($("#gnb1_SN_mas"));
}

function clear_gnb_() {
  $("#gnb_L").val("");
  $("#gnb_Hmax").val("");
  $("#gnb_Hmin").val("");
  $("#gn_dv_").val("");
  $("#gn_dv_dekv").val("1.5");
  $("#gn_dekv").val("");
  $("#gn_d").val("");
  $("#gnb1_D").val("");
  $("#gnb1_e").val("");
  $("#gnb1_Fmax").val("");
  $("#gnb1_Dv").val("");
  $("#gnb1_Dv_dekv").val("");
  $("#gnb1_Dekv").val("");
  $("#gnb1_Hr").val("");
  $("#gnb1_F").val("");
  $("#gnb1_SN").val("");
  $("#gnb1_qr_min").val("");
  $("#gnb1_qt_min").val("");
  $("#gnb1_qsum_min").val("");
  $("#gnb1_SN_min").val("");
  $("#gnb1_qr_max").val("");
  $("#gnb1_qt_max").val("");
  $("#gnb1_qsum_max").val("");
  $("#gnb1_P").val("");
  $("#gnb1_SN_max").val("");
  $("#gnb1_D_end").text("D");
  $("#gnb1_type_end").text("");
  $("#gnb1_e_end").text("e");
  $("#gnb1_SN_end").text("SN");
  $("#gnb1_Fmax_end").text("Fмакс");
  $("#gnb1_T_end").text("T");
  for (var j = 0; j < 18; ++j) {
    $("#gn_d_min").find("option:last").remove();
  }
  $("#gn_d_min").find("option:last").add();
  var option1 = $("<option/>", {
    value: "gn_d_min" + j,
    text: "--",
  });
  option1.appendTo($("#gn_d_min"));

  for (var j = 0; j < 9; ++j) {
    $("#gnb1_Drsh").find("option:last").remove();
  }

  $("#gnb1_Drsh").find("option:last").add();
  var option1 = $("<option/>", {
    value: "gnb1_Drsh" + j,
    text: "--",
  });
  option1.appendTo($("#gnb1_Drsh"));

  for (var j = 0; j < 7; ++j) {
    $("#gnb1_SN_mas").find("option:last").remove();
  }

  $("#gnb1_SN_mas").find("option:last").add();
  var option1 = $("<option/>", {
    value: "gnb1_SN_mas" + j,
    text: "--",
  });
  option1.appendTo($("#gnb1_SN_mas"));
}

function decoder() {
  var my_serial = $("#kod_d").val();
  // let url = `http://localhost:8080/api/v1/accept/check/${my_serial}`;
  let url = `https://hidden-inlet-89012.herokuapp.com/api/v1/accept/check/${my_serial}`;
  let promise = fetch(url);

  promise
    .then((res) => {
      console.log(res.body);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.acceptToken) {
        localStorage.setItem("accept-token", data.acceptToken);
        alert("Код принят");
        kod_status = true;
        userId = data.id;
        return;
      }
      alert(data.message);
      kod_status = false;
      return;
    });
}

/**
 *
 * @param {string} actionType
 * @param {string} projName
 * @param {Object} data
 * @param {number} param1
 * @param {number} param2
 */
function sendActionDataF(actionType, projName, data, param1, param2) {
  let url = `https://hidden-inlet-89012.herokuapp.com/api/v1/action/add`;
  // let url = "http://localhost:8080/api/v1/action/add";
  let acceptToken = localStorage.getItem("accept-token") || "";
  let object = {
    project_name: projName,
    type: actionType,
    program_type: 1,
    params: {
      param1: param1,
      param2: param2,
    },
    data,
  };
  console.log(object);
  let promise = fetch(url, {
    method: "POST",
    body: JSON.stringify(object),
    headers: {
      "accept-token": acceptToken,
      "Content-Type": "application/json",
    },
  });

  promise
    .then((data) => {
      return data.json();
    })
    .then((answ) => {
      console.log(answ);
    });
}

function debounce(f, ms) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => (isCooldown = false), ms);
  };
}

var sendActionData = debounce(sendActionDataF, 3000);
