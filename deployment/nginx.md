
```
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-enabled/transit


server {
    listen 80;
    listen [::]:80;

    server_name example.com;

    location / {
        proxy_pass http://localhost:8000;
    }
}


sudo nginx -t
sudo service nginx reload

# install cert with Let's Encrypt
```