export interface AttractionResponse {
    _embedded: {
        attractions: Attraction[];
    };
    _links: {
        first: Link;
        self: Link;
        next: Link;
        last: Link;
    };
    page: Page;
}

export interface Attraction {
    name: string;
    type: string;
    id: string;
    test: boolean;
    url: string;
    locale: string;
    externalLinks?: ExternalLinks;
    aliases?: string[];
    images: Image[];
    classifications: Classification[];
    upcomingEvents: UpcomingEvents;
    _links: {
        self: Link;
    };
}

export interface ExternalLinks {
    youtube?: ExternalLink[];
    twitter?: ExternalLink[];
    itunes?: ExternalLink[];
    lastfm?: ExternalLink[];
    spotify?: ExternalLink[];
    facebook?: ExternalLink[];
    wiki?: ExternalLink[];
    instagram?: ExternalLink[];
    musicbrainz?: MusicBrainz[];
    homepage?: ExternalLink[];
}

export interface ExternalLink {
    url: string;
}

export interface MusicBrainz {
    id: string;
    url: string;
}

export interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
    attribution?: string;
}

export interface Classification {
    primary: boolean;
    segment: Segment;
    genre: Segment;
    subGenre: Segment;
    type: Segment;
    subType: Segment;
    family: boolean;
}

export interface Segment {
    id: string;
    name: string;
}

export interface UpcomingEvents {
    ticketmaster?: number;
    _total: number;
    _filtered: number;
    [key: string]: number | undefined;
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
