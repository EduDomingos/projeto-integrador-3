const requestUrl = "https://personal-27rwjmv9.outsystemscloud.com/cardapio/rest/lanches/list"

// Seleção de elementos
const menuBtn = document.querySelector("#menu");
const closeMenuBtn = document.querySelector("#close-menu");
const menu = document.querySelector("#mobile-navbar");

const desktopLinks = document.querySelectorAll("#navbar a");
const mobileLinks = document.querySelectorAll("#mobile-navbar a");
const sectionLinks = document.querySelectorAll("section a");
const allLinks = [...desktopLinks, ...mobileLinks, ...sectionLinks];

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