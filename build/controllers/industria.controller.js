"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFunctionRead = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getFunctionRead = function getFunctionRead(req, res) {
  var tamanhoBloques = 4096;
  var inputList = req.body.inputList; //Para este caso se utilizará arreglos como estructura de datos ya que la maxima iteración es 4096 que es mucho menor que 10^8

  var segmentBytes = new Array(tamanhoBloques).fill(0);

  for (var i = 0; i < inputList.length; i++) {
    var start = inputList[i].start;
    var end = inputList[i].start + inputList[i].length;

    for (var j = start; j < end; j++) {
      segmentBytes[j] = 1;
    }
  }

  var indiceInicial = 0,
      indiceFinal = 0,
      listReq = [];

  for (var _i = 0; _i < segmentBytes.length; _i++) {
    if (segmentBytes[_i] === 1) {
      if (indiceInicial === 0) {
        indiceInicial = _i;
      }
    } else {
      if (indiceInicial != 0) {
        indiceFinal = _i - 1;
        listReq = [].concat(_toConsumableArray(listReq), [[indiceInicial, indiceFinal]]);
        indiceInicial = 0;
        indiceFinal = 0;
      }
    } //En caso de que el ultimo byte esté abierto se pondrá como fin del rango el ultimo indice del array


    if (_i === segmentBytes.length - 1) {
      if (indiceInicial != 0) {
        indiceFinal = _i; //segmentBytes.length

        listReq = [].concat(_toConsumableArray(listReq), [[indiceInicial, indiceFinal]]);
        indiceInicial = 0;
        indiceFinal = 0;
      }
    }
  } //Ejecutar la función con costo minimizando las llamadas


  var responseRead = listReq.map(function (item) {
    return read(item[0], item[1] - item[0] + 1, myCallback);
  }); //Transformar resultado de los read's

  var payloads = new Array(tamanhoBloques).fill(0);

  for (var _i2 = 0; _i2 < responseRead.length; _i2++) {
    var _start = listReq[_i2][0];
    var _end = listReq[_i2][1];
    var indice = 0;

    for (var _j = _start; _j <= _end; _j++) {
      payloads[_j] = responseRead[_i2][indice];
      indice++;
    }
  } //Obtener los payloads de los reads ingresados al inicio (input)


  var response = [];

  for (var _i3 = 0; _i3 < inputList.length; _i3++) {
    var _start2 = inputList[_i3].start;

    var _end2 = inputList[_i3].start + inputList[_i3].length;

    var payload = [];

    for (var _j2 = _start2; _j2 < _end2; _j2++) {
      payload = [].concat(_toConsumableArray(payload), [payloads[_j2]]);
    }

    response = [].concat(_toConsumableArray(response), [payload]);
  }

  console.log(responseRead);
  console.log(payloads);
  res.json(response);
};

exports.getFunctionRead = getFunctionRead;

var myCallback = function myCallback() {
  var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var data = arguments.length > 1 ? arguments[1] : undefined;
  var payload = arguments.length > 2 ? arguments[2] : undefined;
  //Simulando el callback de la función ya implementada industrialProtocol.read()
  var start = data.start,
      length = data.length;
  var response = [];

  for (var i = start; i < start + length; i++) {
    //supongamos que el dato almacenado en el byte sea 1 si el indice es par y -1 si el indice es impar
    if (i % 2 === 0) response = [].concat(_toConsumableArray(response), [1]);else response = [].concat(_toConsumableArray(response), [-1]);
  }

  payload = response;
  if (err) return {
    msg: "Error en el callback"
  };else return payload;
};

var read = function read(start, length, callback) {
  //Funcion implementada segun el enunciado del reto
  console.log("Costo por industrialProtocol.read()");
  return callback(null, {
    start: start,
    length: length
  });
};