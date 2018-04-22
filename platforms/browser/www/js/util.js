function doValidate_frmAddMovieReview() {
    var form = $("#frmAddMovieReview");
    form.validate({
        rules: {
            selectReviewerUserName: {
                required: true,
            },
            txtReviewerComments: {
                required: true,
            },
            txtMovieRating: {
                required: true,
                range:[0,5]
            }
        },
        messages: {
            selectReviewerUserName: {
                required: "Reviewer is required"
            },
            txtReviewerComments: {
                required: "Reviewer comments are required"
            },
            txtMovieRating: {
                required: "Movie rating is required",
                range: "Movie rating must be between 0-5"
            }
        }
    });
    return form.valid();
}

function doValidate_frmModifyMovieReview() {
    var form = $("#frmModifyMovieReview");
    form.validate({
        rules: {
            selectReviewerUserNameModify: {
                required: true,
            },
            txtReviewerCommentsModify: {
                required: true,
            },
            txtMovieRatingModify: {
                required: true,
                range:[0,5]
            }
        },
        messages: {
            selectReviewerUserNameModify: {
                required: "Reviewer is required"
            },
            txtReviewerCommentsModify: {
                required: "Reviewer comments are required"
            },
            txtMovieRatingModify: {
                required: "Movie rating is required",
                range: "Movie rating must be between 0-5"
            }
        }
    });
    return form.valid();
}

function doValidate_frmUserRegistration() {
    var form = $("#frmUserRegistration");
    form.validate({
        rules: {
            txtUserName: {
                required: true,
                rangelength: [2, 20]
            },
            txtEmailAddress: {
                required: true,
                email:true,
            },
            txtPhoneNumber: {
                required:false,
                phonenumber:true
            },

        },
        messages: {
            txtUserName: {
                required: "Business name is required",
                rangelength: "Business name must be between 2 and 20 characters"
            },
            txtEmailAddress: {
                required: "Reviewer email is required",
                email: "Email format is not correct"
            },
            txtPhoneNumber: {
                required: "Review date is required"
            }
        }
    });
    return form.valid();
}


jQuery.validator.addMethod("phonenumber",
    function(value,element){
        var regex = /^[(]?[0-9]{3}[(-]?[0-9]{3}[-]?[0-9]{4}$/;
        return this.optional(element) || regex.test(value);
    },
    "Valid phone numbers");

