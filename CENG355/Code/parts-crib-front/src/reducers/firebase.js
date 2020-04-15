import {
    UPDATE_BULLETIN,
    UPDATE_PARTS_LIST,
    UPDATE_USERS_LIST,
    UPDATE_TAGS_LIST,
    UPDATE_BAGS_LIST,
    ONBOARD_USER_START,
  } from "../actions/firebase";

const initialState = {

    users: null,
    parts: null,
    bulletin: null,
    tags: null,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERS_LIST:
            return {
                ...state,
                users: Object.values(action.users),
            }
            
        case UPDATE_BULLETIN:
          return {
            ...state,
            bulletin: Object.values(action.bulletin)
          };
        case UPDATE_PARTS_LIST:
          return {
            ...state,
            parts: action.parts
          };
        case UPDATE_TAGS_LIST:
          return {
            ...state,
            parts: action.tags
          };
        case UPDATE_BAGS_LIST:
          return {
            ...state,
            bags: action.bags
          }
        default:
          return state;
      }
}