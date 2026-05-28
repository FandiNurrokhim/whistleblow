import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [studyPrograms, setStudyPrograms] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        nim: '',
        name: '',
        study_program_id: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        if (!isOpen) return;

        fetch("/study-program/select-data")
            .then((res) => res.json())
            .then((result) => {
                setStudyPrograms(result.data.studyPrograms || []);
            })
            .catch(() => {
                Swal.fire("Error!", "Gagal mengambil data", "error");
            })
    }, [isOpen]);

    const studyProgramOptions = studyPrograms.map((studyProgram) => ({
        value: studyProgram.id,
        label: `${studyProgram.code} - ${studyProgram.name}`,
    }));

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="nim" value="Nim" />

                    <TextInput
                        id="nim"
                        name="nim"
                        value={data.nim}
                        className="mt-1 block w-full"
                        autoComplete="nim"
                        isFocused={true}
                        onChange={(e) => setData('nim', e.target.value)}
                        required
                    />

                    <InputError message={errors.nim} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="study_program" value="Program Studi" required />
                    <Select
                        options={studyProgramOptions}
                        id="study_program_id"
                        name="study_program_id"
                        value={studyProgramOptions.find(option => option.value === data.study_program_id) || null}
                        onChange={(selectedOption) => {
                            setData("study_program_id", selectedOption ? selectedOption.value : "");
                        }}
                        placeholder="Pilih Prodi"
                        isClearable
                        required
                    />

                    <InputError message={errors.study_program} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
