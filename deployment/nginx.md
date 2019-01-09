
# Nginx Configuration

```bash
# remove the default file and create a new one
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-enabled/transit

# example file contents
server {
    listen 80;
    listen [::]:80;

    server_name transitcu.com;

    location / {
        proxy_pass http://localhost:8000;
    }

    access_log /var/log/transit_access.log;
    error_log /var/log/transit_error.log;
}

# check syntax and reload
sudo nginx -t
sudo service nginx reload
```