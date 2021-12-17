/* eslint-disable */
function getStorage() {
  const obj = {};

  if (storage === undefined) {
    return;
  }

  const specialKeys = [
    'length',
    'key',
    'getItem',
    'setItem',
    'removeItem',
    'clear',
  ];

  for (var i in storage) {
    if (storage.hasOwnProperty(i)) {
      obj[i] = storage.getItem(i);
    }
  }

  let item;
  for (var i in specialKeys) {
    item = storage.getItem(specialKeys[i]);
    if (item !== null) {
      obj[specialKeys[i]] = item;
    }
  }

  return obj;
}

var storage = msg.type === 'L' ? localStorage : sessionStorage;
let result;

switch (msg.what) {
  case 'get':
    result = getStorage();
    console.table(result);
    break;

  case 'remove':
    storage.removeItem(msg.key);
    break;

  case 'set':
    // changing key?
    if (msg.oldKey !== undefined) {
      storage.removeItem(msg.oldKey);
    }

    storage.setItem(msg.key, msg.value);
    break;

  case 'clear':
    storage.clear();
    break;

  case 'export':
    result = JSON.stringify(getStorage(), null, 4);
    break;

  case 'import':
    try {
      const obj = JSON.parse(msg.json);
      for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
          storage.setItem(i, obj[i]);
        }
      }
    } catch (e) {}
    break;
}

result;
