<?php

namespace App\Http\Controllers;

use App\Http\Requests\EntryStoreRequest;
use App\Http\Requests\EntryUpdateRequest;
use App\Http\Resources\EntryResource;
use App\Models\Entry;

class EntryController extends Controller
{
    public function store(EntryStoreRequest $request)
    {
        return EntryResource::make(Entry::create($request->validated()));
    }

    public function update(EntryUpdateRequest $request, $id)
    {
        return EntryResource::make(tap(Entry::findOrFail($id))->update($request->validated()));
    }

    public function destroy($id)
    {
        return Entry::destroy($id);
    }
}
