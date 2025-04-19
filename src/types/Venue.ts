export interface VenueResponse {
  _embedded: {
    venues: Venue[];
  };
  _links: {
    first: Link;
    self: Link;
    next: Link;
    last: Link;
  };
  page: Page;
}

export interface Venue {
  name: string;
  type: string;
  id: string;
  test: boolean;
  url: string;
  locale: string;
  postalCode?: string;
  timezone?: string;
  city: City;
  state?: State;
  country: Country;
  address?: Address;
  location?: Location;
  markets?: Market[];
  dmas?: DMA[];
  boxOfficeInfo?: BoxOfficeInfo;
  parkingDetail?: string;
  accessibleSeatingDetail?: string;
  generalInfo?: GeneralInfo;
  images?: Image[];
  upcomingEvents: UpcomingEvents;
  _links: {
    self: Link;
  };
}

export interface City {
  name: string;
}

export interface State {
  name: string;
  stateCode: string;
}

export interface Country {
  name: string;
  countryCode: string;
}

export interface Address {
  line1: string;
  line2?: string;
}

export interface Location {
  longitude: string;
  latitude: string;
}

export interface Market {
  id: string;
}

export interface DMA {
  id: number;
  name: string;
}

export interface BoxOfficeInfo {
  phoneNumberDetail?: string;
  openHoursDetail?: string;
  acceptedPaymentDetail?: string;
  willCallDetail?: string;
}

export interface GeneralInfo {
  generalRule?: string;
  childRule?: string;
}

export interface Link {
  href: string;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface UpcomingEvents {
  ticketmaster?: number;
  _total: number;
  _filtered: number;
  [key: string]: number | undefined;
}

export interface Image {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
  attribution?: string;
}
