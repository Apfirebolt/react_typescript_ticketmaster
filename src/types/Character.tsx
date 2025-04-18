interface Character {
  id: string;
  name: string;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
  actor: string;
  image: string;
  alive: boolean;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  alternate_names: string[];
  alternate_actors: string[];
  yearOfBirth: number;
}

export default Character;
