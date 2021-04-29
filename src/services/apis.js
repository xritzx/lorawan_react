const environment = process.env.NODE_ENV;
const apis = {
    BASE_LOCAL_URL: environment === "development" ? "http://localhost:3000" : "",
    BASE_SERVER_URL: environment === "development" ? "http://localhost:3000" : "",

};

export default apis;