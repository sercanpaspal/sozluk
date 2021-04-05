<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComplaintStoreRequest;
use App\Models\Complaint;

class ComplaintController extends Controller
{
    public function store(ComplaintStoreRequest $request)
    {
        return Complaint::create($request->validated());
    }

    public function destroy($id)
    {
        return Complaint::destroy($id);
    }
}
