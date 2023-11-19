import { createPool } from "mysql2/promise";

export const pool = createPool({
    host:  "localhost",
    user: "root",
    password: "Itrevino1212",
    port: 3306,
    database: "TC1004B"
});
