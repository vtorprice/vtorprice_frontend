import { ICompany } from '@box/entities/company/model';
import { IDrawer } from '@box/shared/ui/drawer/types';

export interface IContactsDrawer extends IDrawer {
    company: ICompany
}
