/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 /*
var app = {
    // Application Constructor
	
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		document.querySelector("startScan").addEventListener("touchend", this.startScan, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	
	startScan: function() {
		var resultDiv = document.querySelector("results");
		resultDiv.innerHTML = "MAURO";
	
		cordova.plugins.barcodeScanner.scan(
			function (result) {
				resultDiv = document.querySelector("#results");
				var s = "Result: " + result.text + "<br/>" +
				"Format: " + result.format + "<br/>" +
				"Cancelled: " + result.cancelled;
				resultDiv.innerHTML = s;
			}, 
			function (error) {
				alert("Scanning failed: " + error);
			}
		);
	}
	
};*/

var serviceURL = "http://www.maurobailotti.it/mobile/app/test/";

var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
	document.querySelector("#startScan").addEventListener("touchend", startScan, false);
	document.querySelector("#vediArt").addEventListener("touchend", viewArt, false);
	document.querySelector("#codart").addEventListener("keydown", premiInvio, false);
	resultDiv = document.querySelector("#results");
}

function startScan() {
	var codice;
	codice="";
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			var s = "Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled;
			resultDiv.innerHTML = s;
			codice = result.text;
			var elem = document.getElementById("codart");
			elem.value = codice;
			viewArt();
		}, 
		function (error) {
			alert("Scanning failed: " + error);
			
		}
	);
	if (codice=="") {
		codice="ArtProva";
		var elem = document.getElementById("codart");
		elem.value = codice;
		var vediarticolo = document.querySelector("#viewArticolo");
		vediarticolo.innerHTML = '<a href="Prodotto.html">MOSTRA ARTICOLO</a>';
	}

}

function viewArt() {
	var codice;
	var elem = document.getElementById("codart");
	codice = elem.value;
	//alert(codice);
	$.mobile.changePage('Prodotto.html?id='+codice, {dataUrl: 'Prodotto.html?id='+codice, transition: "pop"}); 
}

function premiInvio(e) {
	var keyCode = e.keyCode || e.which;

  if (keyCode == 13) {
	//alert("Premuto Invio");
	viewArt();
  }
}
