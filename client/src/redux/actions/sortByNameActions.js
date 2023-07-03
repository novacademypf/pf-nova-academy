import { SORT_BY_NAME } from "../action-type/action-types";

export function sortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload
    }
}