Feature: Douglas Home Page

    Scenario: Validate the login Page
        Given the user navigate to douglas home page
        When the user accept the cookies
        And the user select the PARFUM menu from menu bar
        Then the user get the product list based on:
            | item |
            | SALE |
            | NEU  |




