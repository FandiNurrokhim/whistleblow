<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Helpers\MenuHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Services\ContentBasedFilteringService;
use App\Services\CollaborativeFilteringService;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ContentBasedFilteringService::class, function ($app) {
            return new ContentBasedFilteringService();
        });
        $this->app->singleton(CollaborativeFilteringService::class, function ($app) {
            return new CollaborativeFilteringService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user(),
                    'favorites_count' => Auth::check() ? Auth::user()->favorites->count() : 0,
                ];
            },
            'menus' => fn() => MenuHelper::getSidebarMenus()
                ->filter(fn($menu) => MenuHelper::canViewMenu($menu))
                ->map(function ($menu) {
                    $menu->is_active = MenuHelper::isActiveMenu($menu);
                    $menu->children = $menu->children
                        ->filter(fn($child) => MenuHelper::canViewMenu($child))
                        ->map(function ($child) {
                            $child->is_active = MenuHelper::isActiveMenu($child);
                            return $child;
                        })
                        ->values();
                    return $menu;
                })
                ->values(),
        ]);
        JsonResource::withoutWrapping();
        Vite::prefetch(concurrency: 3);
    }
}
