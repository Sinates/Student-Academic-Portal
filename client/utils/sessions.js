export const  setUserData = (email, role,name,id) => {
  localStorage.setItem('email', email);
  localStorage.setItem('role', role);
  localStorage.setItem('name', name);
  localStorage.setItem('id', id);

}



