import type { IEntity } from "../../domain/entity";

import path from "path";
import { promises as fsPromises } from "fs";
import { v4 as uuid } from "uuid";

export default class FileContainer<T extends IEntity> {
  private filename: string;

  constructor(filename: string) {
    this.filename = path.join(__dirname, `/${filename}`);
    this.checkInitialized();
  }

  private async checkInitialized(): Promise<void> {
    try {
      await fsPromises.access(this.filename);
    } catch (error) {
      this.saveFileData([]);
    }
  }

  private async getFileData(): Promise<T[]> {
    const data = await fsPromises.readFile(this.filename, "utf8");
    return JSON.parse(data);
  }

  private async saveFileData(data: T[]): Promise<void> {
    await fsPromises.writeFile(this.filename, JSON.stringify(data), "utf8");
  }

  async findAll(): Promise<T[]> {
    return await this.getFileData();
  }

  async findById(id: string): Promise<T> {
    const elements = await this.getFileData();
    const element = elements.find((element) => element.id === id);

    if (!element) throw new Error("Element not found");
    return element;
  }

  async create(newElement: Omit<T, keyof IEntity>): Promise<T> {
    const id: string = uuid();
    const createdAt: number = new Date().getTime();
    const updatedAt: number = createdAt;

    const elementToSave = {
      id: id,
      createdAt: createdAt,
      updatedAt: updatedAt,
      ...newElement,
    };

    const elements = await this.getFileData();
    elements.push(elementToSave as unknown as T);

    await this.saveFileData(elements);
    return elements[elements.length - 1];
  }

  async updateById(id: string, elementProperties: Partial<T>): Promise<T> {
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
