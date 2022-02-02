export default async function createUser(user) {
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

export async function updateUser(address) {
  const response = await fetch('/update-user/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify(address),
  });
  const result = await response.json();
  console.log(result);
}

export async function getUser(id) {
  const response = await fetch(`/get-user/${id}`);
  const result = await response.json();
  return result[0];
}
