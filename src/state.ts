import stateList from './assets/state.json';
import {findEntryByCode, findStateByCodeAndCountryCode, compare, findStateByNameAndCountry} from './utils';
import {ICountry, IState} from './interface';
import {Country} from "./index";

// Get a list of all states.
export function getAllStates(): IState[] {
	return stateList;
}

// Get a list of states belonging to a specific country.
export function getStatesOfCountry(countryCode: string = ''): IState[] {
	if (!countryCode) return [];
	// get data from file or cache
	const states = stateList.filter((value) => {
		return value.countryCode === countryCode;
	});
	return states.sort(compare);
}

// Get a list of states belonging to a specific country from country name.
export function getStatesOfCountryByName(countryName: string = ''): IState[] {
	if (!countryName) return [];

	const country = Country.getCountryByName(countryName);
	if (!country) return [];

	return getStatesOfCountry(country.isoCode);
}

export function getStateByCodeAndCountry(stateCode: string, countryCode: string): IState | undefined {
	if (!stateCode) return undefined;
	if (!countryCode) return undefined;

	return findStateByCodeAndCountryCode(stateList, stateCode, countryCode);
}

export function getStateByNameAndCountryName(stateName: string, countryName: string): IState | undefined {
	if (!stateName) return undefined;
	if (!countryName) return undefined;

	const country = Country.getCountryByName(countryName);
	if (!country) return undefined;

	return findStateByNameAndCountry(stateList, stateName, country.isoCode);
}

// to be deprecate
export function getStateByCode(isoCode: string): IState | undefined {
	// eslint-disable-next-line no-console
	console.warn(
		`WARNING! 'getStateByCode' has been deprecated, please use the new 'getStateByCodeAndCountry' function instead!`,
	);
	if (!isoCode) return undefined;

	return findEntryByCode(stateList, isoCode);
}

function sortByIsoCode(countries: IState[]): IState[] {
	return countries.sort((a, b) => {
		return compare<IState>(a, b, (entity) => {
			return `${entity.countryCode}-${entity.isoCode}`;
		});
	});
}

export default {
	getAllStates,
	getStatesOfCountry,
	getStatesOfCountryByName,
	getStateByCodeAndCountry,
	getStateByNameAndCountryName,
	getStateByCode,
	sortByIsoCode,
};
