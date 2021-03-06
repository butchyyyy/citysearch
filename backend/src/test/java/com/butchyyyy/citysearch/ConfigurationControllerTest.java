package com.butchyyyy.citysearch;

import com.butchyyyy.citysearch.CitySearchConfig.Googlemap;
import io.restassured.RestAssured;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class ConfigurationControllerTest {

  @LocalServerPort
  private int port;

  @SpyBean
  private CitySearchConfig config;

  @Before
  public void setUp() {
    RestAssured.port = this.port;
  }

  @Test
  public void testGetMapApiKey() {
    Googlemap googlemap = new Googlemap();
    googlemap.setApiKey("test");
    when(config.getGooglemap()).thenReturn(googlemap);
    given().get("/config/mapApiKey").then().assertThat().body(equalTo("test"));
  }

}
