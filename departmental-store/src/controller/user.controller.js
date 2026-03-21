import * as userservices from "../services/user.services.js";
export const createuser = async (request, reply) => {
  const { name, email, password } = request.body;



  // Validate request body
  // Simulate user creation logic  
  const newUser = {
    name,
    email,
    password
  };

  // Perform some business logic 
  // Store the data in database

const responseData = await userservices.createuser(newUser);

if (!responseData) {
  return reply.status(201).send(responseData); // success response
} else {
  return reply.status(500).send("Internal Server Error"); // handle error
}

}

export const getalluser = async (request , reply) => {
  const result = await userservices.getalluser();
  if (result) {
    return reply.status(200).send(result);
  } else{
    return reply.status(500).send("internal server errror");
  }
};

export const getuserbyid = async (request , reply) => {
  const {userid} = request.params;
  const result = await userservices.getuserbyid(userid);
  if (result) {
    return replay.status(200).send(result);
  } else {
    return reply.status(500).send("internal server error");
  }
}
  

export const updateuser = async (Request , replay) => {
  const {userid} = request.params;
  const {name ,email , password } = request.body;

  const updateuser = {
    id : userid,
    name,
    email,
    password,
  };
   
  const result = await userservices.updateuser(userid , updateuser);
  if (result) {
    return replay.status(200).send(result);
  } else {
    return reply.status(500).send("internal server error");
  }
};

export const deleteuser = async (request , reply) => {
  const { userid } = request.params;
  const result = await userservices.deleteuser(userid);
  if (result) {
    return reply.status(200).send(result);
  } else {
    return reply.status(500).send("internal server error");
  }
};


export const userlogin = async (request , reply) => {
  const { email , password} = request.body;

  const user = {
    id: Date.now(),
    email,
    password
  };

  const responseData = await userservices.userlogin(user);
  if (responseData) {
    reply.status(200).send(responseData);
  } else{
    return reply.status(500).send("internal server error");
  }
};
