#!/bin/bash
git fetch && git pull
sudo docker compose down -rmi
sudo docker compose build
sudo docker compose up -d
sudo docker compose logs -f
