const search  = document.querySelector('#search');
const main    = document.querySelector('.content');

search.addEventListener('keyup', (event) => {
  if (event.key == 'Enter') {
    getListImages(event.target.value);
  }
})


const getListImages = async (text) => {
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${text}&client_id=q579nNC0CCL41NoZKHrZO2dndBrhWmk-DAuCzFzzug8`);
    if (response.ok) {
      const data     = await response.json();
      let {results} = data;
      generateElement(results);
    }else{
      generateError(response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}

const generateElement = (images) => {
  clearHtml();
  images.forEach(image => {
    const contenedor = document.createElement('div');
    contenedor.classList.add('img-pinterest');
    contenedor.innerHTML = `
      <a href="#" class="save">Guardar</a>
				<div class="window"></div>
				<div class="icon-p download">
					<img src="img/download.png"/>
				</div>
				<div class="icon-p">
					<img src="img/more.png"/>
				</div>
				<img
          class="bg-image"
          src="${image.urls.raw}"
          alt="${image.alt_description}"
        />
      `
      main.classList.add('content');
      main.appendChild(contenedor);
  });
}

const generateError = (status) => {
  clearHtml();
  const error = document.createElement('div');
  error.innerHTML = `
    <h1 style="text-align: center;">A ocurrido un problema estado ${status}, por favor intentarlo luego.</h1>
  `;
  main.classList.remove('content');
  main.appendChild(error);
}

const clearHtml = () => main.innerHTML = '';