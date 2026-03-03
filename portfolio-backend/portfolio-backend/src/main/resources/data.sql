INSERT INTO creator (id,name,code,password,codew,role)
VALUES
(1,'Neeraj Mittal','helloworld!','$2a$10$KDc5KM7IxAQs3PwrrYCL3uzYJ5iGTMTglEGgpX6Le7hFPU5NgI3qy',true,'CREATOR')
ON CONFLICT (codew) DO NOTHING;
