package com.butchyyyy.citysearch;

import java.util.Arrays;

import com.butchyyyy.citysearch.geonames.GeonamesService;
import io.restassured.RestAssured;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.anyString;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class CitySearchControllerTest {

  @LocalServerPort
  private int port;

  @MockBean
  private GeonamesService geonamesService;

  @Before
  public void setUp() {
    RestAssured.port = this.port;
  }

  @Test
  public void testSearchCitiesGet() {
    Mockito.when(geonamesService.searchCities(anyString())).thenReturn(Arrays.asList(
        TestHelpers.createCity("Prague", "Czechia", 1165581L, 50.08804, 14.42076),
        TestHelpers.createCity("New Prague", "United States", 7582L, 44.5433, -93.57607)
    ));
    given()
        .queryParam("query", "Prague")
        .get("/cities/search")
        .then()
        .assertThat()
        .body(equalTo("[{\"name\":\"Prague\",\"country\":\"Czechia\",\"population\":1165581,\"lat\":50.08804,\"lng\":14.42076},{\"name\":\"New Prague\",\"country\":\"United States\",\"population\":7582,\"lat\":44.5433,\"lng\":-93.57607}]"));
  }


}
