<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    public function getReport(): JsonResponse
    {
        if (!Storage::exists('reports/all_reports.json')) {
            return response()->json(['error' => 'Report not found'], 404);
        }

        $report = json_decode(Storage::get('reports/all_reports.json'), true);
        return response()->json($report);
    }
}
