# 👨‍💼 Employee Management System (Spring Boot)

This is a RESTful **Employee Management System** built using **Spring Boot**. The application allows you to manage employee data with features like adding, updating, viewing, and deleting employee records. It follows good development practices such as using DTOs, Optionals, custom queries, and a clean project structure.

## 🚀 Features

- Add a new employee
- Get all employees
- Get an employee by ID
- Update employee details
- Delete an employee
- Search/filter using custom queries
- Uses DTOs for request and response
- Proper error handling and validation

## 🧰 Tech Stack

- **Backend Framework:** Spring Boot
- **Language:** Java
- **Build Tool:** Maven
- **Database:** MySQL / H2 (You can configure)
- **Others:** Spring Data JPA, Lombok, Validation, REST APIs

## 🗂️ Project Structure
Employee_Management/ ├── controller/ ├── dto/ │ ├── request/ │ └── response/ ├── model/ ├── repository/ ├── service/ ├── exception/ └── config/


## 📦 API Endpoints

| Method | Endpoint                 | Description             |
|--------|--------------------------|-------------------------|
| POST   | `/api/employees`         | Add a new employee      |
| GET    | `/api/employees`         | Get all employees       |
| GET    | `/api/employees/{id}`    | Get employee by ID      |
| PUT    | `/api/employees/{id}`    | Update employee details |
| DELETE | `/api/employees/{id}`    | Delete employee         |
| GET    | `/api/employees/search`  | Custom search endpoint  |




## 🛠️ How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/PrathameshBhagwat/Employee_Management.git
   cd Employee_Management
Open the project in your IDE (IntelliJ / Eclipse / VS Code).
Make sure you have:
Java 17+
Maven
MySQL (or change to H2 in application.properties)


Configure your DB in src/main/resources/application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
Run the application:


Using your IDE → Run EmployeeManagementApplication.java

Or via terminal:
mvn spring-boot:run

Access APIs via Postman or browser:
http://localhost:8080/api/employees


📬 Contact
Made with ❤️ by Prathamesh Bhagwat
📧 Email: bhagwatprathamesh2626@gmail.com
