## BiodataList Managment Backend


## Requirement 

## Database 
- Mongodb (Native driver)



## Models

### User
- _id 
- username
- email
- password
- createdAt

### Biodata
- _id
- address: string
- gender: string
- maritalStatus: boolean
- createdAt: Date
- userId: ObjectID (Reference User Collection)
- age: number
- dateOfBrith: Date
- height: number
- occupation: string
- nationality: string
- divisions,
- districts,
- upazilas



### Routes 

### Auth Routes
- [GET] api/auth/login
- [GET] api/auth/registration
- [GET] api/auth/fetch-current-user

### Biodata Rotues
- [GET] api/biodata  => get all public biodatas
- [POST][PRIVATE] api/biodata  ==> create biodata