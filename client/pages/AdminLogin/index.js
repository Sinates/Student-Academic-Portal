const React = require('react');
const { useState } = require('react');
const { useRouter } = require('next/router');
const axios = require('axios');

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Use environment variable for the API URL, with localhost as a fallback
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/admin/signin`;

    try {
      const response = await axios.post(endpoint, {
        email: email, // Ensure the email field is populated correctly
        password: password, // Ensure the password field is populated correctly
      });

      // Check for success response
      if (response.status === 200 && response.data) {
        // Potentially save authentication token or user details here
        console.log('Sign-in successful', response.data);

        // Redirect to the admin dashboard
        router.push('/admin/dashboard');
      } else {
        // Handle non-success HTTP statuses
        setErrorMessage('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code out of the range of 2xx
        console.error('Authentication error:', error.response.data);
        setErrorMessage(error.response.data.error || 'An error occurred. Please try again later.');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Server response not received:', error.request);
        setErrorMessage('The server did not respond. Please try again later.');
      } else {
        // An error occurred in setting up the request
        console.error('Error:', error.message);
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return React.createElement('div', { className: "flex items-center justify-center h-screen" },
    React.createElement('form', { className: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm", onSubmit: handleSignIn },
      React.createElement('h1', { className: "text-2xl font-bold mb-4 text-center" }, 'Sign In'),
      errorMessage && React.createElement('p', { className: "text-red-500 text-xs italic mb-4" }, errorMessage),
      React.createElement('div', { className: "mb-4" },
        React.createElement('label', { htmlFor: "email", className: "block text-gray-700 text-sm font-bold mb-2" }, 'Email'),
        React.createElement('input', {
          id: "email",
          type: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
          placeholder: "Enter your email"
        })
      ),
      React.createElement('div', { className: "mb-6" },
        React.createElement('label', { htmlFor: "password", className: "block text-gray-700 text-sm font-bold mb-2" }, 'Password'),
        React.createElement('input', {
          id: "password",
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
          className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
          placeholder: "Enter your password"
        })
      ),
      React.createElement('div', { className: "flex items-center justify-between" },
        React.createElement('button', {
          type: "submit",
          className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        }, 'Sign In')
      )
    )
  );
};

module.exports = SignIn;



