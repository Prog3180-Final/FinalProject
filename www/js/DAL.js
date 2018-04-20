/**
 * File Name: DAL.js
 *
 * Revision History:
 *       Rawa Jalal & Steven Ye, 2018-04-19 : Created
 */

var Review = {
    insert: function(options, callback){
        function txFunction(tx) {
            var sql = "INSERT INTO review(movieId,reviewerId,reviewerComments,recommend,rating,reviewDate) VALUES (?,?,?,?,?,?);"

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select all transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options, callback){
        function txFunction(tx) {
            var sql = "UPDATE review SET movieId=?,reviewerId=?, reviewerComments=?, recommend=?, rating=?,reviewDate=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            alert("Review updated successfully!");
            console.info("Success: update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options, callback){
        function txFunction(tx) {
            var sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            alert("Review deleted successfully!");
            console.info("Success: delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var User = {
    insert : function(options,callback){
        function txFunction(tx) {
            var sql = "INSERT INTO user(userName,emailAddress,phoneNumber) VALUES (?,?,?);"

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            alert("User successfully added!");
            console.info("Success: insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options,callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll : function(options,callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM user;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: select all transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
}