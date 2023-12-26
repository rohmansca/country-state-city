import countryList from './assets/country.json';
import {compare, findEntryByCode, findEntryByName} from './utils';
import { ICountry } from './interface';

// Get a country by isoCode.
function getCountryByCode(isoCode: string): ICountry | undefined {
	if (!isoCode) return undefined;

	return findEntryByCode(countryList, isoCode);
}

// Get a country by name
function getCountryByName(name: string): ICountry | undefined {
	if (!name) return undefined;

	return findEntryByName(countryList, name);
}

// Get a list of all countries.
function getAllCountries(): ICountry[] {
	return countryList;
}

function sortByIsoCode(countries: ICountry[]): ICountry[] {
	return countries.sort((a, b) => {
		return compare<ICountry>(a, b, (entity) => {
			return entity.isoCode;
		});
	});
}

export default {
	getCountryByCode,
	getCountryByName,
	getAllCountries,
	sortByIsoCode,
};
