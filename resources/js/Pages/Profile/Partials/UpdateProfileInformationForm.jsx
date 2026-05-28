import React, { useMemo } from 'react';
import { router } from '@inertiajs/react';
import { ToastContainer, showToast } from "@/Components/Toast";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State, City } from 'country-state-city';
import UploadInputWithPreview from '@/Components/Molecules/UploadInputWithView';
import { useTranslation } from 'react-i18next';

import { getInertiaErrorMessage } from '@/Utils/getErrorMessage';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const { t, i18n } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        country: user.country || "",
        state: user.state || "",
        city: user.city || "",
        image: user.photo_profile || "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = { ...data, _method: "put" };
        // Hapus image jika bukan file (string/path lama)
        if (payload.image && typeof payload.image !== "object") {
            delete payload.image;
        }

        router.post(route('profile.update'), {
            ...payload,
            _method: "put",
        }, {
            onSuccess: () => {
                reset();
                showToast(t('user.updatedMessage'), 'success');
            },
            onError: (errors) => {
                const errorMessage = getInertiaErrorMessage(errors.message, i18n.language);
                Swal.fire("Error!", errorMessage, "error");
            },
        });
    };

    // Country/State/City options
    const countryOptions = useMemo(
        () =>
            Country.getAllCountries().map((c) => ({
                value: c.isoCode,
                label: c.name,
            })),
        []
    );
    const stateOptions = useMemo(
        () =>
            data.country
                ? State.getStatesOfCountry(data.country).map((s) => ({
                    value: s.isoCode,
                    label: s.name,
                }))
                : [],
        [data.country]
    );
    const cityOptions = useMemo(
        () =>
            data.country && data.state
                ? City.getCitiesOfState(data.country, data.state).map((c) => ({
                    value: c.name,
                    label: c.name,
                }))
                : [],
        [data.country, data.state]
    );

    // Handler for TextInput
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {t("profile.updateProfileInformation")}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    {t("profile.updateProfileInformationDescription")}
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value={t("global.name")} />
                    <TextInput
                        id="name"
                        name="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={handleChange}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">{t("global.personalData")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="phone" value={t("global.phone")} />
                            <PhoneInput
                                country={'id'}
                                value={data.phone}
                                onChange={phone => setData('phone', phone)}
                                inputClass="!rounded-md !border-gray-300 !shadow-sm focus:!border-indigo-500 focus:!ring-indigo-500 !w-full !pl-12 !pr-3 py-2"
                                buttonClass="!bg-white !border-r !border-gray-300 !rounded-l-md"
                                containerClass="!w-full"
                            />
                            <InputError message={errors.phone} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="address" value={t("global.address")} />
                            <TextInput
                                id="address"
                                name="address"
                                value={data.address || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                placeholder="Address"
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="country" value={t("global.country")} />
                            <Select
                                options={countryOptions}
                                id="country"
                                name="country"
                                value={countryOptions.find((option) => option.value === data.country) || null}
                                onChange={(selectedOption) => {
                                    setData("country", selectedOption ? selectedOption.value : "");
                                    setData("state", "");
                                    setData("city", "");
                                }}
                                placeholder="Country"
                                isClearable
                                menuPlacement="auto"
                                menuShouldScrollIntoView={false}
                            />
                            <InputError message={errors.country} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="state" value={t("global.state")} />
                            <Select
                                options={stateOptions}
                                id="state"
                                name="state"
                                value={stateOptions.find((option) => option.value === data.state) || null}
                                onChange={(selectedOption) => {
                                    setData("state", selectedOption ? selectedOption.value : "");
                                    setData("city", "");
                                }}
                                placeholder="State"
                                isClearable
                                isDisabled={!data.country}
                                menuPlacement="auto"
                                menuShouldScrollIntoView={false}
                            />
                            <InputError message={errors.state} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="city" value={t("global.city")} />
                            <Select
                                options={cityOptions}
                                id="city"
                                name="city"
                                value={cityOptions.find((option) => option.value === data.city) || null}
                                onChange={(selectedOption) => {
                                    setData("city", selectedOption ? selectedOption.value : "");
                                }}
                                placeholder="City"
                                isClearable
                                isDisabled={!data.state}
                                menuPlacement="auto"
                                menuShouldScrollIntoView={false}
                            />
                            <InputError message={errors.city} className="mt-2" />
                        </div>
                    </div>
                </div>

                {/* Upload Foto */}
                <div className="mb-6">
                    <InputLabel htmlFor="city" value={t("global.photoProfile")} />
                    <UploadInputWithPreview
                        id="image"
                        name="image"
                        label="Image"
                        accept=".jpg,.jpeg,.png"
                        maxSizeMB={0.5}
                        onChange={e => setData("image", e.target.files[0])}
                        value={data.image}
                        error={errors.image}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{t("global.save")}</PrimaryButton>
                </div>
            </form>

            <ToastContainer />
        </section >
    );
}