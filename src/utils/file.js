const getBase64 = function (file) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = '';
    reader.readAsDataURL(file);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
}

export default {
  getBase64
}
