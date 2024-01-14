export abstract class KeyHandler<T extends object> {
  protected getObjectKeys(obj: T): string[] {
    return this.transformKeys(Object.keys(obj));
  }

  private transformKeys(keys: string[]): string[] {
    return keys.map((key) => this.capitalizeFirstLetterAndAddSpace(key));
  }

  private capitalizeFirstLetterAndAddSpace(key: string): string {
    const words = key.split(/(?=[A-Z])/);
    if (words.length > 1) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      return words.join(' ');
    }
    return key;
  }
}
