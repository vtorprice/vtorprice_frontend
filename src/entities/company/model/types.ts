import { TStatus } from '@box/types';
import { recyclableModel } from '@box/entities/recyclable';
import { ICity } from '../../city/model/types';

export interface IActivityTypeAdvantage {
  id: number;
  isDeleted: boolean;
  createdAt: Date;
  name: string;
  activity: TStatus;
}

export interface IActivityType {
  id: number;
  recColTypes: Array<IRecColType>;
  advantages: Array<IActivityTypeAdvantage>;
  allAdvantages: Array<IActivityTypeAdvantage>;
  activity: TStatus;
}

export interface ICompanyDocument {
  id: number;
  isDeleted: boolean;
  createdAt: Date;
  docType?: {
    id: number;
    label: string;
  };
  file: string;
  comment: string;
  company: number;
}

export interface ICompanyContact {
  id: number;
  isDeleted: boolean;
  createdAt: Date;
  contactType: TStatus;
  value: string;
  comment: string;
  company: number;
}

export interface IRecColType {
  id: number;
  isDeleted: boolean;
  createdAt: Date;
  name: string;
  activity: TStatus;
}
export interface ICompanyRecyclable {
  id: number;
  isDeleted: boolean;
  recyclables: recyclableModel.IRecyclable;
  createdAt: Date;
  action: TStatus;
  monthlyVolume: number;
  price: number;
  company: number;
}

export interface ICompanyMember {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  position: string;
  status: TStatus;
}

export interface ICompany {
  id: number;
  isDeleted: boolean;
  applicationTypes: Array<string>;
  activities: Array<string>;
  recyclablesType: string;
  isFavorite: boolean;
  documents: Array<ICompanyDocument>;
  contacts: Array<ICompanyContact>;
  city: ICity;
  createdAt: Date;
  name: string;
  description: string;
  inn: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  status: TStatus;
  recyclables: Array<ICompanyRecyclable>;
  activityTypes: Array<IActivityType>;
  recyclablesCount: number;
  employee?: ICompanyMember;
  owner?: ICompanyMember;
  withNds: boolean;
  monthlyVolume: number;
  averageReviewRate: number;
  reviews: Array<{
    comment: string;
    createdAt: string;
    rate: number;
    createdBy: {
      firstName: string;
      lastName: string;
      company: ICompany;
    }
  }>
  reviewsCount: number;
  dealsCount?: number;
  bic?:               string;
  paymentAccount?:    string;
  correctionAccount?: string;
  bankName?:          string;
  headFullName?:      string;
}
