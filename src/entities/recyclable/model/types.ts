export interface IRecyclable {
  id: number;
  isDeleted: boolean;
  createdAt: Date;
  name: string;
  description: string;
  category: IRecyclableCategory
}

export interface IRecyclableCategory {
  id: number;
  isDeleted: boolean;
  createdAt: Date;
  name: string;
  lft: number;
  rght: number;
  treeId: number;
  level: number;
  parent: number;
}
