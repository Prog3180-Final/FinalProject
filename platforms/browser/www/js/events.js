function eventHandlers() {
    $("#btnCreateUser").click(addUser);
    $("#btnSaveMovieReview").click(addMovieReview);
    $("#btnUpdateModifyReview").click(updateMovieReview);
    $("#btnDeleteModifyReview").click(deleteMovieReview);

    $("#AddMovieReviewPage").on("pageshow",function(){
        updateUserNameDropdown("#selectReviewerUserName");
    });
    $("#ModifyMovieReviewPage").on("pageshow",function(){
        updateUserNameDropdown("#selectReviewerUserNameModify");
    });
    $("#ViewMovieReviewPage").on("pageshow",getReviews);
    $("#ModifyMovieReviewPage").on("pageshow",showCurrentReview);
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