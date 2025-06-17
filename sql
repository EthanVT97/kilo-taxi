-- PostgreSQL Security Setup
CREATE USER kilo_app WITH PASSWORD 'secure_password_here';
CREATE DATABASE kilo_taxi_db OWNER kilo_app;

-- Grant specific permissions only
GRANT CONNECT ON DATABASE kilo_taxi_db TO kilo_app;
GRANT USAGE ON SCHEMA public TO kilo_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO kilo_app;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO kilo_app;

-- Enable SSL
ALTER SYSTEM SET ssl = on;
ALTER SYSTEM SET ssl_cert_file = '/path/to/server.crt';
ALTER SYSTEM SET ssl_key_file = '/path/to/server.key';
