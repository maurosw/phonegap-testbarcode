$(document).on('pagecontainershow', function(event, ui) {
	pageId = $('body').pagecontainer('getActivePage').prop("id");
	if (pageId === "detailsPage") {
		var id = getUrlVars()["id"];
		$.getJSON(serviceURL + 'GetProdotto.php?id='+id, displayProdotto);
		document.querySelector("#confermaArt").addEventListener("touchend", confermaArticolo, false);
	}
	if (pageId === "ScanBarcodeHome") {
		var elem = document.getElementById("codart");
		elem.value = '';
		elem.focus();
		setTimeout(function(){	document.getElementById("codart").focus();},10);
		//Con questo set timeout sul device funziona il setfocus che altrimenti non andava
	}
});

function displayProdotto(data) {
	var prodotto = data.item;
	console.log(prodotto);
	$('#prodottoPic').attr('src', 'http://www.maurobailotti.it/mobile/app/test/img/' + prodotto.Img);
	$('#labelName').text('Codice');
	$('#productName').text(prodotto.Codice);
	$('#productDescription').text(prodotto.Descrizione);
	$('#productQty').text(prodotto.Qta);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function confermaArticolo() {
	
	history.back();
	var elem = document.getElementById("codart");
	elem.value = '';
	elem.focus();
	return false;
}