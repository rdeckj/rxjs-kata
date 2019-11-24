# Requirements

```Gherkin
Feature: WebSocket FizzBuzz
    As a fizz buzz operator
    I want to know that my fizz buzz server is running correctly
    So that I know things are fizzing and buzzing

    Scenario: Number
        When I receive '2'
        Then I should see '2'

    Scenario: Fizz
        When I receive a number divisible by '3'
        Then I should see 'Fizz'

    Scenario: Buzz
        When I receive a number divisible by '5'
        Then I should see 'Buzz'

    Scenario: FizzBuzz
        When I receive a number divisible by '15'
        Then I should see 'FizzBuzz'
    
    Scenario: Ignore
        When I receive a diconnection
        Then I should see no change
```
# Running the Server

You can run the server with the following command:

```shell
cd server
npm run server
```
