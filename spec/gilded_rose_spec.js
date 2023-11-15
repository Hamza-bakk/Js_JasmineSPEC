const { Item, Shop } = require("../src/gilded_rose");
const { expect } = require("chai");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 10),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 45),
  new Item("Conjured Mana Cake", 3, 10),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("OMGHAI!");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
  gildedRose.updateQuality();
}

describe('Gilded Rose', function () {

  // Augmente la qualité pour "Aged Brie"
  it('should increase quality for "Aged Brie"', function () {
    const agedBrie = new Item("Aged Brie", 5, 10);
    const gildedRose = new Shop([agedBrie]);
    gildedRose.updateQuality();
    expect(agedBrie.sellIn).to.equal(4);
    expect(agedBrie.quality).to.equal(11);
  });

  // Ne doit pas augmenter la qualité au-dessus de 50 pour les objets réguliers
  it('should not increase quality above 50 for regular items', function() {
    const regularItem = new Item("Regular Item", 5, 50);
    const gildedRose = new Shop([regularItem]);
    gildedRose.updateQuality();
    expect(regularItem.quality).to.be.at.most(50);
  });

  // Diminue la qualité de 2 pour les objets "Conjured" avant sellIn
  it('should decrease quality by 2 for "Conjured" items before sellIn', function() {
    const conjuredItem = new Item("Conjured Mana Cake", 5, 10);
    const gildedRose = new Shop([conjuredItem]);
    gildedRose.updateQuality();
    expect(conjuredItem.sellIn).to.equal(4);
    expect(conjuredItem.quality).to.equal(8);
  });

  // Diminue la qualité de 4 pour les objets "Conjured" après sellIn
  it('should decrease quality by 4 for "Conjured" items after sellIn', function() {
    const conjuredItem = new Item("Conjured Mana Cake", 0, 10);
    const gildedRose = new Shop([conjuredItem]);
    gildedRose.updateQuality();
    expect(conjuredItem.sellIn).to.equal(-1);
    expect(conjuredItem.quality).to.equal(6);
  });

  // Ne doit pas diminuer la qualité en dessous de 0 pour n'importe quel objet
  it('should not decrease quality below 0 for any item', function () {
    const regularItem = new Item("Regular Item", 5, 0);
    const gildedRose = new Shop([regularItem]);
    gildedRose.updateQuality();
    expect(regularItem.quality).to.equal(0);
  });

  // Augmente la qualité de 2 pour les "Backstage passes" lorsque sellIn est de 10 ou moins
  it('should increase quality by 2 for "Backstage passes" when sellIn is 10 or less', function () {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
    const gildedRose = new Shop([backstagePass]);
    gildedRose.updateQuality();
    expect(backstagePass.sellIn).to.equal(9);
    expect(backstagePass.quality).to.equal(22);
  });

  // Augmente la qualité de 3 pour les "Backstage passes" lorsque sellIn est de 5 ou moins
  it('should increase quality by 3 for "Backstage passes" when sellIn is 5 or less', function () {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    const gildedRose = new Shop([backstagePass]);
    gildedRose.updateQuality();
    expect(backstagePass.sellIn).to.equal(4);
    expect(backstagePass.quality).to.equal(23);
  });

  // Définit la qualité à 0 pour les "Backstage passes" après le concert (sellIn est 0)
  it('should set quality to 0 for "Backstage passes" after the concert (sellIn is 0)', function () {
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    const gildedRose = new Shop([backstagePass]);
    gildedRose.updateQuality();
    expect(backstagePass.sellIn).to.equal(-1);
    expect(backstagePass.quality).to.equal(0);
  });

  // Ne doit pas changer sellIn ou quality pour "Legendary Sword"
  it('should not change sellIn or quality for "Legendary Sword"', function () {
    const legendarySword = new Item("Legendary Sword", 5, 30);
    const gildedRose = new Shop([legendarySword]);
    gildedRose.updateQuality();
    expect(legendarySword.sellIn).to.equal(5);  // La valeur de sellIn ne devrait pas changer
    expect(legendarySword.quality).to.equal(30);  // La valeur de quality ne devrait pas changer
  });
});
