export const LoginStart = (userCredencials) =>  ({
    type: 'LOGIN_START',
});

export const LoginSuccess = (user) =>  ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const LoginFailure = () =>  ({
    type: 'LOGIN_FAILURE',
});

export const Logout = () =>  ({
    type: 'LOGOUT',
});

export const updateStart = (userCredencials) =>  ({
    type: 'UPDATE_START',
});

export const updateSuccess = (user) =>  ({
    type: 'UPDATE_SUCCESS',
    payload: user,
});

export const updateFailure = () =>  ({
    type: 'UPDATE_FAILURE',
});

