import cityList from './assets/city.json';
import { compare, convertArrayToObject } from './utils';
import { ICity } from './interface';
import {Country, State} from "./index";

const KEYS = [
	"name",
	"countryCode",
	"stateCode",
	"latitude",
	"longitude"
]

let convertedCityList: ICity[] = [];
// Get a list of all cities.
function getAllCities(keys: string[] = KEYS): ICity[] {
	if (convertedCityList.length) {
		return convertedCityList;
	}

	const cityJSON: string[][] = cityList;
	convertedCityList = convertArrayToObject(keys ?? KEYS, cityJSON);
	return (convertedCityList as unknown as ICity[])
}

// Get a list of cities belonging to a specific state and country.
function getCitiesOfState(countryCode: string, stateCode: string): ICity[] {
	if (!stateCode) return [];
	if (!countryCode) return [];

	const cityList = getAllCities();
	const cities = (cityList as ICity[]).filter((value: { countryCode: string; stateCode: string }) => {
		return value.countryCode === countryCode && value.stateCode === stateCode;
	});

	return cities.sort(compare);
}

// Get a list of cities belonging to a specific state name and country name.
function getCitiesOfStateByName(countryName: string, stateName: string): ICity[] {
	if (!stateName) return [];
	if (!countryName) return [];

	const country = Country.getCountryByName(countryName);
	if (!country) return [];

	const state = State.getStateByNameAndCountryName(stateName, countryName);
	if (!state) return [];

	return getCitiesOfState(country.isoCode, state.isoCode);
}

// Get a list of cities belonging to a specific country.
function getCitiesOfCountry(countryCode: string): ICity[] | undefined {
	if (!countryCode) return [];

	const cityList = getAllCities();
	const cities = (cityList as ICity[]).filter((value: { countryCode: string }) => {
		return value.countryCode === countryCode;
	});
	return cities.sort(compare);
}

function sortByStateAndName(cities: ICity[]): ICity[] {
	return cities.sort((a, b) => {
		const result = compare<ICity>(a, b, (entity) => {
			return `${entity.countryCode}-${entity.stateCode}`;
		});
		if (result !== 0) return result;
		return compare(a, b);
	});
}

export default {
	getAllCities,
	getCitiesOfState,
	getCitiesOfStateByName,
	getCitiesOfCountry,
	sortByStateAndName,
};
