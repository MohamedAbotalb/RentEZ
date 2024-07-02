<?php
namespace App\Repositories\Contracts;


interface UserRepositoryInterface
{
    public function find(int $id);
    public function all();
    public function update(array $attributes);
    public function delete(int $id);
}