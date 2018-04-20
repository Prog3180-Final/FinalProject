function eventHandlers() {

    $("#btnCreateUser").click(addUser);

    $("#btnSaveMovieReview").click(addMovieReview);
    //$("#btnUpdateMovieReview").click(updateMovieReview);

    $("#AddMovieRatingPage").on("pageshow",function(){
        updateUserNameDropdown("#selectReviewerUserName");
    });
    //$("#RJEditFeedbackPage").on("pageshow",function(){
      //  RJupdateTypesDropdown("#RJselectTypeModify","");
    //});

    //$("#RJViewFeedbackPage").on("pageshow",RJgetReviews);
    //$("#RJEditFeedbackPage").on("pageshow",RJshowCurrentReview);


    $("#searchText").submit(function(e){
        e.preventDefault();
    })
    $("#searchText").on('keyup',function(){
        var searchValue = $(this).val();
        if (searchValue.length > 3) {
            callAPI('GET', searchMovieEventHandler, API, ['s=' + searchValue]);
        }
    });

    $('#movieList').on('click', 'a.' + MOVIE_CLICK_CLASS, function (e) {
        var movieId = this.dataset.movieId;
        if (movieId && movieId.length > 0) {
            callAPI('GET', movieClickedEventHandler, API, ['i=' + movieId]);
        }
    });

    $("#btnClearDatabase").click(clearDatabase);

}

function initDB() {
    console.info("Creating Database ...");
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating tables ...");
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables : Database not available");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Can not proceed.");
    }
}

$(document).ready(function () {
    eventHandlers();
    initDB();
});