import { AxiosResponse } from 'axios';
import { $host } from '@box/shared/api';
import { IRecyclable } from '../model';

class RecyclableApi {
  getRecyclable(id: number): Promise<AxiosResponse<IRecyclable>> {
    return $host.get(`/recyclables/${id}`);
  }
}

export const recyclableApi = new RecyclableApi();
