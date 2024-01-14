(() => {
  // src/logic.tsx
  function Joey(component, props, children) {
    console.log(component, props, children);
  }
  function Hey(props) {
    console.log(props);
  }
  var something = /* @__PURE__ */ Joey(Hey, { foo: "bar", moo: "zar" }, /* @__PURE__ */ Joey("div", null, "Hey"));
  console.log(something);
})();
