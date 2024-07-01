<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReportPropertyResource extends JsonResource
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
            'user' => new UserResource($this->user), 
            'property' => new PropertyResource($this->property), 
            'reason' => new ReasonReportResource($this->whenLoaded('reason')),
            'content' => $this->content,
        ];
    }
}
