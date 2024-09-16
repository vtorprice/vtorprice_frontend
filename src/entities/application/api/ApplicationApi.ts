import { AxiosResponse } from 'axios';
import { $authHost, $host } from '@box/shared/api';
import { Paginationable } from '@types';
import { IRecyclableApplication } from '../model';

type CreateApplicationParams = {
  images?: Array<File | string>,
  deal_type: IRecyclableApplication['dealType']['id'],
  urgency_type: IRecyclableApplication['urgencyType']['id'],
  with_nds?: boolean,
  bale_count?: number,
  bale_weight?: number,
  volume?: number,
  price?: number,
  lot_size?: number,
  is_packing_deduction?: boolean,
  packing_deduction_type?: IRecyclableApplication['packingDeductionType']['id'],
  packing_deduction_value?: number,
  comment?: string,
  address?: string,
  latitude?: number,
  longitude?: number,
  recyclables?: number,
  company?: number,
  city?: number,
  status?: number
};

type GetApplicationsParams = {
  exclude: number
  search: string,
  deal_type: IRecyclableApplication['dealType']['id'],
  urgency_type: IRecyclableApplication['urgencyType']['id'],
  recyclables: Array<number>,
  recyclables__category: number,
  city: number,
  company: number,
  total_weight__lte: number | string,
  total_weight__gte: number | string,
  price__lte: number | string,
  price__gte: number | string,
  status: number,
  created_at__gte: Date | null,
  created_at__lte: Date | null,
  is_favorite: boolean,
  ordering: string | null,
  page: number
};

class ApplicationApi {
  createApplication(applicationData: CreateApplicationParams):
  Promise<AxiosResponse<IRecyclableApplication>> {
    const formData = new FormData();
    if (Array.isArray(applicationData.images)) {
      for (let i = 0; i < applicationData.images?.length; i += 1) {
        formData.append('images', applicationData.images[i]);
      }
    }
    delete applicationData.images;

    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const key in applicationData) {
      // @ts-ignore
      formData.append(key, applicationData[key]);
    }

    return $authHost.post('/recyclables_applications/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  getApplications(params: Partial<GetApplicationsParams>): Promise<AxiosResponse<{
    results: Array<IRecyclableApplication>
  } & Paginationable>> {
    return $authHost.get('/recyclables_applications/', {
      params,
    });
  }

  getApplication(id: number): Promise<AxiosResponse<IRecyclableApplication>> {
    return $host.get(`/recyclables_applications/${id}/`);
  }

  updateApplicationInFavorite(id: number): Promise<AxiosResponse<IRecyclableApplication>> {
    return $authHost.patch(`/recyclables_applications/${id}/favorite/`);
  }

  // eslint-disable-next-line max-len
  setApplication(data: Partial<CreateApplicationParams> & { id: number }): Promise<AxiosResponse<IRecyclableApplication>> {
    const { id, ...params } = data;
    return $authHost.patch(`/recyclables_applications/${id}/`, params);
  }

  deleteApplication(id: number): Promise<AxiosResponse<IRecyclableApplication>> {
    return $authHost.delete(`/recyclables_applications/${id}/`);
  }

  setApplicationImage(
    images: Array<File | null | string>, 
    id: number
  ): Promise<AxiosResponse<{ image: string }>> {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image != null) {
        formData.append('image', image);
      }
    }
    
    return $authHost.post(`/recyclables_applications/${id}/add_images/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export const applicationApi = new ApplicationApi();
