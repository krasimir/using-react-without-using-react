const root = document.querySelector('#root');

function App() {
  let data;
  const root = document.querySelector('#root');

  async function getShows() {
    root.innerHTML = `
      <section class="center">
        <p>Loading ...</p>
      </section>
    `;
    const response = await fetch('./data.json');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    data = await response.json();
    renderShow(-1);
  };
  function setSelectedShow(value) {
    renderShow(Number(value));
  }

  function renderShow(selectedShow) {
    root.innerHTML = `
      <section class="mb1">
        <select onchange="API.setSelectedShow(this.value)">
          <option value="-1">Pick a show</option>
          ${data.shows.map((item, index) => `
            <option key="${item.title}" value="${index}" ${index === selectedShow ? 'selected' : ''}>${item.title}</option>
          `).join('')}
        </select>
        ${selectedShow >= 0  ? `
          <div>
            <h1 class="mb1 mt1">${data.shows[selectedShow].title}</h1>
            <small class="b first-letter">${data.shows[selectedShow].description}</small>
            <div class="grid col-3 mt1">
            ${data.shows[selectedShow].characters
                .map(({ name, actor, avatar }) => {
                  return `
                    <div>
                      <h2 class="tac nobold">${name}</h2>
                      ${actor ? `<small class="b tac mt1">${actor}</small>` : ''}
                      <img src="${avatar}" alt="${name}" class="img-full mt1"/>
                    </div>
                  `
                })
                .join('')
            }
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }

  root.innerHTML = `
    <section class="center">
      <button onClick="javascript:API.getShows()">Get my favorite shows</button>
    </section>
  `;
 
  return {
    getShows,
    setSelectedShow
  }
}

const API = App();