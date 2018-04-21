var db;

/**
 * General purpose error handler
 * @param tx The transaction object
 * @param error The error object
 */
function errorHandler(tx, error) {
    console.error(error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "Movie database";
        var version = "1.0";
        var displayName = "Database for movies";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database creation successful");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        function txFunction(tx) {
            var options = [];
            var sql = "CREATE TABLE IF NOT EXISTS user( "+
                    "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                    "userName VARCHAR(30) NOT NULL UNIQUE,"+
                    "emailAddress VARCHAR(30) NOT NULL UNIQUE," +
                    "phoneNumber VARCHAR(14));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS review( " +
                    "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                    "movieId INTEGER NOT NULL,"+
                    "reviewerId INTEGER NOT NULL," +
                    "reviewerComments TEXT," +
                    "recommend VARCHAR(1)," +
                    "rating INTEGER," +
                    "reviewDate DATE," +
                    "FOREIGN KEY(reviewerId) REFERENCES user(id));";

            function successCreate() {
                console.info("Success: Tables created successfully");
            }
            tx.executeSql(sql, options, successCreate, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Create table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },
    dropTables: function () {
        function txFunction(tx) {
            var options = [];
            var sql = "DROP TABLE IF EXISTS review;";
            tx.executeSql(sql, options, successDrop, errorHandler);
            sql="DROP TABLE IF EXISTS user";
            tx.executeSql(sql, options, successDrop, errorHandler);

            function successDrop() {
                console.info("Success: Tables dropped successfully");
            }
        }

        function successTransaction() {
            alert("Database dropped successfully!");
            console.info("Success: Drop table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


















