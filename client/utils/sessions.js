export const  setUserData = (email, role,name) => {
  localStorage.setItem('email', email);
  localStorage.setItem('role', role);
  localStorage.setItem('name', name);

}



