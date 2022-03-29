export default async function (error) {
  console.log('test');
  console.log(error);
  const data = {
    message: error.message,
    stack: error.stack,
  };
  console.log(JSON.stringify(data));
  const response = await fetch('/block/api/error/', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}
//   window.onerror = async (msg, url, lineNo, columnNo, error) => {
//     const errorObj = {
//       message: msg,
//       url: url,
//       lineNo: lineNo,
//       columnNo: columnNo,
//       error: error,
//     };
//     console.log(errorObj);
//   };
// }
