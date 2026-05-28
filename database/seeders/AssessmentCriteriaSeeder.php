<?php

namespace Database\Seeders;

use App\Models\AssessmentCriteria;
use Illuminate\Database\Seeder;

class AssessmentCriteriaSeeder extends Seeder
{
    public function run(): void
    {
        $criteria = [
            [
                'name'           => 'Komunikasi',
                'description'    => 'Kemampuan menyampaikan informasi secara jelas, efektif, dan tepat sasaran.',
                'weight_manager' => 20.00,
                'weight_staff'   => 15.00,
                'is_active'      => true,
            ],
            [
                'name'           => 'Kerja Sama Tim',
                'description'    => 'Kemampuan berkolaborasi, mendukung rekan, dan berkontribusi dalam tim.',
                'weight_manager' => 20.00,
                'weight_staff'   => 25.00,
                'is_active'      => true,
            ],
            [
                'name'           => 'Inisiatif & Inovasi',
                'description'    => 'Kemampuan mengambil inisiatif, memberikan ide baru, dan mencari solusi kreatif.',
                'weight_manager' => 15.00,
                'weight_staff'   => 15.00,
                'is_active'      => true,
            ],
            [
                'name'           => 'Kualitas Pekerjaan',
                'description'    => 'Hasil kerja yang akurat, rapi, dan sesuai standar yang ditetapkan.',
                'weight_manager' => 25.00,
                'weight_staff'   => 25.00,
                'is_active'      => true,
            ],
            [
                'name'           => 'Kedisiplinan',
                'description'    => 'Ketepatan waktu, kehadiran, dan kepatuhan terhadap aturan yang berlaku.',
                'weight_manager' => 20.00,
                'weight_staff'   => 20.00,
                'is_active'      => true,
            ],
        ];

        foreach ($criteria as $item) {
            AssessmentCriteria::create($item);
        }

        $this->command->info('Assessment criteria seeded: ' . count($criteria) . ' items.');
    }
}
