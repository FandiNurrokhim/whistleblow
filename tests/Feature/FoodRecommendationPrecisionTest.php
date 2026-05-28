<?php
namespace Tests\Feature;

use Tests\TestCase;
use Database\Seeders\TestDataSeeder;
use App\Http\Controllers\RecommendationController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use App\Services\ContentBasedFilteringService;
use App\Services\CollaborativeFilteringService;

class FoodRecommendationPrecisionTest extends TestCase
{
    use RefreshDatabase;

    private RecommendationController $recommendationController;
    private ContentBasedFilteringService $contentBasedService;
    private CollaborativeFilteringService $collabService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(TestDataSeeder::class);
        $this->contentBasedService = $this->app->make(ContentBasedFilteringService::class);
        $this->collabService = $this->app->make(CollaborativeFilteringService::class);
        $this->recommendationController = new RecommendationController($this->contentBasedService, $this->collabService);
    }

    private function getRecommendations(array $categories, array $ingredients)
    {
        $request = new Request(compact('categories', 'ingredients'));
        return json_decode($this->recommendationController->recommend($request, $this->contentBasedService, $this->collabService)->getContent(), true);
    }

    public function testPrecisionAtK()
    {
        $recommendedFoods = collect($this->getRecommendations(['Javanese'], ['Nasi', 'Daging Ayam', 'Bawang Putih']));
        $groundTruth = ['Nasi Goreng', 'Nasi Kuning', 'Lontong Sayur', 'Gudeg', 'Soto Ayam'];
        $K = 5;
        
        $topK = $recommendedFoods->pluck('name')->take($K)->toArray();
        $precisionAtK = count($topK) > 0 ? count(array_intersect($topK, $groundTruth)) / count($topK) : 0;
        
        echo "Precision@{$K}: " . ($precisionAtK * 100) . "%\n";
        $this->assertGreaterThanOrEqual(0.5, $precisionAtK, "Precision@{$K} too low: $precisionAtK");
    }

    public function testRecallAtK()
    {
        $recommendedFoods = collect($this->getRecommendations(['Javanese'], ['Nasi', 'Daging Ayam', 'Bawang Putih']));
        $groundTruth = ['Nasi Goreng', 'Nasi Kuning', 'Lontong Sayur', 'Gudeg', 'Soto Ayam'];
        $K = 5;
        
        $topK = $recommendedFoods->pluck('name')->take($K)->toArray();
        $recallAtK = count($groundTruth) > 0 ? count(array_intersect($topK, $groundTruth)) / count($groundTruth) : 0;
        
        echo "Recall@{$K}: " . ($recallAtK * 100) . "%\n";
        $this->assertGreaterThanOrEqual(0.5, $recallAtK, "Recall@{$K} too low: $recallAtK");
    }

    public function testF1ScoreAtK()
    {
        $recommendedFoods = collect($this->getRecommendations(['Javanese', 'Sundanese'], ['Nasi', 'Daging Ayam', 'Bawang Putih']));
        $groundTruth = ['Nasi Goreng', 'Nasi Kuning', 'Lontong Sayur', 'Gudeg', 'Soto Ayam'];
        $K = 5;
        
        $topK = $recommendedFoods->pluck('name')->take($K)->toArray();
        $relevantCount = count(array_intersect($topK, $groundTruth));
        $precisionAtK = $relevantCount / max(1, $K);
        $recallAtK = $relevantCount / max(1, count($groundTruth));
        
        $f1ScoreAtK = ($precisionAtK + $recallAtK) > 0 ? (2 * $precisionAtK * $recallAtK) / ($precisionAtK + $recallAtK) : 0;
        
        echo "F1-score@{$K}: " . ($f1ScoreAtK * 100) . "%\n";
        $this->assertGreaterThanOrEqual(0.5, $f1ScoreAtK, "F1-score@{$K} too low: $f1ScoreAtK");
    }
}