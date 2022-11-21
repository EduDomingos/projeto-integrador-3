const requestUrl = "https://personal-27rwjmv9.outsystemscloud.com/cardapio/rest/lanches/list"

// Seleção de elementos
const menuBtn = document.querySelector("#menu");
const closeMenuBtn = document.querySelector("#close-menu");
const menu = document.querySelector("#mobile-navbar");

const desktopLinks = document.querySelectorAll("#navbar a");
const mobileLinks = document.querySelectorAll("#mobile-navbar a");
const sectionLinks = document.querySelectorAll("section a");
const allLinks = [...desktopLinks, ...mobileLinks, ...sectionLinks];

let screenWidth = window.innerWidth
const endereco = document.querySelector("#endereco")
const whatsapp = document.querySelector("#whatsapp")
const telefone = document.querySelector("#telefone")

window.addEventListener("resize", justIcons)

main()

// Grupo de funções para preencher listas
async function getData(url) { //GET Request to endpoint, return response json
	const response = await fetch(url);
	// Handle errors
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = response.json();

  return data
}

function createList(data) { //Creating list dynamically

	switch (data.CategoryId) {
		case 1:
			rightCategory = document.querySelector("#um")
			break;
	
		case 2:
			rightCategory = document.querySelector("#dois")
			break;
	
		case 3:
			rightCategory = document.querySelector("#tres")
			break;
	
		case 4:
			rightCategory = document.querySelector("#quatro")
			break;
	
		case 5:
			rightCategory = document.querySelector("#cinco")
			break;
	
		case 6:
			rightCategory = document.querySelector("#seis")
			break;
	
		default:
			break;
	}

	const li = document.createElement("li")
	
	li.innerHTML = `
		<div class="details">
			<h3>${data.name}</h3>
			<p class="description">
				${data.ingredients}
			</p>
		</div>
		<strong class="price">
			R$ ${data.price.toFixed(2)}
		</strong>
	`
	rightCategory.appendChild(li)
}

async function main() { //Main function where API response will be used to fill lists
  const data = await getData(requestUrl)
  console.log(data)

	data.forEach(element => {
    createList(element)    
  });

  justIcons(screenWidth)
}

// Scroll effect
function smoothScroll(e) {
  e.preventDefault();

  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });

  setTimeout(() => {
    if(menu.classList.contains("menu-active")) {
      menu.classList.remove("menu-active")
    }
  }, 300)
}

allLinks.forEach((link) => {
	link.addEventListener("click", smoothScroll);
});

// Mobile navbar
[menuBtn, closeMenuBtn].forEach((btn) => {
  btn.addEventListener("click", function () {
			menu.classList.toggle("menu-active");
		});
});

// Mobile footer icons
function justIcons() {
	const screenWidth = document.documentElement.clientWidth
	if (screenWidth <= 405) {
		endereco.innerHTML = 
			`<a href="https://goo.gl/maps/GXtqDMpB4GN7eUez6" target="_blank"><i class="bi bi-geo-alt"></i></a>`
		whatsapp.innerHTML = 
			`<a href="https://api.whatsapp.com/send?phone=5514991554424" target="_blank"><i class="bi bi-whatsapp"></i></a>`
		telefone.innerHTML = 
			`<a href="tel:31320064"><i class="bi bi-telephone-fill"></i></a>`
	}
	else {
		endereco.innerHTML = 
			`<a href="https://goo.gl/maps/GXtqDMpB4GN7eUez6" target="_blank">
			<i class="bi bi-geo-alt"><span>Rua Fernando Villa 43, Jardim Planalto. Brotas - SP</span></i>
			</a>`
		whatsapp.innerHTML = 
			`<a href="https://api.whatsapp.com/send?phone=5514991554424" target="_blank">
			<i class="bi bi-whatsapp"><span>(14) 9 9155-4424</span></i>
			</a>`
		telefone.innerHTML = 
			`<a href="tel:31320064">
			<i class="bi bi-telephone-fill"><span>(14) 3132-0064</span></i>
			</a>`
	}
}