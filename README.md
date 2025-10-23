# 🧪 SausceDemo - Cypress Automation Testing

SauceDemo is a web-based e-commerce demo application created by Sauce Labs for practicing and testing software quality assurance, automation, and performance testing. The application simulates a simple online store where users can log in, browse products, add items to a cart, sort products, proceed through a checkout process, and log out.

The primary objective of testing is to validate core features such as login, product catalog, shopping cart, and the checkout flow to ensure alignment with user requirements and software quality standards

## 📝 Reports and Documentation

This section provides direct access to detailed testing documents, including the Test Plan, Test Scenarios, Test Cases, and Bug Reports. Each document outlines the testing approach, execution details, and identified issues throughout the testing process.

Website URL: https://www.saucedemo.com

- [Test Plan](https://docs.google.com/document/d/1K6Uy9S0fTBt9BNnOB806961vkUsOdrP_85xaJaBhA7I/edit?usp=sharing)
- [Test Scenarios](https://docs.google.com/spreadsheets/d/1HHHzich7DSBRshUM52Oa4IALYVs_Kr4EQYWsYU_KzLg/edit?usp=sharing)
- [Test Cases](https://docs.google.com/spreadsheets/d/1siENwPxA8oznJOxxzRvNe0JyzJR890y4UB6dI8cOJgQ/edit?usp=sharing)
- [Bug Reports](https://docs.google.com/spreadsheets/d/1Q4bFDRCV8Ad1ow6YMq5RU1CE6hG92h_gueQNyJibQYY/edit?usp=sharing)
<!-- - [Test Report]() IN PROGRESS -->

## 🚀 How to Run Cypress Automation Tests

#### Step 1 — Clone the Repository

    git clone https://github.com/mas-andri/QA-SauceDemo-CypressAutomation.git

#### Step 2 — Install Dependencies

    npm install

#### Step 3 — Run Cypress

    npx cypress open

If you want to run Cypress in headless mode using the Chrome browser

    npx cypress run --browser chrome

#### Step 4 - Opening the Mochawesome Report

    open cypress/reports/html/index.html
