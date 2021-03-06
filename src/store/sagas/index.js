/** @format */

import { takeEvery, all } from 'redux-saga/effects';

import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga,
} from 'store/sagas/auth';
import { initIngredientsSaga } from 'store/sagas/builderBurger';
import { purchaseBurgerSaga, fetchOrdersSaga } from 'store/sagas/order';
import * as actionTypes from 'store/constans/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield all([
        takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
        takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
    ]);
}
