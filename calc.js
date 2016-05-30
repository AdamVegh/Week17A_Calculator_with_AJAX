/**
 * Created by Vegh Adam on 2016.05.28..
 */
var keys = document.querySelectorAll("#calculator span");
var operators = ["+", "-", "x", "÷"];
var decimalAdded = false;

for(var i=0; i<keys.length; i++) {
    keys[i].onclick = function (e) {
        var input = document.querySelector(".screen");
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;

        if (btnVal == "C") {
            input.innerHTML = "";
            decimalAdded = false;
        }
        else if (btnVal == "=") {
            var equation = inputVal;
            var lastChar = equation[equation.length-1];
            equation = equation.replace(/x/g, "*").replace(/÷/g, "/");
            if (operators.indexOf(lastChar) > -1 || lastChar == ".") {
                equation = equation.replace(/.$/, "");
            }
            if (equation) {
                input.innerHTML = eval(equation);
               // makeRequest(input);
                makeRequest();
            }
            decimalAdded = false;
        }
        else if (operators.indexOf(btnVal) > -1) {
            var lastChar = inputVal[inputVal.length-1];
            if (inputVal != "" && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal;
            else if (inputVal == "" && btnVal == "-")
                input.innerHTML += btnVal;
            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1)
                input.innerHTML = inputVal.replace(/.$/,btnVal);
            decimalAdded = false;
        }
        else if (btnVal == ".") {
            if (!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        }
        else {
            input.innerHTML += btnVal;
        }
        e.preventDefault();
    }
}

var httpRequest;

function makeRequest() {
    var number = document.getElementsByClassName("screen")[0].innerHTML;
    if (number.indexOf(".") > -1) {
        document.getElementById("number").innerHTML = "We have no information about float numbers.";
        return;
    }
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = alertContent;
    httpRequest.open("GET", "http://numbersapi.com/" + number + "?json");
    httpRequest.send();
}

function alertContent() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var response = httpRequest.responseText;
            document.getElementById("number").innerHTML = JSON.parse(response).text;
        }
    }
    else {
        document.getElementById("number").innerHTML = "No connection with the server.";
    }
}