const stationList = {
  '?xml': {
    '@version': '1.0',
    '@encoding': 'utf-8',
  },
  root: {
    uri: {
      '#cdata-section': 'http://api.bart.gov/api/stn.aspx?cmd=stns&json=y',
    },
    stations: {
      station: [
        {
          name: '12th St. Oakland',
          abbr: '12TH',
          gtfs_latitude: '37.803768',
          gtfs_longitude: '-122.271450',
          address: '1245 Broadway',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94612',
        },
        {
          name: '16th St. Mission',
          abbr: '16TH',
          gtfs_latitude: '37.765062',
          gtfs_longitude: '-122.419694',
          address: '2000 Mission Street',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94110',
        },
        {
          name: '19th St. Oakland',
          abbr: '19TH',
          gtfs_latitude: '37.808350',
          gtfs_longitude: '-122.268602',
          address: '1900 Broadway',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94612',
        },
        {
          name: '24th St. Mission',
          abbr: '24TH',
          gtfs_latitude: '37.752470',
          gtfs_longitude: '-122.418143',
          address: '2800 Mission Street',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94110',
        },
        {
          name: 'Ashby',
          abbr: 'ASHB',
          gtfs_latitude: '37.852803',
          gtfs_longitude: '-122.270062',
          address: '3100 Adeline Street',
          city: 'Berkeley',
          county: 'alameda',
          state: 'CA',
          zipcode: '94703',
        },
        {
          name: 'Balboa Park',
          abbr: 'BALB',
          gtfs_latitude: '37.721585',
          gtfs_longitude: '-122.447506',
          address: '401 Geneva Avenue',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94112',
        },
        {
          name: 'Bay Fair',
          abbr: 'BAYF',
          gtfs_latitude: '37.696924',
          gtfs_longitude: '-122.126514',
          address: '15242 Hesperian Blvd.',
          city: 'San Leandro',
          county: 'alameda',
          state: 'CA',
          zipcode: '94578',
        },
        {
          name: 'Castro Valley',
          abbr: 'CAST',
          gtfs_latitude: '37.690746',
          gtfs_longitude: '-122.075602',
          address: '3301 Norbridge Dr.',
          city: 'Castro Valley',
          county: 'alameda',
          state: 'CA',
          zipcode: '94546',
        },
        {
          name: 'Civic Center/UN Plaza',
          abbr: 'CIVC',
          gtfs_latitude: '37.779732',
          gtfs_longitude: '-122.414123',
          address: '1150 Market Street',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94102',
        },
        {
          name: 'Coliseum',
          abbr: 'COLS',
          gtfs_latitude: '37.753661',
          gtfs_longitude: '-122.196869',
          address: '7200 San Leandro St.',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94621',
        },
        {
          name: 'Colma',
          abbr: 'COLM',
          gtfs_latitude: '37.684638',
          gtfs_longitude: '-122.466233',
          address: '365 D Street',
          city: 'Colma',
          county: 'sanmateo',
          state: 'CA',
          zipcode: '94014',
        },
        {
          name: 'Concord',
          abbr: 'CONC',
          gtfs_latitude: '37.973737',
          gtfs_longitude: '-122.029095',
          address: '1451 Oakland Avenue',
          city: 'Concord',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94520',
        },
        {
          name: 'Daly City',
          abbr: 'DALY',
          gtfs_latitude: '37.70612055',
          gtfs_longitude: '-122.4690807',
          address: '500 John Daly Blvd.',
          city: 'Daly City',
          county: 'sanmateo',
          state: 'CA',
          zipcode: '94014',
        },
        {
          name: 'Downtown Berkeley',
          abbr: 'DBRK',
          gtfs_latitude: '37.870104',
          gtfs_longitude: '-122.268133',
          address: '2160 Shattuck Avenue',
          city: 'Berkeley',
          county: 'alameda',
          state: 'CA',
          zipcode: '94704',
        },
        {
          name: 'Dublin/Pleasanton',
          abbr: 'DUBL',
          gtfs_latitude: '37.701687',
          gtfs_longitude: '-121.899179',
          address: '5801 Owens Dr.',
          city: 'Pleasanton',
          county: 'alameda',
          state: 'CA',
          zipcode: '94588',
        },
        {
          name: 'El Cerrito del Norte',
          abbr: 'DELN',
          gtfs_latitude: '37.925086',
          gtfs_longitude: '-122.316794',
          address: '6400 Cutting Blvd.',
          city: 'El Cerrito',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94530',
        },
        {
          name: 'El Cerrito Plaza',
          abbr: 'PLZA',
          gtfs_latitude: '37.902632',
          gtfs_longitude: '-122.298904',
          address: '6699 Fairmount Avenue',
          city: 'El Cerrito',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94530',
        },
        {
          name: 'Embarcadero',
          abbr: 'EMBR',
          gtfs_latitude: '37.792874',
          gtfs_longitude: '-122.397020',
          address: '298 Market Street',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94111',
        },
        {
          name: 'Fremont',
          abbr: 'FRMT',
          gtfs_latitude: '37.557465',
          gtfs_longitude: '-121.976608',
          address: '2000 BART Way',
          city: 'Fremont',
          county: 'alameda',
          state: 'CA',
          zipcode: '94536',
        },
        {
          name: 'Fruitvale',
          abbr: 'FTVL',
          gtfs_latitude: '37.774836',
          gtfs_longitude: '-122.224175',
          address: '3401 East 12th Street',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94601',
        },
        {
          name: 'Glen Park',
          abbr: 'GLEN',
          gtfs_latitude: '37.733064',
          gtfs_longitude: '-122.433817',
          address: '2901 Diamond Street',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94131',
        },
        {
          name: 'Hayward',
          abbr: 'HAYW',
          gtfs_latitude: '37.669723',
          gtfs_longitude: '-122.087018',
          address: "699 'B' Street",
          city: 'Hayward',
          county: 'alameda',
          state: 'CA',
          zipcode: '94541',
        },
        {
          name: 'Lafayette',
          abbr: 'LAFY',
          gtfs_latitude: '37.893176',
          gtfs_longitude: '-122.124630',
          address: '3601 Deer Hill Road',
          city: 'Lafayette',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94549',
        },
        {
          name: 'Lake Merritt',
          abbr: 'LAKE',
          gtfs_latitude: '37.797027',
          gtfs_longitude: '-122.265180',
          address: '800 Madison Street',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94607',
        },
        {
          name: 'MacArthur',
          abbr: 'MCAR',
          gtfs_latitude: '37.829065',
          gtfs_longitude: '-122.267040',
          address: '555 40th Street',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94609',
        },
        {
          name: 'Millbrae',
          abbr: 'MLBR',
          gtfs_latitude: '37.600271',
          gtfs_longitude: '-122.386702',
          address: '200 North Rollins Road',
          city: 'Millbrae',
          county: 'sanmateo',
          state: 'CA',
          zipcode: '94030',
        },
        {
          name: 'Montgomery St.',
          abbr: 'MONT',
          gtfs_latitude: '37.789405',
          gtfs_longitude: '-122.401066',
          address: '598 Market Street',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94104',
        },
        {
          name: 'North Berkeley',
          abbr: 'NBRK',
          gtfs_latitude: '37.873967',
          gtfs_longitude: '-122.283440',
          address: '1750 Sacramento Street',
          city: 'Berkeley',
          county: 'alameda',
          state: 'CA',
          zipcode: '94702',
        },
        {
          name: 'North Concord/Martinez',
          abbr: 'NCON',
          gtfs_latitude: '38.003193',
          gtfs_longitude: '-122.024653',
          address: '3700 Port Chicago Highway',
          city: 'Concord',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94520',
        },
        {
          name: 'Oakland Intl. Airport',
          abbr: 'OAKL',
          gtfs_latitude: '37.713238',
          gtfs_longitude: '-122.212191',
          address: '4 Airport Drive',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94621',
        },
        {
          name: 'Orinda',
          abbr: 'ORIN',
          gtfs_latitude: '37.87836087',
          gtfs_longitude: '-122.1837911',
          address: '11 Camino Pablo',
          city: 'Orinda',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94563',
        },
        {
          name: 'Pittsburg/Bay Point',
          abbr: 'PITT',
          gtfs_latitude: '38.018914',
          gtfs_longitude: '-121.945154',
          address: '1700 West Leland Road',
          city: 'Pittsburg',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94565',
        },
        {
          name: 'Pleasant Hill',
          abbr: 'PHIL',
          gtfs_latitude: '37.928468',
          gtfs_longitude: '-122.056012',
          address: '1365 Treat Blvd.',
          city: 'Walnut Creek',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94597',
        },
        {
          name: 'Powell St.',
          abbr: 'POWL',
          gtfs_latitude: '37.784471',
          gtfs_longitude: '-122.407974',
          address: '899 Market Street',
          city: 'San Francisco',
          county: 'sanfrancisco',
          state: 'CA',
          zipcode: '94102',
        },
        {
          name: 'Richmond',
          abbr: 'RICH',
          gtfs_latitude: '37.936853',
          gtfs_longitude: '-122.353099',
          address: '1700 Nevin Avenue',
          city: 'Richmond',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94801',
        },
        {
          name: 'Rockridge',
          abbr: 'ROCK',
          gtfs_latitude: '37.844702',
          gtfs_longitude: '-122.251371',
          address: '5660 College Avenue',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94618',
        },
        {
          name: 'San Bruno',
          abbr: 'SBRN',
          gtfs_latitude: '37.637761',
          gtfs_longitude: '-122.416287',
          address: '1151 Huntington Avenue',
          city: 'San Bruno',
          county: 'sanmateo',
          state: 'CA',
          zipcode: '94066',
        },
        {
          name: 'San Fran Intl. Airport',
          abbr: 'SFIA',
          gtfs_latitude: '37.615966',
          gtfs_longitude: '-122.392409',
          address: 'International Terminal, Level 3',
          city: 'San Francisco International Airport',
          county: 'sanmateo',
          state: 'CA',
          zipcode: '94128',
        },
        {
          name: 'San Leandro',
          abbr: 'SANL',
          gtfs_latitude: '37.721947',
          gtfs_longitude: '-122.160844',
          address: '1401 San Leandro Blvd.',
          city: 'San Leandro',
          county: 'alameda',
          state: 'CA',
          zipcode: '94577',
        },
        {
          name: 'South Hayward',
          abbr: 'SHAY',
          gtfs_latitude: '37.634375',
          gtfs_longitude: '-122.057189',
          address: '28601 Dixon Street',
          city: 'Hayward',
          county: 'alameda',
          state: 'CA',
          zipcode: '94544',
        },
        {
          name: 'South San Francisco',
          abbr: 'SSAN',
          gtfs_latitude: '37.664245',
          gtfs_longitude: '-122.443960',
          address: '1333 Mission Road',
          city: 'South San Francisco',
          county: 'sanmateo',
          state: 'CA',
          zipcode: '94080',
        },
        {
          name: 'Union City',
          abbr: 'UCTY',
          gtfs_latitude: '37.590630',
          gtfs_longitude: '-122.017388',
          address: '10 Union Square',
          city: 'Union City',
          county: 'alameda',
          state: 'CA',
          zipcode: '94587',
        },
        {
          name: 'Walnut Creek',
          abbr: 'WCRK',
          gtfs_latitude: '37.905522',
          gtfs_longitude: '-122.067527',
          address: '200 Ygnacio Valley Road',
          city: 'Walnut Creek',
          county: 'contracosta',
          state: 'CA',
          zipcode: '94596',
        },
        {
          name: 'West Dublin/Pleasanton',
          abbr: 'WDUB',
          gtfs_latitude: '37.699756',
          gtfs_longitude: '-121.928240',
          address: '6501 Golden Gate Drive',
          city: 'Dublin',
          county: 'alameda',
          state: 'CA',
          zipcode: '94568',
        },
        {
          name: 'West Oakland',
          abbr: 'WOAK',
          gtfs_latitude: '37.804872',
          gtfs_longitude: '-122.295140',
          address: '1451 7th Street',
          city: 'Oakland',
          county: 'alameda',
          state: 'CA',
          zipcode: '94607',
        },
        {
          name: 'Warm Springs',
          abbr: 'WARM',
          gtfs_latitude: '37.502171',
          gtfs_longitude: '-121.939313',
          address: '45193 Warm Springs Blvd',
          city: 'Fremont',
          county: 'alameda',
          state: 'CA',
          zipcode: '94539',
        },
      ],
    },
    message: '',
  },
};

export default stationList;
