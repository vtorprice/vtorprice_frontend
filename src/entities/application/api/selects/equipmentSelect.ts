import { IEquipment } from '../../model';
import { equiomentApplicationApi } from '../EquipmentApplicationApi';

export const equipmentSelectApi = async () => {
  const { data } = await equiomentApplicationApi.getEquipmentCategory();
  const allEquipments: Array<IEquipment> = [];
  data.results.forEach((catagory) => {
    const { equipments } = catagory;
    equipments.forEach((equipments) => {
      allEquipments.push(equipments);
    });
  });
  return allEquipments.map((category) => ({
    id: category.id,
    label: category.name,
    value: category.id
  }));
};
