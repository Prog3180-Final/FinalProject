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
    Type.RJselectAll(options,callback);
};

function RJaddFeedback(){
    if (doValidate_RJfrmAddFeedback()) {
        var businessName = $("#RJtxtBusinessNameAdd").val();
        var typeId = $("#RJselectTypeAdd").val();
        var reviewerEmail = $("#RJtxtReviewerEmailAdd").val();
        var reviewerComments = $("#RJtxtReviewerCommentsAdd").val();
        var reviewDate = $("#RJtxtReviewDateAdd").val();
        var hasRating = false;
        var rating1 = 0;
        var rating2 = 0;
        var rating3 = 0;
        if ($("#RJcheckboxAddRatings").prop("checked") == true) {
            hasRating = true;
            rating1 = $("#RJtxtFoodQualityRatingAdd").val();
            rating2 = $("#RJtxtServiceRatingAdd").val();
            rating3 = $("#RJtxtValueRatingAdd").val();
        }
        var options = [businessName, typeId, reviewerEmail, reviewerComments,reviewDate,hasRating, rating1, rating2, rating3];
        function callback(){
            console.info("Success: record inserted successfully");
        }
        Review.RJinsert(options,callback);
    } else {
        console.error("Add Review validation failed");
    }
};

function RJgetReviews(){
    var options = [];
    function callback(tx,results){
        $("#RJFeedbackList").html("");
        $.each(results.rows,function(index,row){
            var overallRating = Boolean(row['hasRating']) ? (row['rating1'] + row['rating2'] + row['rating3']) : 0;
            var html = "<h3>Business Name: "+row['businessName']+"</h3>"+
                "<p>Reviewer Email: "+row['reviewerEmail']+"</p>"+
                "<p>Comments: "+row['reviewerComments']+"</p>"+
                "<p>Overall Rating: "+overallRating+"</p>";

            $("#RJFeedbackList").append($('<li>',{
                'data-icon':false
            }).append($('<a>',{
                href:"#RJEditFeedbackPage",
                'data-row-id':row['id']
            }).on("click",function(){
                localStorage.setItem("modifyReviewId",$(this).attr('data-row-id'));
            }).html(html)));
        });
        $("#RJFeedbackList").listview("refresh");
    }
    Review.RJselectAll(options,callback);
}

function RJshowCurrentReview (){
    var reviewId = localStorage.getItem("modifyReviewId");
    var options=[reviewId];
    function callback(tx,results){
        var row = results.rows.item(0);
        $("#RJtxtBusinessNameModify").val(row['businessName']);
        $("#RJselectTypeModify").val(row['typeId']);
        $("#RJselectTypeModify").selectmenu("refresh");
        $("#RJtxtReviewerEmailModify").val(row['reviewerEmail']);
        $("#RJtxtReviewerCommentsModify").val(row['reviewerComments']);
        $("#RJtxtReviewDateModify").val(row['reviewDate']);
        if (Boolean(row['hasRating'])) {
            $("#RJcheckboxModifyRatings").checkboxradio('enable');
            $("#RJtxtFoodQualityRatingModify").val(row['rating1']);
            $("#RJtxtServiceRatingModify").val(row['rating2']);
            $("#RJtxtValueRatingModify").val(row['rating3']);
            $("#RJtxtOverallRatingsModify").val(row['rating1']+row['rating2']+row['rating3']);
        }
    }
    Review.RJselect(options,callback);
};

function RJupdateFeedback(){
    if(doValidate_RJfrmModifyFeedback()) {
        var id = localStorage.getItem("modifyReviewId");
        var hasRating = false;
        var rating1 = 0;
        var rating2 = 0;
        var rating3 = 0;
        var businessName = $("#RJtxtBusinessNameModify").val();
        var typeId = $("#RJselectTypeModify").val();
        var reviewerEmail = $("#RJtxtReviewerEmailModify").val();
        var reviewerComments = $("#RJtxtReviewerCommentsModify").val();
        var reviewDate = $("#RJtxtReviewDateModify").val();
        if ($("#RJcheckboxModifyRatings").prop("checked") == true) {
            hasRating = true;
            rating1 = $("#RJtxtFoodQualityRatingModify").val();
            rating2 = $("#RJtxtServiceRatingModify").val();
            rating3 = $("#RJtxtValueRatingModify").val();
        }

        var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3,id];

        function callback() {
            console.info("Review updated successfully");
            $.mobile.navigate("#RJViewFeedbackPage");
        }

        Review.RJupdate(options, callback);
    } else {
        console.error("Review update validation failed");
    }
};

function RJdeleteFeedback(){
    var id = localStorage.getItem("modifyReviewId");
    var options=[id];
    function callback(){
        console.info("Review deleted successfully");
        $.mobile.navigate("#RJViewFeedbackPage");
    }
    Review.RJdelete(options,callback);
};

function RJclearDatabase(){
    DB.dropTables();
}