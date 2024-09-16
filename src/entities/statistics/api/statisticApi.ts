import { ICompany } from "@box/entities/company/model";
import { $authHost } from "@box/shared/api";
import { Paginationable } from "@box/types";
import { AxiosResponse } from "axios";

interface GetStatisticParams {
  search: string;
  page: number;
  size: number;
}

export interface IUserWithRole {
  id: number;
  lastName: string;
  firstName: string;
  company: ICompany;
  role: {
    id: number;
    label: string;
  };
}

export interface ITotalEmploy {
  total: number;
  logists: number;
  managers: number;
  users: number;
  admins: number;
}

class StatisticApi {
  getAllUsers(params: Partial<GetStatisticParams>): Promise<
    AxiosResponse<
      {
        results: Array<IUserWithRole>;
      } & Paginationable
    >
  > {
    return $authHost.get("/statistics/all_users", {
      params,
    });
  }

  getTotalEmploy(): Promise<
    AxiosResponse<ITotalEmploy>
  > {
    return $authHost.get("/statistics/total_employee/");
  }
}

export const statisticApi = new StatisticApi();
