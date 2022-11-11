const requestUrl = "https://personal-27rwjmv9.outsystemscloud.com/cardapio/rest/lanches/list"

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

main()