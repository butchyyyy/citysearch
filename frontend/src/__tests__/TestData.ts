import City from "model/City"

export const cityPrague: City = {
  name: "Prague",
  country: "Czechia",
  population: 1165581,
  lat: 50.08804,
  lng: 14.42076,
}

export const cityNewPrague: City = {
  name: "New Prague",
  country: "United States, Minnesota, Minneapolis",
  population: 7582,
  lat: 44.5433,
  lng: -93.57607,
}

export const cityNullPopulation: City = {
  name: "I don't have a population",
  country: "Some Country",
  population: null,
  lat: 0,
  lng: 0,
}

export const testCities: City[] = [cityPrague, cityNewPrague, cityNullPopulation]
