import * as userrepositories from "../repositories/user.repositories.js";

export const createuser = async(userdata) => {
   //store the data in the database
   const response = await userrepositories.createuser(userdata);
    return{};
}

export const getalluser = async() => {
    const response = await userrepositories.getalluser();
    return response;
}

export const getuserbyid = async(userid) => {
    const response = await userrepositories.getuserbyid(userid);
    return response;
};

export const updateuser = async(userid , userdata) => {
    const response = await userrepositories.updateuser(userid , userdata);
    return response;
};

export const deleteuser = async(userid) => {
    const response = await userrepositories.deleteuser(userid);
    return response;
};

export const userlogin = async(email) => {
    const user = await userrepositories.finduserbyemail(email);
    return user;
}