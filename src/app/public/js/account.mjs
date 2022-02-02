const loadAccountPage = (user) => {
  console.log(user);
  const main = document.getElementById('main');
  const image = document.createElement('img');
  image.src = user.picture;
  image.className = 'profile-pic';
  main.appendChild(image);
  const greeting = document.createElement('h2');
  greeting.textContent = `Welcome to your account, ${user.name}`;
  greeting.className = 'account_header';
  main.appendChild(greeting);
  const email = document.createElement('p');
  email.className = 'p_main';
  email.textContent = `Email: ${user.email}`;
  main.appendChild(email);
};

export default loadAccountPage;
