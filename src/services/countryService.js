export function getAllCountries() {
  return fetch('https://disease.sh/v3/covid-19/countries').then((response) =>
    response.json(),
  );
}

export function getCountryByCode(countryCode) {
  return fetch(
    'https://disease.sh/v3/covid-19/countries/' + countryCode,
  ).then((response) => response.json());
}
