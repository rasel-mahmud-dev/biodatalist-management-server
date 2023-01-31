## BiodataList Management Backend


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
- division,
- occupation
- district,
- upazila



### Routes 

### Auth Routes
- [GET] api/auth/login
- [GET] api/auth/registration
- [GET] api/auth/fetch-current-auth

### Biodata Rotues
- [GET] api/biodata  => get all public biodatas
- [POST][PRIVATE] api/biodata  ==> create biodata