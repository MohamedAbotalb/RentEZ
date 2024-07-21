<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $properties = [
            [
                'title' => 'Luxury Apartment',
                'description' => 'A luxury apartment located in the heart of the city.',
                'num_of_rooms' => 3,
                'num_of_bathrooms' => 2,
                'area' => 120,
                'price' => 250000,
                'location_id' => 1,
                'property_type_id' => 1,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Cozy Villa',
                'description' => 'A cozy villa perfect for family gatherings.',
                'num_of_rooms' => 5,
                'num_of_bathrooms' => 3,
                'area' => 250,
                'price' => 500000,
                'location_id' =>2, 
                'property_type_id' => 2, 
                'user_id' => 2, 
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Modern House',
                'description' => 'A modern house with all the latest amenities.',
                'num_of_rooms' => 4,
                'num_of_bathrooms' => 2,
                'area' => 150,
                'price' => 300000,
                'location_id' =>2, 
                'property_type_id' => 3, 
                'user_id' => 3,
                'availability' => 'unavailable',
                'listing_type' => 'rent',
                'status' => 'pending',
            ],
            [
                'title' => 'Spacious Apartment',
                'description' => 'A spacious apartment with modern amenities.',
                'num_of_rooms' => 4,
                'num_of_bathrooms' => 2,
                'area' => 180,
                'price' => 350000,
                'location_id' => 3, 
                'property_type_id' => 1,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Elegant Villa',
                'description' => 'An elegant villa with a beautiful garden.',
                'num_of_rooms' => 6,
                'num_of_bathrooms' => 4,
                'area' => 300,
                'price' => 700000,
                'location_id' =>4, 
                'property_type_id' => 2,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Charming House',
                'description' => 'A charming house with a cozy atmosphere.',
                'num_of_rooms' => 3,
                'num_of_bathrooms' => 2,
                'area' => 140,
                'price' => 280000,
                'location_id' =>5,
                'property_type_id' => 3,
                'user_id' => 3,
                'availability' => 'available',
                'listing_type' => 'rent',
                'status' => 'accepted',
            ],
            [
                'title' => 'Penthouse',
                'description' => 'A penthouse with stunning city views.',
                'num_of_rooms' => 4,
                'num_of_bathrooms' => 3,
                'area' => 200,
                'price' => 600000,
                'location_id' =>6,
                'property_type_id' => 1,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Beachfront Property',
                'description' => 'A beachfront property ideal for vacations.',
                'num_of_rooms' => 5,
                'num_of_bathrooms' => 4,
                'area' => 250,
                'price' => 750000,
                'location_id' => 7,
                'property_type_id' => 2,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Luxurious Mansion',
                'description' => 'A luxurious mansion with a private pool.',
                'num_of_rooms' => 7,
                'num_of_bathrooms' => 5,
                'area' => 400,
                'price' => 1000000,
                'location_id' => 8,
                'property_type_id' => 2,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'City Center Loft',
                'description' => 'A modern loft in the city center.',
                'num_of_rooms' => 2,
                'num_of_bathrooms' => 1,
                'area' => 80,
                'price' => 150000,
                'location_id' => 9,
                'property_type_id' => 1,
                'user_id' => 3,
                'availability' => 'unavailable',
                'listing_type' => 'rent',
                'status' => 'pending',
            ],
            [
                'title' => 'Cozy Cottage',
                'description' => 'A cozy cottage in a quiet neighborhood.',
                'num_of_rooms' => 3,
                'num_of_bathrooms' => 2,
                'area' => 120,
                'price' => 220000,
                'location_id' => 10,
                'property_type_id' => 3,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'rent',
                'status' => 'accepted',
            ],
            [
                'title' => 'Stylish Studio',
                'description' => 'A stylish studio apartment with modern features.',
                'num_of_rooms' => 1,
                'num_of_bathrooms' => 1,
                'area' => 60,
                'price' => 100000,
                'location_id' => 11,
                'property_type_id' => 1,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Grand Family Home',
                'description' => 'A grand family home with a large backyard.',
                'num_of_rooms' => 6,
                'num_of_bathrooms' => 4,
                'area' => 300,
                'price' => 600000,
                'location_id' =>12,
                'property_type_id' => 2,
                'user_id' => 3,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Urban Flat',
                'description' => 'An urban flat with easy access to public transport.',
                'num_of_rooms' => 2,
                'num_of_bathrooms' => 1,
                'area' => 90,
                'price' => 180000,
                'location_id' => 13,
                'property_type_id' => 1,
                'user_id' => 1,
                'availability' => 'unavailable',
                'listing_type' => 'rent',
                'status' => 'pending',
            ],
            [
                'title' => 'Historical Residence',
                'description' => 'A residence with historical charm and modern amenities.',
                'num_of_rooms' => 4,
                'num_of_bathrooms' => 3,
                'area' => 200,
                'price' => 450000,
                'location_id' =>14,
                'property_type_id' => 2,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Charming Loft',
                'description' => 'A charming loft in the heart of the city with open spaces.',
                'num_of_rooms' => 2,
                'num_of_bathrooms' => 1,
                'area' => 80,
                'price' => 150000,
                'location_id' =>15,
                'property_type_id' => 1,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'rent',
                'status' => 'accepted',
            ],
            [
                'title' => 'Elegant Mansion',
                'description' => 'An elegant mansion with luxurious amenities and a large garden.',
                'num_of_rooms' => 8,
                'num_of_bathrooms' => 5,
                'area' => 500,
                'price' => 1200000,
                'location_id' =>16,
                'property_type_id' => 2,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Sunny Beach House',
                'description' => 'A beach house with stunning sea views and direct beach access.',
                'num_of_rooms' => 4,
                'num_of_bathrooms' => 3,
                'area' => 200,
                'price' => 700000,
                'location_id' => 17,
                'property_type_id' => 2,
                'user_id' => 3,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Spacious Apartment',
                'description' => 'A spacious apartment with modern features and a great view.',
                'num_of_rooms' => 3,
                'num_of_bathrooms' => 2,
                'area' => 140,
                'price' => 300000,
                'location_id' => 18,
                'property_type_id' => 1,
                'user_id' => 1,
                'availability' => 'unavailable',
                'listing_type' => 'rent',
                'status' => 'pending',
            ],
            [
                'title' => 'Quiet Countryside Home',
                'description' => 'A peaceful home in the countryside with large outdoor spaces.',
                'num_of_rooms' => 4,
                'num_of_bathrooms' => 2,
                'area' => 180,
                'price' => 350000,
                'location_id' =>19,
                'property_type_id' => 2,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Modern Penthouse',
                'description' => 'A modern penthouse with a rooftop terrace and city views.',
                'num_of_rooms' => 5,
                'num_of_bathrooms' => 3,
                'area' => 220,
                'price' => 800000,
                'location_id' =>20,
                'property_type_id' => 2,
                'user_id' => 3,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Chic Studio',
                'description' => 'A chic studio in a trendy neighborhood with easy access to amenities.',
                'num_of_rooms' => 1,
                'num_of_bathrooms' => 1,
                'area' => 55,
                'price' => 120000,
                'location_id' => 21,
                'property_type_id' => 1,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'rent',
                'status' => 'accepted',
            ],
            [
                'title' => 'Family Farmhouse',
                'description' => 'A large farmhouse perfect for family living and gatherings.',
                'num_of_rooms' => 6,
                'num_of_bathrooms' => 3,
                'area' => 300,
                'price' => 600000,
                'location_id' => 22,
                'property_type_id' => 2,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'Luxury Loft',
                'description' => 'A luxurious loft with high ceilings and top-notch amenities.',
                'num_of_rooms' => 2,
                'num_of_bathrooms' => 2,
                'area' => 100,
                'price' => 250000,
                'location_id' => 27,
                'property_type_id' => 1,
                'user_id' => 3,
                'availability' => 'unavailable',
                'listing_type' => 'rent',
                'status' => 'pending',
            ],
            [
                'title' => 'Historic Estate',
                'description' => 'An estate with historic charm and modern conveniences.',
                'num_of_rooms' => 7,
                'num_of_bathrooms' => 4,
                'area' => 400,
                'price' => 950000,
                'location_id' => 26,
                'property_type_id' => 2,
                'user_id' => 1,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            [
                'title' => 'City View Apartment',
                'description' => 'An apartment with panoramic city views and modern finishes.',
                'num_of_rooms' => 3,
                'num_of_bathrooms' => 2,
                'area' => 130,
                'price' => 350000,
                'location_id' =>25,
                'property_type_id' => 1,
                'user_id' => 2,
                'availability' => 'available',
                'listing_type' => 'buy',
                'status' => 'accepted',
            ],
            
        ];

        foreach ($properties as &$property) {
            $property['slug'] = Str::slug($property['title']);
            $property['created_at'] = Carbon::now();
            $property['updated_at'] = Carbon::now();
        }

        DB::table('properties')->insert($properties);
    }
    
}