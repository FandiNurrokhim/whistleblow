<?php

namespace App\Http\Middleware;

use App\Helpers\MenuHelper;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),

            'auth' => [
                'user' => $user ? array_merge(
                    $user->only([
                        'id', 'name', 'email', 'phone', 'address',
                        'city', 'state', 'country', 'photo_profile',
                        'is_approved', 'email_verified_at',
                    ]),
                    [
                        'roles' => $user->roles->map(fn($r) => ['id' => $r->id, 'name' => $r->name]),
                    ]
                ) : null,
            ],

            'menus' => fn() => $this->getMenusForUser($user),

            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error'   => fn() => $request->session()->get('error'),
                'warning' => fn() => $request->session()->get('warning'),
                'info'    => fn() => $request->session()->get('info'),
            ],
        ];
    }

    private function getMenusForUser($user): array
    {
        if (!$user) return [];

        $allMenus = Menu::orderBy('id')->get();

        return $allMenus->filter(function ($menu) use ($user) {
            if (!$menu->route) return true;

            try {
                if (!app('router')->has($menu->route)) return false;
            } catch (\Throwable) {
                return false;
            }

            return MenuHelper::canViewMenu($menu);
        })->map(function ($menu) use ($user) {
            try {
                $resolvedRoute = $menu->route ? route($menu->route) : null;
                $currentPath   = request()->path();
                $menuPath      = $resolvedRoute ? ltrim(parse_url($resolvedRoute, PHP_URL_PATH), '/') : null;
                $isActive      = $menuPath && ($currentPath === $menuPath || str_starts_with($currentPath, $menuPath . '/'));
            } catch (\Throwable) {
                $isActive = false;
            }

            return array_merge($menu->toArray(), ['is_active' => $isActive]);
        })->values()->toArray();
    }
}
