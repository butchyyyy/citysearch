package com.butchyyyy.citysearch;

import java.util.List;

import javax.validation.Valid;

import com.butchyyyy.citysearch.generated.CitiesApi;
import com.butchyyyy.citysearch.generated.City;
import com.butchyyyy.citysearch.geonames.GeonamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
public class CitySearchController implements CitiesApi {

  private final GeonamesService geonamesService;

  @Autowired
  public CitySearchController(GeonamesService geonamesService) {
    this.geonamesService = geonamesService;
  }

  @Override
  public ResponseEntity<List<City>> citiesSearchGet(@Valid String query) {
    return ResponseEntity.ok(geonamesService.searchCities(query));
  }
}
