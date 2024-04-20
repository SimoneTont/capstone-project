<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Item;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Array of supermarket items with custom image URLs
        $supermarketItems = [
            [
                'name' => 'Milk',
                'description' => 'Fresh whole milk',
                'quantity' => 150,
                'price' => 250,
                'image_path' => 'https://media.istockphoto.com/id/964589570/it/vettoriale/icona-del-cartone-del-latte-vettoriale.jpg?s=612x612&w=0&k=20&c=xLZmJEqss78DYINdPG1tCZLOeXOfNY3ERBPf_-GbIwg='
            ],
            [
                'name' => 'Bread',
                'description' => 'Whole wheat bread loaf',
                'quantity' => 120,
                'price' => 150,
                'image_path' => 'https://www.cucchiaio.it/content/dam/cucchiaio/it/ricette/2024/01/pane-fatto-in-casa-veloce/pane-veloce-anteprima.jpg'
            ],
            [
                'name' => 'Eggs',
                'description' => 'Farm-fresh eggs',
                'quantity' => 180,
                'price' => 300,
                'image_path' => 'https://www.curarsiconilcibo.com/wp-content/uploads/2021/03/UOVA.jpg'
            ],
            [
                'name' => 'Apples',
                'description' => 'Red delicious apples',
                'quantity' => 130,
                'price' => 200,
                'image_path' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/2021_Crop_-_Flickr_-_Dennis_S._Hurd.jpg/1200px-2021_Crop_-_Flickr_-_Dennis_S._Hurd.jpg'
            ],
            [
                'name' => 'Potatoes',
                'description' => 'Russet potatoes',
                'quantity' => 160,
                'price' => 180,
                'image_path' => 'https://m.my-personaltrainer.it/images/ricette/1278/come-sbucciare-le-patate.jpg'
            ],
            [
                'name' => 'Chicken',
                'description' => 'Boneless chicken breast',
                'quantity' => 110,
                'price' => 500,
                'image_path' => 'https://www.imbalstock.it/assets/www/res/images/products/20160526_151405_8afc30f1acc491b88eaa7ae1346479d60b3395db.jpg'
            ],
            [
                'name' => 'Tomatoes',
                'description' => 'Vine-ripened tomatoes',
                'quantity' => 140,
                'price' => 300,
                'image_path' => 'https://www.salepepe.it/files/2016/08/pomodoro-benessere-1140x636.jpg'
            ],
            [
                'name' => 'Spaghetti pasta',
                'description' => 'Italian spaghetti pasta',
                'quantity' => 190,
                'price' => 120,
                'image_path' => 'https://www.letrecolline.net/media/catalog/product/cache/c524bd787290ae79c43ec97170b00d6e/s/p/spaghetti_1_1.jpg'
            ],
            [
                'name' => 'Bananas',
                'description' => 'Ripe bananas',
                'quantity' => 170,
                'price' => 180,
                'image_path' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0kzooD2JyHD9LabeWDfK1w_sIza-7N2QCu6KwOFqnlA&s'
            ],
            [
                'name' => 'Cheese',
                'description' => 'Cheddar cheese block',
                'quantity' => 150,
                'price' => 350,
                'image_path' => 'https://www.parmigianoreggiano.com/static/03e55557c69ae8abaebde439c1ab933b/e8904/5fecf9fae95e075416f86ef309fd1b2b.png'
            ],
            [
                'name' => 'Yogurt',
                'description' => 'Greek yogurt',
                'quantity' => 200,
                'price' => 200,
                'image_path' => 'https://www.allrecipes.com/thmb/bRg6T06M92G2smbIuaiGsVc4U2s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1028395-authentic-homemade-yogurt-MTRmenian-4x3-1-0c66078e9bd64cada5606bf2d85db601.jpg'
            ],
            [
                'name' => 'Cereal',
                'description' => 'Whole grain breakfast cereal',
                'quantity' => 180,
                'price' => 300,
                'image_path' => 'https://ilfattoalimentare.it/wp-content/uploads/2014/11/Corn-Flakes-mais-cereali-colazione.jpg'
            ],
        ];

        // Loop through the supermarket items array and create items in the database
        foreach ($supermarketItems as $itemData) {
            Item::create($itemData);
        }
    }
}
