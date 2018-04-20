var httpRequest = new XMLHttpRequest();
var searchText = document.getElementById('searchText');
var movieTop = document.getElementById('movieTop');
var movieListView = document.getElementById("movieList");
var movieDetails = document.getElementById('movieDetails');
var API = 'http://www.omdbapi.com/?apikey=7823e390';
var MOVIE_CLICK_CLASS = "js-click-movie";
var MOVIE_DETAIL_PAGE = "MovieDetailPage";


///
// Utility function to call API
///
var callAPI = function callAPI() {
    var typeOfRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
    var callback = arguments[1];
    var apiUrl = arguments[2];

    for (var _len = arguments.length, queryStrings = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        queryStrings[_key - 3] = arguments[_key];
    }

    if (typeof callback === 'function' && Array.isArray(queryStrings)) {
        httpRequest.onreadystatechange = callback;
        httpRequest.open(typeOfRequest, '' + apiUrl + queryStrings.map(function (queryString) {
            return '&' + queryString;
        }), true);
        httpRequest.send();
    }
};

///
// Renders list items for the movies
///
var renderMovieListItems = function renderMovieListItems(jsonArray) {
    if (jsonArray === undefined) return;
    return jsonArray.map(function (movie) {
        var html =
        '<li>' +
        '<a class="' + MOVIE_CLICK_CLASS + '" data-movie-id="' + movie.imdbID + '" href="#' + MOVIE_DETAIL_PAGE + '">' +
        '<img src="' + movie.Poster + '">' +
        '<h2>' + movie.Title + '</h2>' +
        '<p>' + movie.Year + '</p>'
        '</a>'
        '</li>';
        return html;
    }).join('');
};


///
// Render movie details markup
///
var renderMovieDetails = function renderMovieDetails(json) {
    if (json === undefined) return;
    return iterateOverMovieJSON(json) + '\n    ';
};

///
// Helper function to iterate over JSON keys and values and return movieListView markup
///
var iterateOverMovieJSON = function iterateOverMovieJSON(json) {
    var markup = "";
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if (key != 'Poster') {
                markup += '<li><p>' + key + ' : ' + json[key] + '</p></li>';
            }
        }
    }
    return markup;
};


///
// Event handler when movie list items are clicked
///
var movieClickedEventHandler = function movieClickedEventHandler() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var json = JSON.parse(httpRequest.responseText);
            localStorage.setItem("movie",JSON.stringify(json));
            var markup = renderMovieDetails(json);
            if (markup !== undefined) {
                movieTop.innerHTML = '<img src=' + json.Poster + '>';
                movieDetails.innerHTML = markup;
                $(movieDetails).listview('refresh');
            }
        } else {
            alert('There was a problem with the request.');
        }
    }
};

///
// Event handler for searching movies
///
var searchMovieEventHandler = function searchMovieEventHandler() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            var markup = renderMovieListItems(JSON.parse(httpRequest.responseText).Search);
            if (markup !== undefined) {
                movieListView.innerHTML = markup;
                $(movieListView).listview('refresh');
            }
        } else {
            alert('There was a problem with the request.');
        }
    }
};
