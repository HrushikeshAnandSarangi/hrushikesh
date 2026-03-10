const mongoose = require('mongoose');

async function test() {
  try {
    const uri = 'mongodb+srv://hrushi:252525@cluster0.8v4bowf.mongodb.net/?appName=Cluster0';
    console.log('Connecting with Node...');
    await mongoose.connect(uri);
    console.log('Success Node connect');
    process.exit(0);
  } catch (e) {
    console.error('Failed Node connect', e);
    process.exit(1);
  }
}
test();
