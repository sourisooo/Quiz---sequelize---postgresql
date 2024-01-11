const { Client } = require("pg");
const fs = require('fs');

async function initdb() {

const client = new Client('postgresql://postgres:random@localhost/quizoclock');

await client.connect();

const sqlFileContent = fs.readFileSync('./create_tables.sql', 'utf8');
const result = await client.query(sqlFileContent)

const sqlFileContent2 = fs.readFileSync('./populate_tables.sql', 'utf8');
const result2 = await client.query(sqlFileContent2)


await client.end();

console.log(result.rows, result2.rows);

;}

console.log("read done");
initdb();

