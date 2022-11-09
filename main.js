const requestUrl = "https://personal-27rwjmv9.outsystemscloud.com/cardapio/rest/lanches/list"

async function getData(url) { //GET Request to endpoint, return response json
	const response = await fetch(requestUrl);
	// Handle errors
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = response.json();

  return data
}

async function main() { //Main function where API response will be used
  const data = await getData(requestUrl)
  console.log(data)
}

main()