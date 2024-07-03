# AIQ-typeScript

Power Plants Visualization Backend

This project provides a TypeScript backend service that processes and serves data related to the annual net generation of power plants in the US. It reads data from an Excel file, processes it,saves it the DB and provides a REST API for accessing the processed data. The API can filter plants by state and return the top N plants based on their annual net generation.
Table of Contents

    Features
    Prerequisites
    Installation and Running
    API Documentation

##Features

    Read, process and save data into mongodb from an Excel file(eGRID2021_data.xlsx).
    Serve data via a REST API.
    Filter plants by state and return the top N plants.
    Swagger-based API documentation.
    Containerized solution using Docker.

##Prerequisites

    Node.js (= 20.0)
    npm (>= 6.x)
    Docker (optional, for containerization)
    MongoDB ( >=7)

##Installation and Running

    Clone the repository:
    git clone https://github.com/athul911/AIQ-typeScript.git
    cd AIQ-typescript

    Docker:
     ** docker-compose up -d** ( Easy way,spins up 2 containers;1 for app and 1 for the db )

    Non Docker setup:

    DB instance:
         sudo mongod 
        (run mongodb server on port 27017)
    
    App:
        npm install
        npm build
        npm public/src/index.js
        (check for log which says 'MongoDB connected')

    

#API Documentation
    http://localhost:3000/api-docs

##Running Unit Tests
    cd AIQ-typescript
    npm test


