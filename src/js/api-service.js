const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countryName) {
   const url = `${BASE_URL}/name/${countryName}`;
   return fetch(url).then(r => {
      return r.json();
   })
}

export default { fetchCountry };