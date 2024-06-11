const userNameRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex =/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=])(?=.*\d).{8,}$/;
const priceRegex=/^\$?\d+(\.\d{2})?$/
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const usernameValidation = (value) => {
  if (!value) {
    return "username required";
  } else if (!userNameRegex.test(value)) {
    return "min 5 letter,special character and a number";
  } else {
    return "";
  }
};
const emailValidation = (value) => {
  if (!value) {
    return "email required";
  } else if (!emailRegex.test(value)) {
    return "not valid email";
  } else {
    return "";
  }
};
const phoneValidation = (value) => {
  if (!value) {
    return "phone required";
  } else if (!phoneRegex.test(value)) {
    return "not a valid phone number";
  } else {
    return "";
  }
};
const passwordValidation = (value) => {
  if (!value) {
    return "password required";
  } else if (!passwordRegex.test(value)) {
    return "contain a special character, a upper case and min 8 letters";
  } else {
    return "";
  }
};
const productNameAndCategoryValidation = (value) => {
    if(!value){
        return 'name required'
    }else if(value.length<5){
        return 'minimum 5 letters required'
    }else{
        return ''
    }
};
const priceValidation=(value)=>{
    if(!value){
        return 'price required'
    }else if(!priceRegex.test(value)){
        return 'should be a number'
    }else{
        return ''
    }
}
const imageValidation=(value)=>{
    if(!value){
        return 'image required'
    }
    if(!ALLOWED_FILE_TYPES.includes(value.type)){
        return 'invalid file type. only JPEG,PNG and GIF are allowed.'
    }
    if(value.size>MAX_FILE_SIZE){
      return 'file size exceed the maximum limit of 2 MB'
    }
}

const truncate = (str, length = 39) => {
  if (!str) return "";
  return (
    <>
      {str.length > length ? str.slice(0, length) : str}
      <br></br>
      {str.length > length ? str.slice(length) : ""}
    </>
  );
};

export {
  usernameValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  productNameAndCategoryValidation,
  priceValidation,
  imageValidation,
  truncate,
};
