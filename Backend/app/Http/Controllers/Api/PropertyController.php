<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Properties\StorePropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Repositories\PropertyRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    protected $propertyRepository;

    public function __construct(PropertyRepositoryInterface $propertyRepository)
    {
        $this->propertyRepository = $propertyRepository;
    }

    public function index(Request $request)
    {
        $perPage = $request->query('perPage', 6);
        $properties = $this->propertyRepository->getAllProperties($perPage);
        return PropertyResource::collection($properties);
    }

    public function show($slug)
    {
        $property = new PropertyResource($this->propertyRepository->getPropertyBySlug($slug));
        return response()->json(['message' => 'Property fetched successfully', 'data' => $property], 200);
    }

    public function showLatestRent($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'renting');
    }

    public function showLatestSell($property_type_id)
    {
        return $this->showLatestProperties($property_type_id, 'selling');
    }

    private function showLatestProperties($property_type_id, $listing_type)
    {
        $latestProperties = $this->propertyRepository->getLatestProperties($property_type_id, $listing_type);

        if ($latestProperties->isEmpty()) {
            return response()->json(['message' => 'No properties found for ' . $listing_type . ' in this category'], 404);
        }

        return response()->json(['message' => 'Latest ' . $listing_type . ' properties fetched successfully', 'properties' => PropertyResource::collection($latestProperties)], 200);
    }

    public function store(StorePropertyRequest $request)
    {
        try {
            $property = $this->propertyRepository->createProperty($request->validated());
            return response()->json(['message' => 'Property added successfully', 'data' => new PropertyResource($property)], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to add property', 'error' => $e->getMessage()], 500);
        }
    }

    public function search(Request $request)
    {
        $filters = $request->only(['property_type', 'listing_type', 'city']);
        $properties = $this->propertyRepository->searchProperties($filters);

        if ($properties->isEmpty()) {
            return response()->json(['message' => 'No Result found'], 404);
        }

        return response()->json(['data' => PropertyResource::collection($properties)]);
    }
    public function searchAdvanced(Request $request)
    {
        $filters = $request->only(['property_type', 'listing_type','num_of_rooms','num_of_bathrooms','price','city']);
        $properties = $this->propertyRepository->searchPropertiesAdvanced($filters);

        if ($properties->isEmpty()) {
            return response()->json(['message' => 'No Result found'], 404);
        }

        return response()->json(['data' => PropertyResource::collection($properties)]);
    }
    public function showUserProperties(){
        $properties=$this->propertyRepository->showUserProperties(Auth::id());
        if ($properties->isEmpty()) {
            return response()->json(['message' => 'No Result found'], 404);
        }
        return response()->json(['data' => PropertyResource::collection($properties)]);

    }
}