
# Supervisor Configuration

```bash
# create a new configuration file
sudo nano /etc/supervisor/conf.d/transit.conf

# example file contents
[program:transit-cu]
command=/home/ubuntu/transit-cu/venv/bin/gunicorn -b localhost:8000 -w 3 transit:app
directory=/home/ubuntu/transit-cu
user=ubuntu
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true

# restart supervisor
sudo supervisorctl reload
sudo supervisorctl status
```