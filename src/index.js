#!/usr/bin/env node

const commands = require('./commands')
const { connectDB } = require('./db')

async function main() {
    await connectDB();
};

main();