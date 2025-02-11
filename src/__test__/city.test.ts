/* eslint-disable no-shadow */
import { City } from '../index';
import { ICity } from '../interface';

const executeAllTests = (City: any) => {
	describe('Check for City Module', () => {
		const citiesOfDelhi = [
			'Alipur',
			'Bawana',
			'Central Delhi',
			'Delhi',
			'Deoli',
			'East Delhi',
			'Karol Bagh',
			'Najafgarh',
			'Nangloi Jat',
			'Narela',
			'New Delhi',
			'North Delhi',
			'North East Delhi',
			'North West Delhi',
			'Pitampura',
			'Rohini',
			'South Delhi',
			'South West Delhi',
			'West Delhi',
		]

		test('Check Cities for Delhi', () => {
			const countryCode = 'IN';
			const stateCode = 'DL';
			const cities: any = City.getCitiesOfState(countryCode, stateCode);
			const names = cities.map((city: ICity) => {
				return city.name;
			});
			expect(names).toEqual(citiesOfDelhi);
		});

		test('Check Cities for undefined State', () => {
			let countryCode;
			const stateCode = 'DL';
			const cities: any = City.getCitiesOfState(countryCode, stateCode);

			expect(cities.length).toEqual(0);
		});

		test('Check Cities for undefined State', () => {
			const countryCode = 'IN';
			let stateCode;
			const cities: any = City.getCitiesOfState(countryCode, stateCode);
			expect(cities.length).toEqual(0);
		});

		test('Check Cities for Delhi from country name and state name', () => {
			const countryName = 'India';
			const stateName = 'Delhi';
			const cities: any = City.getCitiesOfStateByName(countryName, stateName);
			const names = cities.map((city: ICity) => {
				return city.name;
			});
			expect(names).toEqual(citiesOfDelhi);
		});
	});
};
export default executeAllTests;
executeAllTests(City);
