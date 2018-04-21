function updateUserNameDropdown(selectElement){
    var options = [];
    function callback(tx,results){
        $(selectElement).html("");
        $.each(results.rows,function(index,row){
            $(selectElement).append($('<option>', {
                value:row['id'],
                text:row['userName']
            }));
        });
        $(selectElement).selectmenu("refresh");
    }
    User.selectAll(options,callback);
};

function addMovieReview(e){
    e.preventDefault();
    if (doValidate_frmAddMovieReview()) {
        var movieId = JSON.parse(localStorage.getItem("movie")).imdbID;
        var reviewerId = $("#selectReviewerUserName").val();
        var reviewerComments = $("#txtReviewerComments").val();
        var rating = $("#txtMovieRating").val();
        var recommend = $("#checkboxRecommend").prop("checked");
        var reviewDate = new Date().toISOString().substring(0,10);
        var options = [movieId,reviewerId,reviewerComments,recommend,rating,reviewDate];
        function callback(){
            console.info("Success: record inserted successfully");
            $.mobile.navigate("#MovieDetailPage")
        }
        Review.insert(options,callback);
    } else {
        console.error("Add Review validation failed");
    }
};

function addUser(){
    if(doValidate_frmUserRegistration()){
        var userName = $("#txtUserName").val();
        var emailAddress =$("#txtEmailAddress").val();
        var phoneNumber = $("#txtPhoneNumber").val();
        var options = [userName,emailAddress,phoneNumber];
        function callback(){
            console.info("Success: record inserted successfully");
        }
        User.insert(options,callback);
    } else {
        console.error("Add user validation failed");
    }
}

function getReviews(){
    var movie = JSON.parse(localStorage.getItem("movie"));
    var movieId = movie.imdbID;
    var options = [movieId];
    function callback(tx,results){
        $("#viewMovieReviewTitle").html(movie.Title);
        $("#viewMovieReviewPoster").attr("src",movie.Poster);
        $("#movieRatingsList").html("");
        $.each(results.rows,function(index,row){
            var html ="";
            var userOptions = [row['reviewerId']];
            User.select(userOptions,function(userTx,userResults){
                var userRow = userResults.rows.item(0);
                html+="<h3>Reviewer username: "+userRow['userName']+"</h3>";
            });
            html+= "<p>Review date: "+row['reviewDate']+"</p>"+
                "<p>User recommended:"+ (row['recommend']=="true" ? "Yes" : "No")+"</p>" +
                "<p>Rating: "+row['rating']+"</p>" +
                "<p>Comments: "+row['reviewerComments']+"</p>";
            $("#movieRatingsList").append($('<li>',{
                'data-icon':false
            }).append($('<a>',{
                href:"#ModifyMovieReviewPage",
                'data-review-id':row['id']
            }).on("click",function(){
                localStorage.setItem("modifyReviewId",$(this).attr('data-review-id'));
            }).html(html)));
        });
        $("#movieRatingsList").listview("refresh");
    }
    Review.selectByMovieId(options,callback);
}

function showCurrentReview (){
    var id = localStorage.getItem("modifyReviewId");
    var options=[id];
    function callback(tx,results){
        var row = results.rows.item(0);
        $("#selectReviewerUserNameModify").val(row['reviewerId']);
        $("#selectReviewerUserNameModify").selectmenu("refresh");
        $("#txtReviewerCommentsModify").val(row['reviewerComments']);
        $("#txtMovieRatingModify").val(row['rating']);
        if($("#checkboxRecommendModify").val(row['recommend'])=="true"){
            $("#checkboxRecommendModify").checkboxradio('enable');
        }
    }
    Review.select(options,callback);
};

function updateMovieReview(e){
    e.preventDefault();
    if(doValidate_frmModifyMovieReview()) {
        var id = localStorage.getItem("modifyReviewId");
        var recommend = Boolean($("#checkboxRecommendModify").prop("checked"))? true: false
        var reviewerId = $("#selectReviewerUserNameModify").val();
        var reviewerComments = $("#txtReviewerCommentsModify").val();
        var rating = $("#txtMovieRatingModify").val();
        var options = [reviewerId, reviewerComments, recommend, rating,id];
        function callback() {
            console.info("Review updated successfully");
            $.mobile.navigate("#ViewMovieReviewPage");
        }
        Review.update(options, callback);
    } else {
        console.error("Review update validation failed");
    }
};

function deleteMovieReview(){
    var id = localStorage.getItem("modifyReviewId");
    var options=[id];
    function callback(){
        console.info("Review deleted successfully");
        $.mobile.navigate("#ViewMovieReviewPage");
    }
    Review.delete(options,callback);
};

function clearDatabase(){
    DB.dropTables();
}