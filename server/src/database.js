const mongoose = require('mongoose');

function connectDatabase() {
  if (this.connected) return;
  mongoose.connect('mongodb://localhost/ws-file-hub', {useNewUrlParser: true});
  const db = mongoose.connection;
  return new Promise((resolve, reject) => {
    db.on('error', (err) => {
      console.log('DB connect failed: ', err);
      this.connected = false;
      reject(err);
    });
    db.once('open', function () {
      // we're connected!
      console.log('DB connected');
      resolve();
    });
  });
}

connectDatabase.connected = false;

module.exports = {
  connectDatabase
};
