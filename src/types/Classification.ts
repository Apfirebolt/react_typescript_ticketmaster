export interface Classification {
    primary: boolean;
    segment: Segment;
    genre?: Genre;
    subGenre?: SubGenre;
    type?: Type;
    subType?: SubType;
    family: boolean;
}

export interface Link {
    href: string;
}

export interface ClassificationResponse {
    classifications: Classification[];
    _embedded: {
        segments: Segment[];
        genres: Genre[];
        subGenres: SubGenre[];
        types: Type[];
        subTypes: SubType[];
    };
    _links: {
        self: Link;
    };
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
