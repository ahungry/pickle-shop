Feature: Trying out a simple scenario

  I want to text a simple website function

  Scenario: Visiting Example website
    Given I go to example.com
    When I am sitting there doing nothing
    Then I should see the header "Example Domain"

  Scenario: A faliing test scenario that will always fail
    Given I go to example.com
    When I am sitting there doing nothing
    Then I should see the header "NOT Example Domain"
