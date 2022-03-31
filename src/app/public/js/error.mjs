export default async function (error) {
  const data = {
    message: error.message,
    stack: error.stack,
  };
  await fetch('/block/api/error/', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  throw error;
}
