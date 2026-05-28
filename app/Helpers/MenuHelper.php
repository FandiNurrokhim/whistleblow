<?php

namespace App\Helpers;

use App\Models\Menu;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class MenuHelper
{
    public static function getSidebarMenus()
    {
        if (!auth()->check()) {
            return collect([]);
        }
        return Menu::orderBy('id')->with('children')->get();
    }

    public static function canViewMenu(Menu $menu)
    {
        if (empty($menu->route)) {
            return true;
        }
        $parts = explode('.', $menu->route);
        // Untuk route 'admin.xxx.yyy' → ambil $parts[1] (misal: 'dashboard', 'user', 'role')
        // Untuk route 'xxx.yyy'       → ambil $parts[0] (misal: 'whistleblow', 'assessment')
        $permission = ($parts[0] === 'admin') ? ($parts[1] ?? $parts[0]) : $parts[0];
        return auth()->user()->can($permission);
    }

    public static function isActiveMenu($menu)
    {
        if (request()->routeIs($menu->route)) {
            return true;
        }

        if (request()->routeIs($menu->route . '.*')) {
            return true;
        }

        return false;
    }
}
