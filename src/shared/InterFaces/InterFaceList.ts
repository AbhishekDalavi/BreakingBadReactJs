export interface CharacterModal{
    char_id: number;
    name: string;
    birthday: string;
    occupation?: (string)[] | null;
    img: string;
    isFavorite: boolean;
    status: string;
    nickname: string;
    appearance?: (number)[] | null;
    portrayed: string;
    category: string;
    better_call_saul_appearance?: (null)[] | null;
  }
export interface ApiCallObjModal{
    method:string, 
    data:object | null, 
    url:string
}
