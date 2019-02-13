package com.butchyyyy.citysearch.geonames;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.butchyyyy.citysearch.generated.City;
import org.geonames.FeatureClass;
import org.geonames.InsufficientStyleException;
import org.geonames.Style;
import org.geonames.Toponym;
import org.geonames.ToponymSearchCriteria;
import org.geonames.ToponymSearchResult;
import org.geonames.WebService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class GeonamesServiceImpl implements GeonamesService {

  @Autowired
  public GeonamesServiceImpl() {
    WebService.setUserName("butchyyyy");
  }

  @Override
  public List<City> searchCities(String query) {
    try {
      if (!StringUtils.isEmpty(query)) {
        ToponymSearchCriteria search = new ToponymSearchCriteria();
        search.setName(query);
        search.setFeatureClass(FeatureClass.P);
        search.setStyle(Style.LONG);
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
      city.setCountry(toponym.getCountryName());
      city.setPopulation(toponym.getPopulation());
      city.setLat(toponym.getLatitude());
      city.setLng(toponym.getLongitude());
      return city;
    } catch (InsufficientStyleException ex) {
      throw new RuntimeException(ex);
    }
  }

}
