pipeline {
  agent any

  stages {

   stage('Checkout') {
  steps {
    checkout([$class: 'GitSCM',
      branches: [[name: '*/main']],
      userRemoteConfigs: [[url: 'https://github.com/cod-neeraj/Portfolio.git']]
    ])
  }
}


    stage('Build and Test') {
      agent {
        docker { 
          image 'maven:3.9.6-eclipse-temurin-21'
          args '-u 0:0 -v /var/lib/jenkins/.m2:/root/.m2'
        }
      }
      steps {
        sh 'ls -ltr'
        sh 'cd portfolio-backend/portfolio-backend && mvn -Dmaven.repo.local=/root/.m2/repository clean package -DskipTests'
      }
    }
    
    stage('SonarQube Analysis') {
      agent {
        docker { 
          image 'maven:3.9.6-eclipse-temurin-21'
          args '-u 0:0 -v /var/lib/jenkins/.m2:/root/.m2'
        }
      }
      environment {
        SONAR_TOKEN = credentials('sonartoken')
      }
      steps {
        dir('portfolio-backend/portfolio-backend') {
          sh '''
            mvn -Dmaven.repo.local=/root/.m2/repository \
              sonar:sonar \
              -Dsonar.projectKey=portfolio-backend \
              -Dsonar.host.url=http://98.93.67.212:9000 \
              -Dsonar.login=$SONAR_TOKEN
          '''
        }
      } 
    }  

    stage('Build and Push Docker Image') {
      environment {
        DOCKER_IMAGE = "neerajdeveloper/portfolio-cicd:${BUILD_NUMBER}"
        REGISTRY_CREDENTIALS = credentials('docker_cred')
      }
      steps {
        script {
          sh 'cd portfolio-backend/portfolio-backend && docker build -t ${DOCKER_IMAGE} .'
          def dockerImage = docker.image("${DOCKER_IMAGE}")
          docker.withRegistry('https://index.docker.io/v1/', "docker_cred") {
            dockerImage.push()
          }
        }
      }
    }
    stage('Build and Push Frontend Docker Image') {
  environment {
    FRONTEND_IMAGE = "neerajdeveloper/portfolio-frontend:${BUILD_NUMBER}"
    REGISTRY_CREDENTIALS = credentials('docker_cred')
  }
  steps {
    script {
      sh 'cd portfolio-neeraj && docker build -t ${FRONTEND_IMAGE} .'
      def feImage = docker.image("${FRONTEND_IMAGE}")
      docker.withRegistry('https://index.docker.io/v1/', "docker_cred") {
        feImage.push()
      }
    }
  }
}

stage('Debug Branch') {
  steps {
    sh '''
      echo "==== CURRENT BRANCH ===="
      git branch -a
      echo "========================"
    '''
  }
}
   stage('CD - Update Kubernetes Manifest') {
  when {
    expression { 
      return env.GIT_BRANCH == "origin/main" || env.BRANCH_NAME == "main"
    }
  }
  steps {
    withCredentials([string(credentialsId: 'github_token', variable: 'GIT_TOKEN')]) {
      sh '''
        git checkout main || true
        git pull --rebase origin main || true

        sed -i "s|image: .*|image: neerajdeveloper/portfolio-cicd:${BUILD_NUMBER}|g" manifests/Backend-deployment.yaml

        git config --global user.email "jenkins@ci.com"
        git config --global user.name "Jenkins CI"

        git remote set-url origin https://$GIT_TOKEN@github.com/cod-neeraj/Portfolio.git

        git add manifests/Backend-deployment.yaml
        git commit -m "CD: update backend image to build ${BUILD_NUMBER}" || true
        git push origin main
      '''
    }
  }
}
 stage('CD - Update Kubernetes Manifest Frontend') {
  when {
    expression { 
      return env.GIT_BRANCH == "origin/main" || env.BRANCH_NAME == "main"
    }
  }
  steps {
    withCredentials([string(credentialsId: 'github_token', variable: 'GIT_TOKEN')]) {
      sh '''
        git checkout main || true
        git pull --rebase origin main || true

        sed -i "s|image: .*|image: neerajdeveloper/portfolio-frontend:${BUILD_NUMBER}|g" manifests/frontend-deployment.yaml

        git config --global user.email "jenkins@ci.com"
        git config --global user.name "Jenkins CI"

        git remote set-url origin https://$GIT_TOKEN@github.com/cod-neeraj/Portfolio.git

        git add manifests/frontend-deployment.yaml
        git commit -m "CD: update frontend image to build ${BUILD_NUMBER}" || true
        git push origin main
      '''
    }
  }
}





  }
}
