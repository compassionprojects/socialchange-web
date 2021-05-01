import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';

// Extend the built-in models using class inheritance
class User extends Adapters.TypeORM.Models.User.model {
  // You can extend the options in a model but you should not remove the base
  // properties or change the order of the built-in options on the constructor
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
  }
}

export const UserSchema = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    email: {
      // This is inherited from the one in the OAuth provider profile on
      // initial sign in, if one is specified in that profile.
      type: 'varchar',
      unique: true,
      nullable: false,
    },
  },
};

const Models = {
  User: {
    model: User,
    schema: UserSchema,
  },
};

export default NextAuth({
  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.SECRET,
    signingKey: JSON.stringify({
      alg: 'HS512',
      k: process.env.SIGNING_KEY,
      key_ops: ['sign', 'verify'],
      kty: 'oct',
    }),
    verificationOptions: {
      algorithms: ['HS512'],
    },
  },

  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60, // 24h
      sendVerificationRequest: ({
        identifier: email,
        url,
        token,
        baseUrl,
        provider,
      }) => {
        console.log('Sending email...', email, token, baseUrl, provider);
        console.log(url);
      },
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  adapter: Adapters.TypeORM.Adapter(
    // The first argument should be a database connection string or TypeORM config object
    process.env.DATABASE_URL,
    // The second argument can be used to pass custom models and schemas
    {
      models: {
        User: Models.User,
      },
    }
  ),

  theme: 'light',
});
