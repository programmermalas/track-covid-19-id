import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Card from '../components/Card';

class Search extends Component {
  state = {
    search: null,
    data: null,
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  };

  searchHandler = event => {
    if ( !event.target.value ) {
      this.setState( { data: null } );
    }

    axios.get( `https://covid19.mathdro.id/api/countries/${ event.target.value }` )
    .then( ( { data } ) => {
      const cases = data.confirmed.value;
      const recovered = data.recovered.value;
      const deaths = data.deaths.value;
      const convertDate = new Date( data.lastUpdate ).getTime();
      const date = new Date( convertDate );
      const lastUpdate = `${ this.state.days[ date.getDay() ] }, ${ date.getDate() } ${ this.state.months[ date.getMonth() ] } ${ date.getFullYear() }`;

      this.setState( { data: { cases, recovered, deaths, lastUpdate } } );
    })
    .catch( ( error ) => {
      // console.log(error);
    });

    this.setState( { search: event.target.value } );
  };

  render() {
    return(
      <Fragment>
        <form className="w-full py-2 px-1">
          <div className="border-b-4 border-gray-800">
            <input className="bg-transparent border-none w-full text-gray-800 placeholder-gray-800 text-4xl font-extrabold focus:outline-none border-" type="text" placeholder="Search your country" value={ this.state.search ?? "" } onChange={ this.searchHandler } />
          </div>
        </form>

        { 
          this.state.data 
          ? 
          (
            <div className="flex flex-wrap items-center justify-center">
              <Card count={ Number(this.state.data.cases).toLocaleString() } title={ "Cases" } updated={ this.state.data.lastUpdate } />

              <Card count={ Number(this.state.data.recovered).toLocaleString() } title={ "Recovered" } updated={ this.state.data.lastUpdate }>
                <span className="bg-teal-600 text-gray-200 px-2 rounded-full text-sm">
                  { ( this.state.data.recovered / this.state.data.cases * 100 ).toFixed( 1 ) }% Recovery Rate
                </span>
              </Card>

              <Card count={ Number(this.state.data.deaths).toLocaleString() } title={ "Deaths" } updated={ this.state.data.lastUpdate }>
                <span className="bg-pink-600 text-gray-200 px-2 rounded-full text-sm">
                  { ( this.state.data.deaths / this.state.data.cases * 100 ).toFixed( 1 ) }% Fatality Rate
                </span>
              </Card>
            </div>
          )
          :
          null
        }
      </Fragment>
    );
  };
};

export default Search;