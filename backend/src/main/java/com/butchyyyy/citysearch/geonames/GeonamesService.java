package com.butchyyyy.citysearch.geonames;

import java.util.List;

import com.butchyyyy.citysearch.generated.City;

/**
 * Service implementing geonames.org services
 */
public interface GeonamesService {

  /**
   * Searches for cities by their name
   *
   * @param query
   *     The query to find cities by (partial match)
   * @return The list of matched cities
   */
  List<City> searchCities(String query);

}
