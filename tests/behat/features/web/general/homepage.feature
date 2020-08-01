@web
Feature: Pocketcode homepage
  In order to access and browse the projects
  As a visitor
  I want to be able to see the homepage

  Background:
    Given there are users:
      | id | name     |
      | 1  | Catrobat |
      | 2  | User1    |
      | 3  | Catrobat2|

    And there are extensions:
      | id | name         | prefix     |
      | 1  | Embroidery   | Embroidery |

    And there are flavors:
      | id | name       |
      | 1  | pocketcode |
      | 3  | embroidery |

    And there are projects:
      | id | name      | owned by | extensions | flavor     |
      | 1  | project 1 | Catrobat | Embroidery | pocketcode |
      | 2  | project 2 | Catrobat | Embroidery | embroidery |
      | 3  | project 3 | User1    |            | pocketcode |
      | 4  | project 4 | User1    |            | embroidery |
      | 5  | project 5 | User1    |            | pocketcode |
      | 6  | project 6 | Catrobat2|            | pocketcode |
      | 7  | project 7 | Catrobat2|            | pocketcode |

    And following projects are featured:
      | name      | url                   | active | priority |
      | project 1 |                       | 0      | 1        |
      | project 2 |                       | 1      | 3        |
      | project 3 |                       | 1      | 2        |
      |           | http://www.google.at/ | 1      | 5        |
      |           | http://www.orf.at/    | 0      | 4        |

    And following projects are examples:
      | name      | active | priority |
      | project 4 | 0      | 1        |
      | project 5 | 1      | 3        |
      | project 6 | 1      | 2        |

    And there are Scratch remix relations:
      | scratch_parent_id | catrobat_child_id |
      | 70058680          | 6                 |
      | 70058680          | 7                 |

  Scenario: Scratch remixes project should be visible:
    Given I am on homepage
    And I wait for the page to be loaded
    Then I should see the featured slider
    Then the element "#scratchRemixes" should exist
    And the "#scratchRemixes" element should contain "project 6"
    And the "#scratchRemixes" element should contain "project 7"
    And the "#scratchRemixes" element should not contain "project 1"

  Scenario: Viewing the homepage at website root
    Given I am on homepage
    And I wait for the page to be loaded
    Then I should see the featured slider
    Then the element "#newest" should exist
    Then the element "#example" should exist
    Then the element "#recommended" should exist
    Then the element "#mostDownloaded" should exist
    Then the element "#random" should exist
    Then the element "#scratchRemixes" should exist
    Then the element "#mostViewed" should exist

  Scenario: Welcome Section
    Given I am on homepage
    And I wait for the page to be loaded
    Then I should see the welcome section
    And I should see the video available at "https://www.youtube.com/embed/BHe2r2WU-T8"
    And I should see "Get it on Google Play"
    And I should see "Get it on IOS"

  Scenario: Cant see the Welcome Section when logged in
    Given I log in as "Catrobat"
    And I go to the homepage
    And I wait for the page to be loaded
    Then I should not see the welcome section

  Scenario: Featured Programs and Urls
    Given I am on homepage
    And I wait for the page to be loaded
    Then I should see the featured slider
    And I should see the slider with the values "http://www.google.at/,project 2,project 3"

  Scenario: Example Programs
    Given I am on homepage
    And I wait for the page to be loaded
    Then the element "#example" should exist
    And the "#example" element should contain "project 5"
    And the "#example" element should contain "project 6"

  Scenario: Extension flavored homepage
    Given I am on "/embroidery"
    And I wait for the page to be loaded
    Then the element "#newest" should exist
    And the "#newest" element should contain "project 1"
    And the "#newest" element should contain "project 2"
    And the "#newest" element should contain "project 4"
    And the "#newest" element should not contain "project 3"
