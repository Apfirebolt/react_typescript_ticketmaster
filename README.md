![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%23000000.svg?style=for-the-badge&logo=zustand&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer--motion-%23000000.svg?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

# Harry Potter Info App in React using TailwindCSS

A web application that provides detailed information about the Harry Potter universe. It uses the Harry Potter API to fetch real-time data about characters, spells, and houses. You can find more information about the API [here](https://hp-api.onrender.com/api/).

The app is available for the time being on https://react-harry-potter-nu.vercel.app

## Features

* List of all characters, with the ability to search for a specific character.
* Detailed information about spells used in the Harry Potter series.
* Information about the four Hogwarts houses.

## Project Screenshots

### Character List
![Character Details](screenshots/2.png)

### Spells List
![Spells List](screenshots/3.png)

### Houses List
![Houses List](screenshots/2.png)

## Technologies used

* React - For UI development
* Tailwind CSS - For CSS component styling
* Zustand - For data store management
* Framer-Motion - For smooth page transitions and other animations

## State Management using zustand

Zustand is a small, fast, and scalable state management solution for React applications. It provides a simple API and leverages hooks to manage state in a more intuitive way compared to traditional state management libraries.

Unlike React Redux, which relies on a centralized store and actions to update the state, Zustand allows you to create multiple stores and directly mutate the state within the store. This can lead to more concise and readable code. Additionally, Zustand does not require boilerplate code such as action creators and reducers, making it easier to set up and use.

Below is a concise example of creating a store from Zustand and manipulating values from the API call.

```Typescript
import { create } from "zustand";
import Character from "./types/Character.tsx";
import Spell from "./types/Spell.tsx";
import axiosInstance from "./plugins/interceptor.ts";

interface StoreState {
  characters: Character[];
  character: Character;
  getCharacters: () => Character[];
  getSpells: () => Spell[];
  getStudents: () => Character[];
  fetchCharacters: () => Promise<void>;
  fetchSpells: () => Promise<void>;
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
}));

export default useStore;

```

## Running the Project

To run the project locally, follow these steps:

1. **Clone the repository**:
  ```sh
  git clone https://github.com/apfirebolt/react_harry_potter.git
  cd react_harry_potter
  ```

2. **Install dependencies**:
  ```sh
  npm install
  ```

3. **Start the development server**:
  ```sh
  npm run dev
  ```

4. **Open your browser** and navigate to `http://localhost:3000` to see the application running.

For a production build, you can run:
```sh
npm run build
```
This will create an optimized build of the application in the `dist` folder.

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Thank you for your contributions!
