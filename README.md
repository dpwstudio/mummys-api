# API Mummys - Documentation
> Version 1.0.0

## Requirements
- Install NodeJS
- Install Google Cloud SDK
- Install MySQL Workbench

## Installations
````
$ gcloud components list
$ gcloud components install cloud_sql_proxy

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                 Components                                                 │
├───────────────┬──────────────────────────────────────────────────────┬──────────────────────────┬──────────┤
│     Status    │                         Name                         │            ID            │   Size   │
├───────────────┼──────────────────────────────────────────────────────┼──────────────────────────┼──────────┤
│ Not Installed │ App Engine Go Extensions                             │ app-engine-go            │  4.8 MiB │
│ Not Installed │ Appctl                                               │ appctl                   │ 18.6 MiB │
│ Not Installed │ Cloud Bigtable Command Line Tool                     │ cbt                      │  7.3 MiB │
│ Not Installed │ Cloud Bigtable Emulator                              │ bigtable                 │  6.6 MiB │
│ Not Installed │ Cloud Datalab Command Line Tool                      │ datalab                  │  < 1 MiB │
│ Not Installed │ Cloud Datastore Emulator                             │ cloud-datastore-emulator │ 18.4 MiB │
│ Not Installed │ Cloud Firestore Emulator                             │ cloud-firestore-emulator │ 40.0 MiB │
│ Not Installed │ Cloud Pub/Sub Emulator                               │ pubsub-emulator          │ 34.9 MiB │
│ Not Installed │ Emulator Reverse Proxy                               │ emulator-reverse-proxy   │ 14.5 MiB │
│ Not Installed │ Google Cloud Build Local Builder                     │ cloud-build-local        │  5.9 MiB │
│ Not Installed │ Google Container Registry's Docker credential helper │ docker-credential-gcr    │  1.8 MiB │
│ Not Installed │ Skaffold                                             │ skaffold                 │ 44.0 MiB │
│ Not Installed │ gcloud Alpha Commands                                │ alpha                    │  < 1 MiB │
│ Not Installed │ gcloud Beta Commands                                 │ beta                     │  < 1 MiB │
│ Not Installed │ gcloud app Java Extensions                           │ app-engine-java          │ 62.0 MiB │
│ Not Installed │ gcloud app PHP Extensions                            │ app-engine-php           │ 21.9 MiB │
│ Not Installed │ gcloud app Python Extensions                         │ app-engine-python        │  6.0 MiB │
│ Not Installed │ gcloud app Python Extensions (Extra Libraries)       │ app-engine-python-extras │ 27.1 MiB │
│ Installed     │ BigQuery Command Line Tool                           │ bq                       │  < 1 MiB │
│ Installed     │ Cloud SDK Core Libraries                             │ core                     │ 12.5 MiB │
│ Installed     │ Cloud SQL Proxy                                      │ cloud_sql_proxy          │  3.7 MiB │
│ Installed     │ Cloud Storage Command Line Tool                      │ gsutil                   │  3.6 MiB │
│ Installed     │ kubectl                                              │ kubectl                  │  < 1 MiB │
└───────────────┴──────────────────────────────────────────────────────┴──────────────────────────┴──────────┘
````


## Connect to cloud SQL with cloud_sql_proxy
Pour tester l'api en local et se connecter au cloud SQL de GCP, tapez la ligne suivante dans le terminal ou la console.
````
$ cloud_sql_proxy -instances=chronchain-ws:europe-west2:chronchain-mysql=tcp:3306
````

## Deploy on Google Cloud Platform
```
gcloud app deploy app.yaml
```

## Open app on your browser
```
gcloud app browse
```
