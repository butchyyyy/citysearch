package com.butchyyyy.citysearch;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("citysearch")
public class CitySearchConfig {

  private final Googlemap googlemap = new Googlemap();
  private final Geonames geonames = new Geonames();

  public Googlemap getGooglemap() {
    return googlemap;
  }

  public Geonames getGeonames() {
    return geonames;
  }

  public static class Googlemap {

    private String apiKey;

    public String getApiKey() {
      return apiKey;
    }

    public void setApiKey(String apiKey) {
      this.apiKey = apiKey;
    }
  }

  public static class Geonames {

    private String userName;

    public String getUserName() {
      return userName;
    }

    public void setUserName(String userName) {
      this.userName = userName;
    }
  }

}
