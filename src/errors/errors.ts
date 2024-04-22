export function emailAlreadyExistsError(message?: string) {
  return {
    type: 'application',
    code: 404,
    message: message || 'This email already exists!',
  };
}

export function emailNotExistsError(message?: string) {
  return {
    type: 'application',
    code: 404,
    message: message || 'This email not exist.',
  };
}

export function invalidPasswordError(message?: string) {
  return {
    type: 'application',
    code: 404,
    message: message || 'This email or password is not correct.',
  };
}

export function invalidToken(message?: string) {
  return {
    type: 'application',
    code: 409,
    message: message || 'This token is invalid.',
  };
}

export function userIdNotExist(message?: string) {
  return {
    type: 'application',
    code: 409,
    message: message || 'UserId does not exist',
  };
}

export function invalidDataError(message?: string) {
  return {
    type: 'application',
    code: 409,
    message: message || 'This id does not exist.',
  };
}

export function notFoundProfileError(message?: string) {
  return {
    type: 'application',
    code: 409,
    message: message || 'Could not find the Profile.',
  };
}

export function invalidPostError(message?: string) {
  return {
    type: 'application',
    code: 409,
    message: message || 'This postId does not exist.',
  };
}

export function actualPasswordError(message?: string) {
  return {
    type: 'application',
    code: 404,
    message: message || 'This is not your actual password.',
  };
}

export function unaunthorizedError(message?: string) {
  return {
    type: 'application',
    code: 404,
    message: message || 'Unaunthorized',
  };
}
