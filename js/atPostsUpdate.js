/////////////////////////////////////////////////////////
// Author:      Alan Tsui
// Created on:  2019-01-27
// Page Name:   atPostsUpdate.html
// Script Name: atPostsUpdate.js
// Description: To view, edit and sort posts details 
/////////////////////////////////////////////////////////
// Start of Script
/////////////////////////////////////////////////////////
var maxRowsPerPage = 1000;
var matchEnterdDate = 0;

window.onload = function () {
    getParameters();
    $("#savePost").on("click", getRowDetails);
}
$(document).ready(function () {
    createPublished();
});
/////////////////////////////////////////////////////////
// Get selected rows details
/////////////////////////////////////////////////////////
function getRowDetails() {
    var col1 = 0;
    var col2 = '';
    var col3 = 0;
    var col4 = '';
    var YES = 'Yes';
    var NO = 'No';
    col1 = document.getElementById('postId').innerHTML;
    col2 = document.getElementById('title').innerHTML;
    if (document.getElementById('isPublished').value == YES) {
        col3 = 1;
    } else {
        col3 = 0
    };
    col4 = document.getElementById('created').value;
    sendRowDetails(col1, col2, col3, col4);
}
/////////////////////////////////////////////////////////
// Send selected rows details to atPosts.html
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
    var url2 = document.location.host + "\atPosts.html?";
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
// Create combobox - Published
/////////////////////////////////////////////////////////
function createPublished() {
    var value1 = ["1", "0"];
    var workers1 = ["Yes", "No"];
    $("#dropdown select").empty();
    for (var i in workers1) {
        $("#dropdown select").append('<option value=' + value1[i] + '>' + workers1[i] + '</option>');
    }
};
/////////////////////////////////////////////////////////
// Read parameters details sent from atPosts.html
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
        postId = "" + data.id;
        title = decodeURIComponent(data.title);
        isPublished = decodeURIComponent(data.ispublished);
        var parts = myDate1.split('-');
        var myDate = new Date(parts[0], parts[1] - 1, parts[2]);
        newDate = parts[0] + '-' + parts[1] + '-' + parts[2];
    } else {
        postId = "New";
        isPublished = 0;
        var date = new Date();
        var dd1 = date.getDate();
        var yy = date.getFullYear();
        var mm1 = date.getMonth() + 1;
        var dd = dd1 < 10 ? '0' + dd1 : dd1;
        var mm = mm1 < 10 ? '0' + mm1 : mm1;
        newDate = yy + '-' + mm + '-' + dd;
    }
    document.getElementById('postId').innerHTML = postId;
    document.getElementById('title').innerHTML = title;
    document.getElementById('isPublished').value = isPublished;
    document.getElementById('created').value = newDate;
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
// Display thankyou message
/////////////////////////////////////////////////////////
function postUserData() {
    $.ajax('data/ThanksYou.json', {
        dataType: 'json',
        timeout: 500,
        success: function (data, status, xhr) {
            alert("Thanks You!")
            window.close();
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert('Error: ' + errorMessage);
        }
    });
};
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
// Format Created date
/////////////////////////////////////////////////////////
function formatCreatedDate() {
    var input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('value', 'some text');
    if (input.value === "some text") {
        allDates = document.getElementsByClassName("xDateContainer");
        matchEnterdDate = 1;
        for (var i = 0; i < allDates.length; i++) {
            allDates[i].style.opacity = "1";
        }
    }
}
/////////////////////////////////////////////////////////
// Set default Created date
/////////////////////////////////////////////////////////
function setCreatedDate(a, b, c, xTraget) {
    var date = new Date(a, b, c);
    var dd1 = date.getDate();
    var yy = date.getFullYear();
    var mm1 = date.getMonth() + 1;
    var dd = dd1 < 10 ? '0' + dd1 : dd1;
    var mm = mm1 < 10 ? '0' + mm1 : mm1;
    if (mm != 'NaN') {
        document.getElementById(xTraget).value = yy + '-' + mm + '-' + dd;
    } else {
        if (matchEnterdDate == 1) {
            document.getElementById(xTraget).value = xObj.value;
        }
    }
}

function setCorrect(xObj, xTraget) {
    var date = new Date(xObj.value);
    var dd1 = date.getDate();
    var yy = date.getFullYear();
    var mm1 = date.getMonth() + 1;
    var dd = dd1 < 10 ? '0' + dd1 : dd1;
    var mm = mm1 < 10 ? '0' + mm1 : mm1;
    if (mm != 'NaN') {
        document.getElementById(xTraget).value = yy + '-' + mm + '-' + dd;
    } else {
        if (matchEnterdDate == 1) {
            document.getElementById(xTraget).value = xObj.value;
        }
    }
}
/////////////////////////////////////////////////////////
// End of Script
/////////////////////////////////////////////////////////