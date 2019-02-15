package com.butchyyyy.citysearch.geonames;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import com.butchyyyy.citysearch.CitySearchConfig;
import com.butchyyyy.citysearch.TestHelpers;
import com.butchyyyy.citysearch.generated.City;
import org.geonames.ToponymSearchCriteria;
import org.geonames.ToponymSearchResult;
import org.geonames.WebService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest(WebService.class)
public class GeonamesServiceTest {

  private GeonamesService geonamesService;

  private CitySearchConfig config;

  @Captor
  private ArgumentCaptor<String> userNameCaptor;

  @Before
  public void setUp() {
    config = new CitySearchConfig();
    config.getGeonames().setUserName("Test");
    geonamesService = new GeonamesServiceImpl(config);
    PowerMockito.mockStatic(WebService.class);
  }

  @Test
  public void testUsernameInitialization() {
    new GeonamesServiceImpl(config);
    PowerMockito.verifyStatic(WebService.class);
    WebService.setUserName(userNameCaptor.capture());
    assertEquals("Test", userNameCaptor.getValue());
  }

  @Test
  public void testSearchNullOrEmptyQuery() {
    List<City> searchResult = geonamesService.searchCities(null);
    assertEmptyCollection(searchResult);
    searchResult = geonamesService.searchCities("");
    assertEmptyCollection(searchResult);
  }

  @Test
  public void testNullServiceResult() throws Exception {
    when(WebService.search(any(ToponymSearchCriteria.class))).thenReturn(null);
    List<City> searchResult = geonamesService.searchCities(null);
    assertEmptyCollection(searchResult);
  }

  @Test
  public void testResultTransformation() throws Exception {
    ToponymSearchResult mockResult = new ToponymSearchResult();
    mockResult.setToponyms(Arrays.asList(
        TestHelpers.createToponym("Prague", "Czechia", null, null, 1165581L, 50.08804, 14.42076),
        TestHelpers.createToponym("New Prague", "United States", "Minnesota", "Minneapolis", 7582L, 44.5433, -93.57607)
    ));
    when(WebService.search(any(ToponymSearchCriteria.class))).thenReturn(mockResult);
    List<City> searchResult = geonamesService.searchCities("Prague");
    assertNotNull(searchResult);
    assertThat(searchResult.size(), is(2));
    assertThat(searchResult, hasItems(
        TestHelpers.createCity("Prague", "Czechia", 1165581L, 50.08804, 14.42076),
        TestHelpers.createCity("New Prague", "United States, Minnesota, Minneapolis", 7582L, 44.5433, -93.57607)
    ));
  }

  private static void assertEmptyCollection(Collection<?> collection) {
    assertNotNull(collection);
    assertThat(collection, is(empty()));
  }

}
