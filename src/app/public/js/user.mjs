async function createUser(user) {
  const response = await fetch('/create-user/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  });
  const result = await response.json();
  console.log(result);
}

export default createUser;
