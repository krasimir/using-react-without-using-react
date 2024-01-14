const { createRoot } = ReactDOM;
const { useState, useEffect } = React;

function App() {
  const [ data, setData ] = useState(undefined);
  const [ selectedShow, setSelectedShow ] = useState(-1);

  async function getShows() {
    setData(null);
    const response = await fetch('./data.json');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const json = await response.json();
    setData(json);
  };

  if (typeof data === 'undefined') {
    return (
      <section class="center">
        <button onClick={getShows}>Get my favorite shows</button>
      </section>
    );
  }

  if (data === null) {
    return (
      <section class="center">
        <p>Loading ...</p>
      </section>
    );
  }

  return (
    <section className="mb1">
      <select onChange={(e) => setSelectedShow(Number(e.target.value))}>
        <option value="-1">Pick a show</option>
        {data.shows.map((item, index) => (
          <option key={item.title} value={index}>{item.title}</option>
        ))}
      </select>
      {selectedShow >= 0  && <Show data={data.shows[selectedShow]}/>}
    </section>
  )
}

function Show({ data }) {
  return (
    <div>
      <h1 className="mb1 mt1">{data.title}</h1>
      <small className="b first-letter">{data.description}</small>
      <div className="grid col-3 mt1">
        {data.characters.map((item) => (
          <Character key={item.name} {...item} />
        ))}
      </div>
    </div>
  )
}

function Character({ avatar, name, actor }) {
  return (
    <div>
      <h2 className="tac nobold">{name}</h2>
      {actor && <small className="b tac mt1">{actor}</small>}
      <img src={avatar} alt={name} className="img-full mt1"/>
    </div>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);