/*global angular*/
/*global Flickr*/
/*global $http*/
/*global $resource*/

var countriesControllers = angular.module('countriesControllers', []);

countriesControllers.controller('ListCtrl', ['$scope', '$http', function ($scope, $http) {
   $http.get('countries.json').success(function(data) {
        $scope.countries = data;
        $scope.countriesOrder = 'name.common';
   });
}]);

countriesControllers.controller('ProfileCtrl', ['$scope', '$http', '$filter', '$routeParams', function ($scope, $http, $filter, $routeParams) {
   $http.get('/bower_components/world-countries/countries.json', { cache: true }).success(function(data) {
      // find the country using filter and common name
      $scope.country = $filter('filter')(data, function(item) {
         return item.name.common === $routeParams.countryName;
   })[0];
   

   // get Flickr images
   $http({
      method: 'GET',
      cache: true,
      url: 'https://api.flickr.com/services/rest',
      params: {
         method: 'flickr.photos.search',
         api_key: 'fb4aacb85679883135400f881e7540be',
         restrict: 'orientation',
         orientation: 'landscape',
         text: $routeParams.countryName,
         tags: $routeParams.countryName,
         sort: 'interestingness-desc',
         format: 'json',
         nojsoncallback: 1
      }
   }).success(function(data){
      $scope.flickr = data;
   }).error(function(error) {
      console.log(error);
   })
   
   
   $scope.who_code_map = {
      'WHS9_86': 'Population (in thousands) total',
      'WHS9_97': 'Annual population growth rate (%)',
      'WHS9_85': 'Literacy rate among adults aged >= 15 years (%)',
      'WHS9_96': 'Population living in urban areas (%)',
      'WHOSIS_000001': 'Life expectancy at birth (years)',
      'WHOSIS_000003': 'Neonatal mortality rate (per 1000 live births)',
      'WHOSIS_000006': 'Infants exclusively breastfed for the first six months of life (%)',
      'WHS9_93': 'Gross national income per capita (PPP int. $)',
      'WHOSIS_000011': 'Alcohol consumption among adults aged ?15 years (litres of pure alcohol per person per year)',
      'SA_0000001472': 'Alcohol-related injury mortality, per 1,000',
      'SA_0000001473': 'Alcohol-related disease mortality, per 100,000 (15+ years)',
      'SA_0000001471': 'Road traffic crashes involving alcohol, % of all traffic crashes',
      'WHOSIS_000012': 'Prevalence of smoking any tobacco product among adults (?15 years) (%)',
      'WHOSIS_000008': 'Children aged <5 years underweight (%)',
      'MDG_0000000028': 'Population below minimum level of dietary energy consumption',
      'WHOSIS_000009': 'Children aged <5 years overweight (%)',
      'WHOSIS_000010': 'Adults aged ? 20 years who are obese (%)',
      'WHS3_40': 'Cholera - number of reported cases',
      'WHS3_47': 'Meningitis - number of reported cases',
      'WHS3_48': 'Malaria - number of reported confirmed cases',
      'WHS2_152': 'Deaths due to malaria (per 100 000 population)',
      'WHS2_138': 'Deaths due to HIV/AIDS (per 100 000 population)',
      'WHS6_102': 'Hospital beds (per 10 000 population)',
      'WHS6_125': 'Physicians density (per 10 000 population)',
      'WHS6_144': 'Dentistry personnel density (per 10 000 population)',
      'WHS2_160': 'Age-standardized mortality rate by cause (per 100 000 population) - Cancer',
      'WHS2_161': 'Age-standardized mortality rate by cause (per 100 000 population) - Cardiovascular',
      'WHS2_162': 'Age-standardized mortality rate by cause (per 100 000 population) - Injuries',
      'WHS2_163': 'Age-standardized mortality rate by cause (per 100 000 population) - Noncommunicable',
   }
   
   /**
      WHS9_86	Population (in thousands) total		
      WHS9_97	Annual population growth rate (%)		
      WHS9_85	Literacy rate among adults aged >= 15 years (%)		
      WHS9_96	Population living in urban areas (%)
   **/
   var who_q_general = 'WHS9_86,WHS9_97,WHS9_85,WHS9_96,';
   /**
      WHOSIS_000001	Life expectancy at birth (years)
      WHOSIS_000003	Neonatal mortality rate (per 1000 live births)		
      WHOSIS_000006	Infants exclusively breastfed for the first six months of life (%)  
   **/
   var who_q_life_ex = 'WHOSIS_000001,WHOSIS_000003,WHOSIS_000006,';
   /**
      WHS9_93	Gross national income per capita (PPP int. $) 
   **/
   var who_q_economy = 'WHS9_93,';
   /** 
      WHOSIS_000011	Alcohol consumption among adults aged ?15 years (litres of pure alcohol per person per year)
      SA_0000001472	Alcohol-related injury mortality, per 1,000		
      SA_0000001473	Alcohol-related disease mortality, per 100,000 (15+ years)
      SA_0000001471	Road traffic crashes involving alcohol, % of all traffic crashes		
      WHOSIS_000012	Prevalence of smoking any tobacco product among adults (?15 years) (%)
   **/
   var who_q_habits = 'WHOSIS_000011,SA_0000001472,SA_0000001473,SA_0000001471,WHOSIS_000012,';
   /** 
      WHOSIS_000008	Children aged <5 years underweight (%)
      MDG_0000000028	Population below minimum level of dietary energy consumption		
      WHOSIS_000009	Children aged <5 years overweight (%)		
      WHOSIS_000010	Adults aged ? 20 years who are obese (%)	
   **/
   var who_q_diet = 'WHOSIS_000008,MDG_0000000028,WHOSIS_000009,WHOSIS_000010,';
   /** 
      WHS3_40 Cholera - number of reported cases
      WHS3_47 Meningitis - number of reported cases
      WHS3_48 Malaria - number of reported confirmed cases
      WHS2_152	Deaths due to malaria (per 100 000 population)		
      WHS2_138	Deaths due to HIV/AIDS (per 100 000 population)
   **/
   var who_q_disease = 'WHS3_40,WHS3_47,WHS3_48,WHS2_138,WHS2_152,';
   /**
      WHS6_102	Hospital beds (per 10 000 population)
      WHS6_125	Physicians density (per 10 000 population)		
      WHS6_144	Dentistry personnel density (per 10 000 population)
   **/
   var who_q_medical = 'WHS6_102,WHS6_125,WHS6_144,';
   /**
      WHS2_160	Age-standardized mortality rate by cause (per 100 000 population) - Cancer		
      WHS2_161	Age-standardized mortality rate by cause (per 100 000 population) - Cardiovascular		
      WHS2_162	Age-standardized mortality rate by cause (per 100 000 population) - Injuries		
      WHS2_163	Age-standardized mortality rate by cause (per 100 000 population) - Noncommunicable	
   **/
   var who_q_mortality = 'WHS2_160,WHS2_161,WHS2_162,WHS2_163,';
   
   // who_q_general MUST BE INCLUDED FIRST OR CHANGE IN VAR PARAMETERS NEEDED (? before first parameter)
   var who_query = who_q_general + who_q_economy + who_q_diet + who_q_habits + who_q_life_ex + who_q_disease + who_q_medical + who_q_mortality;
   var who_codes = ['WHS9_93','WHS9_86','WHS9_97','WHS9_85','WHS9_96','WHOSIS_000001','WHOSIS_000003','WHOSIS_000006','WHOSIS_000011','SA_0000001472','SA_0000001473','SA_0000001471','WHOSIS_000012','WHOSIS_000008','MDG_0000000028','WHOSIS_000009','WHOSIS_000010','WHS2_160','WHS2_161','WHS2_162','WHS2_163','WHS6_102', 'WHS6_125', 'WHS6_144', 'WHS3_40', 'WHS3_47', 'WHS3_48', 'WHS2_138', 'WHS2_152'];
   

   // get WHO data
   var url = 'http://apps.who.int/gho/athena/api/GHO/' + who_query + '?filter=COUNTRY:' + $scope.country.cca3 + '&format=json&callback=JSON_CALLBACK';
   $http.jsonp(url).success(function(data) {
      var whodata = data.fact;
      $scope.who = {};
      
      // THIS IS VERY SLOW!!!!
      // iterate over codes queried, stored in an array
      who_codes.forEach(function(code) {
         // iterate over returned data objects to find relevant ones
         for (var key in whodata) {
            // iterate over Dim array in each object, because the location of 
            // the GHO code seems random (WHO is a mess...)
            for (var i = 0; i < whodata[key].Dim.length; i++) {
               // if object GHO code matches, assign it to a scope object with
               // relevant code
               if (whodata[key].Dim[i].code === code) {
                  $scope.who[code] = whodata[key];
               }
            }
         }
      });
   }).error(function(error) {
      console.log(error);
   });
   
   });
}]);