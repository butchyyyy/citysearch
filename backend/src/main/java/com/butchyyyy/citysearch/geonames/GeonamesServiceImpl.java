package com.butchyyyy.citysearch.geonames;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.butchyyyy.citysearch.CitySearchConfig;
import com.butchyyyy.citysearch.generated.City;
import org.geonames.FeatureClass;
import org.geonames.InsufficientStyleException;
import org.geonames.Style;
import org.geonames.Toponym;
import org.geonames.ToponymSearchCriteria;
import org.geonames.ToponymSearchResult;
import org.geonames.WebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class GeonamesServiceImpl implements GeonamesService {

  @Autowired
  public GeonamesServiceImpl(CitySearchConfig config) {
    WebService.setUserName(config.getGeonames().getUserName());
  }

  @Cacheable("cityCache")
  @Override
  public List<City> searchCities(String query) {
    try {
      if (!StringUtils.isEmpty(query)) {
        ToponymSearchCriteria search = new ToponymSearchCriteria();
        search.setName(query);
        search.setFeatureClass(FeatureClass.P);
        search.setStyle(Style.FULL);
        search.setMaxRows(1000);
        ToponymSearchResult searchResult = WebService.search(search);
        return searchResult.getToponyms().stream().map(this::mapToponymToCity).collect(Collectors.toList());
      }
      return new ArrayList<>();
    } catch (Exception ex) {
      throw new RuntimeException(ex);
    }
  }

  /**
   * Helper method that maps {@link Toponym} return by geonames service to {@link City} pojo
   *
   * @param toponym
   *     The toponym to convert
   * @return The new {@link City} instance
   */
  private City mapToponymToCity(Toponym toponym) {
    try {
      City city = new City();
      city.setName(toponym.getName());
      city.setCountry(getCountryName(toponym));
      city.setPopulation(toponym.getPopulation());
      city.setLat(toponym.getLatitude());
      city.setLng(toponym.getLongitude());
      return city;
    } catch (InsufficientStyleException ex) {
      throw new RuntimeException(ex);
    }
  }

  /**
   * Builds "Country Name" with optional sub divisions
   *
   * @param toponym The toponym to get information from
   * @return The city's country name
   */
  private String getCountryName(Toponym toponym) {
    String countryName = toponym.getCountryName();
    try {
      if (!StringUtils.isEmpty(toponym.getAdminName1())) {
        countryName += ", " + toponym.getAdminName1();
      }
      if (!StringUtils.isEmpty(toponym.getAdminName2())) {
        countryName += ", " + toponym.getAdminName2();
      }
    } catch (InsufficientStyleException ex) {
    }
    return countryName;
  }

}
