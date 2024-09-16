import React from 'react';
import { Button, Drawer } from '@box/shared/ui';
import FileIcon from '@assets/icons/24_file.svg';
import classNames from 'classnames';
import s from './style.module.scss';
import { ICompanyDocument } from '@box/entities/company/model';
import { IContactsDrawer } from './types';

export const ContactsSlider: React.FC<IContactsDrawer> = ({ 
    visible,
    close,
    company 
}) => {
    const companyDocs: ICompanyDocument[] = company.documents
    const articlesDoc = companyDocs[0] || undefined
    const innDoc = companyDocs[1] || undefined
    const additionlDoc = companyDocs[2] || undefined
    return (

            <Drawer
                bottomActions={(
                <div className="flex flex-col gap-[10px]">
                    <Button
                    onClick={() => {
                        window.open(articlesDoc?.file, '_blank');
                    }}
                    sx={ articlesDoc === undefined ? {cursor: 'default'} : {cursor: 'pointer'} }
                    className={classNames('grow shadow flex', s.myButton)}
                    mode="notFilled"
                    iconLeft={<FileIcon />}
                    disabled={articlesDoc === undefined}
                    >
                    Устав компании
                    </Button>
                    <Button
                    onClick={() => {
                        window.open(innDoc?.file, '_blank');
                    }}
                    sx={ innDoc === undefined ? {cursor: 'default'} : {cursor: 'pointer'} }
                    className={classNames('grow shadow flex', s.myButton)}
                    mode="notFilled"
                    iconLeft={<FileIcon />}
                    disabled={innDoc === undefined}
                    >
                    ИНН
                    </Button>
                    <Button
                    onClick={() => {
                        window.open(additionlDoc?.file, '_blank');
                    }}
                    sx={ additionlDoc === undefined ? {cursor: 'default'} : {cursor: 'pointer'} }
                    className={classNames('grow shadow flex', s.myButton)} 
                    mode="notFilled"
                    iconLeft={<FileIcon />}
                    disabled={additionlDoc === undefined}
                    >
                    Карта партнера
                    </Button>
                </div>
                )}
                title="Контакты и реквизиты"
                visible={visible}
                close={close}
            >
                <div className="flex flex-col gap=[10px]">
                    <div className='flex flex-col'>
                        <p className="text-sm text-grey-40">
                            Телефон
                        </p>
                        <p className="text-sm mt-[5px]">
                            {company.phone}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-grey-40 mt-[16px]">
                            Адрес
                        </p>
                        <p className="text-sm mt-[5px]">
                            {company?.address}
                        </p>
                    </div>    
                </div>
            </Drawer>

    );
};
