pipeline{
    agent any
    stages{
        stage('Install dependencies'){
            steps{
                bat 'npm install'
            }
        }
        stage('Run'){
            steps{
                bat 'npm run build'
            }
        }
    }
}