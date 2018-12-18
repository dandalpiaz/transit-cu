#!/bin/sh
ssh -i ~/path-to-key/key.pem example@11.111.11.11 'cd /path/to/application; git pull; sudo supervisorctl reload'