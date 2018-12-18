
```
sudo nano /etc/supervisor/conf.d/transit.conf


[program:transit-cu]
command=/home/ubuntu/transit-cu/venv/bin/gunicorn -b localhost:8000 -w 4 transit:app
directory=/home/ubuntu/transit-cu
user=ubuntu
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true


sudo supervisorctl reload
sudo supervisorctl status
```