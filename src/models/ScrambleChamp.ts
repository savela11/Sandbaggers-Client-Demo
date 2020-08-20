export interface IScrambleChamp {
  id: string
  fullName: string
  image: string
}

export class ScrambleChamp implements IScrambleChamp {
  id: string
  fullName: string
  image: string

  constructor(_id: string, _fullName: string, _image: string) {
    this.id = _id
    this.fullName = _fullName
    this.image = _image
  }
}
