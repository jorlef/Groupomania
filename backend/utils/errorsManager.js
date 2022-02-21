module.exports.signupErrors = (err) => {
    let errors = {};
    let errorsLength = err.errors.length;
  
    for (let i = 0; i < errorsLength; i++) {
      if (err.errors[i].path.includes("first_name")) errors.first_name = "2 à 32 lettres";
      if (err.errors[i].path.includes("last_name")) errors.last_name = "2 à 32 lettres";
      if (err.errors[i].message.includes("email" && "unique")) errors.email = "le compte existe déjà";
      if (err.errors[i].message.includes("email" && "formatted")) errors.email = "email non valide";
    }
  
    return errors;
  };
  