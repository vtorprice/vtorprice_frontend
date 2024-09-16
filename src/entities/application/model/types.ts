import { companyModel } from '@box/entities/company';
import { TStatus } from '@types';

export interface IRecyclableApplication {
  id: number;
  isDeleted: boolean;
  isFavorite: boolean;
  company: companyModel.ICompany;
  recyclables: companyModel.ICompanyRecyclable['recyclables'];
  totalWeight: number;
  totalPrice: number;
  ndsAmount: number;
  images: Array<{
    id: number,
    image: string
  }>;
  createdAt: Date;
  status: TStatus;

  volume: number;
  dealType: {
    id: 1 | 2 | number,
    label: string
  };
  urgencyType: {
    id: 1 | 2 | number,
    label: string
  };
  withNds: boolean;
  baleCount: number;
  baleWeight: number;
  price: number;
  lotSize: number;
  isPackingDeduction: boolean;
  packingDeductionValue?: number,
  packingDeductionType: {
    id: 1 | 2 | number,
    label: string
  };
  weediness: string;
  moisture: string;
  videoUrl: string;
  comment: string;
  address: string;
  latitude: number;
  longitude: number;
  city: number;
  fullWeigth: number;
  myOffer: {
    chat: {
      id: number
    };
    amount: number;
    shippingDate: Date
  }
}

export interface IEquipmentApplication {
  id: number;
  isDeleted: boolean;
  company: companyModel.ICompany;
  equipment: IEquipment;
  price: number;
  ndsAmount: number;
  images: Array<{
    id: number,
    image: string
  }>;
  isFavorite: boolean;
  createdAt: Date;
  address: string;
  latitude: number;
  longitude: number;
  status: TStatus;
  dealType: {
    id: 1 | 2 | number,
    label: string
  };
  withNds: boolean;
  count: number;
  manufactureDate: string;
  wasInUse: boolean;
  saleByParts: boolean;
  videoUrl: string;
  comment: string;
  city: number;
}

export interface IEquipment {
  id:number,
  isDeleted:boolean,
  category: IShortEquipmentCategory,
  createdAt:Date,
  name:string,
  description:string 
}

export interface IShortEquipmentCategory {
  id: number,
  isDeleted: boolean,
  createdAt: Date,
  name: string,
  image: string,
  readOnly: true,
  lft: number,
  rght: number,
  treeId: number,
  level: number, 
  parent: number,
}
export interface IEquipmentCategory {
  createdAt: Date,
  id: number,
  isDeleted: boolean,
  level: number, 
  lft: number,
  name: string,
  rght: number,
  treeId: number,
  equipments: Array<IEquipment>,
  subcategories: Array<any>,
}
