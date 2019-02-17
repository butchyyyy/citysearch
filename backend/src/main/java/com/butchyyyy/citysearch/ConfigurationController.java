package com.butchyyyy.citysearch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Rest controller for configuration (frontend state hydration)
 */
@Controller
public class ConfigurationController {

  private final CitySearchConfig config;

  @Autowired
  public ConfigurationController(CitySearchConfig config) {
    this.config = config;
  }

  /**
   * Gets API key to use with Google Map Javascript API
   *
   * @return The API key
   */
  @RequestMapping(value = "/config/mapApiKey", method = RequestMethod.GET)
  public ResponseEntity<String> getMapApiKey() {
    return ResponseEntity.ok(config.getGooglemap().getApiKey());
  }

}
