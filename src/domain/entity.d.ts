export type EntityId = string;
export type EntityCreatedAt = Date;
export type EntityUpdatedAt = Date;

export interface IEntity {
  id: EntityId;
  createdAt: EntityCreatedAt;
  updatedAt: EntityUpdatedAt;
}
