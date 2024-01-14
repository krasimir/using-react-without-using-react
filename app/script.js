window.addEventListener('load', function() {
  document.querySelector('form').addEventListener('submit', submit)
});
function submit(e) {
  e.preventDefault();
  const name = document.querySelector('input[name="name"]').value;
  const age = +document.querySelector('input[name="age"]').value;
  const message = getErrorMessage();
  !(!!message) ? register(name, age) : alert(message);
  function getErrorMessage() {
    return name === '' ? 'Please enter your name.' :
      age === 0 ? 'Please enter your age.' :
      age < 18 ? 'You must be at least 18 years old.' : false;
  }
}
function register(name, age) {
  console.log(name, age);
  render('Registering ...');
  setTimeout(() => {
    render(`<p>Hello <strong>${name}</strong>. You are <strong>${age}</strong> years old.</p>`);
  }, 2000);
}
function render(html) {
  document.querySelector('form').innerHTML = html;
}