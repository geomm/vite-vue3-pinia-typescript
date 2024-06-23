#Dockerfile
# prod phase
FROM nginx:1.23.1 as production
COPY /config/nginx/local.conf.template /etc/nginx/conf.d/default.conf.template
COPY /rick-and-morty-UI/dist/ /usr/share/nginx/html/
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -t && nginx -g 'daemon off;'
