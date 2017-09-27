SET TempVar=%~dp0
SET TempVar=%TempVar%openssl.cnf
echo %TempVar%
SET OPENSSL_CONF=%TempVar%

openssl version -a
openssl genrsa -out privatekey.pem 1024
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
