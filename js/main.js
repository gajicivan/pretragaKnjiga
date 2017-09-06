var APIID = "AIzaSyClngPMsdLNjhxnykFMCF7kkfMlhwRTqy0";
var unos = document.getElementById('pretragaKnjige');
var dugme = document.getElementById("dugme");

$(document).ready(function(){

	$("#dugme").on("click", function(){
		var knjiga = unos.value;


		//Enter bind
		unos.addEventListener("keypress", function (event) {
		    if (event.keyCode==13) { 
		        dugme.click();
		      	event.preventDefault();	
		    }		    
		});

		if(knjiga === ""){
			alert("Popunite polje");
		}
		
		//console.log(knjiga);

		//request ka googlu za knjige
		$.ajax({
			url: `https://www.googleapis.com/books/v1/volumes?q=${knjiga}&key=${APIID}`,

		}).done(function(knjigaObj){
			
			$("#rezultat").html(`
			<div class="kind">
				<div class="naslov">${knjigaObj.items[0].volumeInfo.title}</div><br>

				<div class="zaknjige"><img class="thumbnail" src="${knjigaObj.items[0].volumeInfo.imageLinks.smallThumbnail}">
				</div><br>

				<div class="opis"><div class="opisRadnje">Short description:</div> <br>${knjigaObj.items[0].volumeInfo.description}<br><br>
				<div class="pisac"><span class="pisacTekst">Pisac</span> <br>${knjigaObj.items[0].volumeInfo.authors}</div>
				<div class="standard">Internacionalni broj knjige:<br>${knjigaObj.items[0].volumeInfo.industryIdentifiers[0].type}</div>
				<div class="brojStrana">Broj strana: ${knjigaObj.items[0].volumeInfo.pageCount}</div><br>
				
			</div>
				`);
			document.getElementById("myForm").reset();
		});
	});	
});
