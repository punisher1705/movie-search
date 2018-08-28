$(document).ready(() => {
	//to show and and hide form 
	// $('#idSearch').hide();
	// $('#idSearch').css('display','none')
	$('#toggle').click((e) => {
		e.preventDefault();
		// $('#myForm').parent().hide();
		// $('#idSearch').show();
		$('#myForm1').parent().css('display','none');
		$('#idSearch').css('display','block');
	});
	$('#toggleName').click((e) => {
		e.preventDefault();
		// $('#myForm2').parent().hide();
		// $('#nameSearch').show();
		$('#myForm2').parent().css('display','none');
		$('#titleSearch').css('display','block');
	});

	//calling search function
	$('#search').click((e) => {
		e.preventDefault();
		searchByName();	
	});
	//calling title function
 	$('#searchForm2').click((e) => {
		e.preventDefault();
		searchByTitle();
	})
	//Ajax call to search movie by Imdb id
	$('#searchId').click((e) => {
		e.preventDefault();
		searchById();
	});
	//calling reset function
	$('.reset').click((e) => {
		reset();
	}); 
});


//////////////////////////////////////////////////// Ajax function to search movie by name ///////////////////////////////////////////////
let searchByName = () => {
	let name = $('#searchByName').val();
		if (name != "" || name != null) {
			$.ajax({
				type: 'GET',
				dataType: 'json',
				async: true,
				url: `https://www.omdbapi.com/?s=${name}&apikey=7ac7bb90`,
				success: (data) => {
				if(data.Search) {
						for (i of data.Search) {
						let displayData = `<div class="card col-6 col-sm-3 col-md-3 col-lg-3 border-0 m-1 justify-content-center bg-dark pt-1 pr-1 pl-1 pb-0" id="card-items" style="width: 18rem;">
											  <h6 class="card-title text-center text-light">${i.Title}</h6>
											  <img class="card-img-top text-center mr-auto ml-auto" id="icon-img" src="${i.Poster}" alt="${data.Title}" onerror=this.src="default-icon/default-movie.png">
											  <div class="card-body p-0  text-light">
											    <p class="card-text text-center text-muted">${i.Year}</p>	
											  </div>
											</div>`;		
						$('#shwdata').append(displayData);
						}
					} else {
						alert(data.Error);
					}
				},
				complete: (data) => {
					if(data.responseJSON.Response === "True") {
						$('#exampleModal').modal();	
					}
				},
				// error: (data) => {
				// 	alert(data.Error);
				// }	
			});
		}else {
			//do nothing
		}
}
//////////////////////////////////////////////////// Ajax function to search movie by name ///////////////////////////////////////////////


/////////////////////////////////////////////////// to search data using title //////////////////////////////////////////////////////
let searchByTitle = () => {
	let title = $('#searchByTitle').val();
	let type = $('#searchByType').val();
	let year = $('#searchByYear').val();
	if(title != "" || title != null) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			async: true,
			url: `https://www.omdbapi.com/?t=${title}&type=${type}&y=${year}&apikey=7ac7bb90`,
			success: (data) => {
				if(data.Response === "True") {
						let displayTitleData;
						let displayTitleData2;
						let displayTitleData3;
						displayTitleData = `<div class="row">
												<div class="col-md-12 col-lg-4 p-3">
													<img src="${data.Poster}" class="rounded mx-auto d-block border border-light" alt="${data.Title}" onerror=this.src="default-icon/default-movie.png">
												</div>
												<div class="col-md-12 col-lg-8" id="details">
													<h2>${data.Title}</h2>
													<h4>${data.Year}</h4>
													<h5><strong>Type: </strong></h5><p>${data.Type}</p>
													<h5><strong>Genre: </strong></h5><p>${data.Genre}</p>
													<div class="container m-2 p-3">
														<div class="text-center">
															<h5><strong>IMDB Ratings: </strong></h5>
															<h6><strong>IMDB Rating: </strong></h6><p>${data.imdbRating}</p>
															<h6><strong>IMDB Votes: </strong></h6><p>${data.imdbVotes}</p>
														</div>			
													</div>
												</div>
											</div>
											`;
						displayTitleData2 = `<div class="row  p-2 text-center text-dark">
					 								<div class="col-md-6" id="plot">
					 									<h5>Plot: </h5>	
					 									<p>${data.Plot}</p>
					 								</div>
					 								<div class="col-md-6">
					 									<p><strong>Directors:</strong> ${data.Director}</p>	
					 									<p><strong>Actors:</strong> ${data.Actors}</p>
					 									<p><strong>Production:</strong> ${data.Production}</p>
					 									<p><strong>Country:</strong> ${data.Country}</p>
					 									<p><strong>Language:</strong> ${data.Language}</p>
					 									<p><strong>Rated:</strong> ${data.Rated}</p>
					 									<p><strong>Awards:</strong> ${data.Awards}</p>
					 									<p><strong>Box Office:</strong> ${data.BoxOffice}</p>
					 									<p><strong>Released:</strong> ${data.Released}</p>
					 									<p><strong>Runtime:</strong> ${data.Runtime}</p>
					 									<p><strong>Writer:</strong> ${data.Writer}</p>
					 									<p><strong>Year:</strong> ${data.Year}</p>
					 								</div>	
					 							</div>`;
						for(i in data.Ratings) {
								displayTitleData3 += `<h6>${data.Ratings[i].Source}</h6><p>${data.Ratings[i].Value}</p>`;
						}
						$('#showTitleData').append(displayTitleData);
						$('#showTitleData2').append(displayTitleData2);
						$('#showTitleData3').append(displayTitleData3);
				} else {
					alert(data.Error);
				}
			},
			complete: (data) => {
				if(data.responseJSON.Response === "True") {
					$('#exampleModal').modal();	
				} else {
					alert(data.Error);
				}
			},
			error: (data) => {
				alert(data);
			}
		});
	} else {	
		alert('No Movie Found!');
	}
}
/////////////////////////////////////////////////// to search data using title //////////////////////////////////////////////////////


/////////////////////////////////////////////////// Ajax function to search data by ID //////////////////////////////////////////////
let searchById = () => {
	let id = $('#searchByImdbId').val();
	if(id != "" || id != null) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			async: true,
			url: `https://www.omdbapi.com/?i=${id}&apikey=7ac7bb90`,
			success: (data) => {
				console.log(data.Title);
				if(data.Response === "True") {
						let displayTitleData;
						let displayTitleData2;
						let displayTitleData3;
						displayTitleData = `<div class="row">
												<div class="col-md-12 col-lg-4 p-3">
												 	<img src="${data.Poster}" class="rounded mx-auto d-block border border-light" alt="${data.Title}" onerror=this.src="default-icon/default-movie.png">
												</div>
												<div class="col-md-12 col-lg-8" id="details">
													<h2>${data.Title}</h2>
													<h4>${data.Year}</h4>
													<h5><strong>Type: </strong></h5><p>${data.Type}</p>
													<h5><strong>Genre: </strong></h5><p>${data.Genre}</p>
													<div class="container m-2 p-3">
														<div class="text-center">
															<h5><strong>IMDB Ratings: </strong></h5>
															<h6><strong>IMDB Rating: </strong></h6><p>${data.imdbRating}</p>
															<h6><strong>IMDB Votes: </strong></h6><p>${data.imdbVotes}</p>
														</div>			
													</div>
												</div>
											</div>
											`;
						displayTitleData2 = `<div class="row  p-2 text-center text-dark">
					 								<div class="col-md-6" id="plot">
					 									<h5>Plot: </h5>	
					 									<p>${data.Plot}</p>
					 								</div>
					 								<div class="col-md-6">
					 									<p><strong>Directors:</strong> ${data.Director}</p>	
					 									<p><strong>Actors:</strong> ${data.Actors}</p>
					 									<p><strong>Production:</strong> ${data.Production}</p>
					 									<p><strong>Country:</strong> ${data.Country}</p>
					 									<p><strong>Language:</strong> ${data.Language}</p>
					 									<p><strong>Rated:</strong> ${data.Rated}</p>
					 									<p><strong>Awards:</strong> ${data.Awards}</p>
					 									<p><strong>Box Office:</strong> ${data.BoxOffice}</p>
					 									<p><strong>Released:</strong> ${data.Released}</p>
					 									<p><strong>Runtime:</strong> ${data.Runtime}</p>
					 									<p><strong>Writer:</strong> ${data.Writer}</p>
					 									<p><strong>Year:</strong> ${data.Year}</p>
					 								</div>	
					 							</div>`;
					for(i in data.Ratings) {
							displayTitleData3 += `<h6>${data.Ratings[i].Source}</h6><p>${data.Ratings[i].Value}</p>`;					
					}
					$('#showTitleData').append(displayTitleData);
					$('#showTitleData2').append(displayTitleData2);
					$('#showTitleData3').append(displayTitleData3);
				} else {
					alert(data.Error);
				}
			},
			complete: (data) => {
				if(data.responseJSON.Response === "True") {
					$('#exampleModal').modal();	
				} else {
					alert(data.Error);
				}
			},
			error: (data) => {
				alert(data);
			}
		});
	} else {	
		alert('No Movie Found!');
	}
}
/////////////////////////////////////////////////// Ajax function to search data by ID ////////////////////////////////////////////////


////////////////////////////////////////////////// to reload page and to search again /////////////////////////////////////////////////
let reset = () => {
	location.reload(true);
}
////////////////////////////////////////////////// to reload page and to search again /////////////////////////////////////////////////

