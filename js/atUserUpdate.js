/////////////////////////////////////////////////////////
// Author:      Alan Tsui
// Created on:  2019-01-26
// Page Name:   atUsersUpdate.html
// Script Name: atUsersUpdate.js
// Description: To edit users details 
/////////////////////////////////////////////////////////
// Start of Script
/////////////////////////////////////////////////////////
window.onload = function () {
    getParameters();
    $("#saveUser").on("click", postUserData);
}
/////////////////////////////////////////////////////////
// Read parameters details send from atUsers.html
/////////////////////////////////////////////////////////
function getParameters() {
    var rowId = 0;
    var title = "";
    if (checkParameters(document.location.href)) {
        var url = document.location.href,
            params = url.split('?')[1].split('&'),
            data = {},
            tmp;
        for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=');
            data[tmp[0]] = tmp[1];
        }
        document.getElementById('userId').innerHTML = "Id: " + data.id;
        document.getElementById('userName').innerHTML = decodeURIComponent(data.uname);;
        document.getElementById('userEmail').innerHTML = decodeURIComponent(data.email);;
    } else {
        document.getElementById('userId').innerHTML = "New";
        document.getElementById('userName').innerHTML = "";
        document.getElementById('userEmail').innerHTML = "";
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
// Send updated data to atUsers.html
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
function sendUserData() {
    var col1 = document.getElementById('userId').innerHTML;
    var col2 = document.getElementById('userName').innerHTML
    var col3 = document.getElementById('userEmail').innerHTML
    var data = col1 + "\n" + col2 + "\n" + col3;
    console.log("Current Row: " + data);

    var str1 = '?id=';
    var str2 = col1;
    var str3 = '&uname=';
    var str4 = col2;
    var str5 = '&email=';
    var str6 = col3;
    var url2 = document.location.host + "\atUsers.html?";
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