
export const ONBOARD_USER_START = "ONBOARD_USER_START"; // set onboard to true
export const ONBOARD_USER_SUCCESS = "ONBOARD_USER_SUCCESS";



export const UPDATE_USERS_LIST = "UPDATE_USERS_LIST";
export const UPDATE_BULLETIN = "UPDATE_BULLETIN";
export const UPDATE_PARTS_LIST = "UPDATE_PARTS_LIST";
export const UPDATE_TAGS_LIST = "UPDATE_TAGS_LIST";
export const UPDATE_BAGS_LIST = "UPDATE_BAGS_LIST";

export function updatePartsList(parts) {

    return {
        type: UPDATE_PARTS_LIST,
        parts
    }
}


export function updateBulletinList(bulletin) {
    return {
        type: UPDATE_BULLETIN,
        bulletin
    }
}

export function updateUsersList(users){
    return {
        type: UPDATE_USERS_LIST,
        users
    }
}

export function updateBagsList(bags){
    return {
        type: UPDATE_BAGS_LIST,
        bags
    }
}

export function updateTagsList(tags){
    return {
        type: UPDATE_TAGS_LIST,
        tags
    }
}


export function setNewTag(uid){
    return {

    }
}

export function assignBag(uid, bagId){

    return {
        
    }
}


