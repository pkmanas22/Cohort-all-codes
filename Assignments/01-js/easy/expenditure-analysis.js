/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  }
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let categoryMap = new Map();

  transactions.forEach(tran => {
    const { category, price } = tran;

    if (categoryMap.has(category)) {
      categoryMap.set(category, categoryMap.get(category) + price)
    } else {
      categoryMap.set(category, price);
    }
  });

  // console.log(categoryMap);

  let ans = [];
  categoryMap.forEach((totalSpent, category) => {
    ans.push({category, totalSpent});
  });
  // console.log(ans);
  return ans;
}

/*
const transactions = [
  {
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
  },
  {
    id: 2,
    timestamp: 1656076800000,
    price: 20,
    category: 'Food',
    itemName: 'Burger',
  },
  {
    id: 3,
    timestamp: 1656076800000,
    price: 15,
    category: 'Clothing',
    itemName: 'T-shirt',
  },
];


calculateTotalSpentByCategory(transactions)
*/

module.exports = calculateTotalSpentByCategory;
