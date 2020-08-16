export default type Pokemon = {
  id: number;
  name: string;
  classification: string;
  types: Type[];
  resistant: Type[];
  weaknesses: Type[];
  weight: {
    minimum: Weight;
    maximum: Weight;
  };
  height: {
    minimum: Height;
    maximum: Height;
  };
  fleeRate: number;
  evolutionRequirements?: {
    amount: number;
    name: string;
  };
  previousEvolutions: Pokemon[];
  evolutions: Pokemon[];
  maxCP: number;
  maxHP: number;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
};