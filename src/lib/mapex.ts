
export interface Cinema {
    fsq_id: string;
    categories: [
      {
        id: number,
        name: string,
        short_name: string,
        plural_name: string,
        icon: {
          prefix: string,
          suffix: string
        }
      }
    ],
    chains: Array<any>,
    closed_bucket: string,
    distance: number,
    geocodes: {
      drop_off: {
        latitude: number,
        longitude:number
      },
      "main": {
        "latitude": 26.16353,
        "longitude": 91.772833
      }
    },
    link: string,
    location: {
      address: string,
      country: string,
      cross_street: string,
      formatted_address: string,
      locality: string,
      postcode: string,
      region: string
    },
    name: string,
    related_places: {},
    timezone: string
}