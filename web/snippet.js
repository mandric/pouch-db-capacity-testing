(function(adapter) {
var db, destroy;
var initDB = function(adapter) {
  db = adapter ?
    new PouchDB('test-db-capacity', { adapter:adapter }) :
    new PouchDB('test-db-capacity');
};
var uuid = function() {
  // from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
  return uuid;
};
var randomString = function(length) {
  var s = '', add;
  while(length > 0) {
    add = Math.random().toString(36)
        .substring(2, 2+Math.min(10, length));
    length -= add.length;
    s += add;
  }
  return s;
};
var addRandomDoc = function(len, successCallback) {
  console.log('addRandomDoc');
  var doc = { content:randomString(len), _id:uuid() };
  var start_time = Date.now();
  db.put(doc, function(err, res) {
    if (err) {
      return console.error('put', err);
    }
    console.log('Put doc of length ' + len, res);
    if (successCallback) {
      successCallback();
    }
  });
};
var addMultiple = function(count, size) {
  var addForever = function() {
    console.log('addForever', size);
    addRandomDoc(size || 100, addForever);
  };
  if (count == -1) {
    console.log('exhausting storage...');
    addForever();
  } else {
    while(count-- > 0) addRandomDoc(size || 100);
  }
};
initDB(adapter);
if (destroy) {
  db.destroy().then(function() {
    initDB(adapter);
    addMultiple(-1, 2000000);
    //addMultiple(100, 100000);
  });
} else {
  addMultiple(-1, 2000000);
}
}());
