export const createUserEntity = ({id,name,email,hashpassword,role}) => {
      
    if (!email || typeof email !== 'string') {
        throw new Error("email is required and must be a string");
      }

      if (!hashpassword || typeof hashpassword !== 'string') {
        throw new Error("password is required and must be a string");
      }

      if (!name || typeof name !== 'string') {
        throw new Error("name is required and must be a string");
      }

      if (!role || typeof role !== 'string') {
        throw new Error("role is required and must be a string");
      }
    return {
       getId : () => id,
       getName : () => name,
       getEmail : () => email,
       getPassword : () => hashpassword,
       getRole : () => role,
       checkPassword:(plainpassword , auth) => {
        return auth.comparePassword(plainpassword, hashpassword);
       }
    };
};