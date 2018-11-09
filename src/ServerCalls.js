function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.status;
  error.statusText = response.statusText;
  error.response = response;
  console.log("Error in status");
  throw error;
}

function getURL(url){
  var backendUrl;
  if(process.env.NODE_ENV === 'development'){
    // When in development, the url will be proxied to backend set up in package.json
    backendUrl = url;
  }
  return backendUrl;
}

function postCall(url, objectBody, cb) {
  return fetch(getURL(url), {
    method: "POST",
    accept: '*/*',
    headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
    body: JSON.stringify(objectBody)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getCall(url, method, cb) {
  return fetch(getURL(url), {
    method: 'GET',
    accept: '*/*',
    headers: {
          'Content-Type': 'application/json',
        },
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function sendTicTacToeMove(move ,cb){
  postCall("/api/tictactoe/move", move, cb)
}

function predictNumber(numberArray, cb){
  postCall("/api/preditction/predictNumber", numberArray, cb)
}

function createUser(user, cb){
  postCall("/api/user/", user, cb)
}

function login(objectBody, cb){
  postCall("/api/user/login", objectBody, cb)
}


const ServerCalls = { sendTicTacToeMove, predictNumber, createUser, login };
export default ServerCalls;
