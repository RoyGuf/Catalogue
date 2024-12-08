import { CarProps, FilterProps, MoviesFilterProps, MovieProps } from "@types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");

  url.searchParams.append('make', manufacturer);
  url.searchParams.append('year', `${year}`);
  url.searchParams.append('model', model);
  url.searchParams.append('limit', `${limit}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('fuel_type', fuel);
  // Set the required headers for the API request
  const response = await fetch(
    url,
    // `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

export function calculateCarRent(city_mpg: number, year: number)  {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  // Update or delete the 'model' search parameter based on the 'model' value
  
  searchParams.set(type, value);

  // Generate the new pathname with the updated search parameters
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
}

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};



export async function fetchMovies(filters: MoviesFilterProps) {
  const { genres, keyword, year_max, year_min, cursor } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  };

  const url = new URL("https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=episode&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie");

  url.searchParams.append('genres', genres);
  url.searchParams.append('keyword', keyword);
  url.searchParams.append('year_max', `${year_max}`);
  url.searchParams.append('year_min', `${year_min}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('cursor', cursor);
  // Set the required headers for the API request
  const response = await fetch(
    url,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

export async function fetchMovieById(id: string) {
  // const { id } = filters;

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  };

  const url = new URL(`https://streaming-availability.p.rapidapi.com/shows/${id}?output_language=en`);

  url.searchParams.append('id', id);
  // Set the required headers for the API request
  const response = await fetch(
    url,
    {
      headers: headers,
    }
  );

  // Parse the response as JSON
  const result = await response.json();

  return result;
}