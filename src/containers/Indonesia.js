import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Card from '../components/Card';

class Indonesia extends Component {
  state = {
    cases: 0,
    confirmend: 0,
    recovered: 0,
    deaths: 0,
    lastUpdate: null,
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

  componentDidMount() {
    axios.get('https://covid19.mathdro.id/api/countries/indonesia')
      .then( ( { data } ) => {
        const cases = data.confirmed.value;
        const recovered = data.recovered.value;
        const deaths = data.deaths.value;
        const convertDate = new Date( data.lastUpdate ).getTime();
        const date = new Date( convertDate );
        const lastUpdate = `${ this.state.days[ date.getDay() ] }, ${ date.getDate() } ${ this.state.months[ date.getMonth() ] } ${ date.getFullYear() }`;

        this.setState( { cases, recovered, deaths, lastUpdate } );
      } );
  };

  render() {
    return(
      <Fragment>
        <h1 className="text-4xl font-extrabold text-gray-800">Indonesia</h1>

        <div className="flex flex-wrap items-center justify-center">
          <Card count={ Number(this.state.cases).toLocaleString() } title={ "Cases" } updated={ this.state.lastUpdate } />

          <Card count={ Number(this.state.recovered).toLocaleString() } title={ "Recovered" } updated={ this.state.lastUpdate }>
            <span className="bg-teal-600 text-gray-200 px-2 rounded-full text-sm">
              { ( this.state.recovered / this.state.cases * 100 ).toFixed( 1 ) }% Recovery Rate
            </span>
          </Card>

          <Card count={ Number(this.state.deaths).toLocaleString() } title={ "Deaths" } updated={ this.state.lastUpdate }>
            <span className="bg-pink-600 text-gray-200 px-2 rounded-full text-sm">
              { ( this.state.deaths / this.state.cases * 100 ).toFixed( 1 ) }% Fatality Rate
            </span>
          </Card>
        </div>
      </Fragment>
    );
  };
};

export default Indonesia;