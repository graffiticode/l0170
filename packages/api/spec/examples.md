<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0170 RAG Training Examples

102 example prompts for training a RAG model on the L0170 data transformation language.

## Category 1: Fetch (1–8)

1. Fetch JSON data from "https://jsonplaceholder.typicode.com/users".
2. Fetch CSV data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv".
3. Fetch JSON data from "https://dummyjson.com/products?limit=100".
4. Fetch post data from "https://jsonplaceholder.typicode.com/posts".
5. Fetch todo data from "https://jsonplaceholder.typicode.com/todos".
6. Fetch comment data from "https://jsonplaceholder.typicode.com/comments".
7. Fetch photo data from "https://jsonplaceholder.typicode.com/photos".
8. Fetch album data from "https://jsonplaceholder.typicode.com/albums".

## Category 2: Filter (9–24)

9. Fetch todos from "https://jsonplaceholder.typicode.com/todos" and filters rows where completed equals true.
10. Fetch users from "https://jsonplaceholder.typicode.com/users" and filters rows where address.city equals "Gwenborough".
11. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where price is less than 50.
12. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and filters rows where sepal_length is greater than 5 and sepal_width is greater than 3.
13. Fetch users from "https://jsonplaceholder.typicode.com/users" and filters rows where name contains "Leanne".
14. Fetch comments from "https://jsonplaceholder.typicode.com/comments" and filters rows where email ends with ".biz".
15. Fetch users from "https://jsonplaceholder.typicode.com/users" and filters rows where name starts with "C".
16. Fetch todos from "https://jsonplaceholder.typicode.com/todos" and filters rows where completed is not equal to true.
17. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where rating is greater than or equal to 4.5.
18. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where stock is less than or equal to 10.
19. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where category equals "furniture" and price is greater than 30.
20. Fetch posts from "https://jsonplaceholder.typicode.com/posts" and filters rows where userId equals 1.
21. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where rating is greater than 4 and category equals "smartphones".
22. Fetch users from "https://jsonplaceholder.typicode.com/users" and filters rows where address.city equals "South Elvis".
23. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where category is in ["furniture", "groceries", "smartphones"].
24. Fetch users from "https://jsonplaceholder.typicode.com/users" and filters rows where address.city is not in ["Gwenborough", "South Elvis", "Wisokyburgh"].

## Category 3: Select (25–34)

25. Fetch users from "https://jsonplaceholder.typicode.com/users" and selects name and email.
26. Fetch users from "https://jsonplaceholder.typicode.com/users" and selects name, email, and phone.
27. Fetch users from "https://jsonplaceholder.typicode.com/users" and selects company.name and name.
28. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and renames title to name.
29. Fetch users from "https://jsonplaceholder.typicode.com/users" and selects address.city and address.zipcode.
30. Fetch users from "https://jsonplaceholder.typicode.com/users", renames company.name to companyName, and selects name.
31. Fetch comments from "https://jsonplaceholder.typicode.com/comments" and selects only the email field.
32. Fetch todos from "https://jsonplaceholder.typicode.com/todos" and selects id, title, and completed.
33. Fetch posts from "https://jsonplaceholder.typicode.com/posts" and renames userId to author and selects title.
34. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and selects category and price.

## Category 4: Mutate (35–44)

35. Fetch users from "https://jsonplaceholder.typicode.com/users" and adds a label field by concatenating name, " <", and email, and ">".
36. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and adds a salePrice field by multiplying price and discountPercentage, rounded to 2 decimal places.
37. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and adds a sepal_area field by multiplying sepal_length and sepal_width, rounded to 2 decimal places.
38. Fetch todos from "https://jsonplaceholder.typicode.com/todos" and adds a source field with the literal value "jsonplaceholder".
39. Fetch users from "https://jsonplaceholder.typicode.com/users" and adds a contact field by concatenating name, " (", phone, and ")".
40. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and adds a totalValue field by multiplying price and stock, rounded to 2 decimal places.
41. Fetch users from "https://jsonplaceholder.typicode.com/users" and adds an info field by concatenating username, " - ", website.
42. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and adds a petal_area field by multiplying petal_length and petal_width.
43. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and adds a total_length field by summing sepal_length and petal_length, rounded to 1 decimal place.
44. Fetch users from "https://jsonplaceholder.typicode.com/users" and adds a greeting field by concatenating "Hello, " and name.

## Category 5: Group (45–56)

45. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category counting rows as n.
46. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species computing average sepal_length rounded to 2 decimal places.
47. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species counting rows as count and computing average petal_length.
48. Fetch posts from "https://jsonplaceholder.typicode.com/posts" and groups by userId counting rows as postCount.
49. Fetch todos from "https://jsonplaceholder.typicode.com/todos" and groups by userId counting rows as totalTodos.
50. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species computing min and max of sepal_length.
51. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category computing average rating rounded to 1 decimal place.
52. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category summing stock as totalStock.
53. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species computing average petal_width.
54. Fetch comments from "https://jsonplaceholder.typicode.com/comments" and groups by postId counting rows as commentCount.
55. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category summing price as totalPrice.
56. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category computing average price rounded to 2 decimal places.

## Category 6: Sort (57–64)

57. Fetch users from "https://jsonplaceholder.typicode.com/users" and sorts by name ascending.
58. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and sorts by price descending.
59. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and sorts by sepal_length ascending.
60. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and sorts by rating descending.
61. Fetch posts from "https://jsonplaceholder.typicode.com/posts" and sorts by title ascending.
62. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and sorts by petal_length descending.
63. Fetch users from "https://jsonplaceholder.typicode.com/users" and sorts by username.
64. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and sorts by stock descending.

## Category 7: Take (65–70)

65. Fetch photos from "https://jsonplaceholder.typicode.com/photos" and takes the first 10 items.
66. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and takes the first 5 items.
67. Fetch posts from "https://jsonplaceholder.typicode.com/posts" and takes the last 3 items.
68. Fetch comments from "https://jsonplaceholder.typicode.com/comments" and takes the first 20 items.
69. Fetch todos from "https://jsonplaceholder.typicode.com/todos" and takes the last 10 items.
70. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, sorts by price descending, and takes the first 1 item.

## Category 8: Join (71–74)

71. Fetch posts from "https://jsonplaceholder.typicode.com/posts" and joins with users fetched from "https://jsonplaceholder.typicode.com/users" on userId matching id.
72. Fetch comments from "https://jsonplaceholder.typicode.com/comments" and joins with posts fetched from "https://jsonplaceholder.typicode.com/posts" on postId matching id.
73. Fetch photos from "https://jsonplaceholder.typicode.com/photos" and joins with albums fetched from "https://jsonplaceholder.typicode.com/albums" on albumId matching id.
74. Fetch albums from "https://jsonplaceholder.typicode.com/albums" and joins with users fetched from "https://jsonplaceholder.typicode.com/users" on userId matching id.

## Category 9: Get (75–80)

75. Fetch products from "https://dummyjson.com/products?limit=100" and gets the "products" field.
76. Fetch users from "https://jsonplaceholder.typicode.com/users" and gets the "address.city" field.
77. Fetch users from "https://jsonplaceholder.typicode.com/users" and gets the "company.name" field.
78. Fetch users from "https://jsonplaceholder.typicode.com/users" and gets the "address.geo" field.
79. Fetch products from "https://dummyjson.com/products?limit=100" and gets the "products.title" field.
80. Fetch users from "https://jsonplaceholder.typicode.com/users" and gets the "address" field.

## Category 10: Flatten (81–84)

81. Given data with rows containing a "tags" array field (e.g., [{name: "A", tags: ["x", "y"]}, {name: "B", tags: ["z"]}]), flatten the "tags" field to produce one row per tag.
82. Given data with rows containing an "items" array of records (e.g., [{order: 1, items: [{sku: "A1", qty: 2}, {sku: "B3", qty: 1}]}, {order: 2, items: [{sku: "A1", qty: 5}]}]), flatten the "items" field to produce one row per item.
83. Given data with rows containing a "scores" array of numbers (e.g., [{student: "Alice", scores: [90, 85, 92]}, {student: "Bob", scores: [78, 88]}]), flatten the "scores" field to produce one row per score.
84. Given data with rows containing a "colors" array field (e.g., [{product: "shirt", colors: ["red", "blue"]}, {product: "hat", colors: ["black"]}]), flatten the "colors" field and then deduplicate by colors.

## Category 11: Unique (85–88)

85. Fetch comments from "https://jsonplaceholder.typicode.com/comments" and deduplicates by email.
86. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and deduplicates by category and brand.
87. Fetch posts from "https://jsonplaceholder.typicode.com/posts" and deduplicates by userId.
88. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, and deduplicates by category.

## Category 12: Pipelines (89–102)

89. Fetch users from "https://jsonplaceholder.typicode.com/users", selects name and email, and sorts by name.
90. Fetch todos from "https://jsonplaceholder.typicode.com/todos", filters where completed equals true, and sorts by title.
91. Fetch todos from "https://jsonplaceholder.typicode.com/todos", filters where completed equals true, groups by userId, and counts rows as completedCount.
92. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv", filters where sepal_length is greater than 6, and sorts by sepal_length descending.
93. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, selects title and rating, sorts by rating descending, and takes the first 5.
94. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, filters where price is greater than 100, selects title and price, and sorts by price descending.
95. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, groups by category and sums price as totalPrice rounded to 2 decimal places, and sorts by totalPrice descending.
96. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, filters where rating is greater than or equal to 4, and selects title and price.
97. Fetch iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv", groups by species and computes average sepal_length rounded to 2 decimal places, and sorts by sepal_length descending.
98. Fetch todos from "https://jsonplaceholder.typicode.com/todos", groups by userId and counts as totalTodos, sorts by totalTodos descending, and takes the first 3.
99. Fetch users from "https://jsonplaceholder.typicode.com/users", adds a label field by concatenating name, " <", email, and ">", and selects label and phone.
100. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, groups by category computing average rating rounded to 1 decimal place, sorts by rating descending, and takes the first 5.
101. Fetch products from "https://dummyjson.com/products?limit=100", gets the "products" field, flattens the "tags" field, deduplicates by tags, and sorts by tags.
102. Fetch comments from "https://jsonplaceholder.typicode.com/comments", deduplicates by email, selects name and email, and sorts by email.
