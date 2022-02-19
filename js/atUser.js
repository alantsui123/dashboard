/////////////////////////////////////////////////////////
// Author:      Alan Tsui
// Created on:  2019-01-27
// Page Name:   atUsers.html
// Script Name: atUsers.js
// Description: To view, edit and sort users details 
/////////////////////////////////////////////////////////
// Start of Script
/////////////////////////////////////////////////////////
var numberOfItems = 0;
var limitPerPage = 1000;
var totalPages = 0;
var maxRowsPerPage = 1000;
var currentPage = 0;
var currentRowIndex = 0;
var table = document.getElementById("mytable");

var posts, asc1 = 1,
  asc2 = 1,
  asc3 = 1;
window.onload = function () {
  // getParameters();
}
$(document).ready(function () {
  getUsersData();
  createMaxRows();
  displayUserData();
  refreshUserData();
  searchUsersData();
  $("#viewFirstPage").on("click", getFirstPageUserData);
  $("#viewPreviousPage").on("click", getPreviousPageUserData);
  // $("#currentValue").on("click", getNextPageUserData);
  $("#viewNextPage").on("click", getNextPageUserData);
  $("#viewLastPage").on("click", getLastPageUserData);
  $("#mytable").on('click', '.btnEdit', function () {
    currentRow = $(this).closest('tr');
    currentRowIndex = $(this).closest("tr").index
    getCurrentRowValue(currentRow, currentRowIndex);
  });
});
/////////////////////////////////////////////////////////
// Read parameters returned from atUsersUpdate.html
/////////////////////////////////////////////////////////
function getParameters() {
  console.log("get Parameters");
  var rowId = 0;
  var uId = "";
  var uName = "";
  var uEmail = "";
  if (checkParameters(document.location.href)) {
    var url = document.location.href,
      params = url.split('?')[1].split('&'),
      data = {},
      tmp;
    for (var i = 0, l = params.length; i < l; i++) {
      tmp = params[i].split('=');
      data[tmp[0]] = tmp[1];
    }

    uId = "Id: " + data.id;
    uName = decodeURIComponent(data.uname);
    uEmail = decodeURIComponent(data.email);
    var currId = parseInt(uId);
    if (data.id == "New") {
      var newRow = table.insertRow(table.rows.length);
      //var newRow = table.insertRow(table.rows.length / 2);
      var newCell2 = newRow.insertCell(1);
      var newCell3 = newRow.insertCell(2);
      newCell2.innerHTML = "Test1";
      newCell3.innerHTML = "Hello1";
    } else {
      var x = document.getElementById("mytable").rows[data.id].cells;
      x[1].innerHTML = uName;
      x[2].innerHTML = uEmail; 
    }
  } else {
  //  console.log("No data");
  }
}

function checkParameters(url) {
  var str = url;
  var re = /[A-Z]/g;
  var re2 = /[?]/g;
  var n = str.search(re2);
  if (n > 0) {
    return true;
  } else {
    return false;
  }
}
/////////////////////////////////////////////////////////
// Encode and decode details
/////////////////////////////////////////////////////////
function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}
function encodeQueryData2(data) {
  return Object.keys(data).map(function (key) {
    return [key, data[key]].map(encodeURIComponent).join("=");
  }).join("&");
}
/////////////////////////////////////////////////////////
// Get selected row details
/////////////////////////////////////////////////////////
function getCurrentRowValue(currentRow, currentRowIndex) {
  var table = "#mytable";
  var col1 = currentRowIndex;
  var col1 = currentRow.find("td:eq(0)").text();
  var col2 = currentRow.find("td:eq(1)").text();
  var col3 = currentRow.find("td:eq(2)").text();
  var data = col1 + "\n" + col2 + "\n" + col3;

  var str1 = '?id=';
  var str2 = col1;
  var str3 = '&uname=';
  var str4 = col2;
  var str5 = '&email=';
  var str6 = col3;
  var url2 = document.location.host + "\atUsersUpdate.html?";
    var data1 = {
    'id': col1,
    'uname': col2,
    'email': col3
  };
  var querystring = encodeQueryData(data1);
  var newurl2 = url2 + querystring;
  window.open(newurl2, "_blank");
}
/////////////////////////////////////////////////////////
// Read data from Users.json
/////////////////////////////////////////////////////////
function getUsersData() {
  $.getJSON("data/users.json", function (data) {
    var items = [];
    $.each(data, function (key, val) {
      items.push("<tr>");
      items.push("<td id=''id" + key + "''>" + val.id + "</td>");
      items.push("<td id=''name" + key + "''>" + val.name + "</td>");
      items.push("<td id=''email" + key + "''>" + val.email + "</td>");
      items.push(
        "<td><a class='btn btn-default btnEdit'>Edit</a></td>"
      );
      items.push("</tr>");
    });
    $("<tbody />", {
      html: items.join("")
    }).appendTo("table");
    numberOfItems = data.length;
    maxRowsPerPage = data.length;
    currentPage = 1;
    updateCurrentPageValue(currentPage);
    totalPages = Math.ceil(numberOfItems / numberOfItems);
  });
};
/////////////////////////////////////////////////////////
// Create combobox - Max Rows per page
/////////////////////////////////////////////////////////
function createMaxRows() {
  var value1 = [maxRowsPerPage, "5", "10", "20", "50", "100"];
  var workers1 = ["All", "5", "10", "20", "50", "100"];
  $("#dropdown select").empty();
  for (var i in workers1) {
    $("#dropdown select").append('<option value=' + value1[i] + '>' + workers1[i] + '</option>');
  }
};
/////////////////////////////////////////////////////////
// Display row details
/////////////////////////////////////////////////////////
function displayUserData() {
  /*
  console.log("number Of Items: " + numberOfItems);
  console.log("Limit Per Page: " + limitPerPage);
  console.log("Total Pages: " + totalPages);
  console.log("Max Rows Per Page: " + maxRowsPerPage);
  console.log("current Page: " + currentPage);
  */
};
/////////////////////////////////////////////////////////
// Repaginate table details
/////////////////////////////////////////////////////////
function refreshUserData() {
  var table = "#mytable";
  $('#maxRows').on('change', function () {

    $('.pagination').html('')
    var trNum = 0;
    limitPerPage = parseInt($(this).val());
    // limitPerPage = $("#maxRows").val();
    // limitPerPage = $(".ddl option:selected").val();
    totalPages = Math.ceil(numberOfItems / limitPerPage);
    currentPage = 1;
    updateCurrentPageValue(currentPage);
    $(table + ' tr:gt(0)').each(function () {
      trNum++
      if (trNum > limitPerPage) {
        $(this).hide();
      }
      if (trNum <= limitPerPage) {
        $(this).show();
      }
    });
    displayUserData();
  });
};

function updateCurrentPageValue(x) {
  if (x == undefined) {
    x = 0;
  }
  // var buttonValue = document.getElementById('currentValue').value;
  // var buttonText = document.getElementById('currentValue').innerText;
  //$('#viewCurrentPage').text(x);
  // $('#viewCurrentPage').val(x);
};
/////////////////////////////////////////////////////////
// Get data of first page of table
/////////////////////////////////////////////////////////
function getFirstPageUserData() {
  var table = "#mytable";
  $('.pagination').html('')
  var trIndex = 0;
  currentPage = 1;
  updateCurrentPageValue(currentPage);
  $(table + ' tr:gt(0)').each(function () {
    trIndex++;
    if (trIndex > (limitPerPage * currentPage) || trIndex <= ((limitPerPage * currentPage) - limitPerPage)) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
  displayUserData();
};
/////////////////////////////////////////////////////////
// Get data of previous page of table
/////////////////////////////////////////////////////////
function getPreviousPageUserData() {
  var table = "#mytable";
  $('.pagination').html('')
  var trIndex = 0;
  if (currentPage - 1 > 0) {
    currentPage = currentPage - 1;
    updateCurrentPageValue(currentPage);
    $(table + ' tr:gt(0)').each(function () {
      trIndex++;
      if (trIndex > (limitPerPage * currentPage) || trIndex <= ((limitPerPage * currentPage) - limitPerPage)) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }
  displayUserData();
};
/////////////////////////////////////////////////////////
// Get data of next page of table
/////////////////////////////////////////////////////////
function getNextPageUserData() {
  var table = "#mytable";
  $('.pagination').html('')
  var trIndex = 0;
  if (currentPage + 1 <= totalPages) {
    currentPage = currentPage + 1;
    updateCurrentPageValue(currentPage);
    $(table + ' tr:gt(0)').each(function () {
      trIndex++;
      if (trIndex > (limitPerPage * currentPage) || trIndex <= ((limitPerPage * currentPage) - limitPerPage)) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  }
  displayUserData();
};
/////////////////////////////////////////////////////////
// Get data of last page of table
/////////////////////////////////////////////////////////
function getLastPageUserData() {
  var table = "#mytable";
  $('.pagination').html('')
  var trIndex = 0;
  currentPage = totalPages;
  updateCurrentPageValue(currentPage);
  $(table + ' tr:gt(0)').each(function () {
    trIndex++;
    if (trIndex > (limitPerPage * currentPage) || trIndex <= ((limitPerPage * currentPage) - limitPerPage)) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
  displayUserData();
};
/////////////////////////////////////////////////////////
// Search
/////////////////////////////////////////////////////////
function searchUsersData() {
  $('.search').keyup(function () {
    var searchTerm = $('.search').val();
    var listItem = $('.results tbody').children('tr');
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('");
    $.extend($.expr[':'], {
      'containsi': function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >=
          0;
      }
    });
    $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function () {
      $(this).attr('visible', 'false');
    })
    $(".results tbody tr:containsi('" + searchSplit + "')").each(function () {
      $(this).attr('visible', 'true');
    })
    var jobCount = $('.results tbody tr[visible="true"]').length;
    $('.counter').text(jobCount + ' item');
    if (jobCount == 0) {
      $('no-result').show();
    } else {
      $('no-reult').hide();
    }
  });
};
/////////////////////////////////////////////////////////
// Misc
/////////////////////////////////////////////////////////
function nthIndex(str, pat, n) {
  var L = str.length,
    i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}
/////////////////////////////////////////////////////////
// End of Script
/////////////////////////////////////////////////////////


