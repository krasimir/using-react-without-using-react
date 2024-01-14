function Joey(component, props, children) {
  console.log(component, props, children);
}

function Hey(props) {
  console.log(props);
}

const something = (
  <Hey foo="bar" moo="zar">
    <div>Hey</div>
  </Hey>
);

console.log(something);