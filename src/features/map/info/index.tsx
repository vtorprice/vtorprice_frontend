/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { IEquipmentApplication, IRecyclableApplication } from '@box/entities/application/model';
import { Badge } from '@box/shared/ui';
import CloseIcon from '@assets/icons/20_close.svg';
import { IWithClass } from '@box/types';
import s from './style.module.scss';

interface IInfoAboutApplication extends IWithClass {
  applications: Array<IRecyclableApplication | IEquipmentApplication>
  cbCloseIconOnClick : () => void
  onClickOnItem: (isEquipment:boolean, id: number) => void
}

export const InfoAboutApplications: React.FC<IInfoAboutApplication> = ({ 
  applications, className, cbCloseIconOnClick, onClickOnItem
}) => {
  if (applications.length > 0) {
    return (
      <div className={className}>
        <div className="flex gap-4 h-full">
          <div className={s.closeIcon} onClick={cbCloseIconOnClick}>
            <CloseIcon />
          </div>
          <div className={classNames('flex gap-[14px] bg-white-80 overflow-y-auto h-full', s.listOfApplication)}>
            {applications.map((application) => (
              <div key={application.id} className="cursor-pointer" onClick={() => onClickOnItem('equipment' in application, application.id)}>
                <div key={application.id} className={classNames('w-[384px] pt-6 px-8', s.application)}>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      {'equipment' in application && (<p className="font-medium mb-3">{ application.equipment.name }</p>)}
                      {'recyclables' in application && (<p className="font-medium mb-3">{ application.recyclables.name }</p>)}
                      <p className="text-xl font-semibold mb-2">
                        {application.price}
                        {' '}
                        ₽
                      </p>
                    </div>
                    <div className="flex gap-[10px] shrink-0">
                      {application.dealType.id === 2 && (
                        <Badge color="red">
                          Продажа
                        </Badge>
                      )}
                      {application.dealType.id === 1 && (
                        <Badge color="green">
                          Покупка
                        </Badge>
                      )}
                    </div>
                  </div>
                  <img className="w-[320px] h-[180px] rounded-xl mb-4" src={application.images[0]?.image} alt="" />
                  <p className="font-medium mb-2">{ application.company.name }</p>
                  <p className="text-grey-60 mb-4">{ application.address || 'Адрес отсутвует' }</p>
                </div>
                <div className="pl-10">
                  <div className="border-b w-full border-b-grey-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ); 
  } 
  return null;
};
