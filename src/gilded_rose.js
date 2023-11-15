class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  
  decreaseQuality(item, amount = 1) {
    if (item.quality > 0) {
      item.quality -= amount;
    }
  }
  
  increaseQuality(item, amount = 1) {
    if (item.quality < 50) {
      const newQuality = Math.min(item.quality + amount, 50);
      item.quality = newQuality;
    }
  }
  
  
  updateQuality() {
    for (const item of this.items) {
      const isAgedBrie = item.name === 'Aged Brie';
      const isBackstagePass = item.name === 'Backstage passes to a TAFKAL80ETC concert';
      const isSulfuras = item.name === 'Sulfuras, Hand of Ragnaros';
      const isConjured = item.name.startsWith('Conjured');
      const isLegendarySword = item.name === 'Legendary Sword';
  
      if (isConjured) {
        if (item.quality > 0) {
          this.decreaseQuality(item, item.sellIn >= 0 ? 2 : 4);
        }
      } else if (!isAgedBrie && !isBackstagePass && !isLegendarySword) {
        if (item.quality > 0 && !isSulfuras) {
          this.decreaseQuality(item, item.sellIn > 0 ? 1 : 2);
        }
      } else {
        if (!isLegendarySword && item.quality < 50) {
          this.increaseQuality(item);
  
          if (isBackstagePass) {
            if (item.sellIn < 11) {
              this.increaseQuality(item);
            }
            if (item.sellIn < 6) {
              this.increaseQuality(item);
            }
          }
        }
      }
  
      if (!isSulfuras && !isLegendarySword) {
        item.sellIn -= 1;
      }
  
      if (!isLegendarySword && item.sellIn < 0) {
        if (!isAgedBrie) {
          if (!isBackstagePass) {
            if (item.quality > 0 && !isSulfuras) {
              this.decreaseQuality(item, isConjured ? 2 : 1);
            }
          } else {
            item.quality = 0;
          }
        } else {
          this.increaseQuality(item);
        }
      }
  
      if (!isLegendarySword) {
        console.log(`After update: ${item.name}, ${item.sellIn}, ${item.quality}`);
      }
    }
  
    return this.items;
  }
  
}

module.exports = {
  Item,
  Shop
};

