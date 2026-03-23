<!-- SPDX-License-Identifier: CC-BY-4.0 -->
# L0170 RAG Training Examples

100 example prompts for training a RAG model on the L0170 data transformation language.

## Category 1: Fetch (1–8)

1. Fetches JSON data from "https://jsonplaceholder.typicode.com/users".
2. Fetches CSV data from "https://example.com/sales.csv".
3. Fetches JSON data from "https://example.com/api/products.json".
4. Fetches post data from "https://jsonplaceholder.typicode.com/posts".
5. Fetches employee records from "https://example.com/employees.csv".
6. Fetches weather data from "https://example.com/weather.json".
7. Fetches stock prices from "https://example.com/stocks.csv".
8. Fetches order data from "https://example.com/orders.json".

## Category 2: Filter (9–22)

9. Filters rows where status equals "active" from data.
10. Filters rows where age is greater than 30 from data.
11. Filters rows where price is less than 50 from data.
12. Filters rows where age is between 18 and 65 from data.
13. Filters rows where name contains "smith" from data.
14. Filters rows where email ends with ".com" from data.
15. Filters rows where name starts with "J" from data.
16. Filters rows where status is not equal to "inactive" from data.
17. Filters rows where score is greater than or equal to 90 from data.
18. Filters rows where quantity is less than or equal to 10 from data.
19. Filters rows where department equals "engineering" and salary is greater than 100000 from data.
20. Filters rows where player.goals is greater than 10 from data.
21. Filters rows where rating is greater than 4 and category equals "electronics" from data.
22. Filters rows where city equals "New York" from data.

## Category 3: Select (23–32)

23. Selects name and age fields from data.
24. Selects name, email, and phone fields from data.
25. Selects player.name and goals fields from data.
26. Renames firstName to name from data.
27. Selects address.city and address.state fields from data.
28. Renames player.name to playerName and selects goals from data.
29. Selects only the email field from data.
30. Selects id, name, and status fields from data.
31. Renames createdAt to date and selects amount from data.
32. Selects department and salary fields from data.

## Category 4: Mutate (33–42)

33. Adds a fullName field by concatenating first and last from data.
34. Adds a total field by summing price and tax from data.
35. Adds an area field by multiplying width and height from data.
36. Adds a status field with the literal value "active" to each row in data.
37. Adds a displayName field by concatenating first, a space, and last from data.
38. Adds a subtotal field by multiplying price and quantity from data.
39. Adds a label field by concatenating name, " (", department, and ")" from data.
40. Adds a totalCost field by summing shipping and subtotal from data.
41. Adds a bmi field by multiplying weight and heightFactor from data.
42. Adds a greeting field by concatenating "Hello, " and name from data.

## Category 5: Group (43–54)

43. Groups by category and counts rows as n from data.
44. Groups by department and computes average salary from data.
45. Groups by department and counts rows as headcount and computes average salary from data.
46. Groups by team and sums points as totalPoints from data.
47. Groups by city and counts rows as population from data.
48. Groups by category and computes min and max of price from data.
49. Groups by status and counts rows as count from data.
50. Groups by region and sums revenue from data.
51. Groups by department and computes average age from data.
52. Groups by country and counts rows as numCustomers from data.
53. Groups by year and sums sales from data.
54. Groups by product and computes average rating from data.

## Category 6: Sort (55–62)

55. Sorts by name ascending from data.
56. Sorts by age descending from data.
57. Sorts by price ascending from data.
58. Sorts by score descending from data.
59. Sorts by date ascending from data.
60. Sorts by salary descending from data.
61. Sorts by name from data.
62. Sorts by total descending from data.

## Category 7: Take (63–68)

63. Takes the first 10 items from data.
64. Takes the first 5 items from data.
65. Takes the last 3 items from data.
66. Takes the first 20 items from data.
67. Takes the last 10 items from data.
68. Takes the first 1 item from data.

## Category 8: Join (69–72)

69. Joins data with departments on departmentId.
70. Joins data with prices on productId.
71. Joins data with addresses on userId.
72. Joins data with categories on categoryId.

## Category 9: Get (73–78)

73. Gets the "results" field from data.
74. Gets the "address.city" field from data.
75. Gets the "departments.teams.name" field from data.
76. Gets the "data.items" field from data.
77. Gets the "response.users" field from data.
78. Gets the "stats.totals" field from data.

## Category 10: Flatten (79–82)

79. Flattens nested arrays to depth 1 from data.
80. Flattens the "items" field from data.
81. Flattens the "orders" field from data.
82. Flattens nested arrays to depth 2 from data.

## Category 11: Unique (83–86)

83. Deduplicates by email from data.
84. Deduplicates by department and role from data.
85. Deduplicates by name from data.
86. Deduplicates by category and subcategory from data.

## Category 12: Pipelines (87–100)

87. Fetches users from "https://jsonplaceholder.typicode.com/users" and selects name and email.
88. Filters rows where age is greater than 30 and sorts by name from data.
89. Filters rows where status equals "active", groups by department, and counts rows as headcount from data.
90. Fetches data from "https://example.com/sales.csv", filters rows where amount is greater than 100, and sorts by amount descending.
91. Selects name and score, sorts by score descending, and takes the first 5 from data.
92. Filters rows where goals is greater than 10, selects player.name and goals, and sorts by goals descending from data.
93. Groups by category and sums revenue, then sorts by revenue descending from data.
94. Fetches products from "https://example.com/products.json", filters where price is less than 50, and selects name and price.
95. Gets "results" from data, filters where score is greater than or equal to 80, and sorts by score descending.
96. Filters where status equals "active", groups by region and counts as n, sorts by n descending, and takes the first 3 from data.
97. Fetches employees from "https://example.com/employees.csv", adds a fullName field by concatenating first and last, and selects fullName and department.
98. Filters where department equals "sales", groups by region and sums amount as totalSales, and sorts by totalSales descending from data.
99. Gets "orders" from data, flattens the "items" field, selects name and price, and sorts by price descending.
100. Deduplicates by email, filters where status is not equal to "inactive", selects name and email, and sorts by name from data.
