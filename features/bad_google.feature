Feature: Searching for TestCafe by BadGoogle

  I want to find TestCafe repository by BadGoogle search

  Scenario: Searching for TestCafe by BadGoogle
    Given I am open Google's search page
    When I am poorly typing my search request "github TestCafe" on Google
    Then I am pressing "enter" key on Google
    Then I should see that the first Google's result is "GitHub - DevExpress/testcafe:"
