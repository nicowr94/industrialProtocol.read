export const getFunctionRead = (req, res) => {
  const tamanhoBloques = 4096;
  const { inputList } = req.body;

  //Para este caso se utilizará arreglos como estructura de datos ya que la maxima iteración es 4096 que es mucho menor que 10^8
  let segmentBytes = new Array(tamanhoBloques).fill(0);

  for (let i = 0; i < inputList.length; i++) {
    const start = inputList[i].start;
    const end = inputList[i].start + inputList[i].length;
    for (let j = start; j < end; j++) {
      segmentBytes[j] = 1;
    }
  }

  let indiceInicial = 0,
    indiceFinal = 0,
    listReq = [];

  for (let i = 0; i < segmentBytes.length; i++) {
    if (segmentBytes[i] === 1) {
      if (indiceInicial === 0) {
        indiceInicial = i;
      }
    } else {
      if (indiceInicial != 0) {
        indiceFinal = i - 1;
        listReq = [...listReq, [indiceInicial, indiceFinal]];
        indiceInicial = 0;
        indiceFinal = 0;
      }
    }

    //En caso de que el ultimo byte esté abierto se pondrá como fin del rango el ultimo indice del array
    if (i === segmentBytes.length - 1) {
      if (indiceInicial != 0) {
        indiceFinal = i; //segmentBytes.length
        listReq = [...listReq, [indiceInicial, indiceFinal]];
        indiceInicial = 0;
        indiceFinal = 0;
      }
    }
  }

  //Ejecutar la función con costo minimizando las llamadas

  const responseRead = listReq.map((item) => {
    return read(item[0], item[1] - item[0] + 1, myCallback);
  });

  //Transformar resultado de los read's
  let payloads = new Array(tamanhoBloques).fill(0);
  for (let i = 0; i < responseRead.length; i++) {
    const start = listReq[i][0];
    const end = listReq[i][1];
    let indice = 0;
    for (let j = start; j <= end; j++) {
      payloads[j] = responseRead[i][indice];
      indice++;
    }
  }

  //Obtener los payloads de los reads ingresados al inicio (input)
  let response = [];

  for (let i = 0; i < inputList.length; i++) {
    const start = inputList[i].start;
    const end = inputList[i].start + inputList[i].length;
    let payload = [];
    for (let j = start; j < end; j++) {
      payload = [...payload, payloads[j]];
    }

    response = [...response, payload];
  }

  console.log(responseRead);
  console.log(payloads);
  res.json(response);
};

const myCallback = (err = false, data, payload) => {
  //Simulando el callback de la función ya implementada industrialProtocol.read()
  const { start, length } = data;
  let response = [];
  for (let i = start; i < start + length; i++) {
    //supongamos que el dato almacenado en el byte sea 1 si el indice es par y -1 si el indice es impar
    if (i % 2 === 0) response = [...response, 1];
    else response = [...response, -1];
  }

  payload = response;
  if (err) return { msg: "Error en el callback" };
  else return payload;
};

const read = (start, length, callback) => {
  //Funcion implementada segun el enunciado del reto
  console.log("Costo por industrialProtocol.read()");
  return callback(null, { start, length });
};
