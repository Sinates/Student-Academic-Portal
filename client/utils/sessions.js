export const  setUserData = (email, role, id) => {
  // Create an object to store the user data
  const userData = {
    email: email,
    role: role,
    id: id
  };

  // Convert the user data object to a JSON string
  const userDataJson = JSON.stringify(userData);

  // Set the cookie with the user data
  document.cookie = `userData=${userDataJson}; path=/`;
}

export const getUserData = () => {
  // Get the cookie value
  const cookie = document.cookie;

  // Split the cookie into individual key-value pairs
  const cookiePairs = cookie.split(';');

  // Find the userData key-value pair
  const userDataPair = cookiePairs.find(pair => pair.trim().startsWith('userData='));

  // If userData pair is found
  if (userDataPair) {
    // Extract the userData value
    const userDataJson = userDataPair.split('=')[1];

    // Parse the userData JSON string
    const userData = JSON.parse(userDataJson);

    // Extract the email and role from userData
    const { email, role } = userData;

    // Return the email and role
    return { email, role };
  }

  // If userData pair is not found, return null
  return null;
}

