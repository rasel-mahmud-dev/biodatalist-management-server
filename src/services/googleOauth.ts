import passport from 'passport'
import GoogleOAuth2Strategy from 'passport-google-oauth';
import User from "../models/User";
import userType from "../interfaces/UserType";
import UserType from "../interfaces/UserType";
import {Role} from "../types";


const GoogleStrategy = GoogleOAuth2Strategy.OAuth2Strategy


// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.CALLBACK_URL as string
    },
    async function (accessToken, refreshToken, profile, done) {

        const {picture, email, name} = profile._json

        try {
            let user = await User.findOne<userType>({email})

            if (user) {
                // if user avatar missing then update avatar from google avatar
                if (!user.avatar) {
                    User.findAndUpdate({email}, {
                        $set: {
                            avatar: picture
                        }
                    }, {}).catch(() => {
                    })
                }
                done(null, user)
            } else {
                let newUser = new User({
                    username: name,
                    avatar: picture,
                    password: "",
                    email: email,
                    role: Role.CUSTOMER,
                    createdAt: new Date(),
                })
                let response = await newUser.save()
                if (response) {
                    done(null, response)
                } else {
                    done("User registration fail", null)
                }
            }
        } catch (ex) {
            done(ex, null)
        }

    }
));


passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj: UserType, cb) {
    let {password, ...attr} = obj
    cb(null, attr);
});