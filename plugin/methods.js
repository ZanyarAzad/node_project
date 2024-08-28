class ReUsableMethods {
  prismaCatch(err) {
    console.log(err);
    switch (err.code) {
      case "P2025":
        return {
          status: 404,
          message: "recorde not found",
        };
        break;
      case "P2000":
        return {
          status: 500,
          message: "Database connection error",
        };
        break;
      case "P2002":
        return {
          status: 500,
          message: "This Data is already exist",
        };
        break;
      case "P2003":
        return {
          status: 500,
          message: "Foreign key error",
        };
        break;
      case "P2006":
        return {
          status: 500,
          message: "Column constraint error",
        };
        break;
      case "P2011":
        return {
          status: 500,
          message: "Datasource does not exist",
        };
        break;
      default:
        return {
          status: 500,
          message: "Unhandled error: " + err.message,
        };
        break;
    }
  }
}
module.exports = new ReUsableMethods();
