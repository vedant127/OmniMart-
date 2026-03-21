

export const createuser = async() => {

// create the data in a database

//handle database errpr and provide a meaningful error message 
    return{user : {
        id : 1,
        name : "john doe",
        email : "test@test.com",
    }};
}

export const getalluser = async() => {
    return {user : {
        id : 1,
        name : "john doe",
        email : "test@test.com" , 
      }
   };
};

export const getuserbyid = async() => {
    return {user : {
        id : 1,
        name : "john doe",
        email : "test@test.com" , 
      }
    };
};

export const updateuser = async() => {
        return {user : {
        id : 1,
        name : "john doe",
        email : "test@test.com" , 
      }
    };
};

export const deleteuser = async() => {
        return {user : {
        id : 1,
        name : "john doe",
        email : "test@test.com" , 
      }
    };
};

export const findUserByEmail = async (email) => {
  return {
    user: {
      id: 1,
      name: "John Doe",
      email: email,
      password: "[PASSWORD]",
    },
  };
};
