/////////////////////////////////////////////////////////
// Author:      Alan Tsui
// Created on:  2019-01-27
// Page Name:   atPages.html
// Script Name: atPages.js
// Description: To view, edit and sort pages details 
/////////////////////////////////////////////////////////
// Start of Script
/////////////////////////////////////////////////////////
var numberOfItems = 0;
var limitPerPage = 1000;
var totalPages = 0;
var maxRowsPerPage = 1000;
var currentPage = 0;
var currentRowIndex = 0;
var pages;
var asc1 = 1;
var asc2 = 1;
var asc3 = 1;
var table = document.getElementById("mytable")
var rIndex = 0;
var cIndex = 0;
var col1 = 0;
var col2 = '';
var col3 = 0;
var col4 = '';
var YES = 'Yes';
var NO = 'No';

window.onload = function () {
 }
$(document).ready(function () {
  searchPagesData();
});
/////////////////////////////////////////////////////////
// Search
/////////////////////////////////////////////////////////
function searchPagesData() {
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
// Sorting
/////////////////////////////////////////////////////////
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("mytable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
/////////////////////////////////////////////////////////
// Get selected row and cell index
/////////////////////////////////////////////////////////
function getRowCellIndex() {
  var table = document.getElementById("mytable")
  for (var i = 1; i < table.rows.length; i++) {
    var rIndex = 0;
    var cIndex = 0;
    for (var j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].onclick = function () {
        rIndex = this.parentElement.rowIndex;
        cIndex = this.cellIndex;
        if (cIndex == 4) {
          document.getElementById("mytable").deleteRow(rIndex);
        } else {
          getRowValue(rIndex, cIndex);
        }
      }
    }
  }
}

function getRowValue(i, j) {
  col1 = i;
  col2 = table.rows[i].cells[0].innerHTML;
  if (table.rows[i].cells[3].innerHTML == YES) {
    col3 = 1;
  } else {
    col3 = 0
  };
  var col4 = table.rows[i].cells[2].innerHTML;
  sendRowDetails(col1, col2, col3, col4);
}
/////////////////////////////////////////////////////////
// Send selected row to PagesUpdate.html 
/////////////////////////////////////////////////////////
function sendRowDetails(col1, col2, col3, col4) {
  var str1 = '?id=';
  var str2 = col1;
  var str3 = '&title=';
  var str4 = col2;
  var str5 = '&ispublished=';
  var str6 = col3;
  var str7 = '&created=';
  var str8 = col4;
  var url2 = document.location.host + "\atPagesUpdate.html?";
  var data1 = {
    'id': col1,
    'title': col2,
    'ispublished': col3,
    'created': str8
  };
  var querystring = encodeQueryData(data1);
  var newurl2 = url2 + querystring;
  window.open(newurl2, "_blank");
}
/////////////////////////////////////////////////////////
// Add new row with sample data
/////////////////////////////////////////////////////////
function addRow() {
  // var newRow = table.insertRow(1);
  // var newRow = table.insertRow(table.rows.length / 2);
  var newRow = table.insertRow(table.rows.length);
  var newRowCount = table.rows.length + 1;
  var newDate = new Date();
  var dd1 = newDate.getDate();
  var yy = newDate.getFullYear();
  var mm1 = newDate.getMonth() + 1;
  var dd = dd1 < 10 ? '0' + dd1 : dd1;
  var mm = mm1 < 10 ? '0' + mm1 : mm1;

  var newCell1 = newRow.insertCell(0);
  var newCell2 = newRow.insertCell(1);
  var newCell3 = newRow.insertCell(2);
  var newCell4 = newRow.insertCell(3);
  var newCell5 = newRow.insertCell(4);
  newCell1.innerHTML = "New Pages " + newRowCount;
  newCell2.innerHTML = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
  newCell3.innerHTML = yy + '-' + mm + '-' + dd;
  newCell4.innerHTML = 'No';
  newCell5.innerHTML = '<span class="glyphicon glyphicon-trash" style="color:red"> Delete</span>';
}
/////////////////////////////////////////////////////////
// Read parameter details returned from PagesUpdate.html
/////////////////////////////////////////////////////////
function getParameters() {
  var rowId = 0;
  var postId = '';
  var title = "";
  var ispublished = 0;
  var xTraget = 'created';
  var newDate = '';
  if (checkParameters(document.location.href)) {
    var url = document.location.href,
      params = url.split('?')[1].split('&'),
      data = {},
      tmp;
    for (var i = 0, l = params.length; i < l; i++) {
      tmp = params[i].split('=');
      data[tmp[0]] = tmp[1];
    }

    myDate1 = decodeURIComponent(data.created);
    postId = "Id: " + data.id;
    title = decodeURIComponent(data.title);
    isPublished = decodeURIComponent(data.ispublished);
    var parts = myDate1.split('-');
    var myDate = new Date(parts[0], parts[1] - 1, parts[2]);
    newDate = parts[0] + '-' + parts[1] + '-' + parts[2];
    var currId = parseInt(postId);
    if (data.id == "New") {
      var newRow = table.insertRow(table.rows.length);
      //var newRow = table.insertRow(table.rows.length / 2);
      var newCell1 = newRow.insertCell(0);
      var newCell2 = newRow.insertCell(1);
      var newCell3 = newRow.insertCell(2);
      var newCell4 = newRow.insertCell(3);
      var newCell5 = newRow.insertCell(4);
      newCell1.innerHTML = title;
      newCell2.innerHTML = isPublished == 1 ? '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' : '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
      newCell3.innerHTML = newDate;
      newCell4.innerHTML = isPublished == 1 ? 'Yes' : 'No';
      newCell5.innerHTML = '<span class="glyphicon glyphicon-trash" style="color:red"> Delete</span>';
    } else {
      var x = document.getElementById("mytable").rows[data.id].cells;
      x[0].innerHTML = title;
      x[1].innerHTML = isPublished == 1 ? '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' : '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
      x[2].innerHTML = newDate;
      x[3].innerHTML = isPublished == 1 ? 'Yes' : 'No';
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

function urldecode(str) {
  str = (str + '').toString();
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
}

function urlencode(str) {
  str = (str + '').toString();
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
}
/////////////////////////////////////////////////////////
// End of Script
/////////////////////////////////////////////////////////