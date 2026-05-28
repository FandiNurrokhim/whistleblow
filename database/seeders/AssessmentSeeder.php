<?php

namespace Database\Seeders;

use App\Models\Assessment;
use App\Models\AssessmentAnswer;
use App\Models\AssessmentCriteria;
use App\Models\User;
use Illuminate\Database\Seeder;

class AssessmentSeeder extends Seeder
{
    public function run(): void
    {
        $period   = now()->format('Y-m');
        $criteria = AssessmentCriteria::where('is_active', true)->get();

        if ($criteria->isEmpty()) {
            $this->command->warn('Tidak ada kriteria aktif. Jalankan AssessmentCriteriaSeeder terlebih dahulu.');
            return;
        }

        $manager = User::role('Manager')->first();
        $staffs  = User::role('Staff')->get();

        if (!$manager || $staffs->isEmpty()) {
            $this->command->warn('User Manager/Staff tidak ditemukan.');
            return;
        }

        $assessmentCount = 0;

        // ── Manager menilai semua Staff (manager_to_staff) ───────────────────
        foreach ($staffs as $staff) {
            $assessment = Assessment::create([
                'assessor_id' => $manager->id,
                'assessee_id' => $staff->id,
                'period'      => $period,
                'type'        => 'manager_to_staff',
                'status'      => 'submitted',
                'notes'       => 'Penilaian oleh manajer periode ' . $period,
            ]);

            $this->seedAnswers($assessment, $criteria);
            $this->calculateFinalScore($assessment);
            $assessmentCount++;
        }

        // ── Staff menilai Staff lain (staff_to_staff) ────────────────────────
        foreach ($staffs as $assessor) {
            foreach ($staffs as $assessee) {
                if ($assessor->id === $assessee->id) continue;

                $assessment = Assessment::create([
                    'assessor_id' => $assessor->id,
                    'assessee_id' => $assessee->id,
                    'period'      => $period,
                    'type'        => 'staff_to_staff',
                    'status'      => 'submitted',
                    'notes'       => 'Penilaian rekan kerja periode ' . $period,
                ]);

                $this->seedAnswers($assessment, $criteria);
                $this->calculateFinalScore($assessment);
                $assessmentCount++;
            }
        }

        $this->command->info("Assessment seeded: {$assessmentCount} penilaian (periode: {$period}).");
    }

    /**
     * Buat jawaban untuk setiap kriteria dengan skor random 3–5.
     */
    private function seedAnswers(Assessment $assessment, $criteria): void
    {
        foreach ($criteria as $c) {
            AssessmentAnswer::create([
                'assessment_id' => $assessment->id,
                'criteria_id'   => $c->id,
                'score'         => rand(3, 5),
                'note'          => null,
            ]);
        }
    }

    /**
     * Hitung final_score berdasarkan weighted average sesuai tipe penilaian.
     */
    private function calculateFinalScore(Assessment $assessment): void
    {
        $answers      = $assessment->answers()->with('criteria')->get();
        $totalWeight  = 0;
        $weightedSum  = 0;

        foreach ($answers as $answer) {
            $weight = $assessment->type === 'manager_to_staff'
                ? $answer->criteria->weight_manager
                : $answer->criteria->weight_staff;

            $weightedSum += $answer->score * $weight;
            $totalWeight += $weight;
        }

        $finalScore = $totalWeight > 0 ? round($weightedSum / $totalWeight, 2) : 0;

        $assessment->update(['final_score' => $finalScore]);
    }
}
