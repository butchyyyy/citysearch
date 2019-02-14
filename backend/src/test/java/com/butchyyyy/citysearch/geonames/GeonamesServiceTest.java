package com.butchyyyy.citysearch.geonames;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import com.butchyyyy.citysearch.TestHelpers;
import com.butchyyyy.citysearch.generated.City;
import org.geonames.ToponymSearchCriteria;
import org.geonames.ToponymSearchResult;
import org.geonames.WebService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest(WebService.class)
public class GeonamesServiceTest {

  private GeonamesService geonamesService;

  @Before
  public void setUp() {
    geonamesService = new GeonamesServiceImpl();
    PowerMockito.mockStatic(WebService.class);
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
        TestHelpers.createToponym("Prague", "Czechia", 1165581L, 50.08804, 14.42076),
        TestHelpers.createToponym("New Prague", "United States", 7582L, 44.5433, -93.57607)
    ));
    when(WebService.search(any(ToponymSearchCriteria.class))).thenReturn(mockResult);
    List<City> searchResult = geonamesService.searchCities("Prague");
    assertNotNull(searchResult);
    assertThat(searchResult.size(), is(2));
    assertThat(searchResult, hasItems(
        TestHelpers.createCity("Prague", "Czechia", 1165581L, 50.08804, 14.42076),
        TestHelpers.createCity("New Prague", "United States", 7582L, 44.5433, -93.57607)
    ));
  }

  private static void assertEmptyCollection(Collection<?> collection) {
    assertNotNull(collection);
    assertThat(collection, is(empty()));
  }

}
