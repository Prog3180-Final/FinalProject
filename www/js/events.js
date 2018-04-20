function frmRJfrmSettings_submit(){
    var reviewerEmail = $("#RJtxtDefaultReviewerEmail").val();
    localStorage.setItem('DefaultEmail',reviewerEmail);
    alert("Default reviewer email saved.");
}


function addFeedbackPage_pageshow(){
    $("#RJtxtReviewerEmailAdd").val(localStorage.getItem("DefaultEmail"));
}

function eventHandlers() {
    $("#RJcheckboxAddRatings").click(function (e) {
        checkboxAddRatings_click(e);
    });
    $("#RJcheckboxModifyRatings").click(function (e) {
        checkboxModifyRatings_click(e);
    });
    $("#btnSaveDefaults").click(frmRJfrmSettings_submit);

    $("#btnSaveRatings").click(RJaddFeedback);
    $("#btnUpdateFeedback").click(RJupdateFeedback);
    $("#btnDeleteFeedback").click(RJdeleteFeedback);
    $("#btnCancelFeedback").click(function(){
        $.mobile.navigate("#RJViewFeedbackPage");
    })

    $("#addRatings").keyup(function(){
        calculateRatings($(this));
    });
    $("#modifyRatings").keyup(function(){
        calculateRatings($(this));
    });

    $("#RJAddFeedbackPage").on("pageshow",addFeedbackPage_pageshow);
    $("#RJAddFeedbackPage").on("pageshow",function(){
        RJupdateTypesDropdown("#RJselectTypeAdd","Others");
    });
    $("#RJEditFeedbackPage").on("pageshow",function(){
        RJupdateTypesDropdown("#RJselectTypeModify","");
    });

    $("#RJViewFeedbackPage").on("pageshow",RJgetReviews);
    $("#RJEditFeedbackPage").on("pageshow",RJshowCurrentReview);
    $("#btnClearDatabase").click(RJclearDatabase);

    /*

     */
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