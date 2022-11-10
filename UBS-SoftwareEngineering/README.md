# UBS Back-end Java Expert Challenge


# Java: Furniture Factory
## Objective
Complete implementation of FurnitureOrder.java to pass all tests

## Approach
1. See tests to understand requirements
   1. FurnitureOrder is used in 
      1. PrivateUnitTest
         1. orderNothing: totalOrderCost should be zero when no items are added
         2. placeOrders: totalOrderCost should be x when y items are added
         3. validateFurnitureCostAndQuantity: 
            1. getOrderedFurniture should return HashMap<Furniture,Integer>
            2. getTypeCount should return quantity of furniture ordered 
            3. getTypeCost should return cost of furniture ordered
         4. validateFurniture: validates labels and costs of Furniture enum
      2. SampleUnitTest
         1. Similar tests but for another case
2. Understand what members are required for FurnitureOrder
   1. HashMap<Furniture,Integer> orderedFurniture is required to store what Furniture user has ordered and in what quantity.
3. Considerations for constructor
   1. orderedFurniture should init as empty HashMap
4. Implement

## Commands
cd FurnitureFactory

Run
mvn clean install

Test
mvn clean test -Dtest=SampleUnitTest

Install
mvn clean

# MySQL: No. of Employees in Department
## Objective
Find the number of employees in each department, given two tables DEPARTMENT and EMPLOYEE

## Approach
1. Join employees with departments via department id
2. Group table by department id 
3. Sort into lexicographical order
4. Select only necessary columns and rename accordingly, add count to column where group by was applied

1.
```
SELECT * 
FROM employees 
LEFT JOIN departments 
ON employees.DEPARTMENT_ID = departments.DEPARTMENT_ID
```
2.
```
SELECT * 
FROM employees
LEFT JOIN departments 
ON employees.DEPARTMENT_ID = departments.DEPARTMENT_ID
GROUP BY employees.DEPARTMENT_ID
```
3.
```
SELECT *
FROM employees
LEFT JOIN departments 
ON employees.DEPARTMENT_ID = departments.DEPARTMENT_ID
GROUP BY employees.DEPARTMENT_ID
ORDER BY departments.DEPARTMENT_NAME
```
4.
```
SELECT COUNT(employees.DEPARTMENT_ID) AS "No. of Employees", departments.DEPARTMENT_NAME AS "Department Name"
FROM employees
LEFT JOIN departments 
ON employees.DEPARTMENT_ID = departments.DEPARTMENT_ID
GROUP BY employees.DEPARTMENT_ID
ORDER BY departments.DEPARTMENT_NAME
```

