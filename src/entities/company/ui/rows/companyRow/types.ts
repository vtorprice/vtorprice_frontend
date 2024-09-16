import { ICompany } from '../../../model';

export interface ICompanyRow {
  company: ICompany;
  onClickInFavorite: (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}
