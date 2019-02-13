package com.butchyyyy.citysearch;

import com.butchyyyy.citysearch.generated.City;
import org.geonames.Toponym;

public class TestHelpers {

  public static Toponym createToponym(String name, String country, Long population, Double lat, Double lng) {
    Toponym toponym = new Toponym();
    toponym.setName(name);
    toponym.setCountryName(country);
    toponym.setPopulation(population);
    toponym.setLatitude(lat);
    toponym.setLongitude(lng);
    return toponym;
  }

  public static City createCity(String name, String country, Long population, Double lat, Double lng) {
    City city = new City();
    city.setName(name);
    city.setCountry(country);
    city.setPopulation(population);
    city.setLat(lat);
    city.setLng(lng);
    return city;
  }

}
