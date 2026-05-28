<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

abstract class Controller
{

    public function uploadFile($folderName, $file, $titleSlug)
    {
        if (empty($folderName) || empty($titleSlug)) {
            throw new \Exception('Folder name or title slug is empty');
        }

        // Pastikan titleSlug sudah slug, jika belum, ubah jadi slug
        $slug = Str::slug($titleSlug);

        if (empty($slug)) {
            throw new \Exception('Title slug is invalid after slug conversion');
        }

        $folderPath = $folderName . '/' . $slug;
        $fileName = time() . '_' . $file->getClientOriginalName();

        // Simpan file ke storage/app/public/...
        $path = $file->storeAs($folderPath, $fileName, 'public');

        return $path; // path relatif dari storage/app/public
    }

    public function updateFile($folderName, $newFile, $oldFilePath, $titleSlug)
    {
        if (!$newFile) {
            return $oldFilePath;
        }

        $newFilePath = $this->uploadFile($folderName, $newFile, $titleSlug);

        // Hapus file lama jika ada
        if ($newFilePath && $oldFilePath && Storage::disk('public')->exists($oldFilePath)) {
            Storage::disk('public')->delete($oldFilePath);
        }

        return $newFilePath;
    }

    public function deleteFile($filePath)
    {
        if ($filePath && Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }
    }
}