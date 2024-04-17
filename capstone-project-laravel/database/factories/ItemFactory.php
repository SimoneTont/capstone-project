<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'image_path' => 'https://picsum.photos/id/' . $this->faker->numberBetween(1, 60) . '/200/300',
            'quantity' => $this->faker->numberBetween(100, 200),
            'price' => $this->faker->randomFloat(2, 10, 20)
        ];
    }
}
