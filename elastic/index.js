const { Client } = require('@elastic/elasticsearch');
const elastic = new Client({ node: process.env.BONSAI_URL });

module.exports = elastic;
