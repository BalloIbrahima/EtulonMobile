export class Fichier {

  nom: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
