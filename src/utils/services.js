import { setToStorage } from '../utils/storage';

export function getScreenings() {
  return fetch('/screenings').then(handleError);
}

export function getSingleScreening(id) {
  return fetch('/screenings/' + id).then(handleError);
}

export function postScreening(data, token) {
  return fetch('/screenings', {
    method: 'POST',
    body: data,
    headers: {
      'auth-token': token
    }
  }).then(handleError);
}

export function postLoginUser(data) {
  return fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(handleLogin);
}

export function getUser(token) {
  return fetch('/users/verify', { headers: { 'auth-token': token } }).then(
    handleError
  );
}

function handleError(res) {
  let json = res.json();
  if (!res.ok) {
    return json.then(err => {
      throw err;
    });
  }
  return json;
}

function handleLogin(res) {
  let json = res.json();
  if (!res.ok) {
    return json.then(err => {
      throw err;
    });
  }
  setToStorage('rineuto-token', res.headers.get('auth-token'));
  return json;
}
