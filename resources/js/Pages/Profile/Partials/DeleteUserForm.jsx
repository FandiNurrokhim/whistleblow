import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';


import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

import { useTranslation } from 'react-i18next';

export default function DeleteUserForm({ className = '' }) {
    const { t } = useTranslation();

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {t('profile.deleteAccount')}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {t('profile.deleteAccountDescription')}
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                {t('profile.deleteAccount')}
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}
                footer={<div className="flex justify-end gap-3">
                    <SecondaryButton onClick={closeModal}>
                        {t("global.cancel")}
                    </SecondaryButton>

                    <DangerButton disabled={processing} onClick={deleteUser}>
                        {t('profile.deleteAccount')}
                    </DangerButton>
                </div>}>

                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {t('profile.deleteAccountConfirmation')}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Masukan password untuk konfirmasi penghapusan akun
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                </form>
            </Modal>
        </section>
    );
}
