
## Stack: Laravel 13 + Inertia.js + React + Tailwind CSS

Berkas ini adalah panduan taktis dan penyedia komponen siap pakai untuk memenangkan kompetisi coding cepat (Hackathon Style). Fokus utama: Kecepatan, Skalabilitas, UI/UX yang Bersih, dan Keandalan Sistem.

---

# STORY
Dibutuhkan aplikasi untuk penilaian 360. Jadi satu orang bisa menilai orang lain. Manajer bisa menilai staff, staff bisa menilai staff lain di satu tim yang sama. Tentunya manajer ke staff dan staff ke staff beda bobot skoringnya, dan tersedia dashboard dan report nya.

Tersedia fitur whistleblow, dimana staff bisa melaporkan staff lain dan memberikan "bata" apabila ada insiden yang tidak sesuai dengan budaya kerja, atau melakukan kesalahan berat atau perilaku tidak pantas lainnya. dan ada juga fitur Dimana staff lain bisa memberikan "cendol" kepada staff lain yang memiliki budaya kerja baik. Setiap orang memiliki batasan bisa berapa kali memberikan whistleblow.

---

# 📁 STRUKTUR PROYEK

## Backend (Laravel)

```
app/
├── Actions/                    # Single-responsibility operations
│   └── {Domain}/
│       └── Create{Model}Action.php
├── Enums/                      # PHP 8.1+ Enums for status/type constants
├── Events/                     # Domain events (past tense: UserCreated)
├── Listeners/                  # Side-effects decoupled from Services
├── Helpers/
│   ├── ApiResponse.php
│   └── MenuHelper.php
├── Http/
│   ├── Controllers/
│   │   ├── Controller.php
│   │   └── {Domain}/
│   │       └── {Model}Controller.php   # Thin: validate + call Service only
│   ├── Middleware/
│   ├── Requests/
│   │   └── {Domain}/
│   │       └── {Model}/
│   │           ├── Store{Model}Request.php
│   │           └── Update{Model}Request.php
│   └── Resources/
│       └── {Model}Resource.php
├── Models/
│   ├── {Model}.php
│   └── Traits/
├── Policies/                   # Authorization per model (replaces RBAC middleware logic)
│   └── {Model}Policy.php
├── Providers/
│   └── AppServiceProvider.php
└── Services/
    └── {Model}Service.php      # Business logic, 1 Service per Model
```

```
routes/
├── web.php
├── api.php
└── route-files/
    └── {domain}.php
```

## Frontend (React + Inertia)

```
resources/js/
├── app.jsx
├── bootstrap.js
├── i18n.js
├── Components/
│   ├── Atoms/                  # Smallest UI units
│   ├── Molecules/              # Atom combinations
│   ├── Organisms/              # Complex sections
│   └── Templates/              # Layout compositions reused across Pages
├── Configs/                    # Constants, permissions, route names
│   ├── constants.js
│   ├── permissions.js
│   └── routes.js
├── Hooks/                      # use{Name}.js
├── Layouts/
│   ├── AuthenticatedLayout.jsx
│   ├── GuestLayout.jsx
│   ├── Table.jsx
│   ├── SideBar.jsx
│   └── Header.jsx
├── Locales/                    # i18n: id.json, en.json
├── Pages/
│   └── {Domain}/
│       ├── Index.jsx
│       └── _partials/
│           ├── Create{Model}Modal.jsx
│           └── Edit{Model}Modal.jsx
├── Store/                      # Global state (Zustand/Jotai)
│   └── use{Name}Store.js
├── Types/                      # JSDoc / .d.ts type definitions
│   └── {Model}.types.js
└── Utils/                      # Pure functions, camelCase
```

## Data Flow

```
Route → Middleware (Auth, RBAC) → Controller (FormRequest) → Service → Model
                                                                         ↓
React Page (usePage/props) ← Inertia::render ← Resource ←─────────────┘
```

## Naming Conventions

### Backend
| Layer | Convention | Example |
|---|---|---|
| Controller | Thin, 1 method per action | `LecturerController@store` |
| Service | Reusable business logic | `LecturerService` |
| Action | 1 class = 1 operation | `CreateLecturerAction` |
| Resource | Model → JSON transform | `LecturerResource` |
| Policy | Authorization per model | `LecturerPolicy` |
| Event | Past tense | `LecturerCreated` |
| Enum | Singular | `LecturerStatus` |

### Frontend
| Layer | Convention | Example |
|---|---|---|
| Page | `Pages/{Domain}/Index.jsx` | `Pages/Lecturer/Index.jsx` |
| Partial | `_partials/` prefix | `_partials/CreateModal.jsx` |
| Hook | `use` prefix | `usePermission.js` |
| Store | `use{Name}Store` | `useAuthStore.js` |
| Type | `{Model}.types.js` | `Lecturer.types.js` |
| Constant | `SCREAMING_SNAKE_CASE` | `MAX_UPLOAD_SIZE` |
| Util | camelCase, pure function | `formatDate.js` |
```

---

# 🏗️ BACKEND CONVENTIONS

## 1. ApiResponse Helper

Selalu gunakan `ApiResponse` untuk response JSON (bukan Inertia):

```php
// app/Helpers/ApiResponse.php
namespace App\Helpers;

class ApiResponse
{
    public static function success($data, $message = 'Success', $code = 200)
    {
        return response()->json([
            'status'  => 'success',
            'message' => $message,
            'data'    => $data,
            'code'    => $code,
        ], $code);
    }

    public static function error($message = 'Error', $code = 400, $data = null)
    {
        return response()->json([
            'status'  => 'error',
            'message' => $message,
            'data'    => $data,
            'code'    => $code,
        ], $code);
    }
}
```

---

## 2. Service Pattern — 1 Service per Model

Controller harus **tipis** (thin controller). Semua logika bisnis di Service.

### Contoh Service

```php
// app/Services/AssessmentService.php
namespace App\Services;

use App\Models\Assessment;
use Illuminate\Http\Request;

class AssessmentService
{
    public function getPaginatedData(Request $request)
    {
        $perPage  = $request->input('perPage', 10);
        $page     = $request->input('pageIndex', 1);
        $sortBy   = $request->input('sortBy', []);
        $search   = $request->input('search');

        $query = Assessment::with('assessor', 'assessee');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%");
            });
        }

        if (!empty($sortBy)) {
            foreach ($sortBy as $sort) {
                $query->orderBy($sort['id'], $sort['desc'] ? 'desc' : 'asc');
            }
        } else {
            $query->orderBy('updated_at', 'desc');
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function store(array $data): Assessment
    {
        return Assessment::create($data);
    }

    public function update(Assessment $assessment, array $data): Assessment
    {
        $assessment->update($data);
        return $assessment->fresh();
    }

    public function delete(Assessment $assessment): void
    {
        $assessment->delete();
    }

    public function bulkDelete(array $ids): void
    {
        Assessment::whereIn('id', $ids)->delete();
    }
}
```

### Contoh Controller Tipis

```php
// app/Http/Controllers/AssessmentController.php
namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Services\AssessmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function __construct(protected AssessmentService $service) {}

    public function index()
    {
        return Inertia::render('Admin/Assessment/Index');
    }

    public function data(Request $request)
    {
        return response()->json($this->service->getPaginatedData($request));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'assessee_id' => 'required|exists:users,id',
        ]);

        $this->service->store($validated);

        return back()->with('success', 'Assessment berhasil dibuat.');
    }

    public function update(Request $request, $id)
    {
        $assessment = \App\Models\Assessment::findOrFail($id);
        $validated  = $request->validate([/* ... */]);

        $this->service->update($assessment, $validated);

        return back()->with('success', 'Assessment diperbarui.');
    }

    public function destroy($id)
    {
        $assessment = \App\Models\Assessment::findOrFail($id);
        $this->service->delete($assessment);

        return ApiResponse::success(null, 'Berhasil dihapus.');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->validate(['ids' => 'required|array'])['ids'];
        $this->service->bulkDelete($ids);

        return ApiResponse::success(null, 'Bulk delete berhasil.');
    }
}
```

---

## 3. Route Files — Pisah per Domain

```php
// routes/web.php — hanya include file
require __DIR__ . '/route-files/user.php';
require __DIR__ . '/route-files/assessment.php';
require __DIR__ . '/route-files/whistleblow.php';
require __DIR__ . '/route-files/dashboard.php';

// routes/route-files/assessment.php
use Illuminate\Support\Facades\Route;

Route::prefix('{nama_fitur}')->name('{nama_fitur}.')->middleware(['auth', 'check.permission:{nama_fitur}'])->group(function () {
    Route::post('/assessment/bulk-delete', [App\Http\Controllers\AssessmentController::class, 'bulkDelete'])->name('assessment.bulk-delete');
    Route::get('/assessment/data',         [App\Http\Controllers\AssessmentController::class, 'data'])->name('assessment.data');
    Route::get('/', [App\Http\Controllers\AssessmentController::class, 'index'])->name('index');
    Route::get('/create', [App\Http\Controllers\AssessmentController::class, 'create'])->name('create');
    Route::post('/', [App\Http\Controllers\AssessmentController::class, 'store'])->name('store');
    Route::get('/{id}', [App\Http\Controllers\AssessmentController::class, 'show'])->name('show');
    Route::get('/{id}/edit', [App\Http\Controllers\AssessmentController::class, 'edit'])->name('edit');
    Route::put('/{id}', [App\Http\Controllers\AssessmentController::class, 'update'])->name('update');
    Route::delete('/{id}', [App\Http\Controllers\AssessmentController::class, 'destroy'])->name('destroy');
});
```

---

## 4. Form Request (opsional untuk validasi besar)

```php
// app/Http/Requests/StoreAssessmentRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssessmentRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'assessee_id' => 'required|exists:users,id',
            'period'      => 'required|string',
        ];
    }
}
```

---

# ⚛️ FRONTEND CONVENTIONS (React + Inertia + Tailwind)

## 1. Layout Utama

```jsx
// Selalu wrap page dengan AuthenticatedLayout
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AssessmentPage() {
    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                {/* konten */}
            </div>
        </AuthenticatedLayout>
    );
}
```

---

## 2. Struktur Page Standar (Index)

```jsx
// resources/js/Pages/Admin/Assessment/Index.jsx
import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PageHeader from "@/Components/Atoms/PageHeader";
import TitleCard from "@/Components/Atoms/TitleCard";
import StatCard from "@/Components/Atoms/StatCard";
import AssessmentTable from "./partials/AssessmentTable";

const AssessmentPage = () => {
    const { t } = useTranslation();
    const { assessmentCount } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="space-y-4">
                <PageHeader title="Penilaian 360°" subtitle="Kelola penilaian antar anggota tim" />

                <Breadcrumbs className="bg-slate-800 p-2 rounded-md text-white mb-4">
                    <Link href="dashboard" className="opacity-60 hover:opacity-100">Dashboard</Link>
                    <span>Penilaian</span>
                </Breadcrumbs>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TitleCard
                        header="Penilaian 360°"
                        description="Kelola dan pantau semua penilaian dalam tim."
                    />
                    <StatCard
                        label="Total Penilaian"
                        value={assessmentCount || "0"}
                        icon={ClipboardDocumentListIcon}
                    />
                </div>

                <AssessmentTable />
            </div>
        </AuthenticatedLayout>
    );
};

export default AssessmentPage;
```

---

## 3. Struktur Table (partials/XxxTable.jsx)

```jsx
// resources/js/Pages/Admin/Assessment/partials/AssessmentTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

import Card from "@/Components/Atoms/Card";
import Table from "@/Layouts/Table";
import DangerButton from "@/Components/DangerButton";
import ConfirmDeleteModal from "@/Components/Molecules/ConfirmDeleteModal";
import CreateAssessmentModal from "./CreateModal";
import EditModal from "./EditModal";

const AssessmentTable = () => {
    const { t } = useTranslation();
    const [data, setData]               = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages]   = useState(1);
    const [isLoading, setIsLoading]     = useState(false);
    const [search, setSearch]           = useState("");
    const [refetch, setRefetch]         = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen]   = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedId, setSelectedId]     = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedIds, setSelectedIds]   = useState([]);
    const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        axios.get(route('admin.assessment.data'), {
            params: { page: currentPage, search },
        })
        .then(({ data: res }) => {
            setData(res.data);
            setTotalPages(res.last_page);
        })
        .finally(() => setIsLoading(false));
    };

    useEffect(() => { fetchData(); }, [currentPage, search, refetch]);

    const openEditModal = (row) => {
        axios.get(route('admin.assessment.edit', row.id))
             .then(({ data: res }) => {
                 setSelectedItem(res.data);
                 setIsEditModalOpen(true);
             });
    };

    const handleDelete = () => {
        setIsProcessing(true);
        axios.delete(route('admin.assessment.destroy', selectedId))
             .then(() => {
                 Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data dihapus.' });
                 setRefetch(p => !p);
             })
             .finally(() => {
                 setIsProcessing(false);
                 setIsDeleteModalOpen(false);
             });
    };

    const confirmDeleteSelected = () => {
        setIsProcessing(true);
        axios.post(route('admin.assessment.bulk-delete'), { ids: selectedIds })
             .then(() => {
                 Swal.fire({ icon: 'success', title: 'Berhasil', text: `${selectedIds.length} data dihapus.` });
                 setRefetch(p => !p);
             })
             .finally(() => {
                 setIsProcessing(false);
                 setIsDeleteSelectedModalOpen(false);
             });
    };

    const columns = [
        { header: "Nama Penilai",  accessor: (row) => row.assessor?.name  || "-" },
        { header: "Nama Dinilai",  accessor: (row) => row.assessee?.name  || "-" },
        { header: "Periode",       accessor: (row) => row.period          || "-" },
        { header: "Skor",          accessor: (row) => row.final_score      ?? "-", className: "text-center" },
        {
            header: "Aksi",
            accessor: (row) => (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => openEditModal(row)}
                        className="inline-flex items-center rounded-md bg-yellow-400 px-2 py-2 text-xs font-semibold uppercase text-white hover:bg-yellow-500"
                    >
                        <PencilIcon className="w-5 h-5 me-1" /> Edit
                    </button>
                    <DangerButton onClick={() => { setSelectedId(row.id); setIsDeleteModalOpen(true); }}>
                        <TrashIcon className="w-5 h-5 me-1" /> Hapus
                    </DangerButton>
                </div>
            ),
        },
    ];

    return (
        <Card>
            <Table
                columns={columns}
                data={data}
                currentPage={currentPage}
                totalPages={totalPages}
                onSearch={(q) => { setSearch(q); setCurrentPage(1); }}
                onPageChange={setCurrentPage}
                onAdd={() => setIsModalOpen(true)}
                addType="modal"
                addButtonText="Tambah Penilaian"
                selectable={true}
                onDeleteSelected={(ids) => { setSelectedIds(ids); setIsDeleteSelectedModalOpen(true); }}
                isProcessing={isLoading}
            />

            <CreateAssessmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefetch={setRefetch} />
            <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} item={selectedItem} setRefetch={setRefetch} />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDelete}
                title="Hapus Penilaian"
                description="Yakin ingin menghapus penilaian ini?"
                deleteButtonText="Hapus"
                isProcessing={isProcessing}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteSelectedModalOpen}
                onClose={() => setIsDeleteSelectedModalOpen(false)}
                onDelete={confirmDeleteSelected}
                title="Hapus Terpilih"
                description={`Hapus ${selectedIds.length} data terpilih?`}
                deleteButtonText="Hapus Terpilih"
                isProcessing={isProcessing}
            />
        </Card>
    );
};

export default AssessmentTable;
```

---

## 4. Create Modal

```jsx
// resources/js/Pages/Admin/Assessment/partials/CreateModal.jsx
import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SubmitButton from "@/Components/Atoms/SubmitButton";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const CreateAssessmentModal = ({ isOpen, onClose, setRefetch }) => {
    const { t } = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        assessee_id: "",
        period:      "",
        title:       "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.assessment.store'), {
            onSuccess: () => {
                Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Penilaian berhasil dibuat.' });
                reset();
                onClose();
                setRefetch(p => !p);
            },
            onError: (errs) => {
                Swal.fire({ icon: 'error', title: 'Gagal', text: getInertiaErrorMessage(errs) });
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="md">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Tambah Penilaian</h2>

                <div>
                    <InputLabel value="Judul" />
                    <TextInput
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.title} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="Periode" />
                    <TextInput
                        name="period"
                        value={data.period}
                        onChange={(e) => setData('period', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.period} className="mt-1" />
                </div>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                        Batal
                    </button>
                    <SubmitButton processing={processing}>Simpan</SubmitButton>
                </div>
            </form>
        </Modal>
    );
};

export default CreateAssessmentModal;
```

---

## 5. Edit Modal

```jsx
// resources/js/Pages/Admin/Assessment/partials/EditModal.jsx
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SubmitButton from "@/Components/Atoms/SubmitButton";
import { getInertiaErrorMessage } from "@/Utils/getErrorMessage";

const EditModal = ({ isOpen, onClose, item, setRefetch }) => {
    if (!item) return null;

    const { data, setData, put, processing, errors, reset } = useForm({
        title:  item.title  || "",
        period: item.period || "",
    });

    // Sync ketika item berubah
    useEffect(() => {
        if (item) {
            setData({ title: item.title || "", period: item.period || "" });
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.assessment.update', item.id), {
            onSuccess: () => {
                Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data diperbarui.' });
                onClose();
                setRefetch(p => !p);
            },
            onError: (errs) => {
                Swal.fire({ icon: 'error', title: 'Gagal', text: getInertiaErrorMessage(errs) });
            },
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="md">
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Edit Penilaian</h2>

                <div>
                    <InputLabel value="Judul" />
                    <TextInput
                        name="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.title} className="mt-1" />
                </div>

                <div>
                    <InputLabel value="Periode" />
                    <TextInput
                        name="period"
                        value={data.period}
                        onChange={(e) => setData('period', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.period} className="mt-1" />
                </div>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                        Batal
                    </button>
                    <SubmitButton processing={processing}>Update</SubmitButton>
                </div>
            </form>
        </Modal>
    );
};

export default EditModal;
```

---

## 6. Import Cheatsheet

| Kebutuhan | Import |
|---|---|
| Layout utama | `import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"` |
| Reusable Table | `import Table from "@/Layouts/Table"` |
| Card wrapper | `import Card from "@/Components/Atoms/Card"` |
| Stat card | `import StatCard from "@/Components/Atoms/StatCard"` |
| Title card | `import TitleCard from "@/Components/Atoms/TitleCard"` |
| Input text | `import TextInput from "@/Components/TextInput"` |
| Label | `import InputLabel from "@/Components/InputLabel"` |
| Error input | `import InputError from "@/Components/InputError"` |
| Modal | `import Modal from "@/Components/Modal"` |
| Konfirmasi hapus | `import ConfirmDeleteModal from "@/Components/Molecules/ConfirmDeleteModal"` |
| Konfirmasi umum | `import ConfirmModal from "@/Components/Molecules/ConfirmModal"` |
| Avatar | `import Avatar from "@/Components/Molecules/Avatar"` |
| Status badge | `import StatusBadge from "@/Components/Molecules/StatusBadge"` |
| Tombol submit | `import SubmitButton from "@/Components/Atoms/SubmitButton"` |
| Tombol bahaya | `import DangerButton from "@/Components/DangerButton"` |
| Inertia form | `import { useForm, usePage, Link } from "@inertiajs/react"` |
| i18n | `import { useTranslation } from "react-i18next"` |
| SweetAlert | `import Swal from "sweetalert2"` |
| Heroicons | `import { XxxIcon } from "@heroicons/react/24/outline"` |
| Error helper | `import { getInertiaErrorMessage } from "@/Utils/getErrorMessage"` |

---

## 7. Table Component Props

```jsx
<Table
    columns={columns}           // array { header, accessor, className? }
    data={data}                 // array data baris
    currentPage={currentPage}
    totalPages={totalPages}
    onSearch={(q) => {}}        // callback search
    onPageChange={(page) => {}} // callback ganti halaman
    onAdd={() => {}}            // callback tombol tambah
    addType="modal"             // "modal" | "link"
    addButtonText="Tambah"
    selectable={true}           // aktifkan checkbox
    onDeleteSelected={(ids) => {}} // bulk delete callback
    toolbarActions={[           // tombol aksi custom toolbar (opsional)
        {
            label: 'Approve',
            icon: <CheckBadgeIcon className="w-5 h-5" />,
            action: (ids) => {},
            className: 'bg-blue-600 hover:bg-blue-700 text-white',
        }
    ]}
    isProcessing={isLoading}    // tampilkan skeleton saat loading
/>
```

---

# 🗂️ FITUR UTAMA APLIKASI 360° ASSESSMENT

## A. Penilaian (Assessment)

**Models:**
```
Assessment          - id, assessor_id, assessee_id, period, type (manager_to_staff | staff_to_staff), final_score, status
AssessmentCriteria  - id, name, description, weight_manager, weight_staff
AssessmentAnswer    - id, assessment_id, criteria_id, score, note
```

**Weight Scoring:**
- Manajer → Staff: gunakan `weight_manager` dari `AssessmentCriteria`
- Staff → Staff: gunakan `weight_staff` dari `AssessmentCriteria`

**Contoh kalkulasi skor:**
```php
// AssessmentService.php
public function calculateFinalScore(Assessment $assessment): float
{
    $answers = $assessment->answers()->with('criteria')->get();
    $totalWeight = 0;
    $weightedScore = 0;

    foreach ($answers as $answer) {
        $weight = $assessment->type === 'manager_to_staff'
            ? $answer->criteria->weight_manager
            : $answer->criteria->weight_staff;

        $weightedScore += $answer->score * $weight;
        $totalWeight   += $weight;
    }

    return $totalWeight > 0 ? round($weightedScore / $totalWeight, 2) : 0;
}
```

---

## B. Whistleblow — Bata & Cendol

**Models:**
```
WhistleblowReport   - id, reporter_id, reported_id, type (bata|cendol), reason, incident_date, status
WhistleblowQuota    - id, user_id, bata_remaining, cendol_remaining, period
```

**Rules:**
- Setiap user punya kuota `bata` per periode (misal 3x/bulan)
- `cendol` bisa unlimited atau dibatasi juga
- Reporter & reported tidak boleh sama
- Cek kuota sebelum simpan → lempar error jika habis

```php
// WhistleblowService.php
public function submit(array $data, int $reporterId): WhistleblowReport
{
    $quota = WhistleblowQuota::firstOrCreate(
        ['user_id' => $reporterId, 'period' => now()->format('Y-m')],
        ['bata_remaining' => 3, 'cendol_remaining' => 5]
    );

    if ($data['type'] === 'bata' && $quota->bata_remaining <= 0) {
        throw new \Exception('Kuota bata Anda sudah habis untuk periode ini.');
    }

    $report = WhistleblowReport::create(array_merge($data, ['reporter_id' => $reporterId]));

    if ($data['type'] === 'bata') {
        $quota->decrement('bata_remaining');
    } else {
        $quota->decrement('cendol_remaining');
    }

    return $report;
}
```

---

## C. Dashboard & Report

**Data yang ditampilkan:**
- Rata-rata skor penilaian per user
- Ranking anggota tim berdasarkan skor
- Jumlah bata & cendol yang diterima/diberikan
- Grafik tren penilaian per periode

**Controller:**
```php
public function index()
{
    return Inertia::render('Admin/Dashboard/Index', [
        'topPerformers'   => $this->dashboardService->getTopPerformers(),
        'averageScore'    => $this->dashboardService->getAverageScore(),
        'whistleblowSummary' => $this->dashboardService->getWhistleblowSummary(),
        'assessmentStats' => $this->dashboardService->getAssessmentStats(),
    ]);
}
```

---

# ⚡ TIPS KECEPATAN KOMPETISI

1. **Buat Migration + Model + Seeder sekaligus:**
   ```bash
   php artisan make:model Assessment -mfs
   ```

2. **Register route file di web.php:**
   ```php
   foreach (glob(__DIR__ . '/route-files/*.php') as $file) {
       require $file;
   }
   ```

3. **Inject Service via constructor DI** — tidak perlu `new XxxService()` manual

4. **Gunakan `usePage().props`** untuk data yang di-share dari controller via `Inertia::render()`

5. **Gunakan `route('admin.xxx.data')`** di axios, bukan hardcode URL

6. **SweetAlert pattern:**
   ```jsx
   Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Pesan sukses.', timer: 1500, showConfirmButton: false });
   ```

7. **Soft Delete** — tambahkan `use SoftDeletes` di Model dan `$table->softDeletes()` di migration

8. **`withTrashed()` untuk hitung total** di index controller

9. **DB::beginTransaction / commit / rollBack** untuk semua operasi yang melibatkan > 1 tabel

