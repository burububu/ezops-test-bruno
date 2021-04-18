FROM node
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser --system --group appuser
COPY chat/ .
RUN npm install
RUN chown -R appuser /opt/app
USER appuser
EXPOSE 3000
CMD [ "npm", "run", "start" ]