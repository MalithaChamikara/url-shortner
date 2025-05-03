pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/MalithaChamikara/url-shortner.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t url-shortner-frontend .frontend/'
                sh 'docker build -t url-shortner-backend .backend/'
            }
        }

        stage('Success') {
            steps {
                echo 'Build and Docker images created successfully!'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}