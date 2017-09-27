FROM node:7-onbuild

RUN mkdir -p /usr/volumns/src /usr/volumns/share /usr/volumns/output
VOLUME ["/usr/volumns/src", "/usr/volumns/share", "/usr/volumns/output"]

COPY docker-cmd.sh /usr/src/app/

EXPOSE 80 443
