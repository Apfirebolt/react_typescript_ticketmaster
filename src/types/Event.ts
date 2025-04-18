import type { Venue } from './Venue.ts';
import type { Attraction } from './Attraction.ts';

export interface Link {
    href: string;
}

export interface Page {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
}

export interface Market {
    id: string;
}

export interface DMA {
    id: number;
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

export interface UpcomingEvents {
    _total: number;
    ticketmaster?: number;
    [key: string]: number | undefined;
}
export interface EventResponse {
    _embedded: {
        events: Event[];
    };
    _links: {
        first: Link;
        self: Link;
        next: Link;
        last: Link;
    };
    page: Page;
}

export interface Event {
    name: string;
    type: string;
    id: string;
    test: boolean;
    url: string;
    locale: string;
    images?: Image[];
    dates: Dates;
    classifications?: Classification[];
    promoter?: Promoter;
    promoters?: Promoter[];
    priceRanges?: PriceRange[];
    products?: Product[];
    seatmap?: SeatMap;
    accessibility?: Accessibility;
    ticketLimit?: TicketLimit;
    ageRestrictions?: AgeRestrictions;
    _embedded?: {
        venues: Venue[];
        attractions?: Attraction[];
    };
    _links: {
        self: Link;
    };
}

export interface Dates {
    start: StartDate;
    timezone?: string;
    status: Status;
    spanMultipleDays: boolean;
}

export interface StartDate {
    localDate: string;
    localTime?: string;
    dateTime?: string;
}

export interface Status {
    code: string;
}

export interface Classification {
    segment: Segment;
    genre?: Genre;
    subGenre?: SubGenre;
    type?: Type;
    subType?: SubType;
    family: boolean;
}

export interface Segment {
    id: string;
    name: string;
}

export interface Genre {
    id: string;
    name: string;
}

export interface SubGenre {
    id: string;
    name: string;
}

export interface Type {
    id: string;
    name: string;
}

export interface SubType {
    id: string;
    name: string;
}

export interface Promoter {
    id: string;
    name: string;
    description?: string;
}

export interface PriceRange {
    type: string;
    currency: string;
    min: number;
    max: number;
}

export interface Product {
    id: string;
    name: string;
    type: string;
    url: string;
}

export interface SeatMap {
    staticUrl: string;
}

export interface Accessibility {
    ticketLimit?: number;
}

export interface TicketLimit {
    info?: string;
}

export interface AgeRestrictions {
    legalAgeEnforced: boolean;
}