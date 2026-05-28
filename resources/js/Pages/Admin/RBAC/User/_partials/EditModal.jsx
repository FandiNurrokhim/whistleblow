import React, { useMemo } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Country, State, City } from "country-state-city";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import UploadInputWithPreview from "@/Components/Molecules/UploadInputWithView";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";
import { useTranslation } from "react-i18next";

const EditModal = ({
    isOpen,
    onClose,
    user,
    setRefetch,
}) => {
    if (!user) return null;

    const { t, i18n } = useTranslation();

    const { data, setData, put, processing, errors, reset } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        address: user.address || "",
        country: user.country || "",
        state: user.state || "",
        city: user.city || "",
        role: user.roles?.[0]?.id || "",
        image: null,
        message: "",
    });

    const roles = usePage().props.roles;

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

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = { ...data };
        if (!data.password || data.password.trim() === "") {
            delete submitData.password;
        }

        router.post(`/admin/user/${user.id}`, {
            ...submitData,
            _method: "put",
        }, {
            onSuccess: () => {
                reset();
                onClose();
                setRefetch((prev) => !prev);
                Swal.fire({
                    icon: "success",
                    title: "Sukses",
                    text: "Data berhasil diubah",
                });
            },
            onError: (errors) => {
                const errorMessage = getInertiaErrorMessage(errors);
                console.log(errorMessage);
                Swal.fire({
                    icon: "info",
                    title: "Perhatian",
                    text: errorMessage || "Terdapat inputan yang belum sesuai, silakan periksa kembali.",
                });
            },
        });
    };

    return (
        <Modal show={isOpen}
            onClose={onClose}
            title={t("global.user")}
            type="edit"
            maxWidth="5xl"
            onCancel={() => {
                onClose();
                reset();
            }}
            processing={processing}
            onSubmit={handleSubmit}
        >
            {/* Data Akun */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{t("global.accountData")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="name" value={t("global.name")} required />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            placeholder={t("global.name")}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="role" value={t("role.pageTitle")} required />
                        <Select
                            options={roles?.map(role => ({
                                value: role.id,
                                label: role.name,
                            })) || []}
                            id="role"
                            name="role"
                            value={roles?.map(role => ({
                                value: role.id,
                                label: role.name,
                            })).find(option => option.value === data.role) || null}
                            onChange={selectedOption => setData("role", selectedOption ? selectedOption.value : "")}
                            placeholder={t("role.pageTitle")}
                            isClearable
                            menuPlacement="auto"
                            menuShouldScrollIntoView={false}
                            className="mt-1 block w-full h-full"
                            required
                        />
                        <InputError message={errors.role} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value={t("global.email")} required />
                        <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            type="email"
                            placeholder={t("global.email")}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="password" value={t("global.password")} />
                        <TextInput
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            type="password"
                            placeholder={t("global.password")}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Data Diri */}
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
                            containerClass="!w-full !mt-1"
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="address" value={t("global.address")} />
                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            autoComplete="address"
                            placeholder={t("global.address")}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>
                    {/* <div>
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
                            placeholder={t("global.country")}
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
                            placeholder={t("global.state")}
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
                            placeholder={t("global.city")}
                            isClearable
                            isDisabled={!data.state}
                            menuPlacement="auto"
                            menuShouldScrollIntoView={false}
                        />
                        <InputError message={errors.city} className="mt-2" />
                    </div> */}
                </div>
            </div>

            {/* Upload Foto */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{t("global.photoProfile")}</h2>
                <UploadInputWithPreview
                    id="image"
                    name="image"
                    label={t("global.image")}
                    accept=".jpg,.jpeg,.png"
                    maxSizeMB={0.5}
                    onChange={e => setData("image", e.target.files[0])}
                    value={data.image}
                    error={errors.image}
                />
            </div>
        </Modal>
    );
};

export default EditModal;