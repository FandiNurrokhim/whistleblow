<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'image' => $this->image,
            'rating' => $this->rating,
            'rating_count' => $this->rating_count,
            'serving_size' => $this->serving_size,
            'serving_per_container' => $this->serving_per_container,
            'ingredients' => $this->ingredients->pluck('name'),
            'categories' => $this->categories->pluck('name'),  
        ];
    }
}
