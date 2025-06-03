export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Category[];
}

export const mockData = {
  categories: [
    {
      id: "cycling",
      name: "Cycling",
      description: "Cycling equipment and accessories",
      subcategories: [
        {
          id: "road",
          name: "Road",
          description: "Road cycling equipment",
          subcategories: [
            {
              id: "road-helmets",
              name: "Helmets",
              description: "Road cycling helmets",
            },
            {
              id: "road-eyewear",
              name: "Eyewear",
              description: "Road cycling eyewear",
            },
            {
              id: "road-apparel",
              name: "Apparel",
              description: "Road cycling apparel",
              subcategories: [
                {
                  id: "road-apparel-women",
                  name: "Women",
                  description: "Women's road cycling apparel",
                },
                {
                  id: "road-apparel-men",
                  name: "Men",
                  description: "Men's road cycling apparel",
                },
              ],
            },
            {
              id: "road-accessories",
              name: "Accessories",
              description: "Road cycling accessories",
            },
            {
              id: "road-youth",
              name: "Youth",
              description: "Youth road cycling equipment",
            },
          ],
        },
        {
          id: "mountain-bike",
          name: "Mountain Bike",
          description: "Mountain biking equipment",
          subcategories: [
            {
              id: "mtb-helmets",
              name: "Helmets",
              description: "Mountain bike helmets",
            },
            {
              id: "mtb-eyewear",
              name: "Eyewear",
              description: "Mountain bike eyewear",
            },
            {
              id: "mtb-apparel",
              name: "Apparel",
              description: "Mountain bike apparel",
              subcategories: [
                {
                  id: "mtb-apparel-women",
                  name: "Women",
                  description: "Women's mountain bike apparel",
                },
                {
                  id: "mtb-apparel-men",
                  name: "Men",
                  description: "Men's mountain bike apparel",
                },
              ],
            },
            {
              id: "mtb-protection",
              name: "Protection",
              description: "Mountain bike protection gear",
            },
            {
              id: "mtb-backpacks",
              name: "Backpacks & Packs",
              description: "Mountain bike backpacks and packs",
            },
            {
              id: "mtb-accessories",
              name: "Accessories",
              description: "Mountain bike accessories",
            },
            {
              id: "mtb-youth",
              name: "Youth",
              description: "Youth mountain bike equipment",
            },
          ],
        },
        {
          id: "gravel",
          name: "Gravel",
          description: "Gravel cycling equipment",
          subcategories: [
            {
              id: "gravel-helmets",
              name: "Helmets",
              description: "Gravel cycling helmets",
            },
            {
              id: "gravel-eyewear",
              name: "Eyewear",
              description: "Gravel cycling eyewear",
            },
            {
              id: "gravel-apparel",
              name: "Apparel",
              description: "Gravel cycling apparel",
              subcategories: [
                {
                  id: "gravel-apparel-women",
                  name: "Women",
                  description: "Women's gravel cycling apparel",
                },
                {
                  id: "gravel-apparel-men",
                  name: "Men",
                  description: "Men's gravel cycling apparel",
                },
              ],
            },
            {
              id: "gravel-accessories",
              name: "Accessories",
              description: "Gravel cycling accessories",
            },
            {
              id: "gravel-backpacks",
              name: "Backpacks",
              description: "Gravel cycling backpacks",
            },
            {
              id: "gravel-youth",
              name: "Youth",
              description: "Youth gravel cycling equipment",
            },
          ],
        },
        {
          id: "city-commute",
          name: "City-Commute",
          description: "Urban cycling equipment",
          subcategories: [
            {
              id: "city-helmets",
              name: "Helmets",
              description: "Urban cycling helmets",
            },
            {
              id: "city-eyewear",
              name: "Eyewear",
              description: "Urban cycling eyewear",
            },
            {
              id: "city-apparel",
              name: "Apparel",
              description: "Urban cycling apparel",
              subcategories: [
                {
                  id: "city-apparel-women",
                  name: "Women",
                  description: "Women's urban cycling apparel",
                },
                {
                  id: "city-apparel-men",
                  name: "Men",
                  description: "Men's urban cycling apparel",
                },
              ],
            },
            {
              id: "city-accessories",
              name: "Accessories",
              description: "Urban cycling accessories",
            },
            {
              id: "city-backpacks",
              name: "Backpacks",
              description: "Urban cycling backpacks",
            },
            {
              id: "city-youth",
              name: "Youth",
              description: "Youth urban cycling equipment",
            },
          ],
        },
        {
          id: "pocito",
          name: "POCito",
          description: "Children's cycling equipment",
          subcategories: [
            {
              id: "pocito-helmets",
              name: "Helmets",
              description: "Children's cycling helmets",
            },
            {
              id: "pocito-eyewear",
              name: "Eyewear",
              description: "Children's cycling eyewear",
            },
            {
              id: "pocito-apparel",
              name: "Apparel",
              description: "Children's cycling apparel",
            },
          ],
        },
        {
          id: "casual",
          name: "Casual",
          description: "Casual cycling equipment",
          subcategories: [
            {
              id: "casual-apparel",
              name: "Apparel",
              description: "Casual cycling apparel",
              subcategories: [
                {
                  id: "casual-apparel-women",
                  name: "Women",
                  description: "Women's casual cycling apparel",
                },
                {
                  id: "casual-apparel-men",
                  name: "Men",
                  description: "Men's casual cycling apparel",
                },
              ],
            },
            {
              id: "casual-eyewear",
              name: "Eyewear",
              description: "Casual cycling eyewear",
            },
            {
              id: "casual-backpacks",
              name: "Backpacks & Packs",
              description: "Casual cycling backpacks and packs",
            },
            {
              id: "casual-accessories",
              name: "Accessories",
              description: "Casual cycling accessories",
            },
            {
              id: "casual-youth",
              name: "Youth",
              description: "Youth casual cycling equipment",
            },
          ],
        },
        {
          id: "product-type",
          name: "Per Product Type",
          description: "Browse by product type",
          subcategories: [
            {
              id: "bike-helmets",
              name: "Bike Helmets",
              description: "All cycling helmets",
            },
            {
              id: "bike-eyewear",
              name: "Bike Eyewear",
              description: "All cycling eyewear",
            },
            {
              id: "bike-apparel",
              name: "Bike Apparel",
              description: "All cycling apparel",
            },
            {
              id: "bike-protection",
              name: "Bike Protection",
              description: "All cycling protection gear",
            },
            {
              id: "bike-accessories",
              name: "Bike Accessories",
              description: "All cycling accessories",
            },
            {
              id: "bike-backpacks",
              name: "Bike Backpacks & Packs",
              description: "All cycling backpacks and packs",
            },
            {
              id: "bike-spare-parts",
              name: "Bike Spare Parts & Lenses",
              description: "Cycling spare parts and replacement lenses",
            },
          ],
        },
      ],
    },
    {
      id: "snow",
      name: "Snow",
      description: "Snow sports equipment and accessories",
      subcategories: [
        {
          id: "all-mountain",
          name: "All Mountain",
          description: "All mountain snow equipment",
          subcategories: [
            {
              id: "all-mountain-helmets",
              name: "Helmets",
              description: "All mountain snow helmets",
            },
            {
              id: "all-mountain-goggles",
              name: "Goggles & Sunglasses",
              description: "All mountain snow goggles and sunglasses",
            },
            {
              id: "all-mountain-protection",
              name: "Protection",
              description: "All mountain snow protection gear",
            },
            {
              id: "all-mountain-apparel",
              name: "Apparel",
              description: "All mountain snow apparel",
              subcategories: [
                {
                  id: "all-mountain-apparel-women",
                  name: "Women",
                  description: "Women's all mountain snow apparel",
                },
                {
                  id: "all-mountain-apparel-men",
                  name: "Men",
                  description: "Men's all mountain snow apparel",
                },
              ],
            },
            {
              id: "all-mountain-backpacks",
              name: "Backpacks",
              description: "All mountain snow backpacks",
            },
            {
              id: "all-mountain-accessories",
              name: "Accessories",
              description: "All mountain snow accessories",
            },
            {
              id: "all-mountain-junior",
              name: "Junior",
              description: "Junior all mountain snow equipment",
            },
          ],
        },
        {
          id: "ski-race",
          name: "Ski Race",
          description: "Ski racing equipment",
          subcategories: [
            {
              id: "ski-race-helmets",
              name: "Helmets",
              description: "Ski racing helmets",
            },
            {
              id: "ski-race-goggles",
              name: "Goggles",
              description: "Ski racing goggles",
            },
            {
              id: "ski-race-apparel",
              name: "Apparel",
              description: "Ski racing apparel",
              subcategories: [
                {
                  id: "ski-race-apparel-women",
                  name: "Women",
                  description: "Women's ski racing apparel",
                },
                {
                  id: "ski-race-apparel-men",
                  name: "Men",
                  description: "Men's ski racing apparel",
                },
              ],
            },
            {
              id: "ski-race-protection",
              name: "Protection",
              description: "Ski racing protection gear",
            },
            {
              id: "ski-race-backpacks",
              name: "Backpacks",
              description: "Ski racing backpacks",
            },
            {
              id: "ski-race-junior",
              name: "Junior",
              description: "Junior ski racing equipment",
            },
          ],
        },
        {
          id: "backcountry",
          name: "Backcountry",
          description: "Backcountry snow equipment",
          subcategories: [
            {
              id: "backcountry-helmets",
              name: "Helmets",
              description: "Backcountry snow helmets",
            },
            {
              id: "backcountry-goggles",
              name: "Goggles & Sunglasses",
              description: "Backcountry snow goggles and sunglasses",
            },
            {
              id: "backcountry-apparel",
              name: "Apparel",
              description: "Backcountry snow apparel",
              subcategories: [
                {
                  id: "backcountry-apparel-women",
                  name: "Women",
                  description: "Women's backcountry snow apparel",
                },
                {
                  id: "backcountry-apparel-men",
                  name: "Men",
                  description: "Men's backcountry snow apparel",
                },
              ],
            },
            {
              id: "backcountry-protection",
              name: "Protection",
              description: "Backcountry snow protection gear",
            },
            {
              id: "backcountry-backpacks",
              name: "Backpacks",
              description: "Backcountry snow backpacks",
            },
            {
              id: "backcountry-accessories",
              name: "Accessories",
              description: "Backcountry snow accessories",
            },
            {
              id: "backcountry-junior",
              name: "Junior",
              description: "Junior backcountry snow equipment",
            },
          ],
        },
        {
          id: "snow-casual",
          name: "Casual",
          description: "Casual snow equipment",
          subcategories: [
            {
              id: "snow-casual-sunglasses",
              name: "Sunglasses",
              description: "Casual snow sunglasses",
            },
            {
              id: "snow-casual-apparel",
              name: "Apparel",
              description: "Casual snow apparel",
              subcategories: [
                {
                  id: "snow-casual-apparel-women",
                  name: "Women",
                  description: "Women's casual snow apparel",
                },
                {
                  id: "snow-casual-apparel-men",
                  name: "Men",
                  description: "Men's casual snow apparel",
                },
              ],
            },
            {
              id: "snow-casual-accessories",
              name: "Accessories",
              description: "Casual snow accessories",
            },
            {
              id: "snow-casual-junior",
              name: "Junior",
              description: "Junior casual snow equipment",
            },
          ],
        },
        {
          id: "snow-pocito",
          name: "POCito",
          description: "Children's snow equipment",
          subcategories: [
            {
              id: "snow-pocito-helmets",
              name: "Helmets",
              description: "Children's snow helmets",
            },
            {
              id: "snow-pocito-goggles",
              name: "Goggles & Sunglasses",
              description: "Children's snow goggles and sunglasses",
            },
            {
              id: "snow-pocito-apparel",
              name: "Apparel",
              description: "Children's snow apparel",
            },
            {
              id: "snow-pocito-protection",
              name: "Protection",
              description: "Children's snow protection gear",
            },
          ],
        },
        {
          id: "snow-product-type",
          name: "Per Product Type",
          description: "Browse snow products by type",
          subcategories: [
            {
              id: "ski-helmets",
              name: "Ski Helmets",
              description: "All snow helmets",
            },
            {
              id: "ski-goggles",
              name: "Ski Goggles",
              description: "All snow goggles",
            },
            {
              id: "ski-sunglasses",
              name: "Ski Sunglasses",
              description: "All snow sunglasses",
            },
            {
              id: "ski-apparel",
              name: "Ski Apparel",
              description: "All snow apparel",
            },
            {
              id: "ski-protection",
              name: "Ski Protection",
              description: "All snow protection gear",
            },
            {
              id: "ski-backpacks",
              name: "Ski Backpacks",
              description: "All snow backpacks",
            },
            {
              id: "ski-accessories",
              name: "Ski Accessories",
              description: "All snow accessories",
            },
            {
              id: "ski-spare-parts",
              name: "Ski Spare Parts & Lenses",
              description: "Snow spare parts and replacement lenses",
            },
          ],
        },
      ],
    },
    {
      id: "archive",
      name: "Archive",
      description: "Archive and sale items",
    },
  ],
};
