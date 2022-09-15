import 'dotenv/config' 

let db_credentials = {
    host: process.env.DB_HOST,
    port: 2022,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}
export default db_credentials;