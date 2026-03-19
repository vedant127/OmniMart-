export const createuser = (request , replay) => {
    const {name , email , password} = request.body ;

  // validate request body

  
  // simulate user creation logic  
    const newuser = {
        id: Date.now(),
        name,
        email,
        password
    };

    //perform some busniess logic 

    //store the data in database

    replay.status(201).send(newuser);
}