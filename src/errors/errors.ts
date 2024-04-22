export function emailAlreadyExistsError(message?: string) {
    return {
        type: 'application',
        code: 409,
        message: message || 'This email is already registered.',
    };
}

export function emailNotExistsError(message?: string) {
    return {
        type: 'application',
        code: 404,
        message: message || 'This email is not registered.',
    };
}

export function invalidPasswordError(message?: string) {
    return {
        type: 'application',
        code: 401,
        message: message || 'Invalid password.',
    };
}

export function invalidTokenError(message?: string) {
    return {
        type: 'application',
        code: 401,
        message: message || 'Invalid token.',
    };
}

export function userIdNotFoundError(message?: string) {
    return {
        type: 'application',
        code: 404,
        message: message || 'User ID not found.',
    };
}

export function invalidDataError(message?: string) {
    return {
        type: 'application',
        code: 400,
        message: message || 'Invalid data.',
    };
}

export function profileNotFoundError(message?: string) {
    return {
        type: 'application',
        code: 404,
        message: message || 'Profile not found.',
    };
}

export function invalidPostError(message?: string) {
    return {
        type: 'application',
        code: 404,
        message: message || 'Invalid post ID.',
    };
}

export function actualPasswordError(message?: string) {
    return {
        type: 'application',
        code: 401,
        message: message || 'Incorrect actual password.',
    };
}

export function unauthorizedError(message?: string) {
    return {
        type: 'application',
        code: 401,
        message: message || 'Unauthorized.',
    };
}
