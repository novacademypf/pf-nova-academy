import { FILTER_BY_PRICE } from "../action-type/action-types"

export function filterByPrice(score) {
    return {
        type: FILTER_BY_PRICE,
        payload: price
    }
};