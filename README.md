# Sistem Penilaian 360° & Whistleblowing

Platform manajemen kinerja tim yang transparan — penilaian antar karyawan, pelaporan insiden budaya kerja, dan dashboard laporan kinerja.

---

## Stack Teknologi

| Layer | Teknologi | Versi |
|---|---|---|
| Backend | Laravel | 13.x |
| Frontend | React + Inertia.js | 18.x + 2.x |
| Styling | Tailwind CSS | 3.x |
| Build Tool | Vite | 6.x |
| Database | MySQL | 8.0+ |

---

## Persyaratan Sistem

Pastikan semua tools berikut sudah terinstal sebelum memulai:

| Tool | Versi Minimum | Cek Versi |
|---|---|---|
| PHP | **8.4+** | `php --version` |
| Composer | 2.x | `composer --version` |
| Node.js | **20.x (LTS)** | `node --version` |
| NPM | 10.x | `npm --version` |
| MySQL | 8.0+ | `mysql --version` |

> ⚠️ **PHP 8.4 wajib.** Laravel 13 tidak berjalan di PHP versi di bawah 8.4.
>
> ⚠️ **Node.js 20 (LTS) direkomendasikan.** Vite 6 memerlukan Node.js 18+.

---

## Instalasi

### 1. Clone Repository

```bash
git clone <url-repository> nama-folder
cd nama-folder
```

### 2. Salin File Environment

```bash
cp .env.example .env
```

### 3. Konfigurasi Database

Buka `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD=
```

> Buat database kosong terlebih dahulu di MySQL sebelum melanjutkan.

### 4. Install Dependency PHP

```bash
composer install
```

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Jalankan Migrasi Database

```bash
php artisan migrate
```

Jika ingin mulai dari awal (drop semua tabel lalu migrate ulang):

```bash
php artisan migrate:fresh
```

### 7. Jalankan Seeder

```bash
php artisan db:seed
```

Seeder yang tersedia dan urutan eksekusinya:

| Seeder | Fungsi |
|---|---|
| `RoleSeeder` | Buat role: Super Admin, Admin, HR, Manager, Staff |
| `PermissionSeeder` | Buat permission yang dibutuhkan |
| `UserSeeder` | Buat user default (Super Admin) |
| `MenuSeeder` | Buat menu navigasi sidebar/navbar |
| `AssessmentCriteriaSeeder` | Buat kriteria penilaian default |
| `WhistleblowQuotaSeeder` | Generate kuota whistleblow untuk semua user |

Jalankan seeder tertentu secara individual:

```bash
php artisan db:seed --class=MenuSeeder
php artisan db:seed --class=WhistleblowQuotaSeeder
```

### 8. Install Dependency Node.js

```bash
npm install
```

---

## Menjalankan Aplikasi

Buka **dua terminal** secara bersamaan:

**Terminal 1 — Backend (Laravel)**

```bash
php artisan serve
```

Aplikasi berjalan di: `http://localhost:8000`

**Terminal 2 — Frontend (Vite Dev Server)**

```bash
npm run dev
```

Buka browser ke `http://localhost:8000`.

---

## Build untuk Production

```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Akun Default

Setelah seeder dijalankan, gunakan akun berikut untuk login:

| Role | Email | Password |
|---|---|---|
| Super Admin | `superadmin@example.com` | `password` |

> Akun Staff dan Manager dibuat oleh Admin melalui halaman **Manajemen Pengguna**.

---

## Struktur Role & Akses

| Role | Layout | Akses Utama |
|---|---|---|
| Super Admin | Sidebar | Semua fitur |
| Admin | Sidebar | Semua fitur kecuali system |
| HR | Sidebar | User, laporan, kuota, status whistleblow |
| Manager | Navbar | Dashboard, penilaian tim, report |
| Staff | Navbar | Penilaian rekan, skor sendiri, whistleblow |

---

## Troubleshooting

**Error: `Class not found` setelah composer install**

```bash
composer dump-autoload
```

**Error: `SQLSTATE table not found`**

```bash
php artisan migrate:fresh --seed
```

**Error: Halaman kosong / Vite manifest not found**

```bash
npm run build
# atau jalankan ulang:
npm run dev
```

**Error: `php_network_getaddresses` atau koneksi database gagal**

Pastikan MySQL berjalan dan konfigurasi `.env` sudah benar.

**Error: 403 setelah login**

Pastikan user memiliki `is_approved = true` di database dan memiliki role yang valid (Super Admin / Admin / HR / Manager / Staff).

---

## Perintah Berguna

```bash
# Clear semua cache
php artisan optimize:clear

# Lihat semua route
php artisan route:list

# Buat storage symlink (untuk upload file)
php artisan storage:link

# Reset kuota whistleblow bulan ini
php artisan db:seed --class=WhistleblowQuotaSeeder
```
