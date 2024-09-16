import { ICompany } from '@box/entities/company/model';
import { ReactNode } from 'react';

export interface ICompanyRow {
  company: ICompany;
  favoriteButton: ReactNode;
}
