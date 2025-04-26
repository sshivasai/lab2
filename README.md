# Lab 02 | Unit Testing with Node and Mocha

## Overview

For this lab you will be using test driven development to create a calculator module and a calculator controller module. You will also be using dependency injection to mock the calculator module in the calculator controller module. We will begin by creating a very basic calculator module with a few methods. We will add a testing suite for these methods. Next we will add some more tests to the suite, and use test driven development to create the corresponding methods. Finally, we will create a calculator controller module and add a testing suite for it. We will then use dependency injection to mock the calculator module in the calculator controller module.

## Instructions

1. To start, let's open up the `package.json` file. In this file you should see a `scripts` object. This object contains a `test` property. This property is used to run the test suite. Let's run the test suite by typing `npm test` in a shell window. Alternatively, you can click the "Run" button above. You should see the following output:

```bash
Test Suites: 2 failed, 2 total
Tests:       0 total
Snapshots:   0 total
Time:        2.059 s
```

This is because we've defined a few test files, ending in *.test.js but the tests are not functional or fully implemented. We will be using the `npm test` command to run our test suite throughout this lab.
2. Next let's open up the `calculator.js` file. This is where we will build out our calculator logic. You should see several basic methods, `add`, `subtract`, `divide` and `multiply`. These are the methods we will be writing tests for.
3. Let's start by writing a test for the `add` method. Open up the `calculator.test.js` file. You should see a `describe` block with a `describe` block nested inside of it. The outer `describe` block is used to group tests together. The inner `describe` block is used to group tests for a specific method together. Let's write a test for the `add` method. Inside the inner `describe` block, write a `it` block. Inside the `it` block, write a test that checks if the `add` method returns the correct value when passed two numbers. You can use the following code as a starting point:

```js
    it('should add two numbers', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(-1, 2)).toBe(1);
    });

    it('should throw an error if arguments are not numbers', () => {
      expect(() => add('1', 2)).toThrow('Both arguments must be numbers');
      expect(() => add(1, '2')).toThrow('Both arguments must be numbers');
    });
```

To verify, run the `npm test` command in the terminal. You should see that one of the tests runs successfully now.

4. Now let's write the code for the `subtract` test method. Inside the `calculator.test.js` file, underneath the `add` describe block, enter the following code:

```js
  // add this below the `describe('add') block, but ensure it is
  // still in the `describe('calculator')` block!
  describe('subtract()', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(-5, 3)).toBe(-8);
    });

    it('should throw an error if arguments are not numbers', () => {
      expect(() => subtract('5', 3)).toThrow('Both arguments must be numbers');
      expect(() => subtract(5, '3')).toThrow('Both arguments must be numbers');
    });
  });
```

⚠️ *Before running the test be sure to uncomment the `subtract` method from the imports at the top of the file.*

To verify, run the `npm test` command in the terminal. You should see the tests run successfully.

5. Now we are going to add test methods for the `divide` and `multiply` methods. Continue to edit the `calculator.test.js` file. Add the following code to the bottom of the file:

```js
  // add this below the `describe('subtract') block, but ensure it is
  // still in the `describe('calculator')` block!
  describe('divide()', () => {
    it('should divide two numbers', () => {
      expect(divide(6, 3)).toBe(2);
      expect(divide(-6, 3)).toBe(-2);
    });

    it('should throw an error if arguments are not numbers', () => {
      expect(() => divide('6', 3)).toThrow('Both arguments must be numbers');
      expect(() => divide(6, '3')).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if the second argument is 0', () => {
      expect(() => divide(6, 0)).toThrow('Division by zero is not allowed');
    });
  });

  describe('multiply()', () => {
    it('should multiply two numbers', () => {
      expect(multiply(6, 3)).toBe(18);
      expect(multiply(-6, 3)).toBe(-18);
    });

    it('should throw an error if arguments are not numbers', () => {
      expect(() => multiply('6', 3)).toThrow('Both arguments must be numbers');
      expect(() => multiply(6, '3')).toThrow('Both arguments must be numbers');
    });
  });
```

⚠️ *Before running the test be sure to uncomment the `multiply` and `divide` method from the imports at the top of the file.*

To verify, run the `npm test` command in the terminal. You should see an output similar to this below:

```bash
 PASS  ./calculator.test.js
  Calculator
    add()
      ✓ should add two numbers (3 ms)
      ✓ should throw an error if arguments are not numbers (13 ms)
    subtract()
      ✓ should subtract two numbers
      ✓ should throw an error if arguments are not numbers (2 ms)
    divide()
      ✓ should divide two numbers (1 ms)
      ✓ should throw an error if arguments are not numbers (2 ms)
      ✓ should throw an error if the second argument is 0 (2 ms)
    multiply()
      ✓ should multiply two numbers (1 ms)
      ✓ should throw an error if arguments are not numbers (2 ms)

Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        0.848 s, estimated 2 s
Ran all test suites.
```

6. Now, let's reverse the script a bit. We are going to add four additional tests. But these tests will be written before we write the implementation. We will use the tests to validate that our implementation is correct. Let's start by adding a test for the `square` method. Inside the `calculator.test.js` file, add the following code:

```js
  describe('square()', () => {
    it('should square a number', () => {
      expect(square(2)).toBe(4);
      expect(square(-2)).toBe(4);
    });

    it('should throw an error if the argument is not a number', () => {
      expect(() => square('2')).toThrow('Argument must be a number');
    });
  });
```

Next, write the test for teh `squareRoot` method. Add the following code to the `calculator.test.js` file:

```js
  describe('squareRoot()', () => {
    it('should find the square root of a number', () => {
      expect(squareRoot(4)).toBe(2);
      expect(squareRoot(9)).toBe(3);
    });

    it('should throw an error if the argument is not a number', () => {
      expect(() => squareRoot('4')).toThrow('Argument must be a number');
    });

    it('should throw an error if the argument is negative', () => {
      expect(() => squareRoot(-4)).toThrow('Square root of a negative number is not allowed');
    });
  });
```

Now, let's run the app again. You should observe that many of the tests are failing. So let's implement these tests.

```bash
Test Suites: 1 failed, 1 total
Tests:       5 failed, 9 passed, 14 total
Snapshots:   0 total
Time:        0.927 s, estimated 1 s
Ran all test suites.
exit status 1
```

7. Open up the `calculator.js` file and write an implementation for the `square` and the `squareRoot` methods. You can use the following code as a starting point:
⚠️*Note you will need to write these methods on your own. The following code is just a starting point.*

⚠️*Make sure you uncomment the `squareRoot` and `square` exports at the bottom of the `calculator.js` file and the top of the `calculator.test.js` file!*
```js
/**
 * Calculate the square root of a number.
 * @param {number} a - The input number.
 * @returns {number} The square root of the input number.
 * @throws Will throw an error if the input number is negative.
 */
function squareRoot(a) {
  // type check using `typeCheckSingle` function
  // throw an error if the input number is negative
  // perform the square root operation
}

/**
 * Calculate the square of a number.
 * @param {number} a - The input number.
 * @returns {number} The square of the input number.
 */
function square(a) {
  // type check using `typeCheckSingle` function
  // perform the square operation
}
```

You should be able to use Run button as you write your code to validate that your implementation is correct. Once your implementation is correct, you can proceed to the next step.

8. For the next set of tests, we will test a controller module. This controller is a basic CRUD controller for a make belief user API. The implementation has already been written. Please open up the `apiClient.js` file and take a look at the code. The controller module uses the `fetch` API to make HTTP requests.

Let's begin and write some tests for the module. You must create a file in the project called `apiClient.test.js` file.

We will add the tests below to the file. The tests uses the `fetch` API to make a request to the `https://jsonplaceholder.typicode.com/users` endpoint. The test then validates that the response is an array of users.

```js
const {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('./apiClient');


describe('ApiClient', () => {
  describe('fetchUsers()', () => {
    it('should fetch a list of users', async () => {
      const users = await fetchUsers();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });
  });
  describe('fetchUserById()', () => {
    it('should fetch a single user by ID', async () => {
      const user = await fetchUserById(1);
      expect(user).toHaveProperty('id', 1);
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
    });
  });

  describe('createUser()', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
      };
      const createdUser = await createUser(newUser);
      expect(createdUser).toHaveProperty('id');
      expect(createdUser).toMatchObject(newUser);
    });
  });

  describe('updateUser()', () => {
    it('should update a user by ID', async () => {
      const updatedData = {
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'jane.doe@example.com',
      };
      const updatedUser = await updateUser(1, updatedData);
      expect(updatedUser).toHaveProperty('id', 1);
      expect(updatedUser).toMatchObject(updatedData);
    });
  });

  describe('deleteUser()', () => {
    it('should delete a user by ID', async () => {
      const response = await deleteUser(1);
      expect(response.status).toBe(200);
    });
  });
});
```

You should be able to run the `npm test` command to validate that your tests are correct. Once your tests are correct, you can proceed to the next step.
9. These tests are great, but there is one major flaw - they are all dependent on the API endpoint. If the API endpoint is down, then all of our tests will fail. This is not ideal. We want to be able to test our code without relying on external dependencies. Furthermore, in a real world scenario, the API endpoint may not be available during a CI/CD pipeline - for instance if we are testing a React frontend that relies on a Node backend which is managed by a different team.

To solve this problem, we are going to mock the `fetch` method.

Open up the `apiClient.js` file and examine the  `fetchUsers` method. You should see the following code:

```js
  describe('fetchUsers()', () => {
    it('should fetch a list of users', async () => {
      const users = await fetchUsers();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });
  });
```

Just before this method, we will add the following code:

```js

  let fetchSpy;

  /**
   * Mock the fetch method.
   */
  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve());
  });

  /**
   * Restore the fetch method.
   */
  afterEach(() => {
    fetchSpy.mockRestore();
  });
```

This code will mock the `fetch` method before each test and restore the `fetch` method after each test. This will allow us to test our code without relying on the API endpoint.

The next step, we will need to craft a fake result for each of these tests cases. This is called a fixture. For this lab, we will only update the `fetchUsers` test case. You can update the rest of the test cases on your own.

```js
  describe('fetchUsers()', () => {
    it('should fetch a list of users', async () => {

      // mock the users fixture
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' },
      ];

      fetchSpy.mockResolvedValue({
        json: async () => mockUsers,
      });

      const users = await fetchUsers();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);
    });
  });
```

Comment out the other test cases for now and re-run the lab. You should see the test pass

You can continue to update the rest of the test cases in the same way. Once you are done, you should be able to run the `npm test` command to validate that your tests are correct.


## Guidance and Testing

1. The steps above should walk you through creating the layout to match the mockup. You can review the video walkthrough for further guidance.

## Submission

Once you have completed the lab, please submit your code to the Replit classroom. You can do this by clicking the "Share" button in the top right corner of the Replit editor. Then, click the "Share to Classroom" button. You should see a list of classes that you are enrolled in. Select the class that you are enrolled in and click the "Share" button. You should see a message that your code has been shared with the class. You can now close the share window.
