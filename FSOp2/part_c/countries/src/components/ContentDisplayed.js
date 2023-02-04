// Content Displayed Component
// determines what is rendered

import ShowCountries from "./ShowCountries"
import ShowCountryInfo from "./ShowCountryInfo"
import {many, none, noMatch} from "./Misc"

// determines what content will be rendered
const CountriesDisplayed = ({filter, countries, setFilter}) => {

  // if nothing is entered in filter form
  if (filter.length === 0) {
    return(none())
  }

  if (countries.length === 1) {
    return(
      countries.map(country => 
        <ShowCountryInfo key={country.name.common} country={country} />
      )
    )
  }
  else if (countries.length <= 10 && countries.length > 0) {
    return(
      countries.map(country => 
        <ShowCountries key={country.name.common} country={country} setFilter={setFilter}/>
      )
    )
  }
  else if (countries.length === 0){
    return(noMatch())
  }
  else {
    return(many())
  }
}


export default CountriesDisplayed