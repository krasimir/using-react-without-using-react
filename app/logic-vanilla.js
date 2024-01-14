const root = document.querySelector('#root');

function App() {
  let data;
  let selectedShow = -1;

  async function getShows() {
    data = null;
    render();
    const response = await fetch('./data.json');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    data = await response.json();
    render();
  };
  function setSelectedShow(e) {
    selectedShow = Number(e.target.value);
    render();
  }

  function render() {
    let html = ``;
    if (typeof data === 'undefined') {
      html = `
        <section class="center">
          <button data-event="click:getShows">Get my favorite shows</button>
        </section>
      `;
    } else if (data === null) {
      html = `
        <section class="center">
          <p>Loading ...</p>
        </section>
      `;
    } else {
      html = `
        <section class="mb1">
          <select data-event="change:setSelectedShow">
            <option value="-1">Pick a show</option>
            ${data.shows.map((item, index) => `
              <option key="${item.title}" value="${index}" ${index === selectedShow ? 'selected' : ''}>${item.title}</option>
            `).join('')}
          </select>
          ${selectedShow >= 0  ? Show(data.shows[selectedShow]) : ''}
        </section>
      `;
    }

    root.innerHTML = html;
    root.querySelectorAll('[data-event]').forEach((item) => {
      const [ event, method ] = item.dataset.event.split(':');
      item.addEventListener(event, eval(method));
    });
  }

  render();
}

function Show(data) {
  return `
    <div>
      <h1 class="mb1 mt1">${data.title}</h1>
      <small class="b first-letter">${data.description}</small>
      ${Grid(
        { columns: 3 },
        data.characters
          .map((item) => Character(item.avatar, item.name, item.actor))
          .join('')
      )}
      </div>
    </div>
  `;
}
function Grid({ columns }, children) {
  return `
    <div class="grid col-${columns} mt1">
      ${children}
    </div>
  `;
}
function GridColumn(children) {
  return `<div>${children}</div>`;
}
function Character(avatar, name, actor) {
  return GridColumn(`
    <h2 class="tac nobold">${name}</h2>
    ${actor ? `<small class="b tac mt1">${actor}</small>` : ''}
    <img src="${avatar}" alt="${name}" class="img-full mt1"/>
  `);
}

App();