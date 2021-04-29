const environment = process.env.NODE_ENV;
const apis = {
    BASE_LOCAL_URL: environment === "development" ? "http://localhost:3000" : "http://3.17.139.144:3000",
    BASE_SERVER_URL: "http://3.17.139.144:3000",

};

export default apis;