import { create } from "zustand";
import Character from "./types/Character.tsx";
import Spell from "./types/Spell.tsx";
import axiosInstance from "./plugins/interceptor.ts";

interface StoreState {
  characters: Character[];
  character: Character;
  spells: Spell[];
  students: Character[];
  staff: Character[];
  error: any;
  getCharacters: () => Character[];
  getSpells: () => Spell[];
  getStudents: () => Character[];
  fetchCharacters: () => Promise<void>;
  fetchSpells: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  fetchHouseStudents: (house: string) => Promise<void>;
  fetchStaff: () => Promise<void>;
  fetchCharacterById: (id: string) => Promise<Character>;
  resetStudents: () => void;
}

const useStore = create<StoreState>((set) => ({
  characters: [],
  spells: [],
  staff: [],
  students: [],
  error: null,
  getCharacters: () => {
    const state = useStore.getState();
    return state.characters;
  },
  getSpells: () => {
    const state = useStore.getState();
    return state.spells;
  },
  getStudents: () => {
    const state = useStore.getState();
    return state.students;
  },
  // As a getter this does not seem to work
  getStaff: () => {
    const state = useStore.getState();
    return state.staff;
  },
  resetStudents: () => {
    set({ students : [] });
  },
  fetchCharacters: async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(`characters`);
      set({ characters: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchSpells: async () => {
    try {
      const { data } = await axiosInstance.get<Spell[]>(`spells`);
      set({ spells: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchStudents: async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(
        `characters/students`
      );
      set({ students: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchStaff: async () => {
    try {
      const { data } = await axiosInstance.get<Character[]>(`characters/staff`);
      set({ staff: data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchCharacterById: async (id: string) => {
    try {
      const { data } = await axiosInstance.get<Character[]>(`character/${id}`);
      set({ character: data[0] });
    } catch (error) {
      console.error(error);
    }
  },
  fetchHouseStudents: async (house: string) => {
    try {
      const { data } = await axiosInstance.get<Character[]>(
        `characters/house/${house}`
      );
      set({ students: data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useStore;
