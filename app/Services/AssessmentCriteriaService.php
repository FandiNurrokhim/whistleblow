<?php

namespace App\Services;

use App\Models\AssessmentCriteria;
use Illuminate\Http\Request;

class AssessmentCriteriaService
{
    public function getPaginatedData(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page    = $request->input('pageIndex', 1);
        $sortBy  = $request->input('sortBy', []);
        $search  = $request->input('search');

        $query = AssessmentCriteria::query();

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
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

    public function getAll()
    {
        return AssessmentCriteria::where('is_active', true)->orderBy('name')->get();
    }

    public function store(array $data): AssessmentCriteria
    {
        return AssessmentCriteria::create($data);
    }

    public function update(AssessmentCriteria $criteria, array $data): AssessmentCriteria
    {
        $criteria->update($data);
        return $criteria->fresh();
    }

    public function delete(AssessmentCriteria $criteria): void
    {
        $criteria->delete();
    }

    public function bulkDelete(array $ids): void
    {
        AssessmentCriteria::whereIn('id', $ids)->delete();
    }
}
