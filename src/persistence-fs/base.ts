import path from "path";
import { promises as fsPromises } from "fs";
import { v4 as uuid } from "uuid";

interface EntityPersistence {
  id: string;
  createdAt: number;
  updatedAt: number;
}

export class Persistence<T, K extends T & EntityPersistence> {
  private filename: string;

  constructor(filename: string) {
    this.filename = path.join(__dirname, `/${filename}.json`);
    this.checkInitialized();
  }

  private async checkInitialized(): Promise<void> {
    try {
      await fsPromises.access(this.filename);
    } catch (error) {
      this.saveFileData([]);
    }
  }

  private async getFileData(): Promise<K[]> {
    const data = await fsPromises.readFile(this.filename, "utf8");
    return JSON.parse(data);
  }

  private async saveFileData(data: K[]): Promise<void> {
    await fsPromises.writeFile(this.filename, JSON.stringify(data), "utf8");
  }

  async getAll(): Promise<K[]> {
    return await this.getFileData();
  }

  async getOneById(id: string): Promise<K> {
    const elements = await this.getFileData();
    const element = elements.find((element) => element.id === id);

    if (!element) throw new Error("Element not found");
    return element;
  }

  async create(newElement: T): Promise<K> {
    const id: string = uuid();
    const createdAt: number = new Date().getTime();
    const updatedAt: number = createdAt;

    const elementToSave = {
      id: id,
      ...newElement,
      createdAt: createdAt,
      updatedAt: updatedAt,
    } as K;

    const elements = await this.getFileData();
    elements.push(elementToSave);

    await this.saveFileData(elements);
    return elements[elements.length - 1];
  }

  async updateById(id: string, elementProperties: T): Promise<T> {
    const elements = await this.getFileData();
    const elementIndex = elements.findIndex((element) => element.id === id);

    if (elementIndex === -1) throw new Error("Element not found");

    elements[elementIndex] = {
      ...elements[elementIndex],
      ...elementProperties,
      updatedAt: new Date().getTime(),
    };

    await this.saveFileData(elements);
    return elements[elementIndex];
  }

  async deleteById(id: string): Promise<void> {
    const elements = await this.getFileData();
    const elementIndex = elements.findIndex((element) => element.id === id);

    if (elementIndex === -1) throw new Error("Element not found");

    elements.splice(elementIndex, 1);
    await this.saveFileData(elements);
  }
}
