import { create } from "zustand";
import type { Event, EventResponse } from "./types/Event.tsx";
import type { VenueResponse, Venue } from "./types/Venue.tsx";
import type { Attraction, AttractionResponse } from "./types/Attraction.tsx";
import axiosInstance from "./plugins/interceptor.ts";

interface StoreState {
  events: Event[];
  venues: Venue[];
  loading: boolean;
  attractions: Attraction[];
  error: any;
  getEvents: () => Event[];
  getVenues: () => Venue[];
  getAttractions: () => Attraction[];
  getVenuesAction: () => Promise<void>;
  getEventsAction: () => Promise<void>;
  getAttractionsAction: () => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  events: [],
  venues: [],
  attractions: [],
  error: null,
  getEvents: () => {
    const state = useStore.getState();
    return state.events;
  },
  getVenues: () => {
    const state = useStore.getState();
    return state.venues;
  },
  getAttractions: () => {
    const state = useStore.getState();
    return state.attractions;
  },
  getVenuesAction : async (searchQuery: string = "") => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get<VenueResponse>(
        `venues.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*&keyword=${searchQuery}`
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
  getEventsAction : async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get<EventResponse>(
        `events.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
      );
      set({ events: response.data._embedded.events });
    } catch (error) {
      console.error("Error fetching events:", error);
      set({ error: "Failed to load events" });
    } finally {
      set({ loading: false });
    }
  },
  getAttractionsAction : async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get<AttractionResponse>(
        `attractions.json?apikey=${import.meta.env.VITE_APP_KEY}&locale=*`
      );
      set({ attractions: response.data._embedded.attractions });
    } catch (error) {
      console.error("Error fetching attractions:", error);
      set({ error: "Failed to load attractions" });
    } finally {
      set({ loading: false });
    }
  }
}));

export default useStore;
