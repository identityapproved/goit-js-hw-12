import { Notify } from "notiflix";
import debounce from 'lodash.debounce';
import countryCardTemp from '../templates/card.hbs';
import countriesListTemp from '../templates/list.hbs';
import API from './api-service'

const DEBOUNCE_DELAY = 300;
const cardContainer = document.querySelector('.country-list');
const input = document.querySelector('input#search-box');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))

function onInputSearch(e) {
   e.preventDefault();

   let inputValue = input.value || "";

   API.fetchCountry(inputValue)
      .then(country => renderFromSearch(country))
      .catch(error => {
         console.log(error);
         Notify.failure('Failure!');
      })
}

function renderFromSearch(country) {
   if (country.status === 404) {
      Notify.failure("Oops, there is no country with that name")
   } else if (country.length > 10) {
      Notify.warning('Too many matches found. Please, enter more...');
   } else if (country.length < 10 && country.length > 1) {
      renderList(country)
   } else {
      renderCard(country);
   }
}

function renderCard(country) {
   const cardMarkup = countryCardTemp(country);
   cardContainer.innerHTML = cardMarkup;
}

function renderList(country) {
   const listMarkup = countriesListTemp(country);
   cardContainer.innerHTML = listMarkup;
}


