function doValidate_RJfrmAddFeedback() {
    var form = $("#RJfrmAddFeedback");
    form.validate({
        rules: {
            RJtxtBusinessNameAdd: {
                required: true,
                rangelength: [2, 20]
            },
            RJtxtReviewerEmailAdd: {
                required: true,
                email:true,
            },
            RJtxtReviewDateAdd: {
                required: true
            },
            RJtxtFoodQualityRatingAdd: {
                required: "#RJcheckboxAddRatings:checked",
                range:[0,5]
            },
            RJtxtServiceRatingAdd: {
                required: "#RJcheckboxAddRatings:checked",
                range:[0,5]
            },
            RJtxtValueRatingAdd: {
                required: "#RJcheckboxAddRatings:checked",
                range:[0,5]
            }

        },
        messages: {
            RJtxtBusinessNameAdd: {
                required: "Business name is required",
                rangelength: "Business name must be between 2 and 20 characters"
            },
            RJtxtReviewerEmailAdd: {
                required: "Reviewer email is required",
                emailcheck: "Email format is not correct"
            },
            RJtxtReviewDateAdd: {
                required: "Review date is required"
            },
            RJtxtFoodQualityRatingAdd: {
                required: "Food quality rating is required",
                range:"Value must be between 0 and 5"
            },
            RJtxtServiceRatingAdd: {
                required: "Service rating is required",
                range:"Value must be between 0 and 5"
            },
            RJtxtValueRatingAdd: {
                required: "Value rating is required",
                range:"Value must be between 0 and 5"
            }
        }
    });
    return form.valid();
}

function doValidate_RJfrmModifyFeedback() {
    var form = $("#RJfrmModifyFeedback");
    form.validate({
        rules: {
            RJtxtBusinessNameModify: {
                required: true,
                rangelength: [2, 20]
            },
            RJtxtReviewerEmailModify: {
                required: true,
                email:true,
            },
            RJtxtReviewDateModify: {
                required: true
            },
            RJtxtFoodQualityRatingModify: {
                required: "#RJcheckboxModifyRatings:checked",
                range:[0,5]
            },
            RJtxtServiceRatingModify: {
                required: "#RJcheckboxModifyRatings:checked",
                range:[0,5]
            },
            RJtxtValueRatingModify: {
                required: "#RJcheckboxModifyRatings:checked",
                range:[0,5]
            }

        },
        messages: {
            RJtxtBusinessNameModify: {
                required: "Business name is required",
                rangelength: "Business name must be between 2 and 20 characters"
            },
            RJtxtReviewerEmailModify: {
                required: "Reviewer email is required",
                email: "Email format is not correct"
            },
            RJtxtReviewDateModify: {
                required: "Review date is required"
            },
            RJtxtFoodQualityRatingModify: {
                required: "Food quality rating is required",
                range:"Value must be between 0 and 5"
            },
            RJtxtServiceRatingModify: {
                required: "Service rating is required",
                range:"Value must be between 0 and 5"
            },
            RJtxtValueRatingModify: {
                required: "Value rating is required",
                range:"Value must be between 0 and 5"
            }
        }
    });
    return form.valid();
}

