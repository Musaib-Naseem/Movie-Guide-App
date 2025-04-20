export const ValidateFormOne=(email,password)=>{

const isEmailCorrect = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
const isPasswordCorrect = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);

if (!isEmailCorrect) return "Email is not correct";

if (!isPasswordCorrect) return "Password is not correct";


return null;

}


// const isNameCorrect = /([a-zA-Z0-9_\s]+)/.test(name);
// if(!isNameCorrect) return "Name is not valid";
