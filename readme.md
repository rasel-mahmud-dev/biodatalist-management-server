## BiodataList Management Backend

### Live: https://biodata-management.netlify.app
### Repo: https://github.com/rasel-mahmud-dev/biodatalist-management-server
### Client Repo: https://github.com/rasel-mahmud-dev/biodatalist-management-client



### Packages
- Typescript
- Nodejs
- Expressjs
- Joi (validator)
- Jsonwebtoken
- bcryptjs
- passport
- mongodb


## Requirement 

## Database 
- Mongodb (Native driver)


## Models

### User
- _id 
- username
- avatar
- email
- password
- createdAt

### Biodata
- _id
- gender: string
- maritalStatus: boolean
- createdAt: Date
- userId: ObjectID (Reference User Collection)
- age: number
- birthDay: Date
- bloodGroup: string
- height: number
- occupation: string
- nationality: string
- nationality?: string
- occupation?: string
- phone?: string
- fatherName?: string
- isFatherAlive?: string
- educationMethod?: string
- presentAddress?: Address
- permanentAddress?: Address
- isCompleted?: string

### Roles
- CUSTOMER
- ADMIN  


### Routes 

### Auth Route
- [GET] api/auth/login
- [GET] api/auth/registration
- [GET] api/auth/fetch-current-auth

### Biodata Route
- [GET] api/biodata  => get all public biodatas
- [POST][PRIVATE] api/biodata  ==> create biodata
- [GET][ADMIN] api/biodata/all  ==> get all biodata


### Users Route 
- [GET][ADMIN] api/users  ==> get all users