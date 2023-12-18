import 'client-only'

// Get current signed in user
export async function getUser(){
  const res = await fetch('route-handlers/get-user');  
  return res.json();
}

// Register user
export async function registerUser(email, password) {
  await fetch('route-handlers/register', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
}

// Sign In
export async function signInUser(email, password) {
  await fetch('route-handlers/sign-in', { method: 'POST', body: JSON.stringify({ email: email, password: password }) });
}

// Sign Out
export async function signOutUser() {
  await fetch('route-handlers/sign-out');
}
