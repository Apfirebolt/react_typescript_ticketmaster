import { create } from "zustand";
import type { Event, EventResponse } from "./types/Event.tsx";
import type { VenueResponse, Venue } from "./types/Venue.tsx";
import type { Attraction, AttractionResponse } from "./types/Attraction.tsx";
import axiosInstance from "./plugins/interceptor.ts";

interface PaginationLinks {
  first: {
    href: string;
  };
  self: {
    href: string;
  };
  next: {
    href: string;
  };
  last: {
    href: string;
  };
}

interface StoreState {
  events: Event[];
  venues: Venue[];
  loading: boolean;
  attractions: Attraction[];
  links: PaginationLinks;
  error: any;
  getEvents: () => Event[];
  getVenues: () => Venue[];
  getAttractions: () => Attraction[];
  getVenuesAction: () => Promise<void>;
  getEventsAction: () => Promise<void>;
  getAttractionsAction: () => Promise<void>;
}

const useEventStore = create<StoreState>((set) => ({
  events: [],
  venues: [],
  attractions: [],
  error: null,
  getEvents: () => {
    const state = useEventStore.getState();
    return state.events;
  },
  getVenues: () => {
    const state = useEventStore.getState();
    return state.venues;
  },
  getAttractions: () => {
    const state = useEventStore.getState();
    return state.attractions;
  },
  getVenuesAction : async (searchQuery: string = "", page: number = 1) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get<VenueResponse>(
        `venues.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*&keyword=${searchQuery}&page=${page}`
      );
      if (response.data._embedded.venues.length === 0) {
        set({ error: "No venues found" });
        return;
      }
      set({ venues: response.data._embedded.venues });
    } catch (error) {
      console.error("Error fetching venues:", error);
      set({ error: "Failed to load venues" });
    } finally {
      set({ loading: false });
    }
  },
  getEventsAction : async (searchQuery: string = "", page: number = 1) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get<EventResponse>(
        `events.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*&keyword=${searchQuery}&page=${page}`
      );
      if (response.data._embedded.events.length === 0) {
        set({ error: "No events found" });
        return;
      }
      // set pagination links
      set({ links: response.data._links });
      set({ events: response.data._embedded.events });
    } catch (error) {
      console.error("Error fetching events:", error);
      set({ error: "Failed to load events" });
    } finally {
      set({ loading: false });
    }
  },
  getAttractionsAction : async (searchQuery: string = "", page: number = 1) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get<AttractionResponse>(
        `attractions.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*&keyword=${searchQuery}&page=${page}`
      );
      if (response.data._embedded.attractions.length === 0) {
        set({ error: "No attractions found" });
        return;
      }
      if (response.data._embedded.attractions.length > 0) {
        set({ error: null });
      }
      set({ attractions: response.data._embedded.attractions });
    } catch (error) {
      console.error("Error fetching attractions:", error);
      set({ error: "Failed to load attractions" });
    } finally {
      set({ loading: false });
    }
  }
}));

export default useEventStore;
