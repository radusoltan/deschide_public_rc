import {Client} from "@elastic/elasticsearch";
import fs from "fs";

export const client = new Client({
  node: process.env.ELASTIC_HOST,
  auth: {
    apiKey: process.env.ELASTIC_API_KEY,
  },
  tls: {
    ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
})