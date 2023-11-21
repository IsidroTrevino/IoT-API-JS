import { createPool } from "mysql2/promise";

export const pool = createPool({
    host:  "192.168.0.16",
    user: "Admins",
    password: "Itrevino1212",
    port: 3306,
    database: "TC1004B"
});
