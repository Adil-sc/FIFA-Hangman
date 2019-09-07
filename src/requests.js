const getPuzzle = async () => {
	const response = await fetch(`http://localhost:4000/api/players?nameonly=true`);
	if(response.status === 200){
		
		const data = await response.json();
		return data.playerName;
		
	}else{
		
		throw new Error('Unable to get puzzle');
		
	}
}

const getCurrentCountry = async () =>{
	
	const location = await getLocation();
	const country = await getCountry(location.country);
	return country;
	
}


const getCountry = async (countryCode) => {
	
	const response = await fetch('http://restcountries.eu/rest/v2/all');
	
	if(response.status === 200){
		const data = await response.json();
		return data.find((country) => country.alpha2Code === countryCode);
	}else{
		throw new Error('Unable to fetch country');
	}
	
}

const getLocation = async () => {
	const APIKEY = '60470f4af11fb2';
	
	
	let response = await fetch(`http://ipinfo.io/json?token=${APIKEY}`);
	
	if(response.status === 200){
		return response.json();

	}else{
		throw new Error('Unable to get location');
	}
	
}

export {getPuzzle as default}
