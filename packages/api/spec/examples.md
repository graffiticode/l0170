<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0170 RAG Training Examples

100 example prompts for training a RAG model on the L0170 data transformation language.

## Category 1: Fetch (1–8)

1. Fetches JSON data from "https://jsonplaceholder.typicode.com/users".
2. Fetches CSV data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv".
3. Fetches JSON data from "https://dummyjson.com/products?limit=100".
4. Fetches post data from "https://jsonplaceholder.typicode.com/posts".
5. Fetches todo data from "https://jsonplaceholder.typicode.com/todos".
6. Fetches comment data from "https://jsonplaceholder.typicode.com/comments".
7. Fetches photo data from "https://jsonplaceholder.typicode.com/photos".
8. Fetches album data from "https://jsonplaceholder.typicode.com/albums".

## Category 2: Filter (9–22)

9. Fetches todos from "https://jsonplaceholder.typicode.com/todos" and filters rows where completed equals true.
10. Fetches users from "https://jsonplaceholder.typicode.com/users" and filters rows where address.city equals "Gwenborough".
11. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where price is less than 50.
12. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and filters rows where sepal_length is greater than 5 and sepal_width is greater than 3.
13. Fetches users from "https://jsonplaceholder.typicode.com/users" and filters rows where name contains "Leanne".
14. Fetches comments from "https://jsonplaceholder.typicode.com/comments" and filters rows where email ends with ".biz".
15. Fetches users from "https://jsonplaceholder.typicode.com/users" and filters rows where name starts with "C".
16. Fetches todos from "https://jsonplaceholder.typicode.com/todos" and filters rows where completed is not equal to true.
17. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where rating is greater than or equal to 4.5.
18. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where stock is less than or equal to 10.
19. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where category equals "furniture" and price is greater than 30.
20. Fetches posts from "https://jsonplaceholder.typicode.com/posts" and filters rows where userId equals 1.
21. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and filters rows where rating is greater than 4 and category equals "smartphones".
22. Fetches users from "https://jsonplaceholder.typicode.com/users" and filters rows where address.city equals "South Elvis".

## Category 3: Select (23–32)

23. Fetches users from "https://jsonplaceholder.typicode.com/users" and selects name and email.
24. Fetches users from "https://jsonplaceholder.typicode.com/users" and selects name, email, and phone.
25. Fetches users from "https://jsonplaceholder.typicode.com/users" and selects company.name and name.
26. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and renames title to name.
27. Fetches users from "https://jsonplaceholder.typicode.com/users" and selects address.city and address.zipcode.
28. Fetches users from "https://jsonplaceholder.typicode.com/users", renames company.name to companyName, and selects name.
29. Fetches comments from "https://jsonplaceholder.typicode.com/comments" and selects only the email field.
30. Fetches todos from "https://jsonplaceholder.typicode.com/todos" and selects id, title, and completed.
31. Fetches posts from "https://jsonplaceholder.typicode.com/posts" and renames userId to author and selects title.
32. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and selects category and price.

## Category 4: Mutate (33–42)

33. Fetches users from "https://jsonplaceholder.typicode.com/users" and adds a label field by concatenating name, " <", and email, and ">".
34. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and adds a salePrice field by multiplying price and discountPercentage.
35. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and adds a sepal_area field by multiplying sepal_length and sepal_width.
36. Fetches todos from "https://jsonplaceholder.typicode.com/todos" and adds a source field with the literal value "jsonplaceholder".
37. Fetches users from "https://jsonplaceholder.typicode.com/users" and adds a contact field by concatenating name, " (", phone, and ")".
38. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and adds a totalValue field by multiplying price and stock.
39. Fetches users from "https://jsonplaceholder.typicode.com/users" and adds an info field by concatenating username, " - ", website.
40. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and adds a petal_area field by multiplying petal_length and petal_width.
41. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and adds a total_length field by summing sepal_length and petal_length.
42. Fetches users from "https://jsonplaceholder.typicode.com/users" and adds a greeting field by concatenating "Hello, " and name.

## Category 5: Group (43–54)

43. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category counting rows as n.
44. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species computing average sepal_length.
45. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species counting rows as count and computing average petal_length.
46. Fetches posts from "https://jsonplaceholder.typicode.com/posts" and groups by userId counting rows as postCount.
47. Fetches todos from "https://jsonplaceholder.typicode.com/todos" and groups by userId counting rows as totalTodos.
48. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species computing min and max of sepal_length.
49. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category computing average rating.
50. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category summing stock as totalStock.
51. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and groups by species computing average petal_width.
52. Fetches comments from "https://jsonplaceholder.typicode.com/comments" and groups by postId counting rows as commentCount.
53. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category summing price as totalPrice.
54. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and groups by category computing average price.

## Category 6: Sort (55–62)

55. Fetches users from "https://jsonplaceholder.typicode.com/users" and sorts by name ascending.
56. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and sorts by price descending.
57. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and sorts by sepal_length ascending.
58. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and sorts by rating descending.
59. Fetches posts from "https://jsonplaceholder.typicode.com/posts" and sorts by title ascending.
60. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv" and sorts by petal_length descending.
61. Fetches users from "https://jsonplaceholder.typicode.com/users" and sorts by username.
62. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and sorts by stock descending.

## Category 7: Take (63–68)

63. Fetches photos from "https://jsonplaceholder.typicode.com/photos" and takes the first 10 items.
64. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and takes the first 5 items.
65. Fetches posts from "https://jsonplaceholder.typicode.com/posts" and takes the last 3 items.
66. Fetches comments from "https://jsonplaceholder.typicode.com/comments" and takes the first 20 items.
67. Fetches todos from "https://jsonplaceholder.typicode.com/todos" and takes the last 10 items.
68. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, sorts by price descending, and takes the first 1 item.

## Category 8: Join (69–72)

69. Fetches posts from "https://jsonplaceholder.typicode.com/posts" and joins with users fetched from "https://jsonplaceholder.typicode.com/users" on userId matching id.
70. Fetches comments from "https://jsonplaceholder.typicode.com/comments" and joins with posts fetched from "https://jsonplaceholder.typicode.com/posts" on postId matching id.
71. Fetches photos from "https://jsonplaceholder.typicode.com/photos" and joins with albums fetched from "https://jsonplaceholder.typicode.com/albums" on albumId matching id.
72. Fetches albums from "https://jsonplaceholder.typicode.com/albums" and joins with users fetched from "https://jsonplaceholder.typicode.com/users" on userId matching id.

## Category 9: Get (73–78)

73. Fetches products from "https://dummyjson.com/products?limit=100" and gets the "products" field.
74. Fetches users from "https://jsonplaceholder.typicode.com/users" and gets the "address.city" field.
75. Fetches users from "https://jsonplaceholder.typicode.com/users" and gets the "company.name" field.
76. Fetches users from "https://jsonplaceholder.typicode.com/users" and gets the "address.geo" field.
77. Fetches products from "https://dummyjson.com/products?limit=100" and gets the "products.title" field.
78. Fetches users from "https://jsonplaceholder.typicode.com/users" and gets the "address" field.

## Category 10: Flatten (79–82)

79. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and flattens the "tags" field.
80. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and flattens the "images" field.
81. Fetches users from "https://jsonplaceholder.typicode.com/users" and flattens nested arrays to depth 1.
82. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and flattens the "reviews" field.

## Category 11: Unique (83–86)

83. Fetches comments from "https://jsonplaceholder.typicode.com/comments" and deduplicates by email.
84. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and deduplicates by category and brand.
85. Fetches posts from "https://jsonplaceholder.typicode.com/posts" and deduplicates by userId.
86. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, and deduplicates by category.

## Category 12: Pipelines (87–100)

87. Fetches users from "https://jsonplaceholder.typicode.com/users", selects name and email, and sorts by name.
88. Fetches todos from "https://jsonplaceholder.typicode.com/todos", filters where completed equals true, and sorts by title.
89. Fetches todos from "https://jsonplaceholder.typicode.com/todos", filters where completed equals true, groups by userId, and counts rows as completedCount.
90. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv", filters where sepal_length is greater than 6, and sorts by sepal_length descending.
91. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, selects title and rating, sorts by rating descending, and takes the first 5.
92. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, filters where price is greater than 100, selects title and price, and sorts by price descending.
93. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, groups by category and sums price as totalPrice, and sorts by totalPrice descending.
94. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, filters where rating is greater than or equal to 4, and selects title and price.
95. Fetches iris data from "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv", groups by species and computes average sepal_length, and sorts by sepal_length descending.
96. Fetches todos from "https://jsonplaceholder.typicode.com/todos", groups by userId and counts as totalTodos, sorts by totalTodos descending, and takes the first 3.
97. Fetches users from "https://jsonplaceholder.typicode.com/users", adds a label field by concatenating name, " <", email, and ">", and selects label and phone.
98. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, groups by category computing average rating, sorts by rating descending, and takes the first 5.
99. Fetches products from "https://dummyjson.com/products?limit=100", gets the "products" field, flattens the "tags" field, deduplicates by tags, and sorts by tags.
100. Fetches comments from "https://jsonplaceholder.typicode.com/comments", deduplicates by email, selects name and email, and sorts by email.
