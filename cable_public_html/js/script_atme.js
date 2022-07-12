var url = "https://calcdata.energotek.ru/";

var kod_status = false;

var page = 0;

var g = 9.81;
var E0 = 8.85 * Math.pow(10, -12);

//Лист Сеть
var s1_Uc;
var s1_Hc;
var s1_lost;
var s1_neitral;
var s1_3kz;
var s1_1kz;
var s1_upper;
var s1_prim_kl;
var s1_ta;
var s1_base_def;
var s1_res_def;
var s1_t_urov;
var s1_t_Auto_off;
var s1_def_var;
var s1_brake_urov;
var s1_rep_apv;
var s1_i_norm;
var s1_ta;

//Лист Кабель
var kab_Ukab;
var kab_konstr;
var kab_touch;
var kab_kj;
var kab_ke;
var kab_dpi;
var kab_tan_a;
var kab_tj_unt_kz;
var kab_te_unt_kz;
var kab_tj_bef_kz;
var kab_te_bef_kz;
var kab_r_cu;
var kab_r_al;
var kab_kt_cu;
var kab_kt_al;
var kab_Ct_cu;
var kab_Ct_al;
var kab_p_cu;
var kab_p_al;

//Лист ТРАССА
var div3_sposob_all;
var div3_select_sposob;
var div3_K_chain1;
var div3_K_chain2;
var div3_K_chain3;
var div3_K_chain4;
var div3_usl1;
var div3_usl2;
var div3_usl3;
var div3_usl4;
var div3_grunt1;
var div3_grunt2;
var div3_grunt3;
var div3_grunt4;
var div3_otrezok1;
var div3_otrezok2;
var div3_otrezok3;
var div3_otrezok4;
var div3_H1;
var div3_H2;
var div3_H3;
var div3_H4;
var div3_cable_in_pipe1;
var div3_D1;
var div3_SN1;
var div3_e1;
var div3_cable_in_pipe2;
var div3_D2;
var div3_SN2;
var div3_e2;
var div3_cable_in_pipe3;
var div3_D3;
var div3_SN3;
var div3_e3;
var div3_cable_in_pipe4;
var div3_D4;
var div3_SN4;
var div3_e4;
var div3_S12_1;
var div3_S12_2;
var div3_S12_3;
var div3_S12_4;
var div3_dv_dekv1;
//var div3_dv_dekv2;
//var div3_dv_dekv3;
//var div3_dv_dekv4;
var div3_max_fg1;
var div3_max_fg2;
var div3_max_fg3;
var div3_max_fg4;
var div3_Sab1;
var div3_Sab2;
var div3_Sab3;
var div3_Sab4;
var div3_max_fg1_1;
var div3_max_fg2_1;
var div3_max_fg3_1;
var div3_max_fg4_1;
var div3_paral_kl1;
var div3_paral_kl2;
var div3_paral_kl3;
var div3_paral_kl4;

var div3_Lall;
var div3_max_fg_2;

//Лист НАСТРОЙКИ

var div4_mod_upr; //Модуль упругости
var kab_r_cu;
var kab_r_al;
var div4_temp_min;
var div4_temp_mid;
var div4_temp_high_mid;
var div4_temp_high;
var div4_k_potok;
var div4_ts_izol;
var div4_ts_ob;

//Лист СТОЙКОСТЬ ПРИ КЗ
var div5_t1;
var div5_ka1;
var div5_t1ka;
var div5_t2;
var div5_ka2;
var div5_t2ka;
var div5_t_itog;
var div5_z_itog;
var div5_kj_cu;
var div5_kj_al;
var div5_ke_cu;
var div5_ke_al;
var div5_fj_cu;
var div5_fj_al;
var div5_fe_cu;
var div5_fe_al;

//Лист ЭКРАНЫ

var div6_material_e;
var div6_sech;
var div6_lost;
var div6_material_j;

var div6_sech_i = 0;

var div6_f1 = [];
var div6_f3 = [];
var div6_f4 = [];
var div6_f7 = [];

//Лист ЖИЛА

var div7_Id = [];

var div7_material_j;
var div7_material_e;
var div7_lost;

//Вспомогательные
var tj_sr;
var te_sr;
var table_line = [
  35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630, 800, 1000, 1200, 1400,
  1500, 1600, 1800, 2000, 2500,
];
var sech_e = [
  16, 25, 35, 50, 70, 95, 120, 150, 185, 210, 225, 240, 265, 300, 350,
];
var diametr = [
  63, 75, 90, 110, 125, 140, 160, 180, 200, 225, 250, 280, 315, 355, 400,
];
var sn = [12, 16, 24, 32, 48, 64, 96];

for (var w = 0; w < 4; ++w) {
  div7_Id[w] = [];
  for (var t = 0; t < table_line.length; ++t) div7_Id[w][t] = "--";
}

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
  var d1, d2, d3;
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
    if ($element.is("select[name='s1_neitral']")) {
      change_neitral(); //вызывай функцию, чтобы динамичеки создать поля
    }
    if ($element.is("select[name='s1_upper']")) {
      change_apperiod(); //вызывай функцию, чтобы динамичеки создать поля
    }
    if ($element.is("select[name='div3_sposob_all']")) {
      sposob_quant(); //вызывай функцию, чтобы динамичеки создать поля
    }
    if ($element.is("input[name='my_file_name']")) {
      $element.val("");
    }

    if ($element.is("input[name='kod_unvis']")) {
      var lll = $("#kod_unvis").val();
      lll = lll.replace(/[,]/g, "");
      $("#kod_d").val(lll);
    }
  }
  //   kod_root();
  div6_mas_zero();
  cleate_table_div6();
  create_table_div7();
  sposob_quant();
  sposob_trassa();

  change_neitral();
  //change_s1_prim_kl();
  change_kab_konstruct();
  uslovie_procladki();
  //kol_vo_chain();
  div3_grunt_in_pipe();
  div3_one_or_three();
  div3_Sab_more_D();
  div3_paral_kl_for_1();
  div3_ekvivalent();
  div5_material();
  cleate_table_div6();
  //document.getElementById('div6_sech').value = d1;
  //document.getElementById('div7_sech').value = 'var1';
  //document.getElementById('div8_sech').value = 'var1';

  div8_make_g();
  sech_e_change();

  div6_ekran();

  div7_math_1();

  div8_math();

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

  let uc = $("#s1_Uc").val();
  let l = $("#div3_Lall").val();

  sendActionData("save", my_file_name, JSON.parse(data), uc, l);
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
  if (!kod_status) {
    alert("Сначала необходимо ввести код активации");
    return;
  }

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

  const data = getJson($("form"));
  let uc = $("#s1_Uc").val();
  let l = $("#div3_Lall").val();

  sendActionData(
    "load",
    fileName[0],
    reader.result || JSON.stringify(getJson($("form"))),
    uc,
    l
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
  if (!kod_status) {
    return;
  }
  var k = $("#fileToLoad").val().replace("C:\\fakepath\\", "");
  if ($("#fileToLoad").val() == "") {
    alert("Файл не выбран" + k);
  } else {
    alert("Загружены данные из файла: " + k);
  }
}

function loadpage() {
  checkAccept();
  $("#add").on("click", add);
  $("#save").on("click", save);

  $("#vibor").on("click", vibor_file);

  $("#fileToLoad").on("change", loadFile);

  $("#prev").on("click", function () {
    //$('#div_10').hide(); //все остальные страницы скрываем
    $("#div_11").hide();
    $("#div_12").hide();
    if (page > 0) {
      page--;
      $("#div_" + page).show();
      $("#div_" + (page + 1)).hide();
    }
  });
  $("#next").on("click", function () {
    //$('#div_10').hide(); //все остальные страницы скрываем
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
    if (page < 10) {
      page++;
      $("#div_" + page).show();
      $("#div_" + (page - 1)).hide();
    }
  });

  // Функция реагирует на клавиши со стрелками
  $(document).keydown(function (e) {
    if (e.keyCode == 37 && logic1 == false) {
      //$('#div_10').hide(); //все остальные страницы скрываем
      $("#div_11").hide();
      $("#div_12").hide();

      if (page > 0) {
        page--;
        $("#div_" + page).show();
        $("#div_" + (page + 1)).hide();
      }
    } else if (e.keyCode == 39 && logic1 == false) {
      //$('#div_10').hide(); //все остальные страницы скрываем
      $("#div_11").hide();
      $("#div_12").hide();
      $("#div_0").hide();
      if (page < 10) {
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
  $("#link_10").click(function () {
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#div_4").hide();
    $("#div_5").hide();
    $("#div_6").hide();
    $("#div_7").hide();
    $("#div_8").hide();
    $("#div_10").show();
    $("#div_9").hide();
    //все остальные страницы скрываем
    $("#div_11").hide();
    $("#div_12").hide();
    $("#div_0").hide();
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
  //Здесь

  $("#kod_d").on("change", kod_root);
  div6_mas_zero();
  cleate_table_div6();
  create_table_div7();
  sposob_quant();
  sposob_trassa();
  div3_make_d_and_sn();
  div3_grunt_in_pipe();
  div5_material();
  div8_make_g();
  change_apperiod();
  //Динамический вызов функций по событиям
  $("#fileToLoad").on("change", function () {
    var a = $("#fileToLoad").val().replace("C:\\fakepath\\", "");

    $("#name_to_file").val(a);
    if (a == "") {
      $("#name_to_file").val("");
    }
  });
  $("#ativated").on("click", activ_my_prog);
  $("#calc_form").on("change", function () {
    $(".calc_all").on("click", math_all);
    if (!kod_status) {
      if ($("#div_10").css("display") == "none") {
        alert("Код активации не валидный");
      }
    } else {
      if ($("#div_1").css("display") != "none") {
      }
      //if ($("#div_2").css('display') != 'none') {
      //};
      if ($("#div_3").css("display") != "none") {
      }
      if ($("#div_4").css("display") != "none") {
      }

      $("#div3_sposob_all").on("change", sposob_quant);
      $("#div3_select_sposob").on("change", sposob_trassa);

      $("#s1_neitral").on("change", change_neitral);
      $("#s1_upper").on("change", change_apperiod);
      $("#s1_prim_kl").on("change", change_s1_prim_kl);
      $("#kab_konstr").on("change", change_kab_konstruct);

      $("#div3_usl1").on("change", uslovie_procladki);
      $("#div3_usl2").on("change", uslovie_procladki);
      $("#div3_usl3").on("change", uslovie_procladki);
      $("#div3_usl4").on("change", uslovie_procladki);

      $("#div3_usl1").on("change", uslovie_procladki);
      $("#div3_usl2").on("change", uslovie_procladki);
      $("#div3_usl3").on("change", uslovie_procladki);
      $("#div3_usl4").on("change", uslovie_procladki);

      $("#div3_K_chain1").on("change", kol_vo_chain);
      $("#div3_K_chain2").on("change", kol_vo_chain);
      $("#div3_K_chain3").on("change", kol_vo_chain);
      $("#div3_K_chain4").on("change", kol_vo_chain);

      $("#kab_konstr").on("change", div3_grunt_in_pipe);
      $("#div3_keep1").on("change", div3_grunt_in_pipe);
      $("#div3_usl1").on("change", div3_grunt_in_pipe);
      $("#div3_keep2").on("change", div3_grunt_in_pipe);
      $("#div3_usl2").on("change", div3_grunt_in_pipe);
      $("#div3_keep3").on("change", div3_grunt_in_pipe);
      $("#div3_usl3").on("change", div3_grunt_in_pipe);
      $("#div3_keep4").on("change", div3_grunt_in_pipe);
      $("#div3_usl4").on("change", div3_grunt_in_pipe);

      $("#div3_D1").on("change", div3_grunt_in_pipe);
      $("#div3_SN1").on("change", div3_grunt_in_pipe);
      $("#div3_D2").on("change", div3_grunt_in_pipe);
      $("#div3_SN2").on("change", div3_grunt_in_pipe);
      $("#div3_D3").on("change", div3_grunt_in_pipe);
      $("#div3_SN3").on("change", div3_grunt_in_pipe);
      $("#div3_D4").on("change", div3_grunt_in_pipe);
      $("#div3_SN4").on("change", div3_grunt_in_pipe);

      div3_one_or_three();

      $("#div3_keep1").on("change", div3_one_or_three);
      $("#div3_usl1").on("change", div3_one_or_three);
      $("#div3_keep2").on("change", div3_one_or_three);
      $("#div3_usl2").on("change", div3_one_or_three);
      $("#div3_keep3").on("change", div3_one_or_three);
      $("#div3_usl3").on("change", div3_one_or_three);
      $("#div3_keep4").on("change", div3_one_or_three);
      $("#div3_usl4").on("change", div3_one_or_three);

      //$("#div3_Sab1").on("click", div3_Sab_more_D);
      //$("#div3_Sab2").on("click", div3_Sab_more_D);
      //$("#div3_Sab3").on("click", div3_Sab_more_D);
      //$("#div3_Sab4").on("click", div3_Sab_more_D);

      $("#div3_D1").on("change", div3_Sab_more_D);
      $("#div3_D2").on("change", div3_Sab_more_D);
      $("#div3_D3").on("change", div3_Sab_more_D);
      $("#div3_D4").on("change", div3_Sab_more_D);

      $("#div3_Sab1").on("change", div3_paral_kl_for_1);
      $("#div3_Sab2").on("change", div3_paral_kl_for_2);
      $("#div3_Sab3").on("change", div3_paral_kl_for_3);
      $("#div3_Sab4").on("change", div3_paral_kl_for_4);

      $("#div3_paral_kl1").on("change", div3_paral_kl_for_1);
      $("#div3_paral_kl2").on("change", div3_paral_kl_for_2);
      $("#div3_paral_kl3").on("change", div3_paral_kl_for_3);
      $("#div3_paral_kl4").on("change", div3_paral_kl_for_4);

      $("#but2").on("click", div3_ekvivalent);

      $("#div6_material_e").on("change", div6_ekran);
      $("#div6_sech").on("change", div6_ekran);
      $("#div6_lost").on("change", div6_ekran);
      $("#div6_material_j").on("change", div6_ekran);

      $("#div5_material_g").on("change", div5_material);
      $("#div5_material_e").on("change", div5_material);

      $("#kab_konstr").on("change", cleate_table_div6);
      $("#kab_konstr").on("change", create_table_div7);
      $("#kab_konstr").on("change", div3_grunt_in_pipe);

      $("#kab_konstr").on("change", div3_grunt_in_pipe);
      $("#kab_konstr").on("change", sech_e_change);

      $("#div8_material_g").on("change", div8_make_g);
      $("#div8_material_e").on("change", sech_e_change);

      $("#div8_material_g").on("change", div8_math);
      $("#div8_material_e").on("change", div8_math);
      $("#div8_sech").on("change", div8_math);
      $("#div8_lost").on("change", div8_math);
      $("#div8_sech_g").on("change", div8_math);

      $("#clear_s1").on("click", clear_div1);
      $("#clear_kab").on("click", clear_div2);
      $("#clear_tr").on("click", clear_div3);
      $("#clear_setting").on("click", clear_div4);

      //$("#clear_all").on("click", clearTexts);
      //$("#m_default").on("click", my_default);
      $("#div8_material_e").on("change", function () {
        const select = document
          .querySelector("#div6_material_e")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_material_e")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_material_e")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select2[i].selected == true) {
            select[i].selected = true;
            select1[i].selected = true;
          }
        }
        math_all();
      });
      $("#div7_material_e").on("change", function () {
        const select = document
          .querySelector("#div6_material_e")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_material_e")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_material_e")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });
      $("#div6_material_e").on("change", function () {
        const select = document
          .querySelector("#div7_material_e")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div6_material_e")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_material_e")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });
      ///
      $("#div8_lost").on("change", function () {
        const select = document
          .querySelector("#div6_lost")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_lost")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_lost")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select2[i].selected == true) {
            select[i].selected = true;
            select1[i].selected = true;
          }
        }
        math_all();
      });
      $("#div7_lost").on("change", function () {
        const select = document
          .querySelector("#div6_lost")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_lost")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_lost")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });
      $("#div6_lost").on("change", function () {
        const select = document
          .querySelector("#div7_lost")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div6_lost")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_lost")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });
      ///
      $("#div8_material_g").on("change", function () {
        const select = document
          .querySelector("#div6_material_j")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_material_j")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_material_g")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select2[i].selected == true) {
            select[i].selected = true;
            select1[i].selected = true;
          }
        }
        math_all();
      });
      $("#div7_material_j").on("change", function () {
        const select = document
          .querySelector("#div6_material_j")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_material_j")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_material_g")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });
      $("#div6_material_j").on("change", function () {
        const select = document
          .querySelector("#div7_material_j")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div6_material_j")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_material_g")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });
      ///
      $("#div8_sech").on("change", function () {
        const select = document
          .querySelector("#div6_sech")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_sech")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_sech")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select2[i].selected == true) {
            select[i].selected = true;
            select1[i].selected = true;
          }
        }
        math_all();
      });
      $("#div7_sech").on("change", function () {
        const select = document
          .querySelector("#div6_sech")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div7_sech")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_sech")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });
      $("#div6_sech").on("change", function () {
        const select = document
          .querySelector("#div7_sech")
          .getElementsByTagName("option");
        const select1 = document
          .querySelector("#div6_sech")
          .getElementsByTagName("option");
        const select2 = document
          .querySelector("#div8_sech")
          .getElementsByTagName("option");
        for (let i = 0; i < select.length; i++) {
          if (select1[i].selected == true) {
            select[i].selected = true;
            select2[i].selected = true;
          }
        }
        math_all();
      });

      $("#div7_lost").on("change", div7_math_1);
      $("#div7_material_j").on("change", div7_math_1);
      $("#div7_sech").on("change", div7_math_1);
    }
  });
}
//Заполнение списка D и SN из листа Трасса
function div3_make_d_and_sn() {
  var n_d = diametr.length;
  var n_sn = sn.length;

  for (var j = 1; j <= n_d; ++j) {
    $("#div3_D1").find("option:last").remove();
    $("#div3_D2").find("option:last").remove();
    $("#div3_D3").find("option:last").remove();
    $("#div3_D4").find("option:last").remove();
  }
  //Создаем D
  for (var j = 0; j < n_d; ++j) {
    $("#div3_D1").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_d_" + j,
      text: diametr[j],
    });
    option1.appendTo($("#div3_D1"));
  }
  for (var j = 0; j < n_d; ++j) {
    $("#div3_D2").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_d_" + j,
      text: diametr[j],
    });
    option1.appendTo($("#div3_D2"));
  }
  for (var j = 0; j < n_d; ++j) {
    $("#div3_D3").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_d_" + j,
      text: diametr[j],
    });
    option1.appendTo($("#div3_D3"));
  }
  for (var j = 0; j < n_d; ++j) {
    $("#div3_D4").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_d_" + j,
      text: diametr[j],
    });
    option1.appendTo($("#div3_D4"));
  }
  for (var j = 1; j <= n_sn; ++j) {
    $("#div3_SN1").find("option:last").remove();
    $("#div3_SN2").find("option:last").remove();
    $("#div3_SN3").find("option:last").remove();
    $("#div3_SN4").find("option:last").remove();
  }
  //Создаем SN
  for (var j = 0; j < n_sn; ++j) {
    $("#div3_SN1").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_SN_" + j,
      text: sn[j],
    });
    option1.appendTo($("#div3_SN1"));
  }
  for (var j = 0; j < n_sn; ++j) {
    $("#div3_SN2").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_SN_" + j,
      text: sn[j],
    });
    option1.appendTo($("#div3_SN2"));
  }
  for (var j = 0; j < n_sn; ++j) {
    $("#div3_SN3").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_SN_" + j,
      text: sn[j],
    });
    option1.appendTo($("#div3_SN3"));
  }
  for (var j = 0; j < n_sn; ++j) {
    $("#div3_SN4").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_SN_" + j,
      text: sn[j],
    });
    option1.appendTo($("#div3_SN4"));
  }
  //Для ЖИЛЫ
}

function div8_make_g() {
  kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;
  var n_j;

  if (kab_konstr == 0) {
    n_j = table_line.length;
  } else {
    n_j = 11;
  }
  div8_sech_g = document.getElementById("div8_sech_g").options.selectedIndex;
  div5_fj_cu = $("#div5_fj_cu").val() * 1;
  div5_fj_al = $("#div5_fj_al").val() * 1;
  div8_material_g =
    document.getElementById("div7_material_j").options.selectedIndex;
  var fj_tek;

  if (div8_material_g == 0) {
    fj_tek = div5_fj_cu;
  } else {
    fj_tek = div5_fj_al;
  }

  for (var j = 0; j <= n_j; ++j) {
    $("#div8_sech_g").find("option:last").remove();
  }
  for (var j = 0; j < n_j; ++j) {
    $("#div8_sech_g").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var_" + j,
      text: table_line[j],
    });
    option1.appendTo($("#div8_sech_g"));
    if (table_line[j] <= fj_tek) {
      document
        .getElementById("div8_sech_g")
        .options[j].setAttribute("style", "color:red");
    }
  }
  document.getElementById("div8_sech_g").value = "var_" + div8_sech_g;
}

function create_D_SN_null(D, SN) {
  for (var j = D.childElementCount - 1; j >= 0; --j) {
    D.options[j].remove();
  }
  for (var j = SN.childElementCount - 1; j >= 0; --j) {
    SN.options[j].remove();
  }

  var option1 = $("<option/>", {
    value: "null",
    text: "--",
  });
  option1.appendTo(D);

  var option1 = $("<option/>", {
    value: "div3_select_SN_",
    text: "--",
  });
  option1.appendTo(SN);
}

function create_D_SN(D, SN) {
  for (var j = D.childElementCount - 1; j >= 0; --j) {
    D.options[j].remove();
  }
  for (var j = 0; j < diametr.length; ++j) {
    var option1 = $("<option/>", {
      value: "div3_D_" + j,
      text: diametr[j],
    });
    option1.appendTo(D);
  }
  for (var j = SN.childElementCount - 1; j >= 0; --j) {
    SN.options[j].remove();
  }
  for (var j = 0; j < sn.length; ++j) {
    var option1 = $("<option/>", {
      value: "div3_SN_" + j,
      text: sn[j],
    });
    option1.appendTo(SN);
  }
}

function uslovie_procladki() {
  div3_usl1 = document.getElementById("div3_usl1").options.selectedIndex;
  div3_usl2 = document.getElementById("div3_usl2").options.selectedIndex;
  div3_usl3 = document.getElementById("div3_usl3").options.selectedIndex;
  div3_usl4 = document.getElementById("div3_usl4").options.selectedIndex;
  switch (div3_usl1) {
    case 1:
      document.getElementById("div3_cable_in_pipe1").disabled = true;
      document.getElementById("div3_D1").disabled = true;
      document.getElementById("div3_SN1").disabled = true;

      document.getElementById("div3_grunt1").disabled = false;
      document.getElementById("div3_H1").disabled = false;
      //document.getElementById('div3_dv_dekv1').disabled = true;
      if ($("#div3_H1").val() == "--") {
        $("#div3_H1").val(0);
      }

      create_D_SN_null(
        document.getElementById("div3_D1"),
        document.getElementById("div3_SN1")
      );

      break;
    case 2:
      document.getElementById("div3_grunt1").disabled = true;
      document.getElementById("div3_cable_in_pipe1").disabled = true;
      document.getElementById("div3_D1").disabled = true;
      document.getElementById("div3_SN1").disabled = true;
      document.getElementById("div3_H1").disabled = true;
      $("#div3_H1").val("--");
      //document.getElementById('div3_dv_dekv1').disabled = true;
      $("#div3_grunt1").val("--");

      create_D_SN_null(
        document.getElementById("div3_D1"),
        document.getElementById("div3_SN1")
      );
      break;
    default:
      document.getElementById("div3_grunt1").disabled = false;
      document.getElementById("div3_cable_in_pipe1").disabled = true;
      document.getElementById("div3_D1").disabled = false;
      document.getElementById("div3_SN1").disabled = false;
      document.getElementById("div3_H1").disabled = false;
      //document.getElementById('div3_dv_dekv1').disabled = false;
      if ($("#div3_H1").val() == "--") {
        $("#div3_H1").val(0);
      }
      var fh = document.getElementById("div3_D1").value;
      if (fh == "null") {
        create_D_SN(
          document.getElementById("div3_D1"),
          document.getElementById("div3_SN1")
        );
      }
      div3_Sab_more_D();

      break;
  }
  switch (div3_usl2) {
    case 1:
      document.getElementById("div3_cable_in_pipe2").disabled = true;
      document.getElementById("div3_D2").disabled = true;
      document.getElementById("div3_SN2").disabled = true;
      document.getElementById("div3_H2").disabled = false;
      document.getElementById("div3_grunt2").disabled = false;
      //document.getElementById('div3_dv_dekv2').disabled = true;
      if ($("#div3_H2").val() == "--") {
        $("#div3_H2").val(0);
      }
      create_D_SN_null(
        document.getElementById("div3_D2"),
        document.getElementById("div3_SN2")
      );

      break;
    case 2:
      document.getElementById("div3_grunt2").disabled = true;
      document.getElementById("div3_cable_in_pipe2").disabled = true;
      document.getElementById("div3_D2").disabled = true;
      document.getElementById("div3_SN2").disabled = true;
      document.getElementById("div3_H2").disabled = true;
      //document.getElementById('div3_dv_dekv2').disabled = true;
      $("#div3_H2").val("--");
      $("#div3_grunt2").val("--");

      create_D_SN_null(
        document.getElementById("div3_D2"),
        document.getElementById("div3_SN2")
      );
      break;
    default:
      document.getElementById("div3_grunt2").disabled = false;
      document.getElementById("div3_cable_in_pipe2").disabled = true;
      document.getElementById("div3_D2").disabled = false;
      document.getElementById("div3_SN2").disabled = false;
      document.getElementById("div3_H2").disabled = false;
      //document.getElementById('div3_dv_dekv2').disabled = false;
      if ($("#div3_H2").val() == "--") {
        $("#div3_H2").val(0);
      }
      var fh = document.getElementById("div3_D2").value;
      if (fh == "null") {
        create_D_SN(
          document.getElementById("div3_D2"),
          document.getElementById("div3_SN2")
        );
      }

      div3_Sab_more_D();
      break;
  }
  switch (div3_usl3) {
    case 1:
      document.getElementById("div3_cable_in_pipe3").disabled = true;
      document.getElementById("div3_D3").disabled = true;
      document.getElementById("div3_SN3").disabled = true;
      document.getElementById("div3_H3").disabled = false;
      document.getElementById("div3_grunt3").disabled = false;
      //document.getElementById('div3_dv_dekv3').disabled = true;

      if ($("#div3_H3").val() == "--") {
        $("#div3_H3").val(0);
      }
      create_D_SN_null(
        document.getElementById("div3_D3"),
        document.getElementById("div3_SN3")
      );

      break;
    case 2:
      document.getElementById("div3_grunt3").disabled = true;
      document.getElementById("div3_cable_in_pipe3").disabled = true;
      document.getElementById("div3_D3").disabled = true;
      document.getElementById("div3_SN3").disabled = true;
      document.getElementById("div3_H3").disabled = true;
      //document.getElementById('div3_dv_dekv3').disabled = true;
      $("#div3_H3").val("--");
      $("#div3_grunt3").val("--");

      create_D_SN_null(
        document.getElementById("div3_D3"),
        document.getElementById("div3_SN3")
      );
      break;
    default:
      document.getElementById("div3_grunt3").disabled = false;
      document.getElementById("div3_cable_in_pipe3").disabled = true;
      document.getElementById("div3_D3").disabled = false;
      document.getElementById("div3_SN3").disabled = false;
      document.getElementById("div3_H3").disabled = false;
      //document.getElementById('div3_dv_dekv3').disabled = false;
      if ($("#div3_H3").val() == "--") {
        $("#div3_H3").val(0);
      }
      var fh = document.getElementById("div3_D3").value;
      if (fh == "null") {
        create_D_SN(
          document.getElementById("div3_D3"),
          document.getElementById("div3_SN3")
        );
      }

      div3_Sab_more_D();
      break;
  }
  switch (div3_usl4) {
    case 1:
      document.getElementById("div3_cable_in_pipe4").disabled = true;
      document.getElementById("div3_D4").disabled = true;
      document.getElementById("div3_SN4").disabled = true;
      document.getElementById("div3_H4").disabled = false;
      document.getElementById("div3_grunt4").disabled = false;
      //document.getElementById('div3_dv_dekv4').disabled = true;

      if ($("#div3_H4").val() == "--") {
        $("#div3_H4").val(0);
      }
      create_D_SN_null(
        document.getElementById("div3_D4"),
        document.getElementById("div3_SN4")
      );

      break;
    case 2:
      document.getElementById("div3_grunt4").disabled = true;
      document.getElementById("div3_cable_in_pipe4").disabled = true;
      document.getElementById("div3_D4").disabled = true;
      document.getElementById("div3_SN4").disabled = true;
      document.getElementById("div3_H4").disabled = true;
      //document.getElementById('div3_dv_dekv4').disabled = true;
      $("#div3_H4").val("--");
      $("#div3_grunt4").val("--");

      create_D_SN_null(
        document.getElementById("div3_D4"),
        document.getElementById("div3_SN4")
      );
      break;
    default:
      document.getElementById("div3_grunt4").disabled = false;
      document.getElementById("div3_cable_in_pipe4").disabled = true;
      document.getElementById("div3_D4").disabled = false;
      document.getElementById("div3_SN4").disabled = false;
      document.getElementById("div3_H4").disabled = false;
      //document.getElementById('div3_dv_dekv4').disabled = false;
      if ($("#div3_H4").val() == "--") {
        $("#div3_H4").val(0);
      }
      var fh = document.getElementById("div3_D4").value;
      if (fh == "null") {
        create_D_SN(
          document.getElementById("div3_D4"),
          document.getElementById("div3_SN4")
        );
      }

      div3_Sab_more_D();
      break;
  }
}

function kol_vo_chain() {
  div3_K_chain1 =
    document.getElementById("div3_K_chain1").options.selectedIndex;
  div3_K_chain2 =
    document.getElementById("div3_K_chain2").options.selectedIndex;
  div3_K_chain3 =
    document.getElementById("div3_K_chain3").options.selectedIndex;
  div3_K_chain4 =
    document.getElementById("div3_K_chain4").options.selectedIndex;

  switch (div3_K_chain1) {
    case 0:
      document.getElementById("div3_S12_1").disabled = true;
      break;
    default:
      document.getElementById("div3_S12_1").disabled = false;
      break;
  }
  switch (div3_K_chain2) {
    case 0:
      document.getElementById("div3_S12_2").disabled = true;
      break;
    default:
      document.getElementById("div3_S12_2").disabled = false;
      break;
  }
  switch (div3_K_chain3) {
    case 0:
      document.getElementById("div3_S12_3").disabled = true;
      break;
    default:
      document.getElementById("div3_S12_3").disabled = false;
      break;
  }
  switch (div3_K_chain4) {
    case 0:
      document.getElementById("div3_S12_4").disabled = true;
      break;
    default:
      document.getElementById("div3_S12_4").disabled = false;
      break;
  }
}

function sposob_quant() {
  div3_sposob_all =
    document.getElementById("div3_sposob_all").options.selectedIndex;
  switch (div3_sposob_all) {
    case 0:
      document.getElementById("sposob_s1").disabled = false;
      document.getElementById("sposob_s2").disabled = true;
      document.getElementById("sposob_s3").disabled = true;
      document.getElementById("sposob_s4").disabled = true;
      sposob_trassa();
      break;

    case 1:
      document.getElementById("sposob_s1").disabled = false;
      document.getElementById("sposob_s2").disabled = false;
      document.getElementById("sposob_s3").disabled = true;
      document.getElementById("sposob_s4").disabled = true;
      sposob_trassa();
      break;
    case 2:
      document.getElementById("sposob_s1").disabled = false;
      document.getElementById("sposob_s2").disabled = false;
      document.getElementById("sposob_s3").disabled = false;
      document.getElementById("sposob_s4").disabled = true;
      sposob_trassa();
      break;
    case 3:
      document.getElementById("sposob_s1").disabled = false;
      document.getElementById("sposob_s2").disabled = false;
      document.getElementById("sposob_s3").disabled = false;
      document.getElementById("sposob_s4").disabled = false;
      sposob_trassa();
      break;
  }
}

function sposob_trassa() {
  $("#part4").hide();
  $("#part3").hide();
  $("#part2").hide();
  $("#part1").show();
  $("#sposob_s1").css("background-color", "grey");
  $("#sposob_s2").css("background-color", "");
  $("#sposob_s3").css("background-color", "");
  $("#sposob_s4").css("background-color", "");
}

function sposob_trassa1() {
  $("#part4").hide();
  $("#part3").hide();
  $("#part2").hide();
  $("#part1").show();
  $("#sposob_s1").css("background-color", "grey");
  $("#sposob_s2").css("background-color", "");
  $("#sposob_s3").css("background-color", "");
  $("#sposob_s4").css("background-color", "");
}

function sposob_trassa2() {
  $("#part4").hide();
  $("#part3").hide();
  $("#part2").show();
  $("#part1").hide();
  $("#sposob_s1").css("background-color", "");
  $("#sposob_s2").css("background-color", "grey");
  $("#sposob_s3").css("background-color", "");
  $("#sposob_s4").css("background-color", "");
}

function sposob_trassa3() {
  $("#part4").hide();
  $("#part3").show();
  $("#part2").hide();
  $("#part1").hide();
  $("#sposob_s1").css("background-color", "");
  $("#sposob_s2").css("background-color", "");
  $("#sposob_s3").css("background-color", "grey");
  $("#sposob_s4").css("background-color", "");
}

function sposob_trassa4() {
  $("#part4").show();
  $("#part3").hide();
  $("#part2").hide();
  $("#part1").hide();
  $("#sposob_s1").css("background-color", "");
  $("#sposob_s2").css("background-color", "");
  $("#sposob_s3").css("background-color", "");
  $("#sposob_s4").css("background-color", "grey");
}

function cleate_table_div6() {
  // Create table Экраны.
  var table = document.getElementById("res_table");

  div5_fj_cu = $("#div5_fj_cu").val() * 1;
  div5_fj_al = $("#div5_fj_al").val() * 1;
  div7_material_j =
    document.getElementById("div7_material_j").options.selectedIndex;
  while (table.rows.length > 2) {
    table.deleteRow(2);
  }
  var k_table;
  var fj_tek;

  if (div6_material_j == 0) {
    fj_tek = div5_fj_cu;
  } else {
    fj_tek = div5_fj_al;
  }
  var kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;
  if (kab_konstr == 1) {
    k_table = 11;
  } else {
    k_table = table_line.length;
  }
  for (var i = 0; i < k_table; ++i) {
    // Insert New Row for table at index '0'.
    var row1 = table.insertRow(i + 2);
    // Insert New Column for Row1 at index '0'.

    var col1 = row1.insertCell(0);
    if (table_line[i] <= fj_tek) {
      col1.innerHTML = "<b style=color:red>" + table_line[i] + "</b>";
    } else {
      col1.innerHTML = "<b >" + table_line[i] + "</b>";
    }

    // Insert New Column for Row1 at index '1'.
    var col2 = row1.insertCell(1);
    col2.innerHTML = "<b>" + div6_f1[i] + "</b>";
    // Insert New Column for Row1 at index '2'.
    var col3 = row1.insertCell(2);
    col3.innerHTML = "<b>" + div6_f3[i] + "</b>";
    var col4 = row1.insertCell(3);
    col4.innerHTML = "<b>" + div6_f4[i] + "</b>";
    var col5 = row1.insertCell(4);
    col5.innerHTML = "<b>" + div6_f7[i] + "</b>";
  }
}

function create_table_div7() {
  //Создание таблицы ЖИЛЫ
  var table1 = document.getElementById("res_table1");

  var metka = false;
  var metka1 = false;
  var metka2 = false;
  var metka3 = false;
  var s1_i_norm = $("#s1_i_norm").val() * 1;

  div5_fj_cu = $("#div5_fj_cu").val() * 1;
  div5_fj_al = $("#div5_fj_al").val() * 1;
  div7_material_j =
    document.getElementById("div7_material_j").options.selectedIndex;
  var fj_tek;

  if (div7_material_j == 0) {
    fj_tek = div5_fj_cu;
  } else {
    fj_tek = div5_fj_al;
  }

  while (table1.rows.length > 2) {
    table1.deleteRow(2);
  }
  var k_table;
  var kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;
  if (kab_konstr == 1) {
    k_table = 11;
  } else {
    k_table = table_line.length;
  }
  for (var i = 0; i < k_table; ++i) {
    // Insert New Row for table at index '0'.
    var row1 = table1.insertRow(i + 2);
    // Insert New Column for Row1 at index '0'.
    var col1 = row1.insertCell(0);

    if (table_line[i] <= fj_tek) {
      col1.innerHTML = "<b style=color:red>" + table_line[i] + "</b>";
    } else {
      col1.innerHTML = "<b >" + table_line[i] + "</b>";
    }

    // Insert New Column for Row1 at index '1'.
    var col2 = row1.insertCell(1);
    if (!metka && div7_Id[0][i] >= s1_i_norm) {
      col2.className = "proverka";
      col2.innerHTML = "<b >" + div7_Id[0][i] + "</b>";
      metka = true;
    } else {
      col2.innerHTML = "<b style=background:white>" + div7_Id[0][i] + "</b>";
    }

    var col3 = row1.insertCell(2);
    if (!metka1 && div7_Id[1][i] >= s1_i_norm) {
      col3.className = "proverka";
      col3.innerHTML = "<b>" + div7_Id[1][i] + "</b>";
      metka1 = true;
    } else {
      col3.innerHTML = "<b> " + div7_Id[1][i] + "</b>";
    }

    var col4 = row1.insertCell(3);
    col4.innerHTML = "<b> " + div7_Id[2][i] + "</b>";
    if (!metka2 && div7_Id[2][i] >= s1_i_norm) {
      col4.className = "proverka";
      col4.innerHTML = "<b>" + div7_Id[2][i] + "</b>";
      metka2 = true;
    } else {
      col4.innerHTML = "<b> " + div7_Id[2][i] + "</b>";
    }

    var col5 = row1.insertCell(4);
    if (!metka3 && div7_Id[3][i] >= s1_i_norm) {
      col5.className = "proverka";
      col5.innerHTML = "<b>" + div7_Id[3][i] + "</b>";
      metka3 = true;
    } else {
      col5.innerHTML = "<b> " + div7_Id[3][i] + "</b>";
    }
    // Insert New Column for Row1 at index '2'.
  }
}

function sech_e_change() {
  div6_material_e =
    document.getElementById("div6_material_e").options.selectedIndex;
  div7_material_e =
    document.getElementById("div7_material_e").options.selectedIndex;
  div8_material_e =
    document.getElementById("div8_material_e").options.selectedIndex;
  var tek1 = document.getElementById("div6_sech").options.selectedIndex;
  var tek2 = document.getElementById("div7_sech").options.selectedIndex;
  var tek3 = document.getElementById("div8_sech").options.selectedIndex;
  var fe_tek;
  var fe_tek1;
  var fe_tek1;
  div5_fe_cu = $("#div5_fe_cu").val() * 1;
  div5_fe_al = $("#div5_fe_al").val() * 1;

  if (div6_material_e == 0) {
    fe_tek = div5_fe_cu;
  } else {
    fe_tek = div5_fe_al;
  }
  if (div7_material_e == 0) {
    fe_tek1 = div5_fe_cu;
  } else {
    fe_tek1 = div5_fe_al;
  }
  if (div8_material_e == 0) {
    fe_tek2 = div5_fe_cu;
  } else {
    fe_tek2 = div5_fe_al;
  }

  var k_ecran;
  if (kab_konstr == 1) {
    k_ecran = 9;
  } else {
    k_ecran = sech_e.length;
  }

  for (var j = 0; j < sech_e.length; ++j) {
    $("#div6_sech").find("option:last").remove();
  }

  for (var j = 0; j < k_ecran; ++j) {
    $("#div6_sech").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var" + (j + 1),
      text: sech_e[j],
    });
    option1.appendTo($("#div6_sech"));
    if (sech_e[j] <= fe_tek) {
      document
        .getElementById("div6_sech")
        .options[j].setAttribute("style", "color:red");
    }
  }
  document.getElementById("div6_sech").value = "var" + tek1;

  for (var j = 0; j < sech_e.length; ++j) {
    $("#div7_sech").find("option:last").remove();
  }

  for (var j = 0; j < k_ecran; ++j) {
    $("#div7_sech").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var" + (j + 1),
      text: sech_e[j],
    });
    option1.appendTo($("#div7_sech"));
    if (sech_e[j] <= fe_tek1) {
      document
        .getElementById("div7_sech")
        .options[j].setAttribute("style", "color:red");
      //document.getElementById("div7_sech").options[j].setAttribute('style',"");
    }
  }
  document.getElementById("div6_sech").value = "var" + tek2;

  for (var j = 0; j < sech_e.length; ++j) {
    $("#div8_sech").find("option:last").remove();
  }

  for (var j = 0; j < k_ecran; ++j) {
    $("#div8_sech").find("option:last").add();
    var option1 = $("<option/>", {
      value: "var" + (j + 1),
      text: sech_e[j],
    });
    option1.appendTo($("#div8_sech"));
    if (sech_e[j] <= fe_tek2) {
      document
        .getElementById("div8_sech")
        .options[j].setAttribute("style", "color:red");
    }
  }
  document.getElementById("div6_sech").value = "var" + tek3;

  document.getElementById("div6_sech").options.selectedIndex = tek1;
  document.getElementById("div7_sech").options.selectedIndex = tek2;
  document.getElementById("div8_sech").options.selectedIndex = tek3;

  //document.getElementById("div6_sech").options[tek1].select;
  //document.getElementById("div7_sech").options[tek2].select;
  //document.getElementById("div8_sech").options[tek3].select;
}

function math_all() {
  if (!kod_status) {
    alert("Код активации не валидный");
    return;
  }
  /*if ($("#div_2").css('display') != 'none' || $("#div_1").css('display') != 'none') {
        ;

    }
    if ($("#div_3").css('display') != 'none' || $("#div_4").css('display') != 'none') {

        ;
    }
    if ($("#div_5").css('display') != 'none') {
        ;
    }*/
  div3_ekvivalent();

  math_div5_f1();

  div6_ekran();

  div7_math_1();

  sech_e_change();

  div8_make_g();

  div8_math();

  const data = getJson($("form"));

  let uc = $("#s1_Uc").val();
  let l = $("#div3_Lall").val();

  sendActionData("calculation", "No name", JSON.parse(data), uc, l);
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

function handleChange_j_unt_kz(input, min, max) {
  if (input.value < min) {
    input.value = min;
  }
  if (input.value * 1 >= $("#kab_tj_bef_kz").val() * 1) {
    input.value = $("#kab_tj_bef_kz").val() * 1 - 1;
    return;
  } else if (input.value > max) {
    input.value = max;
  }
  if (isNaN(input.value)) {
    input.value == "--";
  }
}

function handleChange_j_bef_kz(input, min, max) {
  if (input.value * 1 <= $("#kab_tj_unt_kz").val() * 1) {
    input.value = $("#kab_tj_unt_kz").val() * 1 + 1;
  } else if (input.value < min) {
    input.value = min;
  }
  if (input.value > max) {
    input.value = max;
  }
  if (isNaN(input.value)) {
    input.value == "--";
  }
}

function handleChange_e_unt_kz(input, min, max) {
  if (input.value < min) {
    input.value = min;
  }
  if (input.value * 1 >= $("#kab_te_bef_kz").val() * 1) {
    input.value = $("#kab_te_bef_kz").val() * 1 - 1;
  } else if (input.value > max) {
    input.value = max;
  }
  if (isNaN(input.value)) {
    input.value == "--";
  }
}

function handleChange_e_bef_kz(input, min, max) {
  if (input.value * 1 <= $("#kab_te_unt_kz").val() * 1) {
    input.value = $("#kab_te_unt_kz").val() * 1 + 1;
  } else if (input.value < min) {
    input.value = min;
  }
  if (input.value > max) {
    input.value = max;
  }
  if (isNaN(input.value)) {
    input.value == "--";
  }
}

function handleChange_Sab1(input, min, max) {
  if (document.getElementById("div3_usl1").options.selectedIndex == 0) {
    if (
      input.value <
      diametr[document.getElementById("div3_D1").options.selectedIndex]
    ) {
      input.value =
        diametr[document.getElementById("div3_D1").options.selectedIndex];
    }
    if (input.value > max) {
      input.value = max;
    }
    if (isNaN(input.value)) {
      input.value == "--";
    }
  } else {
    handleChange(input, min, max);
  }
}

function handleChange_Sab2(input, min, max) {
  if (document.getElementById("div3_usl2").options.selectedIndex == 0) {
    if (
      input.value <
      diametr[document.getElementById("div3_D2").options.selectedIndex]
    ) {
      input.value =
        diametr[document.getElementById("div3_D2").options.selectedIndex];
    }
    if (input.value > max) {
      input.value = max;
    }
    if (isNaN(input.value)) {
      input.value == "--";
    }
  } else {
    handleChange(input, min, max);
  }
}

function handleChange_Sab3(input, min, max) {
  if (document.getElementById("div3_usl3").options.selectedIndex == 0) {
    if (
      input.value <
      diametr[document.getElementById("div3_D3").options.selectedIndex]
    ) {
      input.value =
        diametr[document.getElementById("div3_D3").options.selectedIndex];
    }
    if (input.value > max) {
      input.value = max;
    }
    if (isNaN(input.value)) {
      input.value == "--";
    }
  } else {
    handleChange(input, min, max);
  }
}

function handleChange_Sab4(input, min, max) {
  if (document.getElementById("div3_usl4").options.selectedIndex == 0) {
    if (
      input.value <
      diametr[document.getElementById("div3_D4").options.selectedIndex]
    ) {
      input.value =
        diametr[document.getElementById("div3_D4").options.selectedIndex];
    }
    if (input.value > max) {
      input.value = max;
    }
    if (isNaN(input.value)) {
      input.value == "--";
    }
  } else {
    handleChange(input, min, max);
  }
}

function sigFigs(n) {
  if (n != 0) {
    var mult = Math.pow(10, 3 - Math.floor(Math.log(n) / Math.LN10) - 1);
    var exit = Math.round(n * mult) / mult;
    var ost = Math.round(n * mult) % 10;
    var ost1 = Math.round(n * mult) % 100;
    var exit1;
    if (ost == 0 && mult > 1) {
      if (exit % 1 == 0) {
        exit1 = exit + ".0";
      } else {
        exit1 = exit + "0";
      }
    } else {
      exit1 = exit;
    }
    if (isNaN(exit)) {
      return "--";
    } else {
      return exit1;
    }
  } else {
    return 0;
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
  if (k == 3) {
    return parseFloat(r).toFixed(3);
  }
  return Math.trunc(r); //отбросить
  //return Math.ceil(r); //округлить вверх
  //return Math.floor(r); //округлить вниз
}

function activ_my_prog() {
  decoder();
}

//Блокирует ячейки Тока КЗ при выборе типа Нейтрали сети
function change_neitral() {
  s1_neitral = document.getElementById("s1_neitral").options.selectedIndex;

  switch (s1_neitral) {
    case 0:
      //document.getElementById('s1_3kz').disabled = true;
      document.getElementById("s1_1kz").disabled = false;
      //$("#s1_3kz").val("--");
      //$("#s1_1kz").val("");
      break;

    case 1:
      //document.getElementById('s1_3kz').disabled = false;
      document.getElementById("s1_1kz").disabled = true;
      //$("#s1_3kz").val("");
      $("#s1_1kz").val("--");
      break;

    case 2:
      //document.getElementById('s1_3kz').disabled = false;
      document.getElementById("s1_1kz").disabled = true;
      //$("#s1_3kz").val("");
      $("#s1_1kz").val("--");
      break;

    case 3:
      //document.getElementById('s1_3kz').disabled = true;
      document.getElementById("s1_1kz").disabled = false;
      //$("#s1_3kz").val("--");
      //$("#s1_1kz").val("");
      break;
  }
}

function change_apperiod() {
  s1_upper = document.getElementById("s1_upper").options.selectedIndex;

  switch (s1_upper) {
    case 0:
      document.getElementById("s1_prim_kl").disabled = true;
      document.getElementById("s1_ta").disabled = true;
      $("#s1_ta").val("--");
      for (var j = 0; j <= 1; ++j) {
        $("#s1_prim_kl").find("option:last").remove();
      }

      for (var j = 0; j <= 1; ++j) {
        $("#s1_prim_kl").find("option:last").add();
        var option1 = $("<option/>", {
          value: "lol" + j,
          text: "--",
        });
        option1.appendTo($("#s1_prim_kl"));
      }
      break;
    case 1:
      document.getElementById("s1_ta").disabled = false;
      document.getElementById("s1_prim_kl").disabled = false;
      $("#s1_ta").val("0.075");
      for (var j = 0; j <= 1; ++j) {
        $("#s1_prim_kl").find("option:last").remove();
      }

      for (var j = 0; j <= 1; ++j) {
        if (j == 0) {
          var k = "нет";
        } else {
          var k = "есть";
        }

        $("#s1_prim_kl").find("option:last").add();
        var option1 = $("<option/>", {
          value: "lol" + j,
          text: k,
        });
        option1.appendTo($("#s1_prim_kl"));
      }
      change_s1_prim_kl();
      break;
  }
}

function change_s1_prim_kl() {
  s1_prim_kl = document.getElementById("s1_prim_kl").options.selectedIndex;
  switch (s1_prim_kl) {
    case 0:
      $("#s1_ta").val("0.075");
      break;
    case 1:
      $("#s1_ta").val("0.315");
      break;
  }
}

function change_kab_konstruct() {
  kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;
  var k_table;
  switch (kab_konstr) {
    case 0:
      document.getElementById("kab_touch").value = "nono";
      document.getElementById("kab_touch").disabled = true;
      ke_change1;

      $("#ke_change1").html("Коэффициент Кэ для каждого экрана, кА/мм2:");
      $("#ke_change2").html("Коэффициент Кэ для каждого экрана, кА/мм2:");
      $("#ke_change3").html("Минимальное сечение каждого экрана Fэ, мм2:");
      $("#ke_change4").html("Минимальное сечение каждого экрана Fэ, мм2:");
      $("#ke_change5").html("Сечение каждого экрана Fэ, мм2:");
      $("#ke_change6").html("Сечение каждого экрана Fэ, мм2:");
      $("#ke_change7").html("Сечение каждого экрана Fэ, мм2:");
      $("#div3_change_name").html(
        "Число способов прокладки однофазных кабелей:"
      );

      document.getElementById("div6_lost").disabled = false;
      document.getElementById("div7_lost").disabled = false;
      document.getElementById("div8_lost").disabled = false;

      /*$("#div3_skeep1").show();
            $("#div3_skeep2").show();
            $("#div3_skeep3").show();
            $("#div3_skeep4").show();*/
      $("#div3_skeep1ab").show();
      $("#div3_skeep2ab").show();
      $("#div3_skeep3ab").show();
      $("#div3_skeep4ab").show();

      document.getElementById("div3_keep1").disabled = false;
      document.getElementById("div3_keep2").disabled = false;
      document.getElementById("div3_keep3").disabled = false;
      document.getElementById("div3_keep4").disabled = false;
      k_table = table_line.length;
      break;
    case 1:
      document.getElementById("kab_touch").value = "yeap";
      document.getElementById("kab_touch").disabled = true;
      $("#ke_change1").html("Коэффициент Кэ для общего экрана, кА/мм2:");
      $("#ke_change2").html("Коэффициент Кэ для общего экрана, кА/мм2:");
      $("#ke_change3").html("Минимальное сечение общего экрана Fэ, мм2:");
      $("#ke_change4").html("Минимальное сечение общего экрана Fэ, мм2:");
      $("#ke_change5").html("Сечение общего экрана Fэ, мм2:");
      $("#ke_change6").html("Сечение общего экрана Fэ, мм2:");
      $("#ke_change7").html("Сечение общего экрана Fэ, мм2:");
      $("#div3_change_name").html(
        "Число способов прокладки трехфазных кабелей:"
      );
      document.getElementById("div6_lost").disabled = true;
      document.getElementById("div6_lost").value = "no";
      document.getElementById("div7_lost").disabled = true;
      document.getElementById("div7_lost").value = "no";
      document.getElementById("div8_lost").disabled = true;
      document.getElementById("div8_lost").value = "no";
      /*$("#div3_skeep1").hide();
            $("#div3_skeep2").hide();
            $("#div3_skeep3").hide();
            $("#div3_skeep4").hide();*/
      $("#div3_skeep1ab").hide();
      $("#div3_skeep2ab").hide();
      $("#div3_skeep3ab").hide();
      $("#div3_skeep4ab").hide();

      document.getElementById("div3_keep1").value = "teck_in";
      document.getElementById("div3_keep2").value = "teck_in";
      document.getElementById("div3_keep3").value = "teck_in";
      document.getElementById("div3_keep4").value = "teck_in";

      document.getElementById("div3_keep1").disabled = true;
      document.getElementById("div3_keep2").disabled = true;
      document.getElementById("div3_keep3").disabled = true;
      document.getElementById("div3_keep4").disabled = true;

      k_table = 11;

      break;
  }
  for (var j = 0; j < k_table; ++j) {
    div6_f1[j] = "-";
    div6_f3[j] = "-";
    div6_f4[j] = "-";
    div6_f7[j] = "-";
  }
  cleate_table_div6();
}

//ТРАССА Ч1
function div3_grunt_in_pipe() {
  div3_usl1 = document.getElementById("div3_usl1").options.selectedIndex;
  div3_usl2 = document.getElementById("div3_usl2").options.selectedIndex;
  div3_usl3 = document.getElementById("div3_usl3").options.selectedIndex;
  div3_usl4 = document.getElementById("div3_usl4").options.selectedIndex;

  div3_keep1 = document.getElementById("div3_keep1").options.selectedIndex;
  div3_keep2 = document.getElementById("div3_keep2").options.selectedIndex;
  div3_keep3 = document.getElementById("div3_keep3").options.selectedIndex;
  div3_keep4 = document.getElementById("div3_keep4").options.selectedIndex;
  kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;

  if (kab_konstr == 0) {
    switch (
      div3_usl1 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep1 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe1").val("3");
            document.getElementById("div3_Sab1").disabled = true;
            $("#div3_Sab1").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab1").disabled = false;
            if ($("#div3_Sab1").val() == "--") {
              $("#div3_Sab1").val("");
            }

            $("#div3_cable_in_pipe1").val("1");
            break;
        }
        //$("#div3_max_fg1_1").val("--");
        break;
      case 1:
      case 2:
        /*if ($("#div3_max_fg1_1").val() == '--') {
                    $("#div3_max_fg1_1").val("");
                }*/
        switch (
          div3_keep1 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe1").val("--");
            document.getElementById("div3_Sab1").disabled = true;
            $("#div3_Sab1").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab1").disabled = false;
            if ($("#div3_Sab1").val() == "--") {
              $("#div3_Sab1").val("");
            }

            $("#div3_cable_in_pipe1").val("--");
            break;
        }
        break;
    }

    switch (
      div3_usl2 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep2 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe2").val("3");
            document.getElementById("div3_Sab2").disabled = true;
            $("#div3_Sab2").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab2").disabled = false;
            if ($("#div3_Sab2").val() == "--") {
              $("#div3_Sab2").val("");
            }

            $("#div3_cable_in_pipe2").val("1");
            break;
        }
        //$("#div3_max_fg2_1").val("--");

        break;
      case 1:
      case 2:
        /*if ($("#div3_max_fg2_1").val() == '--') {
                    $("#div3_max_fg2_1").val("");

                }*/
        switch (
          div3_keep2 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe2").val("--");
            document.getElementById("div3_Sab2").disabled = true;
            $("#div3_Sab2").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab2").disabled = false;
            if ($("#div3_Sab2").val() == "--") {
              $("#div3_Sab2").val("");
            }

            $("#div3_cable_in_pipe2").val("--");
            break;
        }
        break;
    }
    switch (
      div3_usl3 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep3 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe3").val("3");
            document.getElementById("div3_Sab3").disabled = true;
            $("#div3_Sab3").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab3").disabled = false;
            if ($("#div3_Sab3").val() == "--") {
              $("#div3_Sab3").val("");
            }

            $("#div3_cable_in_pipe3").val("1");
            break;
        }
        //$("#div3_max_fg3_1").val("--");
        break;
      case 1:
      case 2:
        /* if ($("#div3_max_fg3_1").val() == '--') {
                     $("#div3_max_fg3_1").val("");
                 }*/
        switch (
          div3_keep3 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe3").val("--");
            document.getElementById("div3_Sab3").disabled = true;
            $("#div3_Sab3").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab3").disabled = false;
            if ($("#div3_Sab3").val() == "--") {
              $("#div3_Sab3").val("");
            }

            $("#div3_cable_in_pipe3").val("--");
            break;
        }
        break;
    }
    switch (
      div3_usl4 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep4 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe4").val("3");
            document.getElementById("div3_Sab4").disabled = true;
            $("#div3_Sab4").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab4").disabled = false;
            if ($("#div3_Sab4").val() == "--") {
              $("#div3_Sab4").val("");
            }

            $("#div3_cable_in_pipe4").val("1");
            break;
        }
        //$("#div3_max_fg4_1").val("--");
        break;
      case 1:
      case 2:
        /*if ($("#div3_max_fg4_1").val() == '--') {
                    $("#div3_max_fg4_1").val("");
                }*/
        switch (
          div3_keep4 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe4").val("--");
            document.getElementById("div3_Sab4").disabled = true;
            $("#div3_Sab4").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab4").disabled = false;
            if ($("#div3_Sab4").val() == "--") {
              $("#div3_Sab4").val("");
            }

            $("#div3_cable_in_pipe4").val("--");
            break;
        }
        break;
    }
  } else {
    switch (
      div3_usl1 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep1 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe1").val("1");
            document.getElementById("div3_Sab1").disabled = true;
            $("#div3_Sab1").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab1").disabled = false;
            if ($("#div3_Sab1").val() == "--") {
              $("#div3_Sab1").val("");
            }

            $("#div3_cable_in_pipe1").val("1");
            break;
        }
        //$("#div3_max_fg1_1").val("--");
        break;
      case 1:
      case 2:
        /*if ($("#div3_max_fg1_1").val() == '--') {
                    $("#div3_max_fg1_1").val("");
                }*/
        switch (
          div3_keep1 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe1").val("--");
            document.getElementById("div3_Sab1").disabled = true;
            $("#div3_Sab1").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab1").disabled = false;
            if ($("#div3_Sab1").val() == "--") {
              $("#div3_Sab1").val("");
            }

            $("#div3_cable_in_pipe1").val("--");
            break;
        }
        break;
    }

    switch (
      div3_usl2 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep2 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe2").val("1");
            document.getElementById("div3_Sab2").disabled = true;
            $("#div3_Sab2").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab2").disabled = false;
            if ($("#div3_Sab2").val() == "--") {
              $("#div3_Sab2").val("");
            }

            $("#div3_cable_in_pipe2").val("1");
            break;
        }
        //$("#div3_max_fg2_1").val("--");

        break;
      case 1:
      case 2:
        /*if ($("#div3_max_fg2_1").val() == '--') {
                    $("#div3_max_fg2_1").val("");
    
                }*/
        switch (
          div3_keep2 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe2").val("--");
            document.getElementById("div3_Sab2").disabled = true;
            $("#div3_Sab2").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab2").disabled = false;
            if ($("#div3_Sab2").val() == "--") {
              $("#div3_Sab2").val("");
            }

            $("#div3_cable_in_pipe2").val("--");
            break;
        }
        break;
    }
    switch (
      div3_usl3 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep3 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe3").val("1");
            document.getElementById("div3_Sab3").disabled = true;
            $("#div3_Sab3").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab3").disabled = false;
            if ($("#div3_Sab3").val() == "--") {
              $("#div3_Sab3").val("");
            }

            $("#div3_cable_in_pipe3").val("1");
            break;
        }
        //$("#div3_max_fg3_1").val("--");
        break;
      case 1:
      case 2:
        /* if ($("#div3_max_fg3_1").val() == '--') {
                     $("#div3_max_fg3_1").val("");
                 }*/
        switch (
          div3_keep3 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe3").val("--");
            document.getElementById("div3_Sab3").disabled = true;
            $("#div3_Sab3").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab3").disabled = false;
            if ($("#div3_Sab3").val() == "--") {
              $("#div3_Sab3").val("");
            }

            $("#div3_cable_in_pipe3").val("--");
            break;
        }
        break;
    }
    switch (
      div3_usl4 //Условия прокладки
    ) {
      case 0:
        switch (
          div3_keep4 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe4").val("1");
            document.getElementById("div3_Sab4").disabled = true;
            $("#div3_Sab4").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab4").disabled = false;
            if ($("#div3_Sab4").val() == "--") {
              $("#div3_Sab4").val("");
            }

            $("#div3_cable_in_pipe4").val("1");
            break;
        }
        //$("#div3_max_fg4_1").val("--");
        break;
      case 1:
      case 2:
        /*if ($("#div3_max_fg4_1").val() == '--') {
                    $("#div3_max_fg4_1").val("");
                }*/
        switch (
          div3_keep4 //Способ прокладки
        ) {
          case 0:
            $("#div3_cable_in_pipe4").val("--");
            document.getElementById("div3_Sab4").disabled = true;
            $("#div3_Sab4").val("--");

            break;
          case 1:
          case 2:
            document.getElementById("div3_Sab4").disabled = false;
            if ($("#div3_Sab4").val() == "--") {
              $("#div3_Sab4").val("");
            }

            $("#div3_cable_in_pipe4").val("--");
            break;
        }
        break;
    }
  }
}
//(++)
function div3_Sab_more_D() {
  div3_D1 = diametr[document.getElementById("div3_D1").options.selectedIndex];
  div3_D2 = diametr[document.getElementById("div3_D2").options.selectedIndex];
  div3_D3 = diametr[document.getElementById("div3_D3").options.selectedIndex];
  div3_D4 = diametr[document.getElementById("div3_D4").options.selectedIndex];
  div3_Sab1 = $("#div3_Sab1").val() * 1;
  div3_Sab2 = $("#div3_Sab2").val() * 1;
  div3_Sab3 = $("#div3_Sab3").val() * 1;
  div3_Sab4 = $("#div3_Sab4").val() * 1;

  if (div3_Sab1 < div3_D1 && div3_Sab1 != 0) {
    div3_Sab1 = div3_D1;
    $("#div3_Sab1").val(div3_Sab1);
  }
  if (div3_Sab2 < div3_D2 && div3_Sab2 != 0) {
    div3_Sab2 = div3_D2;
    $("#div3_Sab2").val(div3_Sab2);
  }
  if (div3_Sab3 < div3_D3 && div3_Sab3 != 0) {
    div3_Sab3 = div3_D3;
    $("#div3_Sab3").val(div3_Sab3);
  }
  if (div3_Sab4 < div3_D4 && div3_Sab4 != 0) {
    div3_Sab4 = div3_D4;
    $("#div3_Sab4").val(div3_Sab4);
  }
}

function div3_e_for_1() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN1 = sn[document.getElementById("div3_SN1").options.selectedIndex];
  div3_D1 = diametr[document.getElementById("div3_D1").options.selectedIndex];
  div3_cable_in_pipe1 = $("#div3_cable_in_pipe1").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab1 = $("#div3_Sab1").val() * 1;
  div3_usl1 = document.getElementById("div3_usl1").options.selectedIndex;

  var dv1;
  var dekv1;
  var dmax1;
  div3_e1 =
    div3_D1 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN1), 1 / 3) + 1);
  dv1 = div3_D1 - 2 * div3_e1;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe1 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e1").val(div3_e1);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r4_sab = div3_Sab1 / 2;

  var r3 = r4 - delta_ob;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;
  var r3_sab = r4_sab - delta_ob;
  var r2_sab = Math.sqrt(r3_sab * r3_sab - 16 / (Math.PI * kab_ke));
  var r1_sab = r2_sab - delta_je;

  if (div3_usl1 == 0) {
    if (r1 > 0) {
      div3_max_fg1 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg1 = 0;
    }
    //$("#div3_max_fg1_1").val("--");
    if (div3_max_fg1 <= 2500) {
      $("#div3_max_fg1").val(all_round(div3_max_fg1));
    } else {
      $("#div3_max_fg1").val(2500);
      div3_max_fg1 = 2500;
    }
  }
  if (div3_usl1 != 0) {
    if (r1_sab > 0) {
      div3_max_fg1_1 = kab_kj * Math.PI * r1_sab * r1_sab;
    } else {
      div3_max_fg1_1 = 0;
    }
    //$("#div3_max_fg1").val("--");
    if (div3_max_fg1_1 <= 2500) {
      $("#div3_max_fg1").val(all_round(div3_max_fg1_1));
    } else {
      if (!isNaN(div3_max_fg1_1)) {
        $("#div3_max_fg1").val(2500);
        div3_max_fg1_1 = 2500;
      } else {
        $("#div3_max_fg1").val(0);
      }
    }
  }
  div3_keep1 = document.getElementById("div3_keep1").options.selectedIndex;

  if (div3_usl1 != 0 && div3_keep1 == 0) {
    div3_max_fg1 = 2500;
    div3_max_fg1_1 = 2500;
    $("#div3_max_fg1").val(2500);
  }

  if ($("#div3_max_fg1").val() * 1 < 35) {
    $("input[name=div3_max_fg1]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg1]").css("background-color", "");
  }
}

function div3_e_for_2() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN2 = sn[document.getElementById("div3_SN2").options.selectedIndex];
  div3_D2 = diametr[document.getElementById("div3_D2").options.selectedIndex];
  div3_cable_in_pipe2 = $("#div3_cable_in_pipe2").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab2 = $("#div3_Sab2").val() * 1;
  div3_usl2 = document.getElementById("div3_usl2").options.selectedIndex;

  var dv1;
  var dekv1;
  var dmax1;
  div3_e2 =
    div3_D2 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN2), 1 / 3) + 1);
  dv1 = div3_D2 - 2 * div3_e2;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe2 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e2").val(div3_e2);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r4_sab = div3_Sab2 / 2;

  var r3 = r4 - delta_ob;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;
  var r3_sab = r4_sab - delta_ob;
  var r2_sab = Math.sqrt(r3_sab * r3_sab - 16 / (Math.PI * kab_ke));
  var r1_sab = r2_sab - delta_je;
  if (div3_usl2 == 0) {
    if (r1 > 0) {
      div3_max_fg2 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg2 = 0;
    }
    // $("#div3_max_fg2_1").val("--");
    if (div3_max_fg2 <= 2500) {
      $("#div3_max_fg2").val(all_round(div3_max_fg2));
    } else {
      $("#div3_max_fg2").val(2500);
      div3_max_fg2 = 2500;
    }
  }
  if (div3_usl2 != 0) {
    if (r1_sab > 0) {
      div3_max_fg2_1 = kab_kj * Math.PI * r1_sab * r1_sab;
    } else {
      div3_max_fg2_1 = 0;
    }
    // $("#div3_max_fg2").val("--");
    if (div3_max_fg2_1 <= 2500) {
      $("#div3_max_fg2").val(all_round(div3_max_fg2_1));
    } else {
      if (!isNaN(div3_max_fg2_1)) {
        $("#div3_max_fg2").val(2500);
        div3_max_fg2_1 = 2500;
      } else {
        $("#div3_max_fg2").val(0);
      }
    }
  }
  div3_keep2 = document.getElementById("div3_keep2").options.selectedIndex;

  if (div3_usl2 != 0 && div3_keep2 == 0) {
    div3_max_fg2 = 2500;
    div3_max_fg2_1 = 2500;
    $("#div3_max_fg2").val(2500);
  }

  if ($("#div3_max_fg2").val() * 1 < 35) {
    $("input[name=div3_max_fg2]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg2]").css("background-color", "");
  }
}

function div3_e_for_3() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN3 = sn[document.getElementById("div3_SN3").options.selectedIndex];
  div3_D3 = diametr[document.getElementById("div3_D3").options.selectedIndex];
  div3_cable_in_pipe3 = $("#div3_cable_in_pipe3").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab3 = $("#div3_Sab3").val() * 1;
  div3_usl3 = document.getElementById("div3_usl3").options.selectedIndex;

  var dv1;
  var dekv1;
  var dmax1;
  div3_e3 =
    div3_D3 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN3), 1 / 3) + 1);
  dv1 = div3_D3 - 2 * div3_e3;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe3 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e3").val(div3_e3);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r4_sab = div3_Sab3 / 2;

  var r3 = r4 - delta_ob;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;
  var r3_sab = r4_sab - delta_ob;
  var r2_sab = Math.sqrt(r3_sab * r3_sab - 16 / (Math.PI * kab_ke));
  var r1_sab = r2_sab - delta_je;
  if (div3_usl3 == 0) {
    if (r1 > 0) {
      div3_max_fg3 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg3 = 0;
    }
    //$("#div3_max_fg3_1").val("--");
    if (div3_max_fg3 <= 2500) {
      $("#div3_max_fg3").val(all_round(div3_max_fg3));
    } else {
      $("#div3_max_fg3").val(2500);
      div3_max_fg1 = 2500;
    }
  }
  if (div3_usl3 != 0) {
    if (r1_sab > 0) {
      div3_max_fg3_1 = kab_kj * Math.PI * r1_sab * r1_sab;
    } else {
      div3_max_fg3_1 = 0;
    }
    //$("#div3_max_fg3").val("--");
    if (div3_max_fg3_1 <= 2500) {
      $("#div3_max_fg3").val(all_round(div3_max_fg3_1));
    } else {
      if (!isNaN(div3_max_fg3_1)) {
        $("#div3_max_fg3").val(2500);
        div3_max_fg3_1 = 2500;
      } else {
        $("#div3_max_fg3").val(0);
      }
    }
  }
  div3_keep3 = document.getElementById("div3_keep3").options.selectedIndex;

  if (div3_usl3 != 0 && div3_keep3 == 0) {
    div3_max_fg3 = 2500;
    div3_max_fg3_1 = 2500;
    $("#div3_max_fg3").val(2500);
  }
  if ($("#div3_max_fg3").val() * 1 < 35) {
    $("input[name=div3_max_fg3]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg3]").css("background-color", "");
  }
}

function div3_e_for_4() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN4 = sn[document.getElementById("div3_SN4").options.selectedIndex];
  div3_D4 = diametr[document.getElementById("div3_D4").options.selectedIndex];
  div3_cable_in_pipe4 = $("#div3_cable_in_pipe4").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab4 = $("#div3_Sab4").val() * 1;
  div3_usl4 = document.getElementById("div3_usl4").options.selectedIndex;
  div3_keep4 = document.getElementById("div3_keep4").options.selectedIndex;
  var dv1;
  var dekv1;
  var dmax1;
  div3_e4 =
    div3_D4 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN4), 1 / 3) + 1);
  dv1 = div3_D4 - 2 * div3_e4;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe4 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e4").val(div3_e4);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r4_sab = div3_Sab4 / 2;

  var r3 = r4 - delta_ob;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;
  var r3_sab = r4_sab - delta_ob;
  var r2_sab = Math.sqrt(r3_sab * r3_sab - 16 / (Math.PI * kab_ke));
  var r1_sab = r2_sab - delta_je;
  if (div3_usl4 == 0) {
    if (r1 > 0) {
      div3_max_fg4 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg4 = 0;
    }
    //$("#div3_max_fg4").val("--");
    if (div3_max_fg4 <= 2500) {
      $("#div3_max_fg4").val(all_round(div3_max_fg4));
    } else {
      $("#div3_max_fg4").val(2500);
      div3_max_fg4 = 2500;
    }
  }
  if (div3_usl4 != 0) {
    if (r1_sab > 0) {
      div3_max_fg4_1 = kab_kj * Math.PI * r1_sab * r1_sab;
    } else {
      div3_max_fg4_1 = 0;
    }
    // $("#div3_max_fg4").val("--");
    if (div3_max_fg4_1 <= 2500) {
      $("#div3_max_fg4").val(all_round(div3_max_fg4_1));
    } else {
      if (!isNaN(div3_max_fg4_1)) {
        $("#div3_max_fg4").val(2500);
        div3_max_fg4_1 = 2500;
      } else {
        $("#div3_max_fg4").val(0);
      }
    }
  }
  div3_keep4 = document.getElementById("div3_keep4").options.selectedIndex;

  if (div3_usl4 != 0 && div3_keep4 == 0) {
    div3_max_fg4 = 2500;
    div3_max_fg4_1 = 2500;
    $("#div3_max_fg4").val(2500);
  }
  if ($("#div3_max_fg4").val() * 1 < 35) {
    $("input[name=div3_max_fg4]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg4]").css("background-color", "");
  }
}

//ДЛЯ ТРЕХФАЗНОГО!!!
function div3_e3_for_1() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN1 = sn[document.getElementById("div3_SN1").options.selectedIndex];
  div3_D1 = diametr[document.getElementById("div3_D1").options.selectedIndex];
  div3_cable_in_pipe1 = $("#div3_cable_in_pipe1").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab1 = $("#div3_Sab1").val() * 1;
  div3_usl1 = document.getElementById("div3_usl1").options.selectedIndex;

  var dv1;
  var dekv1;
  var dmax1;
  div3_e1 =
    div3_D1 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN1), 1 / 3) + 1);
  dv1 = div3_D1 - 2 * div3_e1;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe1 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e1").val(div3_e1);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r43 = r4 - delta_ob;

  var r3 = r43 / 2.15;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;

  if (div3_usl1 == 0) {
    if (r1 > 0) {
      div3_max_fg1 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg1 = 0;
    }
    //$("#div3_max_fg1_1").val("--");
    if (div3_max_fg1 <= 500) {
      $("#div3_max_fg1").val(all_round(div3_max_fg1));
    } else {
      $("#div3_max_fg1").val(500);
      div3_max_fg1 = 500;
    }
  }

  div3_keep1 = document.getElementById("div3_keep1").options.selectedIndex;

  if (div3_usl1 != 0 && div3_keep1 == 0) {
    div3_max_fg1 = 500;
    div3_max_fg1_1 = 500;
    $("#div3_max_fg1").val(500);
  }

  if ($("#div3_max_fg1").val() * 1 < 35) {
    $("input[name=div3_max_fg1]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg1]").css("background-color", "");
  }
}

function div3_e3_for_2() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN2 = sn[document.getElementById("div3_SN2").options.selectedIndex];
  div3_D2 = diametr[document.getElementById("div3_D2").options.selectedIndex];
  div3_cable_in_pipe2 = $("#div3_cable_in_pipe2").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab2 = $("#div3_Sab2").val() * 1;
  div3_usl2 = document.getElementById("div3_usl2").options.selectedIndex;

  var dv1;
  var dekv1;
  var dmax1;
  div3_e2 =
    div3_D2 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN2), 1 / 3) + 1);
  dv1 = div3_D2 - 2 * div3_e2;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe2 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e2").val(div3_e2);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r43 = r4 - delta_ob;

  var r3 = r43 / 2.15;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;

  if (div3_usl2 == 0) {
    if (r1 > 0) {
      div3_max_fg2 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg2 = 0;
    }
    //$("#div3_max_fg1_1").val("--");
    if (div3_max_fg2 <= 500) {
      $("#div3_max_fg2").val(all_round(div3_max_fg2));
    } else {
      $("#div3_max_fg2").val(500);
      div3_max_fg2 = 500;
    }
  }

  div3_keep2 = document.getElementById("div3_keep2").options.selectedIndex;

  if (div3_usl2 != 0 && div3_keep2 == 0) {
    div3_max_fg2 = 500;
    div3_max_fg2_1 = 500;
    $("#div3_max_fg2").val(500);
  }

  if ($("#div3_max_fg2").val() * 1 < 35) {
    $("input[name=div3_max_fg2]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg2]").css("background-color", "");
  }
}

function div3_e3_for_3() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN3 = sn[document.getElementById("div3_SN3").options.selectedIndex];
  div3_D3 = diametr[document.getElementById("div3_D3").options.selectedIndex];
  div3_cable_in_pipe3 = $("#div3_cable_in_pipe3").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab3 = $("#div3_Sab3").val() * 1;
  div3_usl3 = document.getElementById("div3_usl3").options.selectedIndex;

  var dv1;
  var dekv1;
  var dmax1;
  div3_e3 =
    div3_D3 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN3), 1 / 3) + 1);
  dv1 = div3_D3 - 2 * div3_e3;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe3 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e3").val(div3_e3);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r43 = r4 - delta_ob;

  var r3 = r43 / 2.15;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;

  if (div3_usl3 == 0) {
    if (r1 > 0) {
      div3_max_fg3 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg3 = 0;
    }
    //$("#div3_max_fg1_1").val("--");
    if (div3_max_fg3 <= 500) {
      $("#div3_max_fg3").val(all_round(div3_max_fg3));
    } else {
      $("#div3_max_fg3").val(500);
      div3_max_fg3 = 500;
    }
  }

  div3_keep3 = document.getElementById("div3_keep3").options.selectedIndex;

  if (div3_usl3 != 0 && div3_keep3 == 0) {
    div3_max_fg3 = 500;
    div3_max_fg3_1 = 500;
    $("#div3_max_fg3").val(500);
  }

  if ($("#div3_max_fg3").val() * 1 < 35) {
    $("input[name=div3_max_fg3]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg3]").css("background-color", "");
  }
}

function div3_e3_for_4() {
  div4_mod_upr = $("#div4_mod_upr").val() * 1;
  div3_SN4 = sn[document.getElementById("div3_SN4").options.selectedIndex];
  div3_D4 = diametr[document.getElementById("div3_D4").options.selectedIndex];
  div3_cable_in_pipe4 = $("#div3_cable_in_pipe4").val() * 1;
  div3_dv_dekv1 = $("#div3_dv_dekv1").val() * 1;
  div3_Sab4 = $("#div3_Sab4").val() * 1;
  div3_usl4 = document.getElementById("div3_usl4").options.selectedIndex;

  var dv1;
  var dekv1;
  var dmax1;
  div3_e4 =
    div3_D4 / (Math.pow((div4_mod_upr * 1000) / (12 * div3_SN4), 1 / 3) + 1);
  dv1 = div3_D4 - 2 * div3_e4;
  dekv1 = dv1 / div3_dv_dekv1;

  if (div3_cable_in_pipe4 == 1) {
    dmax1 = dekv1;
  } else {
    dmax1 = dekv1 / 2.15;
  }

  $("#div3_e4").val(div3_e4);

  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = dmax1 / 2;

  var r43 = r4 - delta_ob;

  var r3 = r43 / 2.15;
  var r2 = Math.sqrt(r3 * r3 - 16 / (Math.PI * kab_ke));
  var r1 = r2 - delta_je;

  if (div3_usl4 == 0) {
    if (r1 > 0) {
      div3_max_fg4 = kab_kj * Math.PI * r1 * r1;
    } else {
      div3_max_fg4 = 0;
    }
    //$("#div3_max_fg1_1").val("--");
    if (div3_max_fg4 <= 500) {
      $("#div3_max_fg4").val(all_round(div3_max_fg4));
    } else {
      $("#div3_max_fg4").val(500);
      div3_max_fg4 = 500;
    }
  }

  div3_keep4 = document.getElementById("div3_keep4").options.selectedIndex;

  if (div3_usl4 != 0 && div3_keep4 == 0) {
    div3_max_fg4 = 500;
    div3_max_fg4_1 = 500;
    $("#div3_max_fg4").val(500);
  }

  if ($("#div3_max_fg4").val() * 1 < 35) {
    $("input[name=div3_max_fg4]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg4]").css("background-color", "");
  }
}

//--------------------
function div3_one_or_three() {
  kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;
  if (kab_konstr == 1) {
    div3_e3_for_1();
    div3_e3_for_2();
    div3_e3_for_3();
    div3_e3_for_4();
  } else {
    div3_e_for_1();
    div3_e_for_2();
    div3_e_for_3();
    div3_e_for_4();
  }
}

function div3_paral_kl_for_1() {
  div3_paral_kl1 =
    document.getElementById("div3_paral_kl1").options.selectedIndex;

  div3_Sab1 = $("#div3_Sab1").val() * 1;

  if (div3_paral_kl1 == 0) {
    $("#div3_S12_1").val("--");
    document.getElementById("div3_S12_1").disabled = true;
  } else {
    document.getElementById("div3_S12_1").disabled = false;
    div3_S12_1 = 500;
    $("#div3_S12_1").val(div3_S12_1);
    if (div3_S12_1 < 2 * div3_Sab1) {
      $("#div3_S12_1").val(2 * div3_Sab1);
    }
  }
}

function div3_paral_kl_for_2() {
  div3_paral_kl2 =
    document.getElementById("div3_paral_kl2").options.selectedIndex;

  div3_Sab2 = $("#div3_Sab2").val() * 1;

  if (div3_paral_kl2 == 0) {
    $("#div3_S12_2").val("--");
    document.getElementById("div3_S12_2").disabled = true;
  } else {
    document.getElementById("div3_S12_2").disabled = false;
    div3_S12_2 = 500;
    $("#div3_S12_2").val(div3_S12_2);
    if (div3_S12_2 < 2 * div3_Sab2) {
      $("#div3_S12_2").val(2 * div3_Sab2);
    }
  }
}

function div3_paral_kl_for_3() {
  div3_paral_kl3 =
    document.getElementById("div3_paral_kl3").options.selectedIndex;

  div3_Sab3 = $("#div3_Sab3").val() * 1;

  if (div3_paral_kl3 == 0) {
    $("#div3_S12_3").val("--");
    document.getElementById("div3_S12_3").disabled = true;
  } else {
    document.getElementById("div3_S12_3").disabled = false;
    div3_S12_3 = 500;
    $("#div3_S12_3").val(div3_S12_3);
    if (div3_S12_3 < 2 * div3_Sab3) {
      $("#div3_S12_3").val(2 * div3_Sab3);
    }
  }
}

function div3_paral_kl_for_4() {
  div3_paral_kl4 =
    document.getElementById("div3_paral_kl4").options.selectedIndex;

  div3_Sab4 = $("#div3_Sab4").val() * 1;

  if (div3_paral_kl4 == 0) {
    $("#div3_S12_4").val("--");
    document.getElementById("div3_S12_4").disabled = true;
  } else {
    document.getElementById("div3_S12_4").disabled = false;
    div3_S12_4 = 500;
    $("#div3_S12_4").val(div3_S12_4);
    if (div3_S12_4 < 2 * div3_Sab4) {
      $("#div3_S12_4").val(2 * div3_Sab4);
    }
  }
}

function div3_ekvivalent() {
  div3_otrezok1 = $("#div3_otrezok1").val() * 1;
  div3_otrezok2 = $("#div3_otrezok2").val() * 1;
  div3_otrezok3 = $("#div3_otrezok3").val() * 1;
  div3_otrezok4 = $("#div3_otrezok4").val() * 1;
  //fg не хотят работать как надо
  var fg1 = 0;
  var fg2 = 0;
  var fg3 = 0;
  var fg4 = 0;

  if (div3_usl1 == 0) {
    fg1 = div3_max_fg1;
  } else {
    fg1 = div3_max_fg1_1;
  }
  if (div3_usl2 == 0) {
    fg2 = div3_max_fg2;
  } else {
    fg2 = div3_max_fg2_1;
  }
  if (div3_usl3 == 0) {
    fg3 = div3_max_fg3;
  } else {
    fg3 = div3_max_fg3_1;
  }
  if (div3_usl4 == 0) {
    fg4 = div3_max_fg4;
  } else {
    fg4 = div3_max_fg4_1;
  }
  var L;
  var fg;
  div3_sposob_all =
    document.getElementById("div3_sposob_all").options.selectedIndex;
  switch (
    div3_sposob_all //Способ прокладки
  ) {
    case 0:
      L = div3_otrezok1;
      fg = fg1;
      break;
    case 1:
      L = div3_otrezok1 + div3_otrezok2;
      fg = Math.min(fg1, fg2);
      break;
    case 2:
      L = div3_otrezok1 + div3_otrezok2 + div3_otrezok3;
      fg = Math.min(fg1, fg2, fg3);
      break;
    case 3:
      L = div3_otrezok1 + div3_otrezok2 + div3_otrezok3 + div3_otrezok4;
      fg = Math.min(fg1, fg2, fg3, fg4);
      break;
  }

  div3_max_fg_2 = all_round(fg);
  if (div3_max_fg_2 < 35) {
    $("input[name=div3_max_fg_2]").css("background-color", "red");
  } else {
    $("input[name=div3_max_fg_2]").css("background-color", "");
  }
  $("#div3_Lall").val(L);
  $("#div3_max_fg_2").val(all_round(fg));
}
//----------
function div5_material() {
  div5_material_e =
    document.getElementById("div5_material_e").options.selectedIndex;
  div5_material_g =
    document.getElementById("div5_material_g").options.selectedIndex;
  switch (div5_material_e) {
    case 0:
      $("#div5_ke_al1").hide();
      $("#div5_ke_cu1").show();
      $("#div5_fe_al1").hide();
      $("#div5_fe_cu1").show();

      break;
    case 1:
      $("#div5_ke_al1").show();
      $("#div5_ke_cu1").hide();
      $("#div5_fe_al1").show();
      $("#div5_fe_cu1").hide();
      break;
  }
  switch (div5_material_g) {
    case 0:
      $("#div5_kj_al1").hide();
      $("#div5_kj_cu1").show();
      $("#div5_fj_al1").hide();
      $("#div5_fj_cu1").show();

      break;
    case 1:
      $("#div5_kj_al1").show();
      $("#div5_kj_cu1").hide();
      $("#div5_fj_al1").show();
      $("#div5_fj_cu1").hide();

      break;
  }
}

function math_div5_f1() {
  s1_rep_apv = document.getElementById("s1_rep_apv").options.selectedIndex;
  s1_brake_urov =
    document.getElementById("s1_brake_urov").options.selectedIndex;
  s1_def_var = document.getElementById("s1_def_var").options.selectedIndex;
  s1_base_def = $("#s1_base_def").val() * 1;
  s1_res_def = $("#s1_res_def").val() * 1;
  s1_t_urov = $("#s1_t_urov").val() * 1;
  s1_t_Auto_off = $("#s1_t_Auto_off").val() * 1;

  switch (s1_rep_apv) {
    case 0:
      switch (s1_def_var) {
        case 0:
          switch (s1_brake_urov) {
            case 0:
              div5_t1 = s1_base_def + s1_t_Auto_off;
              break;
            case 1:
              div5_t1 = s1_base_def + s1_t_Auto_off + s1_t_urov;
              break;
          }
          break;
        case 1:
          switch (s1_brake_urov) {
            case 0:
              div5_t1 = s1_res_def + s1_t_Auto_off;
              break;
            case 1:
              div5_t1 = s1_res_def + s1_t_Auto_off + s1_t_urov;
              break;
          }
          break;
      }
      break;
    case 1:
      switch (s1_def_var) {
        case 0:
          switch (s1_brake_urov) {
            case 0:
              div5_t1 = s1_base_def + s1_t_Auto_off;
              break;
            case 1:
              div5_t1 = s1_base_def + s1_t_Auto_off;
              break;
          }
          break;
        case 1:
          switch (s1_brake_urov) {
            case 0:
              div5_t1 = s1_res_def + s1_t_Auto_off;
              break;
            case 1:
              div5_t1 = s1_res_def + s1_t_Auto_off;
              break;
          }
          break;
      }
      break;
  }
  $("#div5_t1").val(all_round(div5_t1, 2));
  math_div5_f2();
}

function math_div5_f2() {
  s1_upper = document.getElementById("s1_upper").options.selectedIndex;
  switch (s1_upper) {
    case 0:
      div5_ka1 = 1;
      break;
    case 1:
      div5_ka1 =
        1 +
        (1 - Math.exp(-2 * (div5_t1 / s1_base_def))) / (div5_t1 / s1_base_def);
      break;
  }
  $("#div5_ka1").val(all_round(div5_ka1, 2));
  math_div5_f3();
}

function math_div5_f3() {
  div5_t1ka = div5_ka1 * div5_t1;
  $("#div5_t1ka").val(all_round(div5_t1ka, 2));
  math_div5_f4();
}

function math_div5_f4() {
  s1_rep_apv = document.getElementById("s1_rep_apv").options.selectedIndex;
  s1_brake_urov =
    document.getElementById("s1_brake_urov").options.selectedIndex;
  s1_def_var = document.getElementById("s1_def_var").options.selectedIndex;
  s1_base_def = $("#s1_base_def").val() * 1;
  s1_res_def = $("#s1_res_def").val() * 1;
  s1_t_urov = $("#s1_t_urov").val() * 1;
  s1_t_Auto_off = $("#s1_t_Auto_off").val() * 1;

  switch (s1_rep_apv) {
    case 0:
      switch (s1_def_var) {
        case 0:
          switch (s1_brake_urov) {
            case 0:
              div5_t2 = 0;
              break;
            case 1:
              div5_t2 = 0;
              break;
          }
          break;
        case 1:
          switch (s1_brake_urov) {
            case 0:
              div5_t2 = 0;
              break;
            case 1:
              div5_t2 = 0;
              break;
          }
          break;
      }
      break;
    case 1:
      switch (s1_def_var) {
        case 0:
          switch (s1_brake_urov) {
            case 0:
              div5_t2 = s1_base_def + s1_t_Auto_off;
              break;
            case 1:
              div5_t2 = s1_base_def + s1_t_urov + s1_t_Auto_off;
              break;
          }
          break;
        case 1:
          switch (s1_brake_urov) {
            case 0:
              div5_t2 = s1_res_def + s1_t_Auto_off;
              break;
            case 1:
              div5_t2 = s1_res_def + s1_t_urov + s1_t_Auto_off;
              break;
          }
          break;
      }
      break;
  }
  s1_upper = document.getElementById("s1_upper").options.selectedIndex;

  if (s1_rep_apv == 0) {
    $("#div5_t2").val("--");
  } else {
    $("#div5_t2").val(all_round(div5_t2, 2));
  }
  math_div5_f5();
}

function math_div5_f5() {
  s1_upper = document.getElementById("s1_upper").options.selectedIndex;

  s1_rep_apv = document.getElementById("s1_rep_apv").options.selectedIndex;

  switch (s1_upper) {
    case 0:
      div5_ka2 = 1;
      break;
    case 1:
      if (div5_t2 != 0) {
        div5_ka2 =
          1 +
          (1 - Math.exp(-2 * (div5_t2 / s1_base_def))) /
            (div5_t2 / s1_base_def);
      } else {
        div5_ka2 = 1;
      }
      break;
  }

  if (s1_rep_apv == 0) {
    $("#div5_ka2").val("--");
  } else {
    $("#div5_ka2").val(all_round(div5_ka2, 2));
  }
  math_div5_f6();
}

function math_div5_f6() {
  div5_t2ka = div5_ka2 * div5_t2;
  s1_rep_apv = document.getElementById("s1_rep_apv").options.selectedIndex;

  if (s1_rep_apv == 0) {
    $("#div5_t2ka").val("--");
  } else {
    $("#div5_t2ka").val(all_round(div5_t2ka, 2));
  }

  math_div5_f7();
}

function math_div5_f7() {
  div5_t_itog = div5_t1ka + div5_t2ka;
  $("#div5_t_itog").val(all_round(div5_t_itog, 2));
  math_div5_f8();
}

function math_div5_f8() {
  kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;
  kab_touch = document.getElementById("kab_touch").options.selectedIndex;
  s1_neitral = document.getElementById("s1_neitral").options.selectedIndex;
  s1_1kz = $("#s1_1kz").val() * 1;
  s1_3kz = $("#s1_3kz").val() * 1;
  if (s1_neitral == 0 || s1_neitral == 3) {
    div5_z_itog = s1_1kz;
  } else if (s1_neitral == 1 || s1_neitral == 2) {
    div5_z_itog = (Math.sqrt(3) / 2) * s1_3kz;
  }

  /*
    if ((kab_konstr == 0) && (s1_neitral == 0 || s1_neitral == 3)) {
        div5_z_itog = s1_1kz;
    } else if ((kab_konstr == 0) && (s1_neitral == 1 || s1_neitral == 2)) {
        div5_z_itog = Math.sqrt(3) / 2 * s1_3kz;
    } else if ((kab_konstr == 1) && (kab_touch == 0) && (s1_neitral == 0 || s1_neitral == 3)) {
        div5_z_itog = s1_1kz;
    } else if ((kab_konstr == 1) && (kab_touch == 1) && (s1_neitral == 0 || s1_neitral == 3)) {
        div5_z_itog = 1 / 3 * s1_3kz;
    } else if ((kab_konstr == 1) && (kab_touch == 0) && (s1_neitral == 1 || s1_neitral == 2)) {
        div5_z_itog = Math.sqrt(3) / 2 * s1_3kz;
    } else if ((kab_konstr == 1) && (kab_touch == 1) && (s1_neitral == 1 || s1_neitral == 2)) {
        div5_z_itog = Math.sqrt(3) / 6 * s1_3kz;
    }*/

  $("#div5_z_itog").val(all_round(div5_z_itog, 2));
  math_div5_f9();
}

function math_div5_f9() {
  kab_tj_bef_kz = $("#kab_tj_bef_kz").val() * 1;
  kab_tj_unt_kz = $("#kab_tj_unt_kz").val() * 1;
  kab_te_bef_kz = $("#kab_te_bef_kz").val() * 1;
  kab_te_unt_kz = $("#kab_te_unt_kz").val() * 1;
  kab_p_cu = $("#kab_p_cu").val() * 1;
  kab_p_al = $("#kab_p_al").val() * 1;
  kab_Ct_cu = $("#kab_Ct_cu").val() * 1;
  kab_Ct_al = $("#kab_Ct_al").val() * 1;
  kab_kt_cu = $("#kab_kt_cu").val() * 1;
  kab_kt_al = $("#kab_kt_al").val() * 1;
  kab_r_cu = $("#kab_r_cu").val() * 1;
  kab_r_al = $("#kab_r_al").val() * 1;

  tj_sr = 0.5 * (kab_tj_unt_kz + kab_tj_bef_kz);
  te_sr = 0.5 * (kab_te_unt_kz + kab_te_bef_kz);

  div5_kj_cu =
    Math.pow(10, -9) *
    Math.sqrt(
      (kab_p_cu * kab_Ct_cu * (kab_tj_bef_kz - kab_tj_unt_kz)) /
        (kab_r_cu * Math.pow(10, -6) * (1 + kab_kt_cu * (tj_sr - 20)))
    );
  div5_kj_al =
    Math.pow(10, -9) *
    Math.sqrt(
      (kab_p_al * kab_Ct_al * (kab_tj_bef_kz - kab_tj_unt_kz)) /
        (kab_r_al * Math.pow(10, -6) * (1 + kab_kt_al * (tj_sr - 20)))
    );
  div5_ke_cu =
    Math.pow(10, -9) *
    Math.sqrt(
      (kab_p_cu * kab_Ct_cu * (kab_te_bef_kz - kab_te_unt_kz)) /
        (kab_r_cu * Math.pow(10, -6) * (1 + kab_kt_cu * (te_sr - 20)))
    );
  div5_ke_al =
    Math.pow(10, -9) *
    Math.sqrt(
      (kab_p_al * kab_Ct_al * (kab_te_bef_kz - kab_te_unt_kz)) /
        (kab_r_al * Math.pow(10, -6) * (1 + kab_kt_al * (te_sr - 20)))
    );

  div5_fj_cu = (div5_z_itog * Math.sqrt(div5_t_itog)) / div5_kj_cu;
  div5_fj_al = (div5_z_itog * Math.sqrt(div5_t_itog)) / div5_kj_al;
  div5_fe_cu = (div5_z_itog * Math.sqrt(div5_t_itog)) / div5_ke_cu;
  div5_fe_al = (div5_z_itog * Math.sqrt(div5_t_itog)) / div5_ke_al;

  $("#div5_kj_cu").val(all_round(div5_kj_cu, 3));
  $("#div5_kj_al").val(all_round(div5_kj_al, 3));
  $("#div5_ke_cu").val(all_round(div5_ke_cu, 3));
  $("#div5_ke_al").val(all_round(div5_ke_al, 3));

  $("#div5_fj_cu").val(all_round(div5_fj_cu));
  $("#div5_fj_al").val(all_round(div5_fj_al));
  $("#div5_fe_cu").val(all_round(div5_fe_cu));
  $("#div5_fe_al").val(all_round(div5_fe_al));
}

function div6_mas_zero() {
  for (var jel = 0; jel <= table_line.length; ++jel) {
    div6_f1[jel] = 0;
    div6_f3[jel] = 0;
    div6_f4[jel] = all_round(1, 1);
    div6_f7[jel] = 0;
  }
}

function div6_ekran() {
  div6_material_e =
    document.getElementById("div6_material_e").options.selectedIndex;
  div6_sech =
    sech_e[document.getElementById("div6_sech").options.selectedIndex];
  div6_lost = document.getElementById("div6_lost").options.selectedIndex;
  div6_material_j =
    document.getElementById("div6_material_j").options.selectedIndex;
  //div3_max_fg_2 = $("#kab_Ukab").val() * 1;
  kab_Ukab = $("#kab_Ukab").val() * 1;
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;
  div5_fe_cu = $("#div5_fe_cu").val() * 1;
  div5_fe_al = $("#div5_fe_al").val() * 1;
  div5_fj_cu = $("#div5_fj_cu").val() * 1;
  div5_fj_al = $("#div5_fj_al").val() * 1;

  kab_r_cu = $("#kab_r_cu").val() * 1;
  kab_r_al = $("#kab_r_al").val() * 1;
  kab_kt_cu = $("#kab_kt_cu").val() * 1;
  kab_kt_al = $("#kab_kt_al").val() * 1;

  kab_te_unt_kz = $("#kab_te_unt_kz").val() * 1;
  kab_tj_unt_kz = $("#kab_tj_unt_kz").val() * 1;

  var p_e;
  var p_g;

  var kt_g;
  var kt_e;

  var Ro_e;
  var Ro_g;

  var i = 0;
  switch (div6_material_e) {
    case 0:
      p_e = kab_r_cu;

      kt_e = kab_kt_cu;

      Ro_e = p_e * (1 + kt_e * (kab_te_unt_kz - 20));
      if (div6_sech < div5_fe_cu) {
        while (sech_e[i] < div5_fe_cu) {
          i = i + 1;
        }
        /*for (var j = 0; j <= sech_e.length; ++j) {
                    $('#div6_sech').find('option:last').remove();

                }

                for (var j = i; j <= sech_e.length; ++j) {
                    $('#div6_sech').find('option:last').add();
                    var option1 = $('<option/>', {
                        'value': 'div6_select_sech' + j,
                        text: sech_e[j]
                    });
                    option1.appendTo($('#div6_sech'));
                }*/
        div6_sech_i = i;
      }
      break;
    case 1:
      p_e = kab_r_al;
      kt_e = kab_kt_al;
      Ro_e = p_e * (1 + kt_e * (kab_te_unt_kz - 20));
      if (div6_sech < div5_fe_al) {
        while (sech_e[i] < div5_fe_al) {
          i = i + 1;
        }
        /*for (var j = 0; j <= sech_e.length; ++j) {
                    $('#div6_sech').find('option:last').remove();

                }

                for (var j = i; j <= sech_e.length; ++j) {
                    $('#div6_sech').find('option:last').add();
                    var option1 = $('<option/>', {
                        'value': 'div6_select_sech' + j,
                        text: sech_e[j]
                    });
                    option1.appendTo($('#div6_sech'));
                }*/
        div6_sech_i = i;
      }
      break;
  }
  var i_g = 0;

  switch (div6_material_j) {
    case 0:
      p_g = kab_r_cu;
      kt_g = kab_kt_cu;
      Ro_g = p_g * (1 + kt_g * (kab_tj_unt_kz - 20));
      while (sech_e[i_g] < div5_fj_cu) {
        i_g = i_g + 1;
      }

      break;
    case 1:
      p_g = kab_r_al;
      kt_g = kab_kt_al;
      Ro_g = p_g * (1 + kt_g * (kab_tj_unt_kz - 20));
      while (sech_e[i_g] < div5_fj_al) {
        i_g = i_g + 1;
      }

      break;
  }

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;
  var r4 = 0;
  var r3 = 0;
  var r2 = 0;
  var r1 = 0;

  var d1 = 0;
  var d2 = 0;
  var d3 = 0;
  var d4 = 0;

  var Lk = $("#div3_Lall").val() * 1;

  s1_Hc = $("#s1_Hc").val() * 1;
  s1_i_norm = $("#s1_i_norm").val() * 1;

  var miu = 4 * Math.PI * Math.pow(10, -7);
  var omega = 2 * Math.PI * s1_Hc;

  var X = 0;
  var Re = 0;
  var Ie = 0;
  var Ie_Ig = 0;

  var Pe_Pg = 0;

  var s1_factor = $("#s1_factor").val() * 1;
  var Ki = 0;
  var Rg = 0;
  var Pg = 0;
  var s1_lost = $("#s1_lost").val() * 1;
  var Ce = 0;
  var Pe = 0;
  /*for (var j = 0; j <= i_g; ++j) {
        div6_f1[j] = 0;
        div6_f3[j] = 0;
        div6_f4[j] = 0;
        div6_f7[j] = 0;
    }*/

  for (var j = 0; j <= table_line.length; ++j) {
    r1 = Math.sqrt(table_line[j] / (Math.PI * kab_kj));
    r2 = r1 + delta_je;
    r3 = Math.sqrt(r2 * r2 + div6_sech / (Math.PI * kab_ke));
    r4 = r3 + delta_ob;

    d1 = 2 * r1;
    d2 = 2 * r2;
    d3 = 2 * r3;
    d4 = 2 * r4;

    div3_sposob_all =
      document.getElementById("div3_sposob_all").options.selectedIndex;

    div3_keep1 = document.getElementById("div3_keep1").options.selectedIndex;
    div3_keep2 = document.getElementById("div3_keep2").options.selectedIndex;
    div3_keep3 = document.getElementById("div3_keep3").options.selectedIndex;
    div3_keep4 = document.getElementById("div3_keep4").options.selectedIndex;

    switch (div3_keep1) {
      case 0:
        div3_Sab1 = d4;
        break;
      case 1:
        div3_Sab1 = $("#div3_Sab1").val() * 1;
        break;
      case 2:
        div3_Sab1 = 1.26 * $("#div3_Sab1").val() * 1;
        break;
    }
    switch (div3_keep2) {
      case 0:
        div3_Sab2 = d4;
        break;
      case 1:
        div3_Sab2 = $("#div3_Sab2").val() * 1;
        break;
      case 2:
        div3_Sab2 = 1.26 * $("#div3_Sab2").val() * 1;
        break;
    }
    switch (div3_keep3) {
      case 0:
        div3_Sab3 = d4;
        break;
      case 1:
        div3_Sab3 = $("#div3_Sab3").val() * 1;
        break;
      case 2:
        div3_Sab3 = 1.26 * $("#div3_Sab3").val() * 1;
        break;
    }
    switch (div3_keep4) {
      case 0:
        div3_Sab4 = d4;
        break;
      case 1:
        div3_Sab4 = $("#div3_Sab4").val() * 1;
        break;
      case 2:
        div3_Sab4 = 1.26 * $("#div3_Sab4").val() * 1;
        break;
    }

    switch (
      div3_sposob_all //Способ прокладки
    ) {
      case 0:
        Lk = $("#div3_otrezok1").val() * 1;
        S_sr = (div3_Sab1 * $("#div3_otrezok1").val() * 1) / Lk;
        break;
      case 1:
        Lk = $("#div3_otrezok1").val() * 1 + $("#div3_otrezok2").val() * 1;
        S_sr =
          (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
            div3_Sab2 * $("#div3_otrezok2").val() * 1) /
          Lk;
        break;
      case 2:
        Lk =
          $("#div3_otrezok1").val() * 1 +
          $("#div3_otrezok2").val() * 1 +
          $("#div3_otrezok3").val() * 1;
        S_sr =
          (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
            div3_Sab2 * $("#div3_otrezok2").val() * 1 +
            div3_Sab3 * $("#div3_otrezok3").val() * 1) /
          Lk;
        break;
      case 3:
        Lk =
          $("#div3_otrezok1").val() * 1 +
          $("#div3_otrezok2").val() * 1 +
          $("#div3_otrezok3").val() * 1 +
          $("#div3_otrezok4").val() * 1;
        S_sr =
          (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
            div3_Sab2 * $("#div3_otrezok2").val() * 1 +
            div3_Sab3 * $("#div3_otrezok3").val() * 1 +
            div3_Sab4 * $("#div3_otrezok4").val() * 1) /
          Lk;
        break;
    }

    X = omega * (miu / (2 * Math.PI)) * Lk * Math.log(S_sr / r2);

    Re = Lk * (Ro_e / div6_sech);

    Ie = s1_i_norm / Math.sqrt(1 + Math.pow(Re / X, 2));

    Ie_Ig = 1 / Math.sqrt(1 + Math.pow(Re / X, 2));

    Pe_Pg = Ie_Ig * Ie_Ig * (Ro_e / Ro_g) * (table_line[j] / div6_sech);

    Ki = 1 / Math.sqrt(1 + Pe_Pg);

    Rg = Lk * (Ro_g / table_line[j]);

    Pg = 0.003 * s1_i_norm * s1_i_norm * Rg * s1_factor;
    Pe = Pe_Pg * Pg;
    Ce = Pe * 8760 * (s1_lost / 1000);

    if (table_line[j] <= div3_max_fg_2) {
      if (div6_lost == 0) {
        div6_f1[j] = sigFigs(Ie);
        div6_f3[j] = all_round(Pe_Pg, 3);
        div6_f4[j] = all_round(Ki, 3);
        div6_f7[j] = sigFigs(Ce);
      } else {
        div6_f1[j] = 0;
        div6_f3[j] = 0;
        div6_f4[j] = 1;
        div6_f7[j] = 0;
      }
    } else {
      div6_f1[j] = "--";
      div6_f3[j] = "--";
      div6_f4[j] = "--";
      div6_f7[j] = "--";
    }
  }
  cleate_table_div6();
}

//ЖИЛА
function div7_math_1() {
  div3_sposob_all =
    document.getElementById("div3_sposob_all").options.selectedIndex;

  //Макс. сечение жилы
  var fg_max = [];
  fg_max[0] = $("#div3_max_fg1").val() * 1;
  fg_max[1] = $("#div3_max_fg2").val() * 1;
  fg_max[2] = $("#div3_max_fg3").val() * 1;
  fg_max[3] = $("#div3_max_fg4").val() * 1;

  div3_max_fg_2 = $("#div3_max_fg_2").val() * 1;

  //Сечение экрана
  sechenie = document.getElementById("div7_sech").options.selectedIndex;
  div7_sech = sech_e[sechenie];

  //Условия прокладки
  var uslPR = [];
  uslPR[0] = document.getElementById("div3_usl1").options.selectedIndex;
  uslPR[1] = document.getElementById("div3_usl2").options.selectedIndex;
  uslPR[2] = document.getElementById("div3_usl3").options.selectedIndex;
  uslPR[3] = document.getElementById("div3_usl4").options.selectedIndex;

  //Расстояние до земля

  var bef_ground = [];
  bef_ground[0] = $("#div3_H1").val() * 1;
  bef_ground[1] = $("#div3_H2").val() * 1;
  bef_ground[2] = $("#div3_H3").val() * 1;
  bef_ground[3] = $("#div3_H4").val() * 1;

  //Материал экрана
  div7_material_e =
    document.getElementById("div7_material_e").options.selectedIndex;
  //Материал жилы
  div7_material_j =
    document.getElementById("div7_material_j").options.selectedIndex;

  //Однофазный или трехфазный
  kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;

  //Sab
  var Sab = [];

  Sab[0] = $("#div3_Sab1").val() * 1;
  Sab[1] = $("#div3_Sab2").val() * 1;
  Sab[2] = $("#div3_Sab3").val() * 1;
  Sab[3] = $("#div3_Sab4").val() * 1;

  //S12
  var S12_tr = [];
  S12_tr[0] = $("#div3_S12_1").val() * 1;
  S12_tr[1] = $("#div3_S12_2").val() * 1;
  S12_tr[2] = $("#div3_S12_3").val() * 1;
  S12_tr[3] = $("#div3_S12_4").val() * 1;

  //Способ прокладки фаз
  var keep = [];
  keep[0] = document.getElementById("div3_keep1").options.selectedIndex;
  keep[1] = document.getElementById("div3_keep2").options.selectedIndex;
  keep[2] = document.getElementById("div3_keep3").options.selectedIndex;
  keep[3] = document.getElementById("div3_keep4").options.selectedIndex;

  //Число цепей
  var paral_kl = [];
  paral_kl[0] = document.getElementById("div3_paral_kl1").options.selectedIndex;
  paral_kl[1] = document.getElementById("div3_paral_kl2").options.selectedIndex;
  paral_kl[2] = document.getElementById("div3_paral_kl3").options.selectedIndex;
  paral_kl[3] = document.getElementById("div3_paral_kl4").options.selectedIndex;

  //Коэффициент заполнение жилы
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  //Коэффициент формы потока
  div4_k_potok = $("#div4_k_potok").val() * 1;

  //Удельное тепловое сопротивление изоляции и оболочки
  div4_ts_izol = $("#div4_ts_izol").val() * 1;
  div4_ts_ob = $("#div4_ts_ob").val() * 1;

  //Диэлектрическая проницаемость изоляции
  kab_dpi = $("#kab_dpi").val() * 1;

  //Номинальное напряжение сети
  s1_Uc = $("#s1_Uc").val() * 1;
  //Тангенс угла диэлектрических потерь
  kab_tan_a = $("#kab_tan_a").val() * 1;
  //Частота
  s1_Hc = $("#s1_Hc").val() * 1;
  //Удельное сопротивление при 20
  kab_r_cu = $("#kab_r_cu").val() * 1;
  kab_r_al = $("#kab_r_al").val() * 1;
  //Температурные коэффициенты
  kab_kt_cu = $("#kab_kt_cu").val() * 1;
  kab_kt_al = $("#kab_kt_al").val() * 1;
  // Pe/Pj
  var Pe_Pj;

  //Диаметр трубы
  var D_tr = [];
  D_tr[0] = diametr[document.getElementById("div3_D1").options.selectedIndex];
  D_tr[1] = diametr[document.getElementById("div3_D2").options.selectedIndex];
  D_tr[2] = diametr[document.getElementById("div3_D3").options.selectedIndex];
  D_tr[3] = diametr[document.getElementById("div3_D4").options.selectedIndex];

  //Модуль упругости
  div4_mod_upr = $("#div4_mod_upr").val() * 1;

  //SN
  var SN_tr = [];
  SN_tr[0] = sn[document.getElementById("div3_SN1").options.selectedIndex];
  SN_tr[1] = sn[document.getElementById("div3_SN2").options.selectedIndex];
  SN_tr[2] = sn[document.getElementById("div3_SN3").options.selectedIndex];
  SN_tr[3] = sn[document.getElementById("div3_SN4").options.selectedIndex];

  //Удельная теплопроводность воздуха
  var alfa_v = $("#div4_tp_air1").val() * 1;

  //Коэффициент теплоотдачи
  var alfa_vk = $("#div4_tp_air2").val() * 1;

  //Коэффициент теплоотдачи открытого
  var alfa_vk1 = $("#div4_tp_air3").val() * 1;

  //Удельное тепловое сопротивление трубы
  var rot = $("#div4_ts_polgl").val() * 1;

  //Выбраный грунт
  var grunt_v = [];
  grunt_v[0] = $("#div3_grunt1").val() * 1;
  grunt_v[1] = $("#div3_grunt2").val() * 1;
  grunt_v[2] = $("#div3_grunt3").val() * 1;
  grunt_v[3] = $("#div3_grunt4").val() * 1;

  //Потери в экранах
  div7_lost = document.getElementById("div7_lost").options.selectedIndex;
  //Фактор нагрузки
  s1_factor = $("#s1_factor").val() * 1;
  var Tdop,
    X,
    Tc,
    Kp,
    delta_je,
    delta_ob,
    r1,
    r2,
    r3,
    r4,
    r34,
    r5,
    r6,
    Ri,
    Ro,
    V1,
    V2,
    V3,
    V4,
    alfa,
    Ci,
    Pi,
    Rj,
    omega,
    roj,
    stenka,
    Dv_tr,
    Rv,
    Rt,
    rov,
    Rg,
    rog;
  var k_table;

  if (kab_konstr == 1) {
    k_table = table_line.length;
  } else {
    k_table = table_line.length;
  }

  for (var i = 0; i <= 3; ++i) {
    div7_Id[i] = [];

    for (var j = 0; j <= k_table; ++j) {
      div7_Id[i][j] = 0;
      if (i <= div3_sposob_all && div3_max_fg_2 >= table_line[j]) {
        r1 = Math.sqrt(table_line[j] / (Math.PI * kab_kj));
        r2 = r1 + delta_je;
        r3 = Math.sqrt(r2 * r2 + div6_sech / (Math.PI * kab_ke));
        r4 = r3 + delta_ob;

        //Этап 1 Определение температуры Tdop и Tc;
        if (uslPR[i] == 0 || uslPR[i] == 1) {
          Tc = H_temp_grunt(bef_ground[i]);
        } else {
          Tc = $("#div4_temp_air").val() * 1;
        }
        Tdop = $("#kab_t_izol").val() * 1;

        //Этап 2 Определение коэффициента поверхностного эффекта Kp
        if (div7_material_j == 0) {
          if (table_line[j] <= 1000) {
            Kp =
              1 * Math.pow(10, -7) * table_line[j] * table_line[j] +
              2 * Math.pow(10, -5) * table_line[j] +
              0.9993;
          } else if (table_line[j] >= 1200) {
            Kp =
              6 * Math.pow(10, -8) * table_line[j] * table_line[j] +
              2 * Math.pow(10, -6) * table_line[j] +
              1;
          }
        } else {
          if (table_line[j] <= 1000) {
            Kp =
              2 * Math.pow(10, -8) * table_line[j] * table_line[j] +
              2 * Math.pow(10, -5) * table_line[j] +
              0.9873;
          } else if (table_line[j] >= 1200) {
            Kp =
              7 * Math.pow(10, -9) * table_line[j] * table_line[j] +
              1 * Math.pow(10, -5) * table_line[j] +
              0.9899;
          }
        }

        //Этап 3 Геометрия кабеля
        delta_je = 1.4 * Math.sqrt(kab_Ukab);
        delta_ob = 0.01 * kab_Ukab + 4;
        r1 = Math.sqrt(table_line[j] / (Math.PI * kab_kj));
        r2 = r1 + delta_je;
        r3 = Math.sqrt(r2 * r2 + div7_sech / (Math.PI * kab_ke));

        if (kab_konstr == 0) {
          r4 = r3 + delta_ob;
        } else {
          r34 = 2.15 * r3;
          r4 = r34 + delta_ob;
        }
        d1 = 2 * r1;
        d2 = 2 * r2;
        d3 = 2 * r3;
        d4 = 2 * r4;

        div3_sposob_all =
          document.getElementById("div3_sposob_all").options.selectedIndex;

        div3_keep1 =
          document.getElementById("div3_keep1").options.selectedIndex;
        div3_keep2 =
          document.getElementById("div3_keep2").options.selectedIndex;
        div3_keep3 =
          document.getElementById("div3_keep3").options.selectedIndex;
        div3_keep4 =
          document.getElementById("div3_keep4").options.selectedIndex;

        switch (div3_keep1) {
          case 0:
            div3_Sab1 = d4;
            break;
          case 1:
            div3_Sab1 = $("#div3_Sab1").val() * 1;
            break;
          case 2:
            div3_Sab1 = 1.26 * $("#div3_Sab1").val() * 1;
            break;
        }
        switch (div3_keep2) {
          case 0:
            div3_Sab2 = d4;
            break;
          case 1:
            div3_Sab2 = $("#div3_Sab2").val() * 1;
            break;
          case 2:
            div3_Sab2 = 1.26 * $("#div3_Sab2").val() * 1;
            break;
        }
        switch (div3_keep3) {
          case 0:
            div3_Sab3 = d4;
            break;
          case 1:
            div3_Sab3 = $("#div3_Sab3").val() * 1;
            break;
          case 2:
            div3_Sab3 = 1.26 * $("#div3_Sab3").val() * 1;
            break;
        }
        switch (div3_keep4) {
          case 0:
            div3_Sab4 = d4;
            break;
          case 1:
            div3_Sab4 = $("#div3_Sab4").val() * 1;
            break;
          case 2:
            div3_Sab4 = 1.26 * $("#div3_Sab4").val() * 1;
            break;
        }

        switch (
          div3_sposob_all //Способ прокладки
        ) {
          case 0:
            Lk = $("#div3_otrezok1").val() * 1;
            S_sr = (div3_Sab1 * $("#div3_otrezok1").val() * 1) / Lk;
            break;
          case 1:
            Lk = $("#div3_otrezok1").val() * 1 + $("#div3_otrezok2").val() * 1;
            S_sr =
              (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
                div3_Sab2 * $("#div3_otrezok2").val() * 1) /
              Lk;
            break;
          case 2:
            Lk =
              $("#div3_otrezok1").val() * 1 +
              $("#div3_otrezok2").val() * 1 +
              $("#div3_otrezok3").val() * 1;
            S_sr =
              (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
                div3_Sab2 * $("#div3_otrezok2").val() * 1 +
                div3_Sab3 * $("#div3_otrezok3").val() * 1) /
              Lk;
            break;
          case 3:
            Lk =
              $("#div3_otrezok1").val() * 1 +
              $("#div3_otrezok2").val() * 1 +
              $("#div3_otrezok3").val() * 1 +
              $("#div3_otrezok4").val() * 1;
            S_sr =
              (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
                div3_Sab2 * $("#div3_otrezok2").val() * 1 +
                div3_Sab3 * $("#div3_otrezok3").val() * 1 +
                div3_Sab4 * $("#div3_otrezok4").val() * 1) /
              Lk;
            break;
        }
        kab_r_cu = $("#kab_r_cu").val() * 1;
        kab_r_al = $("#kab_r_al").val() * 1;
        kab_kt_cu = $("#kab_kt_cu").val() * 1;
        kab_kt_al = $("#kab_kt_al").val() * 1;
        kab_tj_unt_kz = $("#kab_tj_unt_kz").val() * 1;
        kab_te_unt_kz = $("#kab_te_unt_kz").val() * 1;

        if (div7_material_e == 0) {
          Ro_e = kab_r_cu * (1 + kab_kt_cu * (kab_te_unt_kz - 20));
        } else {
          Ro_e = kab_r_al * (1 + kab_kt_al * (kab_te_unt_kz - 20));
        }
        if (div7_material_j == 0) {
          Ro_g = kab_r_cu * (1 + kab_kt_cu * (kab_tj_unt_kz - 20));
        } else {
          Ro_g = kab_r_al * (1 + kab_kt_al * (kab_tj_unt_kz - 20));
        }

        var miu = 4 * Math.PI * Math.pow(10, -7);
        omega = 2 * Math.PI * s1_Hc;

        X = omega * (miu / (2 * Math.PI)) * Lk * Math.log(S_sr / r2);

        Re = Lk * (Ro_e / div7_sech);

        Ie = s1_i_norm / Math.sqrt(1 + Math.pow(Re / X, 2));

        Ie_Ig = 1 / Math.sqrt(1 + Math.pow(Re / X, 2));

        Pe_Pg = Ie_Ig * Ie_Ig * (Ro_e / Ro_g) * (table_line[j] / div7_sech);

        //Этап 4 Определение теплового сопротивления ИЗОЛЯЦИИ и ОБОЛОЧКИ

        if (keep[i] == 0) {
          Sab[i] = 2 * r4;
        }
        if (kab_konstr == 0) {
          if (Sab[i] <= 4 * r4 * div4_k_potok) {
            alfa =
              (Math.acos(Sab[i] / (4 * r4 * div4_k_potok)) * 180) / Math.PI;
          } else {
            alfa = 0;
          }
          if (uslPR[i] == 0 && keep[i] == 0) {
            V1 = 1.2;
            V2 = 1.2;
          } else if (uslPR[i] == 0 && (keep[i] == 1 || keep[i] == 2)) {
            V1 = 1;
            V2 = 1;
          } else if (uslPR[i] == 1) {
            V1 = 1.2;
            V2 = 1.2;
          } else if (uslPR[i] == 2 && keep[i] == 0) {
            V1 = 180 / (150 - alfa);
            V2 = V1;
          } else if (uslPR[i] == 2 && keep[i] == 1) {
            if (alfa >= 30) {
              V1 = 180 / (150 - alfa);
              V2 = V1;
            } else {
              V1 = 90 / (90 - alfa);
              V2 = V1;
            }
          } else if (uslPR[i] == 2 && keep[i] == 2) {
            V1 = 90 / (90 - alfa);
            V2 = V1;
          }
        } else {
          V1 = 3;
          V2 = 3;
        }

        Ri = V1 * (div4_ts_izol / (2 * Math.PI)) * Math.log(r2 / r1);
        if (kab_konstr == 0) {
          Ro = V2 * (div4_ts_ob / (2 * Math.PI)) * Math.log(r4 / r3);
        } else {
          Ro = V2 * (div4_ts_ob / (2 * Math.PI)) * Math.log(r4 / r34);
        }

        //Этап 5 Определение сопротивления жилы и т.д.

        if (div7_material_j == 0) {
          roj =
            kab_r_cu * /*Math.pow(10, -6) * */ (1 + kab_kt_cu * (Tdop - 20));
        } else {
          roj =
            kab_r_al * /*Math.pow(10, -6) * */ (1 + kab_kt_al * (Tdop - 20));
        }

        Ci = (2 * Math.PI * kab_dpi * E0) / Math.log(r2 / r1);
        omega = 2 * Math.PI * s1_Hc;
        Pi =
          Math.pow((s1_Uc * 1000) / Math.sqrt(3), 2) * kab_tan_a * omega * Ci;

        Rj = roj / table_line[j];

        if (kab_konstr == 0 && div7_lost == 0) {
          Pe_Pj = Pe_Pg;
        } else if (kab_konstr == 0 && div7_lost == 1) {
          Pe_Pj = 0;
        } else if (kab_konstr == 1) {
          Pe_Pj = 0;
        }

        //Этап 6 Определение геометрии трубы
        if (uslPR[i] == 0) {
          stenka =
            D_tr[i] /
            Math.pow((div4_mod_upr * 1000) / (12 * SN_tr[i]) + 1, 1 / 3);
          Dv_tr = D_tr[i] - 2 * stenka;
          r5 = Dv_tr / 2;
          r6 = D_tr[i] / 2;
        }

        //Этап 7 Определение теплового сопротивления
        if (uslPR[i] === 0) {
          if (kab_konstr == 0) {
            if (keep[i] == 0) {
              V3 = 1.2;
              V4 = 3;
            } else {
              V3 = 1;
              V4 = 1.2;
            }
          } else {
            V3 = 3;
            V4 = 3;
          }
        }

        rov = 1 / (alfa_v + alfa_vk * ((r4 * Math.log(r5 / r4)) / 1000));
        switch (uslPR[i]) {
          case 0:
            Rv = V3 * (rov / (2 * Math.PI)) * Math.log(r5 / r4);
            Rt = V4 * (rot / (2 * Math.PI)) * Math.log(r6 / r5);
            break;
          case 1:
            Rv = 0;
            Rt = 0;
            break;

          case 2:
            V3 = V1;
            Rv = V3 * (1000 / (2 * Math.PI * r4 * alfa_vk1));
            Rt = 0;
            break;
        }

        //Этап 8 Определение теплового сопротивления грунта

        if (uslPR[i] == 2) {
          Rg = 0;
        } else {
          rog = grunt_v[i];
          if (kab_konstr == 0 && paral_kl[i] == 0) {
            if (uslPR[i] == 0 && keep[i] == 0) {
              Rg = 3 * div7_vs_f1(bef_ground[i], r6, rog);
            } else if (uslPR[i] == 0 && (keep[i] == 1 || keep[i] == 2)) {
              Rg =
                div7_vs_f1(bef_ground[i], r6, rog) +
                2 * div7_vs_f2(bef_ground[i], Sab[i], rog);
            } else if (uslPR[i] == 1 && keep[i] == 0) {
              Rg =
                div7_vs_f1(bef_ground[i], r4, rog) +
                2 * div7_vs_f2(bef_ground[i], 2 * r4, rog);
            } else if (uslPR[i] == 1 && (keep[i] == 1 || keep[i] == 2)) {
              Rg =
                div7_vs_f1(bef_ground[i], r4, rog) +
                2 * div7_vs_f2(bef_ground[i], Sab[i], rog);
            }
          } else if (kab_konstr == 0 && paral_kl[i] == 1) {
            if (uslPR[i] == 0 && keep[i] == 0) {
              Rg =
                3 * div7_vs_f1(bef_ground[i], r6, rog) +
                3 * div7_vs_f2(bef_ground[i], S12_tr[i], rog);
            } else if (uslPR[i] == 0 && keep[i] == 1) {
              Rg =
                div7_vs_f1(bef_ground[i], r6, rog) +
                2 * div7_vs_f2(bef_ground[i], Sab[i], rog) +
                3 * div7_vs_f2(bef_ground[i], S12_tr[i], rog);
            } else if (uslPR[i] == 0 && keep[i] == 2) {
              Rg =
                div7_vs_f1(bef_ground[i], r6, rog) +
                2 * div7_vs_f2(bef_ground[i], Sab[i], rog) +
                div7_vs_f2(bef_ground[i], S12_tr[i] - Sab[i], rog) +
                div7_vs_f2(bef_ground[i], S12_tr[i], rog) +
                div7_vs_f2(bef_ground[i], S12_tr[i] + Sab[i], rog);
            } else if (uslPR[i] == 1 && keep[i] == 0) {
              Rg =
                div7_vs_f1(bef_ground[i], r4, rog) +
                2 * div7_vs_f2(bef_ground[i], 2 * r4, rog) +
                3 * div7_vs_f2(bef_ground[i], S12_tr[i], rog);
            } else if (uslPR[i] == 1 && keep[i] == 1) {
              Rg =
                div7_vs_f1(bef_ground[i], r4, rog) +
                2 * div7_vs_f2(bef_ground[i], Sab[i], rog) +
                3 * div7_vs_f2(bef_ground[i], S12_tr[i], rog);
            } else if (uslPR[i] == 1 && keep[i] == 2) {
              Rg =
                div7_vs_f1(bef_ground[i], r4, rog) +
                2 * div7_vs_f2(bef_ground[i], Sab[i], rog) +
                div7_vs_f2(bef_ground[i], S12_tr[i] - Sab[i], rog) +
                div7_vs_f2(bef_ground[i], S12_tr[i], rog) +
                div7_vs_f2(bef_ground[i], S12_tr[i] + Sab[i], rog);
            }
          } else if (kab_konstr == 1 && paral_kl[i] == 0) {
            if (uslPR[i] == 0) {
              Rg = 3 * div7_vs_f1(bef_ground[i], r6, rog);
            } else if (uslPR[i] == 1) {
              Rg = 3 * div7_vs_f1(bef_ground[i], r4, rog);
            }
          } else if (kab_konstr == 1 && paral_kl[i] == 1) {
            if (uslPR[i] == 0) {
              Rg =
                3 * div7_vs_f1(bef_ground[i], r6, rog) +
                3 * div7_vs_f2(bef_ground[i], S12_tr[i], rog);
            } else if (uslPR[i] == 1) {
              Rg =
                3 * div7_vs_f1(bef_ground[i], r4, rog) +
                3 * div7_vs_f2(bef_ground[i], S12_tr[i], rog);
            }
          }
        }
        var ch1 = 0.5 * Ri + Ro + Rv + Rt + Rg;
        var ch2 = Ri + Ro + Rv + Rt + Rg;
        var ch3 = Ro + Rv + Rt + Rg;
        var ch4 =
          (1 / s1_factor) *
          Math.sqrt(
            (Tdop - Tc - Pi * ch1) / (Kp * Rj * ch2 + Rj * Pe_Pj * ch3)
          );
        div7_Id[i][j] = all_round(ch4);
      } else {
        div7_Id[i][j] = "--";
      }
    }
  }
  create_table_div7();
}

function H_temp_grunt(H) {
  div4_temp_min = $("#div4_temp_min").val() * 1;
  div4_temp_mid = $("#div4_temp_mid").val() * 1;
  div4_temp_high_mid = $("#div4_temp_high_mid").val() * 1;
  div4_temp_high = $("#div4_temp_high").val() * 1;

  if (H < 999) {
    return div4_temp_min;
  } else if (H >= 1000 && H < 2999) {
    return div4_temp_mid;
  } else if (H >= 3000 && H < 4999) {
    return div4_temp_high_mid;
  } else if (H >= 5000) {
    return div4_temp_high;
  } else {
    H = -1;
  }
}

function div7_vs_f1(H, X, Ro) {
  return (
    (Ro / (2 * Math.PI)) * Math.log(H / X + Math.sqrt((H / X) * (H / X) - 1))
  );
}

function div7_vs_f2(H, X, Ro) {
  return (
    (Ro / (2 * Math.PI)) *
    Math.log(Math.sqrt(((2 * H) / X) * ((2 * H) / X) + 1))
  );
}

/*function term_sopr_grunt(n) {
    switch (n) {
        case 0:
            return $("#div4_ts_pv").val() * 1;
            break;
        case 1:
            return $("#div4_ts_pm").val() * 1;
            break;
        case 2:
            return $("#div4_ts_ps").val() * 1;
            break;
        case 3:
            return $("#div4_ts_sgl").val() * 1;
            break;
        case 4:
            return $("#div4_ts_gl").val() * 1;
            break;
    }
}*/

// Div8 math

function div8_math() {
  div3_sposob_all =
    document.getElementById("div3_sposob_all").options.selectedIndex;

  //Макс. сечение жилы
  var fg_max = [];
  fg_max[0] = $("#div3_max_fg1").val() * 1;
  fg_max[1] = $("#div3_max_fg2").val() * 1;
  fg_max[2] = $("#div3_max_fg3").val() * 1;
  fg_max[3] = $("#div3_max_fg4").val() * 1;

  div3_max_fg_2 = $("#div3_max_fg_2").val() * 1;

  //Сечение экрана
  sechenie = document.getElementById("div8_sech").options.selectedIndex;
  div8_sech = sech_e[sechenie];
  //Сечение жилы
  sechenie_g = document.getElementById("div8_sech_g").options.selectedIndex;
  div8_sech_g = table_line[sechenie_g];

  //Условия прокладки
  var uslPR = [];
  uslPR[0] = document.getElementById("div3_usl1").options.selectedIndex;
  uslPR[1] = document.getElementById("div3_usl2").options.selectedIndex;
  uslPR[2] = document.getElementById("div3_usl3").options.selectedIndex;
  uslPR[3] = document.getElementById("div3_usl4").options.selectedIndex;

  //Расстояние до земля

  var bef_ground = [];
  bef_ground[0] = $("#div3_H1").val() * 1;
  bef_ground[1] = $("#div3_H2").val() * 1;
  bef_ground[2] = $("#div3_H3").val() * 1;
  bef_ground[3] = $("#div3_H4").val() * 1;

  //Материал экрана
  div8_material_e =
    document.getElementById("div8_material_e").options.selectedIndex;
  //Материал жилы
  div8_material_g =
    document.getElementById("div8_material_g").options.selectedIndex;

  //Однофазный или трехфазный
  kab_konstr = document.getElementById("kab_konstr").options.selectedIndex;

  //Sab
  var Sab = [];

  Sab[0] = $("#div3_Sab1").val() * 1;
  Sab[1] = $("#div3_Sab2").val() * 1;
  Sab[2] = $("#div3_Sab3").val() * 1;
  Sab[3] = $("#div3_Sab4").val() * 1;

  //S12
  var S12_tr = [];
  S12_tr[0] = $("#div3_S12_1").val() * 1;
  S12_tr[1] = $("#div3_S12_2").val() * 1;
  S12_tr[2] = $("#div3_S12_3").val() * 1;
  S12_tr[3] = $("#div3_S12_4").val() * 1;

  //Способ прокладки фаз
  var keep = [];
  keep[0] = document.getElementById("div3_keep1").options.selectedIndex;
  keep[1] = document.getElementById("div3_keep2").options.selectedIndex;
  keep[2] = document.getElementById("div3_keep3").options.selectedIndex;
  keep[3] = document.getElementById("div3_keep4").options.selectedIndex;

  //Число цепей
  var paral_kl = [];
  paral_kl[0] = document.getElementById("div3_paral_kl1").options.selectedIndex;
  paral_kl[1] = document.getElementById("div3_paral_kl2").options.selectedIndex;
  paral_kl[2] = document.getElementById("div3_paral_kl3").options.selectedIndex;
  paral_kl[3] = document.getElementById("div3_paral_kl4").options.selectedIndex;

  //Коэффициент заполнение жилы
  kab_kj = $("#kab_kj").val() * 1;
  kab_ke = $("#kab_ke").val() * 1;

  //Коэффициент формы потока
  div4_k_potok = $("#div4_k_potok").val() * 1;

  //Удельное тепловое сопротивление изоляции и оболочки
  div4_ts_izol = $("#div4_ts_izol").val() * 1;
  div4_ts_ob = $("#div4_ts_ob").val() * 1;

  //Диэлектрическая проницаемость изоляции
  kab_dpi = $("#kab_dpi").val() * 1;

  //Номинальное напряжение сети
  s1_Uc = $("#s1_Uc").val() * 1;
  //Тангенс угла диэлектрических потерь
  kab_tan_a = $("#kab_tan_a").val() * 1;
  //Частота
  s1_Hc = $("#s1_Hc").val() * 1;
  //Удельное сопротивление при 20
  kab_r_cu = $("#kab_r_cu").val() * 1;
  kab_r_al = $("#kab_r_al").val() * 1;
  //Температурные коэффициенты
  kab_kt_cu = $("#kab_kt_cu").val() * 1;
  kab_kt_al = $("#kab_kt_al").val() * 1;
  // Pe/Pj
  var Pe_Pj;

  //Диаметр трубы
  var D_tr = [];
  D_tr[0] = diametr[document.getElementById("div3_D1").options.selectedIndex];
  D_tr[1] = diametr[document.getElementById("div3_D2").options.selectedIndex];
  D_tr[2] = diametr[document.getElementById("div3_D3").options.selectedIndex];
  D_tr[3] = diametr[document.getElementById("div3_D4").options.selectedIndex];

  //Модуль упругости
  div4_mod_upr = $("#div4_mod_upr").val() * 1;

  //SN
  var SN_tr = [];
  SN_tr[0] = sn[document.getElementById("div3_SN1").options.selectedIndex];
  SN_tr[1] = sn[document.getElementById("div3_SN2").options.selectedIndex];
  SN_tr[2] = sn[document.getElementById("div3_SN3").options.selectedIndex];
  SN_tr[3] = sn[document.getElementById("div3_SN4").options.selectedIndex];

  //Удельная теплопроводность воздуха
  var alfa_v = $("#div4_tp_air1").val() * 1;

  //Коэффициент теплоотдачи
  var alfa_vk = $("#div4_tp_air2").val() * 1;

  //Коэффициент теплоотдачи открытого
  var alfa_vk1 = $("#div4_tp_air3").val() * 1;

  //Удельное тепловое сопротивление трубы
  var rot = $("#div4_ts_polgl").val() * 1;

  //Выбраный грунт
  var grunt_v = [];
  grunt_v[0] = $("#div3_grunt1").val() * 1;
  grunt_v[1] = $("#div3_grunt2").val() * 1;
  grunt_v[2] = $("#div3_grunt3").val() * 1;
  grunt_v[3] = $("#div3_grunt4").val() * 1;

  //Потери в экранах
  div8_lost = document.getElementById("div8_lost").options.selectedIndex;
  //Фактор нагрузки
  s1_factor = $("#s1_factor").val() * 1;
  //Ток нагрузки в норм режиме
  s1_i_norm = $("#s1_i_norm").val() * 1;
  //Напряжение
  kab_Ukab = $("#kab_Ukab").val() * 1;

  //CosF
  var s1_cosf = $("#s1_cosf").val() * 1;

  var Tdop = $("#kab_t_izol").val() * 1;

  var R1_z,
    R1,
    roj,
    roe,
    V,
    Ie_Ig,
    Ie,
    omega,
    r1,
    r2,
    r3,
    r4,
    X1_z,
    Lk,
    Xc1_z,
    d1,
    d2,
    d3,
    d4,
    S_sr,
    X,
    Re;

  kab_tj_unt_kz = $("#kab_tj_unt_kz").val() * 1;

  if (div8_material_g == 0) {
    roj =
      kab_r_cu * /*Math.pow(10, -6) * */ (1 + kab_kt_cu * (kab_tj_unt_kz - 20));
  } else {
    roj =
      kab_r_al * /*Math.pow(10, -6) * */ (1 + kab_kt_al * (kab_tj_unt_kz - 20));
  }
  omega = 2 * Math.PI * s1_Hc;

  var miu = 4 * Math.PI * Math.pow(10, -7);

  var delta_je = 1.4 * Math.sqrt(kab_Ukab);
  var delta_ob = 0.01 * kab_Ukab + 4;

  r1 = Math.sqrt(table_line[sechenie_g] / (Math.PI * kab_kj));
  r2 = r1 + delta_je;
  r3 = Math.sqrt(r2 * r2 + div8_sech / (Math.PI * kab_ke));
  r4 = r3 + delta_ob;

  d1 = 2 * r1;
  d2 = 2 * r2;
  d3 = 2 * r3;
  d4 = 2 * r4;

  div3_sposob_all =
    document.getElementById("div3_sposob_all").options.selectedIndex;

  div3_keep1 = document.getElementById("div3_keep1").options.selectedIndex;
  div3_keep2 = document.getElementById("div3_keep2").options.selectedIndex;
  div3_keep3 = document.getElementById("div3_keep3").options.selectedIndex;
  div3_keep4 = document.getElementById("div3_keep4").options.selectedIndex;

  switch (div3_keep1) {
    case 0:
      div3_Sab1 = d4;
      break;
    case 1:
      div3_Sab1 = $("#div3_Sab1").val() * 1;
      break;
    case 2:
      div3_Sab1 = 1.26 * $("#div3_Sab1").val() * 1;
      break;
  }
  switch (div3_keep2) {
    case 0:
      div3_Sab2 = d4;
      break;
    case 1:
      div3_Sab2 = $("#div3_Sab2").val() * 1;
      break;
    case 2:
      div3_Sab2 = 1.26 * $("#div3_Sab2").val() * 1;
      break;
  }
  switch (div3_keep3) {
    case 0:
      div3_Sab3 = d4;
      break;
    case 1:
      div3_Sab3 = $("#div3_Sab3").val() * 1;
      break;
    case 2:
      div3_Sab3 = 1.26 * $("#div3_Sab3").val() * 1;
      break;
  }
  switch (div3_keep4) {
    case 0:
      div3_Sab4 = d4;
      break;
    case 1:
      div3_Sab4 = $("#div3_Sab4").val() * 1;
      break;
    case 2:
      div3_Sab4 = 1.26 * $("#div3_Sab4").val() * 1;
      break;
  }

  switch (
    div3_sposob_all //Способ прокладки
  ) {
    case 0:
      Lk = $("#div3_otrezok1").val() * 1;
      S_sr = (div3_Sab1 * $("#div3_otrezok1").val() * 1) / Lk;
      break;
    case 1:
      Lk = $("#div3_otrezok1").val() * 1 + $("#div3_otrezok2").val() * 1;
      S_sr =
        (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
          div3_Sab2 * $("#div3_otrezok2").val() * 1) /
        Lk;
      break;
    case 2:
      Lk =
        $("#div3_otrezok1").val() * 1 +
        $("#div3_otrezok2").val() * 1 +
        $("#div3_otrezok3").val() * 1;
      S_sr =
        (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
          div3_Sab2 * $("#div3_otrezok2").val() * 1 +
          div3_Sab3 * $("#div3_otrezok3").val() * 1) /
        Lk;
      break;
    case 3:
      Lk =
        $("#div3_otrezok1").val() * 1 +
        $("#div3_otrezok2").val() * 1 +
        $("#div3_otrezok3").val() * 1 +
        $("#div3_otrezok4").val() * 1;
      S_sr =
        (div3_Sab1 * $("#div3_otrezok1").val() * 1 +
          div3_Sab2 * $("#div3_otrezok2").val() * 1 +
          div3_Sab3 * $("#div3_otrezok3").val() * 1 +
          div3_Sab4 * $("#div3_otrezok4").val() * 1) /
        Lk;
      break;
  }

  if (kab_konstr == 1) {
    S_sr = 2 * r3;
  }

  kab_r_cu = $("#kab_r_cu").val() * 1;
  kab_r_al = $("#kab_r_al").val() * 1;
  kab_kt_cu = $("#kab_kt_cu").val() * 1;
  kab_kt_al = $("#kab_kt_al").val() * 1;
  kab_te_unt_kz = $("#kab_te_unt_kz").val() * 1;

  if (div8_material_e == 0) {
    Ro_e = kab_r_cu * (1 + kab_kt_cu * (kab_te_unt_kz - 20));
  } else {
    Ro_e = kab_r_al * (1 + kab_kt_al * (kab_te_unt_kz - 20));
  }

  X = omega * (miu / (2 * Math.PI)) * Lk * Math.log(S_sr / r2);

  Re = Lk * (Ro_e / div8_sech);

  Ie = s1_i_norm / Math.sqrt(1 + Math.pow(Re / X, 2));

  Ie_Ig = 1 / Math.sqrt(1 + Math.pow(Re / X, 2));

  if (kab_konstr == 0 && div8_lost == 0) {
    Pe_Pj = Ie_Ig * Ie_Ig * (Ro_e / roj) * (div8_sech_g / div8_sech);
  } else if (kab_konstr == 0 && div8_lost == 1) {
    Pe_Pj = 0;
  } else if (kab_konstr == 1) {
    Pe_Pj = 0;
  }

  //ЭТАП 1 РАСЧЕТ АКТИВНОГО СОПРОТИВЛЕНИЯ R1

  R1_z = (roj / div8_sech_g) * 1000 * (1 + Pe_Pj);

  //2

  if (kab_konstr == 0 && div8_lost == 0) {
    V = Math.pow(Ie_Ig, 2);
  } else if (kab_konstr == 0 && div8_lost == 1) {
    V = 0;
  } else if (kab_konstr == 1) {
    V = 0;
  }
  X1_z =
    omega *
    (miu / (2 * Math.PI)) *
    1000 *
    Math.log((S_sr / r1) * Math.pow(r2 / S_sr, V));

  //3

  Xc1_z =
    (Math.log(r2 / r1) / (omega * (2 * Math.PI) * kab_dpi * E0)) *
    Math.pow(10, -9);

  $("#div8_r1").val(sigFigs(R1_z));
  $("#div8_c1").val(sigFigs(Xc1_z));
  $("#div8_x1").val(sigFigs(X1_z));
  $("#div8_distasce").val(all_round(Lk / 1000, 3));

  //4
  var R = (R1_z * Lk) / 1000;
  var X = (X1_z * Lk) / 1000;
  var Xc = Xc1_z * (1000 / Lk);

  var U1_n = [];
  var k = 0;
  U1_n[k] = s1_Uc;
  var delta_Ua = 0;
  var delta_Ub = 0;

  var modul = 0;

  var U2_n = [];
  var S_H, P_H, Q_H, Q_20, P_2, Q_2;
  do {
    k++;
    U2_n[k] = Math.sqrt(Math.pow(s1_Uc - delta_Ua, 2) + delta_Ub * delta_Ub);
    S_H = (Math.sqrt(3) / 1000) * U2_n[k] * s1_i_norm;
    P_H = S_H * s1_cosf;
    Q_H = Math.sqrt(S_H * S_H - P_H * P_H);
    Q_20 = ((U2_n[k] * U2_n[k]) / (2 * Xc)) * Math.pow(10, -6);
    P_2 = P_H;
    Q_2 = Q_H - Q_20;

    delta_Ua = (R * P_2 + X * Q_2) / U2_n[k];
    delta_Ub = (X * P_2 - R * Q_2) / U2_n[k];
    U1_n[k] = Math.sqrt(Math.pow(U2_n[k] + delta_Ua, 2) + delta_Ub * delta_Ub);

    modul = Math.abs(U1_n[k] / s1_Uc - 1);
  } while (modul > 0.01);
  $("#div8_v_start").val(all_round(s1_Uc, 2));
  $("#div8_v_end").val(all_round(U2_n[k], 2));

  delta_Uc = /*Math.abs*/ (1 - U2_n[k] / U1_n[k]) * 100;
  $("#div8_delta").val(all_round(delta_Uc, 3));

  $("#div8_p_activ").val(all_round(P_H, 2));
  $("#div8_p_reactiv").val(all_round(Q_H, 2));
  $("#div8_p_full").val(all_round(S_H, 2));

  var klmn = ((P_2 * P_2 + Q_2 * Q_2) / (U2_n[k] * U2_n[k])) * (R / P_2) * 100;
  $("#div8_p_lost").val(all_round(klmn, 3));
}

// Clean or default value

function clear_div1() {
  $("#s1_Uc").val("");
  document.getElementById("s1_neitral").value = "ground";
  $("#s1_i_norm").val("");
  $("#s1_3kz").val("");
  $("#s1_1kz").val("");
  document.getElementById("s1_upper").value = "not";

  change_apperiod();

  document.getElementById("s1_def_var").value = "base";
  document.getElementById("s1_brake_urov").value = "not";
  document.getElementById("s1_rep_apv").value = "not";
  $("#s1_base_def").val(0.1);
  $("#s1_res_def").val(0.6);
  $("#s1_t_urov").val(0.3);
  $("#s1_t_Auto_off").val(0.05);
}

function clear_div2() {
  $("#kab_Ukab").val("");
  document.getElementById("kab_konstr").value = "one";
  change_kab_konstruct();
  div3_grunt_in_pipe();
  div3_grunt_in_pipe();
  div3_grunt_in_pipe();
  div3_grunt_in_pipe();
  sech_e_change();

  $("#kab_kj").val(0.9);
  $("#kab_ke").val(0.5);
  $("#kab_tj_unt_kz").val(90);
  $("#kab_te_unt_kz").val(80);
  $("#kab_tj_bef_kz").val(250);
  $("#kab_te_bef_kz").val(350);
  $("#kab_t_izol").val(90);
  $("#kab_dpi").val(2.5);
  $("#kab_tan_a").val(0.001);
}

function clear_div3() {
  document.getElementById("div3_sposob_all").value = "first";
  sposob_quant();

  //sp1
  document.getElementById("div3_keep1").value = "teck_in";
  document.getElementById("div3_usl1").value = "grunt";

  $("#div3_grunt1").val("");
  $("#div3_otrezok1").val("");
  $("#div3_H1").val("");
  document.getElementById("div3_paral_kl1").value = "one";
  div3_paral_kl_for_1();
  document.getElementById("div3_D1").value = "var_d_1";
  document.getElementById("div3_SN1").value = "var_SN_1";
  $("#div3_max_fg1").val("");

  //sp2
  document.getElementById("div3_keep2").value = "teck_in";
  document.getElementById("div3_usl2").value = "grunt";
  $("#div3_grunt2").val("");
  $("#div3_otrezok2").val("");
  $("#div3_H2").val("");
  document.getElementById("div3_paral_kl2").value = "one";
  div3_paral_kl_for_2();
  document.getElementById("div3_D2").value = "var_d_1";
  document.getElementById("div3_SN2").value = "var_SN_1";
  $("#div3_max_fg2").val("");
  //sp3
  document.getElementById("div3_keep3").value = "teck_in";
  document.getElementById("div3_usl3").value = "grunt";
  $("#div3_grunt3").val("");
  $("#div3_otrezok3").val("");
  $("#div3_H3").val("");
  document.getElementById("div3_paral_kl3").value = "one";
  div3_paral_kl_for_3();
  document.getElementById("div3_D3").value = "var_d_1";
  document.getElementById("div3_SN3").value = "var_SN_1";
  $("#div3_max_fg3").val("");
  //sp4
  document.getElementById("div3_keep4").value = "teck_in";
  document.getElementById("div3_usl4").value = "grunt";
  $("#div3_grunt4").val("");
  $("#div3_otrezok4").val("");
  $("#div3_H4").val("");
  document.getElementById("div3_paral_kl4").value = "one";
  div3_paral_kl_for_4();
  document.getElementById("div3_D4").value = "var_d_1";
  document.getElementById("div3_SN4").value = "var_SN_1";
  $("#div3_max_fg4").val("");

  $("#div3_Lall").val("");
  $("#div3_max_fg_2").val("");
  div3_make_d_and_sn();
  div3_grunt_in_pipe();
  div3_one_or_three();
  uslovie_procladki();
  div3_Sab_more_D();
}

function clear_div4() {
  $("#s1_Hc").val(50);
  $("#s1_lost").val(2);

  $("#s1_factor").val(1.0);

  $("#s1_cosf").val(0.85);

  $("#div4_ts_izol").val(3.5);
  $("#div4_ts_ob").val(3.5);
  $("#div4_ts_polgl").val(2);

  $("#div4_ts_pv").val(1);

  $("#div4_ts_pm").val(1.2);

  $("#div4_ts_ps").val(1.65);
  $("#div4_ts_sgl").val(2);
  $("#div4_ts_gl").val(3);

  $("#div4_temp_air").val(35);

  $("#div4_temp_min").val(20);

  $("#div4_temp_mid").val(15);
  $("#div4_temp_high_mid").val(10);
  $("#div4_temp_high").val(5);

  $("#div4_tp_air1").val(0.03);
  $("#div4_tp_air2").val(5);
  $("#div4_tp_air3").val(10);

  $("#div4_k_potok").val(2);
  $("#div4_mod_upr").val(950);
  $("#div3_dv_dekv1").val(1.5);

  $("#kab_r_cu").val(0.0172);

  $("#kab_r_al").val(0.028);

  $("#kab_kt_cu").val(0.0039);
  $("#kab_kt_al").val(0.0039);
  $("#kab_Ct_cu").val(380);

  $("#kab_Ct_al").val(880);

  $("#kab_p_cu").val(8890);

  $("#kab_p_al").val(2700);
}

function oldDecoder() {
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

function decoder() {
  if (oldDecoder()) {
    alert("Код принят");
    kod_status = true;
    return;
  }
  var my_serial = $("#kod_d").val();
  let fullUrl = url + `api/v1/accept/check/${my_serial}`;
  let promise = fetch(fullUrl);

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
    })
    .catch((err) => {
      alert("Неверный код");
    });
}

function checkAccept() {
  const fullUrl = url + "api/v1/accept/profile";
  let acceptToken = localStorage.getItem("accept-token") || "";
  let promise = fetch(fullUrl, {
    headers: {
      "accept-token": acceptToken,
      "Content-Type": "application/json",
    },
  });

  promise
    .then((res) => {
      console.log(res.body);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data.message) {
        kod_status = data.accept;
        return;
      }
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
  let fullUrl = url + `api/v1/action/add`;
  let acceptToken = localStorage.getItem("accept-token") || "";
  let object = {
    project_name: projName,
    type: actionType,
    program_type: 3,
    params: {
      param1: param1,
      param2: param2,
    },
    data,
  };
  console.log(object);
  let promise = fetch(fullUrl, {
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
