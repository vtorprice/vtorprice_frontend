import {
    Button, Paper
} from '@box/shared/ui';
import { IWithClass } from '@box/types';
import React from 'react';
import { useEvent } from 'effector-react';
import { submit } from '../model';
import { SpecialUserInfoForm } from '@box/features/settings/special_user_info/ui';
import { specialUserInfoForm } from '@box/features/settings/special_user_info';


export const LogistSettings: React.FC<IWithClass> = ({ className }) => {
const submitEvent = useEvent(submit);

return (
    <div className={className}>
    <Paper>
        {/*SpecialUserInfoForm contains the same data of manager and logist*/}
        <SpecialUserInfoForm />
        <Button onClick={submitEvent} fullWidth>
        Сохранить
        </Button>
    </Paper>
    </div>
    );
};