<?php

namespace App\Services;

use Illuminate\Http\Request;
use Yajra\DataTables\Facades\DataTables;

class DataTableService
{
    public function handle(Request $request, $query, array $columns)
    {
        return DataTables::eloquent($query)
            ->filter(function ($query) use ($request, $columns) {
                if ($request->has('search') && !empty($request->search['value'])) {
                    $searchValue = $request->search['value'];
                    $query->where(function ($q) use ($searchValue, $columns) {
                        foreach ($columns as $column) {
                            $q->orWhere($column, 'LIKE', "%{$searchValue}%");
                        }
                    });
                }
            })
            ->make(true);
    }
}
