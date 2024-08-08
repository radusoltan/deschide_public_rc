import {Client} from "@elastic/elasticsearch";
import fs from "fs";

export const client = new Client({
  node: process.env.NEXT_PUBLIC_ELASTICSEARCH_HOST,
  auth: {
    apiKey: process.env.NEXT_PUBLIC_ELASTICSEARCH_KEY,
  },
  tls: {
    ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
})