# Node Simple Contacts App

## Overview

The following repo was forked using the [Node Web Template](https://github.com/cabinetoffice/node-web-template).

## Task

Develop a simple Contacts web application that stores information such as name, address, and telephone numbers for contacts. Users should be able to see a list of contacts, as well as be able to perform CRUD activity for contacts. This application should:

1. Demonstrate your ability to build a basic web application.
2. Showcase your proficiency with web development frameworks and tools.

### Requirements

1. **Framework**: Use any web application framework to complete this task. Python frameworks such as Django are recommended, but any language and framework are acceptable. The focus is on demonstrating proficiency.  
   - **Implementation**: Used Node.js/Express/Jest.  

2. **Front-End**: Develop a basic web front-end to interact with the application. Apply some styling to create a visually appealing interface.  
   - **Implementation**: GDS Style v5 has been added to ensure accessibility and best practices are considered and embedded in our applications.  

3. **Data Storage**: Store contact information in a database. SQLite is suggested for simplicity, but other databases or data storage solutions (e.g., JSON files) are acceptable.  
   - **Implementation**: ~~**TBD**, Saved locally as an array.~~ Integrated with DynamoDB on Docker env

4. **API**: Provide a basic API that serves the application’s data.  
   - **Implementation**: Simple CRUD API endpoints have been provided, but further enhancements are required, such as adding an OpenAPI spec and incorporating versioning (e.g., `/api/v1/(create|update|remove)`).
      - Get all contacts (with data)      - GET - `/contacts`
      - Get contact page                  - GET - `/contact/create`
      - Get contact with specific ID      - GET - `/contact/update/:ID`

      - Delete contact with specific ID   - GET - `/contact/remove/:ID` - Removal from User side - No BE should or will be involved.

      - Create contact                    - POST - `/contact/create`
      - Update contact with specific ID   - POST - `/contact/update/:ID`

5. **Dynamic Interactions**: Include a few examples of dynamic user interfaces, such as AJAX interactions or partial updates to the DOM. These are considered extra features but will showcase your ability to enhance user experiences.  
   - **Implementation**: **TBD**.  

6. **Local Environment**: The application only needs to run on a local machine and does not need to be deployed as a live site.  
   - **Implementation**: To run the application in `development` mode, follow the instructions outlined below using the `make` command.  

7. **Version Control**: Use Git for version control. Publish the code repository to an open-source platform such as GitHub or an equivalent service.  
   - **Implementation**: **Done**.  

8. **Documentation**: Include a README file with:  
   - **Implementation**: **Done**. Further documentation should be added in a dedicated folder to improve project understanding and keep the README file concise.  
     - Instructions for cloning the repository. **Done**.  
     - Steps to install dependencies. **Done**.  
     - Guidelines to run the application locally. **Done**.  
     - High-level instructions on deploying the application to production, including a recommended cloud platform and service (e.g., AWS, GCP, Azure).  
       - **TBD**. However, the Makefile is already set to check production configuration and status.  
       - In production, deployment depends on the chosen compute service. If using **ECS Fargate**, it requires **CodeBuild, ECR, and ECS**, similar to the **[AWS HLD Diagram](https://github.com/cabinetoffice/request-service-access/blob/main/docs/GitHub%20Requests%20(Application%20%26%20Terraform).md)**.  
       - Provisioning could be done via Terraform or another **Infrastructure as Code (IaC)** tool, with public files available in the `terraform` folder under `infrastructure` make sure no security information are leaked. If required security managers or env variables will help.

## Running local development environment with Docker

Docker is used run the application in development mode, with tooling setup to detect changes in local `src` directory and reload the container's node server.

Follow the steps in [Launching-the-web-app](#launching-the-web-app), and ensure that `NODE_ENV=development` is set in the `.env` file.

## Launching the web-app

### Prerequisites

1. Install [NodeJS v22.6.0](https://nodejs.org/en) or [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
2. Install [Docker](https://www.docker.com/get-started)

### Building the Docker Image

1. Create a copy of the `.env.example` file and name it `.env`:

 Then run:

- git clone https://github.com/eemb3d/ContactsNodeApp.git
- cd ContactsNodeApp
- make docker-build
- make docker-up

This will then download the necessary dependencies, build the Docker image, and start the application.
You will be able to access it on [localhost:3000](localhost:3000).

## ToDo

- Add API specification.
- Update CDN origin.
- ~~Separate the list of contacts from the "Create Contact" page.~~
- Implement address validation and improve other validations (length, character restrictions, etc.).
- ~~Complete the remaining CRUD actions, including views, models, controllers, routing, tests, and validations.~~
- Implement back link, landing page, and confirmation page.
- ~~Create a service to store information~~.
- Remove hardcoded routing in the view.
- Add paginated logic
- Add BE to reduce wait time for the DB calls
- Improve unit test for service
- ...
